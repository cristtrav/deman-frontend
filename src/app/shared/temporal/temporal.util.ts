import { Temporal } from "@js-temporal/polyfill";

export class TemporalUtil {
  static toTemporalDate(date: Date): Temporal.PlainDate {
    return Temporal.PlainDate.from({ year: date.getFullYear(), month: date.getMonth() + 1, day: date.getDate() });
  }

  static toTemporalDateTime(date: Date): Temporal.PlainDateTime {
    return Temporal.PlainDateTime.from({
      year: date.getFullYear(),
      month: date.getMonth() + 1,
      day: date.getDate(),
      hour: date.getHours(),
      minute: date.getMinutes(),
      second: date.getSeconds(),
      millisecond: date.getMilliseconds()
    });
  }
}