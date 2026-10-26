// Session-only attribution, no cookies, analytics requests or visitor identifiers.
const KEY = "manish-campaign";
const FIELDS = [
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_content",
  "utm_term",
] as const;
export function captureCampaign() {
  try {
    const params = new URLSearchParams(window.location.search);
    const campaign: Record<string, string> = {};
    for (const key of FIELDS) {
      const value = params.get(key);
      // Campaign labels only; reject free text, emails, URLs and long values.
      if (value && /^[a-zA-Z0-9_-]{1,80}$/.test(value)) campaign[key] = value;
    }
    if (Object.keys(campaign).length)
      sessionStorage.setItem(KEY, JSON.stringify(campaign));
  } catch {
    /* Storage restrictions do not affect enquiries. */
  }
}
export function campaignSummary() {
  try {
    const saved = JSON.parse(sessionStorage.getItem(KEY) || "{}");
    return FIELDS.filter(
      (key) =>
        typeof saved[key] === "string" &&
        /^[a-zA-Z0-9_-]{1,80}$/.test(saved[key]),
    )
      .map((key) => `${key}: ${saved[key]}`)
      .join(", ");
  } catch {
    return "";
  }
}
