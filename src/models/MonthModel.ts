import months from "@/constants/months";
import DayModel from "./DayModel";

export default class MonthModel {
  constructor(public monthNumbe: number, public year: number) {}

  get name() {
    return months[this.monthNumbe];
  }
  get days(): DayModel[] {
    let days = [];
    let current = new Date(this.year, this.monthNumbe, 1);
    while (current.getMonth() === this.monthNumbe) {
      let date = new Date(current.getFullYear(), current.getMonth(), current.getDate(), 0, 0, 0
      );
      let day = new DayModel(date);
      days.push(day);
      current.setDate(current.getDate() + 1);
    }
    return days;
  }
}
