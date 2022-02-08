import Vue from "vue";
import moment from "moment";

Vue.filter("formatDate", (value: Date) => moment(value).format("L"));
Vue.filter("ellipsisText", (value: string, count: number = 20) => {
  if (!value) return "";
  return value.length > count ? value.substring(0, count) + "..." : value;
});
