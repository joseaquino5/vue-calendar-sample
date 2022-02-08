import months from "@/constants/months";

export default class Helpers {
  static getOptionsYears() {
    const year = new Date().getFullYear();
    const min = year - 80;
    const max = year + 80;

    let result: number[] = [];
    let count = min;
    while (count < max) {
      result.push(count);
      count++;
    }
    return result;
  }

  static getOptionsMonths() {
    let result: number[] = [];
    let count = 0;
    while (count < months.length) {
      result.push(count);
      count++;
    }
    return result;
  }
}
