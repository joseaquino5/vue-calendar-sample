import Vue from "vue";
import Vuex from "vuex";
import CalendarReminder from "@/models/ReminderModel";
import actions from "./actions";
import mutations from "./mutations";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    reminders: (localStorage.getItem("reminders")
      ? JSON.parse(localStorage.getItem("reminders") as string)
      : []) as CalendarReminder[],
  },
  mutations,
  actions,
});
