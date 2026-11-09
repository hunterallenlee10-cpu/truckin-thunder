import { describe, expect, it } from "vitest";
import { easternClock, getShopStatus } from "./hours";

// Helper: build a Date from an Eastern wall-clock time.
// November 2026: EST (UTC-5). July 2026: EDT (UTC-4).
const est = (iso: string) => new Date(`${iso}-05:00`);
const edt = (iso: string) => new Date(`${iso}-04:00`);

describe("easternClock", () => {
  it("reads weekday and minutes in America/New_York", () => {
    // Monday 2026-11-09 10:30 EST
    expect(easternClock(est("2026-11-09T10:30:00"))).toEqual({ day: 1, minutes: 630 });
  });

  it("handles daylight saving time", () => {
    // Wednesday 2026-07-15 08:00 EDT
    expect(easternClock(edt("2026-07-15T08:00:00"))).toEqual({ day: 3, minutes: 480 });
  });

  it("is independent of the visitor's timezone (UTC instant)", () => {
    // 2026-11-10T03:00Z is Monday 22:00 in New York
    expect(easternClock(new Date("2026-11-10T03:00:00Z"))).toEqual({ day: 1, minutes: 1320 });
  });
});

describe("getShopStatus", () => {
  it("is open on a weekday morning", () => {
    const s = getShopStatus(est("2026-11-09T09:15:00"));
    expect(s.isOpen).toBe(true);
    expect(s.label).toBe("Open now · Until 5 PM");
  });

  it("opens exactly at 8:00", () => {
    expect(getShopStatus(est("2026-11-10T08:00:00")).isOpen).toBe(true);
    expect(getShopStatus(est("2026-11-10T07:59:00")).isOpen).toBe(false);
  });

  it("closes exactly at 5:00 PM", () => {
    expect(getShopStatus(est("2026-11-10T16:59:00")).isOpen).toBe(true);
    expect(getShopStatus(est("2026-11-10T17:00:00")).isOpen).toBe(false);
  });

  it("flags the last hour as closing soon", () => {
    expect(getShopStatus(est("2026-11-11T16:15:00")).badge).toBe("Closes soon");
  });

  it("says opens today before 8 AM on a weekday", () => {
    expect(getShopStatus(est("2026-11-12T06:30:00")).label).toBe("Closed now · Opens today 8 AM");
  });

  it("says opens tomorrow after hours Monday to Thursday", () => {
    expect(getShopStatus(est("2026-11-12T19:00:00")).detail).toBe("Opens tomorrow 8 AM");
  });

  it("says opens Monday after hours on Friday", () => {
    expect(getShopStatus(est("2026-11-13T17:30:00")).label).toBe("Closed now · Opens Monday 8 AM");
  });

  it("is closed all weekend", () => {
    const sat = getShopStatus(est("2026-11-14T11:00:00"));
    const sun = getShopStatus(est("2026-11-15T23:30:00"));
    expect(sat.isOpen).toBe(false);
    expect(sat.detail).toBe("Opens Monday 8 AM");
    expect(sun.isOpen).toBe(false);
    expect(sun.detail).toBe("Opens Monday 8 AM");
  });

  it("uses Eastern time even when the visitor is on the West Coast", () => {
    // 6:00 AM Pacific on Monday is 9:00 AM Eastern: open.
    expect(getShopStatus(new Date("2026-11-09T14:00:00Z")).isOpen).toBe(true);
  });
});
