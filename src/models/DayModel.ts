import days from "@/constants/days";

export default class DayModel {
  constructor(public date: Date) {}
  public get day() {
    return this.date.getDate();
  }
  public get month() {
    return this.date.getMonth();
  }
  public get year() {
    return this.date.getFullYear();
  }
  public get weekDay() {
    return this.date.getDay();
  }
  public get weekDayName() {
    return days[this.weekDay];
  }
}
