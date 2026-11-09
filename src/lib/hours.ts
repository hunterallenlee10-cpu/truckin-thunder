/**
 * Live open / closed status for the shops.
 *
 * All four locations keep the same hours: Monday to Friday, 8 AM to 5 PM,
 * Eastern time. Everything is computed in America/New_York so a visitor in
 * another timezone still sees the shop's real status.
 * Holidays are not modeled. [CONFIRM HOLIDAY HOURS WITH OWNER]
 */

export const TIME_ZONE = "America/New_York";
export const OPEN_MINUTE = 8 * 60; // 8:00 AM
export const CLOSE_MINUTE = 17 * 60; // 5:00 PM
const CLOSING_SOON_WINDOW = 60; // minutes

export type ShopStatus = {
  isOpen: boolean;
  /** Short badge text: "Open now", "Closes soon", "Closed now". */
  badge: "Open now" | "Closes soon" | "Closed now";
  /** Supporting text: "Until 5 PM", "Opens Monday 8 AM". */
  detail: string;
  /** Combined: "Open now · Until 5 PM". */
  label: string;
};

const WEEKDAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"] as const;

/** Day of week (0 = Sunday) and minutes since midnight in Eastern time. */
export function easternClock(now: Date): { day: number; minutes: number } {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: TIME_ZONE,
    weekday: "short",
    hour: "numeric",
    minute: "numeric",
    hourCycle: "h23",
  }).formatToParts(now);

  const get = (type: string) => parts.find((p) => p.type === type)?.value ?? "";
  const day = WEEKDAYS.indexOf(get("weekday") as (typeof WEEKDAYS)[number]);
  const hour = Number(get("hour")) % 24;
  const minute = Number(get("minute"));
  return { day, minutes: hour * 60 + minute };
}

const isWorkday = (day: number) => day >= 1 && day <= 5;

export function getShopStatus(now: Date = new Date()): ShopStatus {
  const { day, minutes } = easternClock(now);

  if (isWorkday(day) && minutes >= OPEN_MINUTE && minutes < CLOSE_MINUTE) {
    const soon = CLOSE_MINUTE - minutes <= CLOSING_SOON_WINDOW;
    const badge = soon ? "Closes soon" : "Open now";
    const detail = "Until 5 PM";
    return { isOpen: true, badge, detail, label: `${badge} · ${detail}` };
  }

  let detail: string;
  if (isWorkday(day) && minutes < OPEN_MINUTE) {
    detail = "Opens today 8 AM";
  } else if (day >= 1 && day <= 4) {
    detail = "Opens tomorrow 8 AM";
  } else {
    // Friday evening, Saturday or Sunday.
    detail = "Opens Monday 8 AM";
  }
  return { isOpen: false, badge: "Closed now", detail, label: `Closed now · ${detail}` };
}
