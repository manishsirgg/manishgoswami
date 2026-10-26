import {
  useEffect,
  useRef,
  useState,
  type FormEvent,
  type MouseEvent,
} from "react";
import { Mail, MessageCircle } from "lucide-react";
import { services } from "./services";
import { SESSION } from "./site";
import { campaignSummary, captureCampaign } from "./campaign";
import {
  handoffLinks,
  localDate,
  requestMessage,
  validateRequest,
  type ConsultationRequest,
} from "./consultation";

const fieldClass =
  "mt-2 min-h-12 w-full rounded-xl border border-white/25 bg-[#07101A] px-4 py-3 text-white";
const actionClass =
  "inline-flex min-h-12 items-center justify-center gap-2 rounded-xl border border-[#66B2FF]/50 bg-[#10243d] px-5 py-3 font-semibold text-[#b5d9ff]";

export default function BookingCard() {
  const [request, setRequest] = useState<ConsultationRequest>({
    name: "",
    email: "",
    focus: services[0].title,
    date: "",
    time: "",
  });
  const [timezone, setTimezone] = useState("");
  const [today, setToday] = useState("");
  const [review, setReview] = useState(false);
  const [error, setError] = useState("");
  const [status, setStatus] = useState("");
  const [campaign, setCampaign] = useState("");
  const [shareCampaign, setShareCampaign] = useState(false);
  const [copying, setCopying] = useState(false);
  const reviewHeading = useRef<HTMLHeadingElement>(null);
  const formHeading = useRef<HTMLHeadingElement>(null);
  const errorBox = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    setTimezone(Intl.DateTimeFormat().resolvedOptions().timeZone);
    setToday(localDate());
    captureCampaign();
    setCampaign(campaignSummary());
    const selected = new URLSearchParams(window.location.search).get("focus");
    const service = services.find((item) => item.name === selected);
    if (service)
      setRequest((previous) => ({ ...previous, focus: service.title }));
  }, []);
  useEffect(() => {
    if (review) reviewHeading.current?.focus();
  }, [review]);
  useEffect(() => {
    if (error) errorBox.current?.focus();
  }, [error]);

  const validate = () => {
    const problem = validateRequest(
      request,
      services.map((service) => service.title),
    );
    setError(problem);
    return !problem;
  };
  const submit = (event: FormEvent) => {
    event.preventDefault();
    setStatus("");
    if (validate()) setReview(true);
  };
  const message = review
    ? requestMessage(request, timezone, shareCampaign ? campaign : "")
    : "";
  const links = handoffLinks(message);
  const handoff = (event: MouseEvent<HTMLAnchorElement>, channel: string) => {
    if (!validate()) {
      event.preventDefault();
      return;
    }
    setStatus(
      `${channel} is opening with your draft. Nothing has been submitted by this website. Send the message in ${channel} to transmit your request. If it does not open, use the other option or copy your request.`,
    );
  };
  const copy = async () => {
    if (!validate()) return;
    setCopying(true);
    try {
      await navigator.clipboard.writeText(message);
      setStatus(
        "Request copied. Paste it into your email or WhatsApp and send it to transmit your request.",
      );
    } catch {
      setError(
        "Copy was unavailable. Select the request text below and copy it manually, or use email or WhatsApp.",
      );
    } finally {
      setCopying(false);
    }
  };
  const update = (key: keyof ConsultationRequest, value: string) => {
    setRequest((previous) => ({ ...previous, [key]: value }));
    setError("");
  };

  return (
    <section
      id="book"
      tabIndex={-1}
      className="mt-16 scroll-mt-40 rounded-3xl border border-[#66B2FF]/30 bg-[#0B111B] p-6 sm:p-10 glow-border"
      aria-labelledby="booking-title"
    >
      <div className="grid gap-10 lg:grid-cols-[0.72fr_1.28fr]">
        <div>
          <p className="text-xs uppercase tracking-[0.25em] text-[#8CC7FF]">
            One-to-one on Google Meet
          </p>
          <h2
            ref={formHeading}
            tabIndex={-1}
            id="booking-title"
            className="mt-3 text-3xl font-semibold"
          >
            Request a Consultation
          </h2>
          <p className="mt-4 leading-7 text-white/75">
            A focused conversation to understand your situation, explore the
            options and identify practical next steps.
          </p>
          <div className="mt-6 rounded-2xl border border-[#66B2FF]/30 bg-[#66B2FF]/10 p-5">
            <p>
              {SESSION.minutes} minutes · {SESSION.platform}
            </p>
            <p className="mt-2 text-3xl font-semibold">
              ₹{SESSION.fee.toLocaleString("en-IN")}{" "}
              <span className="text-sm font-normal">{SESSION.currency}</span>
            </p>
          </div>
          <p className="mt-5 text-sm leading-7 text-white/75">
            Your preferred time is a request, not a reservation. Manish will
            check availability and share payment instructions. The session and
            Meet link are confirmed separately after availability and payment
            are verified.
          </p>
          <p className="mt-3 text-sm leading-7 text-white/75">
            Ongoing coaching, project delivery and application work are scoped
            separately. Please do not send identity documents, payment details
            or sensitive health information with an initial enquiry.
          </p>
        </div>
        <div>
          {error && (
            <p
              ref={errorBox}
              tabIndex={-1}
              role="alert"
              className="mb-4 rounded-xl border border-red-300/50 bg-red-950/50 p-4 text-red-100"
            >
              {error}
            </p>
          )}
          {!review ? (
            <form
              onSubmit={submit}
              className="grid gap-4 sm:grid-cols-2"
              aria-describedby="request-privacy"
            >
              <label className="sm:col-span-2">
                Consultation focus
                <select
                  required
                  className={fieldClass}
                  value={request.focus}
                  onChange={(event) => update("focus", event.target.value)}
                >
                  {services.map((service) => (
                    <option key={service.name}>{service.title}</option>
                  ))}
                </select>
              </label>
              <label>
                Name
                <input
                  required
                  autoComplete="name"
                  minLength={2}
                  maxLength={100}
                  value={request.name}
                  onChange={(event) => update("name", event.target.value)}
                  className={fieldClass}
                  placeholder="Your name"
                />
              </label>
              <label>
                Email
                <input
                  required
                  autoComplete="email"
                  type="email"
                  maxLength={254}
                  value={request.email}
                  onChange={(event) => update("email", event.target.value)}
                  className={fieldClass}
                  placeholder="you@example.com"
                />
              </label>
              <label>
                Preferred date
                <input
                  required
                  type="date"
                  min={today || undefined}
                  value={request.date}
                  onChange={(event) => update("date", event.target.value)}
                  className={fieldClass}
                />
              </label>
              <label>
                Preferred time
                <input
                  required
                  type="time"
                  step="60"
                  value={request.time}
                  onChange={(event) => update("time", event.target.value)}
                  className={fieldClass}
                />
              </label>
              <p className="text-sm leading-6 text-white/75 sm:col-span-2">
                Timezone:{" "}
                <strong>{timezone || "Detecting your device timezone…"}</strong>
                . Times use your device’s timezone, including daylight-saving
                rules for the chosen date. Check your device settings before
                continuing. If a clock-change hour repeats, choose another time
                to avoid ambiguity.
              </p>
              <p
                id="request-privacy"
                className="text-sm leading-6 text-white/75 sm:col-span-2"
              >
                Your form details stay in this page until you choose a contact
                option. WhatsApp or your email provider receives them when you
                open that draft; you must press Send there. This website does
                not save consultation details to a database.{" "}
                <a className="underline" href="#privacy">
                  Privacy and service scope
                </a>
              </p>
              {campaign && (
                <label className="flex items-start gap-3 text-sm leading-6 sm:col-span-2">
                  <input
                    className="mt-1 h-5 w-5 shrink-0"
                    type="checkbox"
                    checked={shareCampaign}
                    onChange={(event) => setShareCampaign(event.target.checked)}
                  />
                  Include this visit’s campaign labels in my enquiry (optional).
                </label>
              )}
              <button
                disabled={!timezone}
                className="min-h-12 rounded-xl bg-[#66B2FF] px-5 py-3 font-semibold text-[#061325] disabled:opacity-50 sm:col-span-2"
              >
                Review Request — ₹5,000 INR
              </button>
              <p className="text-xs leading-6 text-white/70 sm:col-span-2">
                Reviewing does not submit a request or take payment.
              </p>
            </form>
          ) : (
            <div className="rounded-2xl border border-white/20 bg-[#07101A] p-5 sm:p-6">
              <h3
                ref={reviewHeading}
                tabIndex={-1}
                className="text-2xl font-semibold"
              >
                Review your consultation request
              </h3>
              <p className="mt-3 leading-7 text-white/75">
                Not sent yet. Check your details, then choose WhatsApp or email
                and press Send in that app.
              </p>
              <dl className="my-6 grid gap-3 text-sm">
                <div>
                  <dt className="text-white/60">Name</dt>
                  <dd className="break-words">{request.name.trim()}</dd>
                </div>
                <div>
                  <dt className="text-white/60">Email</dt>
                  <dd className="break-all">{request.email}</dd>
                </div>
                <div>
                  <dt className="text-white/60">Focus</dt>
                  <dd>{request.focus}</dd>
                </div>
                <div>
                  <dt className="text-white/60">
                    Preferred time (unconfirmed)
                  </dt>
                  <dd>
                    {request.date} at {request.time} · {timezone}
                  </dd>
                </div>
                <div>
                  <dt className="text-white/60">Session</dt>
                  <dd>40 minutes · Google Meet · ₹5,000 INR</dd>
                </div>
              </dl>
              <div className="grid gap-3">
                <a
                  className={actionClass}
                  href={links.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(event) => handoff(event, "WhatsApp")}
                >
                  <MessageCircle size={18} />
                  Open WhatsApp draft<span className="sr-only"> (new tab)</span>
                </a>
                <a
                  className={actionClass}
                  href={links.email}
                  onClick={(event) => handoff(event, "your email app")}
                >
                  <Mail size={18} />
                  Open email draft
                </a>
                <button
                  className={actionClass}
                  type="button"
                  disabled={copying}
                  onClick={copy}
                  aria-busy={copying}
                >
                  {copying ? "Copying…" : "Copy request text"}
                </button>
                <button
                  type="button"
                  className="min-h-11 underline underline-offset-4"
                  onClick={() => {
                    setReview(false);
                    setStatus("");
                    setError("");
                    requestAnimationFrame(() => formHeading.current?.focus());
                  }}
                >
                  Edit details
                </button>
              </div>
              <details className="mt-5 text-sm text-white/75">
                <summary className="cursor-pointer py-2">
                  View request text / copy manually
                </summary>
                <pre className="mt-3 whitespace-pre-wrap break-words font-sans leading-6">
                  {message}
                </pre>
              </details>
              <p className="mt-4 text-sm leading-7 text-white/75">
                After you send, wait for a personal reply about availability and
                next steps. Opening a draft is not proof of delivery. No
                appointment or payment is confirmed here.
              </p>
            </div>
          )}
          <p
            role="status"
            aria-live="polite"
            className="mt-4 text-sm leading-7 text-[#b5d9ff]"
          >
            {status}
          </p>
          <noscript>
            <p>
              Please enable JavaScript to prepare a request, or use the email
              and WhatsApp links in Contact.
            </p>
          </noscript>
        </div>
      </div>
    </section>
  );
}
