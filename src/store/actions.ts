import CalendarReminder from "@/models/ReminderModel";
import { WEATHER_API } from "@/config"
import {
  DELETE_REMINDER,
  DELETE_REMINDERS,
  EDIT_REMINDER,
  NEW_REMINDER,
  SET_REMINDERS,
} from "./mutations";

export const NEW_REMINDER_ACTION = "NEW_REMINDER_ACTION";
export const EDIT_REMINDER_ACTION = "EDIT_REMINDER_ACTION";
export const DELETE_REMINDER_ACTION = "DELETE_REMINDER_ACTION";
export const DELETE_REMINDERS_ACTION = "DELETE_REMINDERS_ACTION";
export const GET_CURRENT_WEATHER_ACTION = "GET_CURRENT_WEATHER_ACTION";

export default {
    [NEW_REMINDER_ACTION]({ commit }: any, reminder: CalendarReminder) {
        commit(NEW_REMINDER, reminder);
        commit(SET_REMINDERS);
    },
    [EDIT_REMINDER_ACTION]({ commit }: any, reminder: CalendarReminder) {
        commit(EDIT_REMINDER, reminder);
        commit(SET_REMINDERS);
    },
    [DELETE_REMINDER_ACTION]({ commit }: any, reminder: CalendarReminder) {
        commit(DELETE_REMINDER, reminder);
        commit(SET_REMINDERS);
    },
    [DELETE_REMINDERS_ACTION]({ commit }: any, reminder: CalendarReminder) {
        commit(DELETE_REMINDERS, reminder);
        commit(SET_REMINDERS);
    },
    [GET_CURRENT_WEATHER_ACTION]({ commit }: any, city: string) {
        const payload: Record<string, string> = {
            'q': city,
            'appid': WEATHER_API.APPID,
            'cnt': '1',
            'units': 'metric'
        }
        return fetch(`${WEATHER_API.BASE_URL}weather?${new URLSearchParams(payload).toString()}`);
    },
}