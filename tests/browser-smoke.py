"""Run against `npm run preview -- --port 4175` with Python Playwright installed.
No enquiry is sent: the WhatsApp handoff is intercepted locally.
"""
import json
import os
from datetime import datetime, timezone
from pathlib import Path
from urllib.parse import parse_qs, urlparse
from playwright.sync_api import sync_playwright

BASE = os.environ.get('SITE_TEST_URL', 'http://127.0.0.1:4175')
ARTIFACTS = Path(os.environ.get('SITE_TEST_ARTIFACTS', '/tmp/manish-website-checks'))
ARTIFACTS.mkdir(parents=True, exist_ok=True)

with sync_playwright() as p:
    browser = p.chromium.launch(executable_path=os.environ.get('CHROMIUM_PATH', '/usr/bin/chromium'), headless=True, args=['--no-sandbox'])
    context = browser.new_context(timezone_id='Asia/Kolkata')
    page = context.new_page()
    errors, failures = [], []
    page.on('pageerror', lambda error: errors.append(str(error)))
    page.on('requestfailed', lambda request: failures.append(request.url))
    for route in ['/', '/about', '/work-with-me', '/contact']:
        page.goto(BASE + route, wait_until='networkidle')
        assert page.locator('h1').count() == 1
        assert page.locator('#site-schema').count() == 1
        assert not page.locator('a[href*="brickinfinity"]').count()
        # Response HTML, not client-replaced head, must carry correct route metadata.
        response = context.request.get(BASE + route)
        html = response.text()
        assert page.title().replace('&', '&amp;') in html
        for width in [1920, 1366, 1024, 820, 768, 767, 430, 390, 320]:
            page.set_viewport_size({'width': width, 'height': 1000})
            assert page.evaluate('document.documentElement.scrollWidth <= innerWidth'), (route, width)
            if route == '/':
                boxes = [card.bounding_box() for card in page.locator('.platform-card').all()]
                assert len(boxes) == 4
                if width >= 768:
                    assert max(box['y'] for box in boxes) - min(box['y'] for box in boxes) < 2
                else:
                    assert all(boxes[i + 1]['y'] >= boxes[i]['y'] + boxes[i]['height'] for i in range(3))
        print('PASS route, metadata, hydration and responsive layout:', route)
    page.set_viewport_size({'width': 1440, 'height': 1000})
    page.goto(BASE + '/', wait_until='networkidle')
    assert page.locator('main > section').first.locator('h1').count() == 1
    page.screenshot(path=str(ARTIFACTS / 'home-desktop.png'))
    page.get_by_role('link', name='Explore My Services', exact=True).click()
    assert page.url.endswith('#services')
    page.goto(BASE + '/work-with-me?focus=VidyaInfinity&utm_source=youtube&utm_campaign=career', wait_until='networkidle')
    page.clock.install(time=datetime(2029, 1, 1, tzinfo=timezone.utc))
    assert 'Career' in page.get_by_label('Consultation focus').input_value()
    page.get_by_label('Name', exact=True).fill('Test Visitor')
    page.get_by_label('Email', exact=True).fill('visitor@example.com')
    page.get_by_label('Preferred date').fill('2030-06-15')
    page.get_by_label('Preferred time').fill('14:30')
    campaign = page.get_by_role('checkbox', name='Include this visit')
    assert not campaign.is_checked()
    page.get_by_role('button', name='Review Request').click()
    page.get_by_role('heading', name='Review your consultation request').wait_for()
    whatsapp = page.get_by_role('link', name='Open WhatsApp draft')
    text = parse_qs(urlparse(whatsapp.get_attribute('href')).query)['text'][0]
    assert 'UTC+05:30' in text and '2030-06-15T09:00:00.000Z' in text
    assert 'utm_source' not in text
    page.get_by_role('button', name='Edit details').click()
    campaign.check()
    page.get_by_role('button', name='Review Request').click()
    assert 'utm_source: youtube' in parse_qs(urlparse(whatsapp.get_attribute('href')).query)['text'][0]
    assert page.get_by_role('link', name='Open email draft').get_attribute('href').startswith('mailto:manishsirgg@gmail.com?')
    context.route('https://wa.me/**', lambda route: route.fulfill(body='Intercepted test draft; nothing sent.'))
    with page.expect_popup() as opened:
        whatsapp.click()
    opened.value.close()
    assert 'Nothing has been submitted' in page.get_by_role('status').inner_text()
    page.evaluate("Object.defineProperty(navigator, 'clipboard', {value: {writeText: async () => {throw new Error('blocked')}}})")
    page.get_by_role('button', name='Copy request text').click()
    assert 'Copy was unavailable' in page.get_by_role('alert').inner_text()
    # A request that expires while the review is open cannot hand off.
    page.clock.set_system_time(datetime(2031, 1, 1, tzinfo=timezone.utc))
    whatsapp.click()
    assert 'future' in page.get_by_role('alert').inner_text()
    assert len(context.pages) == 1
    page.get_by_role('button', name='Edit details').click()
    page.get_by_label('Preferred date').fill('2020-01-01')
    page.get_by_role('button', name='Review Request').click()
    assert not page.get_by_role('heading', name='Review your consultation request').count()
    print('PASS focus selection, timezone, optional campaign sharing, handoff, clipboard fallback and expired request')
    page.set_viewport_size({'width': 390, 'height': 844})
    page.goto(BASE + '/', wait_until='networkidle')
    toggle = page.get_by_role('button', name='Toggle navigation')
    toggle.click()
    assert toggle.get_attribute('aria-expanded') == 'true'
    page.keyboard.press('Escape')
    assert toggle.get_attribute('aria-expanded') == 'false'
    assert toggle.evaluate('(e)=>e===document.activeElement')
    page.screenshot(path=str(ARTIFACTS / 'home-mobile.png'))
    page.emulate_media(reduced_motion='reduce')
    assert page.locator('.platform-showcase').evaluate('(e)=>getComputedStyle(e).animationName') == 'none'
    page.locator('nav[aria-label="Featured platforms"] a').first.click()
    assert page.url.endswith('/#platforms')
    page.goto(BASE + '/', wait_until='networkidle')
    nav = page.get_by_role('button', name='Toggle navigation')
    nav.click()
    page.locator('#mobile-navigation').get_by_role('link', name='About', exact=True).click()
    assert page.url.endswith('/about')
    assert page.title().startswith('About Manish')
    page.go_back(wait_until='networkidle')
    assert page.locator('h1').inner_text().startswith('Clarity')
    print('PASS mobile navigation, history, focus return and reduced motion')
    no_js = browser.new_context(java_script_enabled=False)
    for route in ['/', '/about', '/work-with-me', '/contact']:
        static = no_js.new_page()
        static.goto(BASE + route)
        assert static.locator('h1').count() == 1
        assert static.get_by_role('link', name='Contact', exact=True).count() >= 1
        static.close()
    print('PASS four routes without JavaScript')
    assert not errors, errors
    assert not failures, failures
    browser.close()
