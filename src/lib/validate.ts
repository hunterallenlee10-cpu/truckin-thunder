/** Friendly, front-end form validation shared by every form on the site. */

export const digitsOnly = (v: string) => v.replace(/\D/g, "");

export function validateName(v: string) {
  return v.trim().length >= 2 ? null : "Please tell us your name.";
}

export function validatePhone(v: string) {
  const d = digitsOnly(v);
  const ten = d.length === 11 && d.startsWith("1") ? d.slice(1) : d;
  if (!v.trim()) return "We need a phone number so the shop can call you.";
  return ten.length === 10 ? null : "That phone number looks short. Use 10 digits, like (804) 555-0123.";
}

export function validateEmail(v: string) {
  if (!v.trim()) return "Please add your email for a copy of your build sheet.";
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.trim()) ? null : "That email doesn't look right. Check for a typo.";
}

export function validateYear(v: string) {
  if (!v.trim()) return null;
  const n = Number(v);
  const max = new Date().getFullYear() + 2;
  return Number.isInteger(n) && n >= 1950 && n <= max ? null : `Use a 4-digit year between 1950 and ${max}.`;
}

/** Formats as (804) 555-0123 while typing. */
export function formatPhone(v: string) {
  const d = digitsOnly(v).slice(0, 10);
  if (d.length < 4) return d;
  if (d.length < 7) return `(${d.slice(0, 3)}) ${d.slice(3)}`;
  return `(${d.slice(0, 3)}) ${d.slice(3, 6)}-${d.slice(6)}`;
}
