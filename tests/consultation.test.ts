import { test } from "node:test";
import assert from "node:assert/strict";
import {
  handoffLinks,
  preferredInstant,
  requestMessage,
  validateRequest,
} from "../src/consultation.ts";

const focus = "Career and education";
const valid = {
  name: "Test Visitor",
  email: "visitor@example.com",
  focus,
  date: "2030-06-15",
  time: "14:30",
};
const now = new Date("2029-01-01T00:00:00Z");

test("valid future request and allowed focus", () => {
  assert.equal(validateRequest(valid, [focus], now), "");
  assert.match(
    validateRequest({ ...valid, focus: "unrecognized" }, [focus], now),
    /choose one/,
  );
});
test("rejects past times, impossible dates and malformed fields", () => {
  assert.match(
    validateRequest({ ...valid, date: "2020-01-01" }, [focus], now),
    /future/,
  );
  assert.equal(preferredInstant({ ...valid, date: "2030-02-30" }), null);
  assert.equal(preferredInstant({ ...valid, time: "25:00" }), null);
  assert.match(validateRequest({ ...valid, name: "  " }, [focus], now), /name/);
  assert.match(
    validateRequest({ ...valid, email: "not-an-email" }, [focus], now),
    /email/,
  );
  assert.match(
    validateRequest({ ...valid, name: "Header\nInjection" }, [focus], now),
    /name/,
  );
});
test("request includes explicit timezone, UTC instant, offer, and unconfirmed status", () => {
  const previous = process.env.TZ;
  process.env.TZ = "Asia/Kolkata";
  try {
    const message = requestMessage(valid, "Asia/Kolkata");
    assert.match(message, /UTC\+05:30/);
    assert.match(message, /2030-06-15T09:00:00.000Z/);
    assert.match(message, /40 minutes/);
    assert.match(message, /₹5,000 INR/);
    assert.match(message, /availability not confirmed/);
    assert.match(message, /No appointment or payment has been confirmed/);
  } finally {
    if (previous) process.env.TZ = previous;
    else delete process.env.TZ;
  }
});
test("DST date uses date-specific offset and rejects skipped local hour", () => {
  const previous = process.env.TZ;
  process.env.TZ = "America/New_York";
  try {
    assert.equal(
      preferredInstant({ ...valid, date: "2030-03-10", time: "02:30" }),
      null,
    );
    assert.match(
      requestMessage({ ...valid, date: "2030-01-15" }, "America/New_York"),
      /UTC-05:00/,
    );
    assert.match(requestMessage(valid, "America/New_York"), /UTC-04:00/);
  } finally {
    if (previous) process.env.TZ = previous;
    else delete process.env.TZ;
  }
});
test("contact drafts encode user input without adding extra recipients", () => {
  const message = requestMessage(
    { ...valid, name: "Visitor & Friend ? #1" },
    "UTC",
  );
  const links = handoffLinks(message);
  const whatsapp = new URL(links.whatsapp);
  assert.equal(whatsapp.searchParams.get("text"), message);
  assert.equal(whatsapp.searchParams.size, 1);
  assert.ok(links.email.startsWith("mailto:manishsirgg@gmail.com?subject="));
  assert.equal(
    new URLSearchParams(links.email.split("?")[1]).get("body"),
    message,
  );
});
