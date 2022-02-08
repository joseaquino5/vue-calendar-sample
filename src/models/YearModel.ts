import CalendarMonth from "./MonthModel";
import MONTHS from "@/constants/months";

export default class YearModel {
  constructor(public year: number) {}

  get months(): CalendarMonth[] {
    let months = [];
    for (let index: number = 0; index < MONTHS.length; index++) {
      let month = new CalendarMonth(index, this.year);
      months.push(month);
    }
    return months;
  }
}
