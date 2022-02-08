export default class ReminderModel {
  public time: string | Date;
  public editing!: boolean;

  constructor(
    public date: Date,
    public text?: string,
    public city?: string,
    public color: string = "#000000"
  ) {
    this.time = date;
  }
  public id?: string;

  public setId() {
    this.id = Date.now().toString();
  }
}
