import CalendarReminder from "@/models/ReminderModel";
import StoreState from "./storeState";

export const NEW_REMINDER = "NEW_REMINDER";
export const EDIT_REMINDER = "EDIT_REMINDER";
export const DELETE_REMINDER = "DELETE_REMINDER";
export const DELETE_REMINDERS = "DELETE_REMINDERS";
export const SET_REMINDERS = "SET_REMINDERS";

export default {
    [SET_REMINDERS](state: StoreState) {
        const reminders = JSON.stringify(state.reminders);
        localStorage.setItem("reminders", reminders);
    },
    [NEW_REMINDER](state: StoreState, reminder: CalendarReminder) {
        state.reminders.push(reminder);
    },
    [EDIT_REMINDER](state: StoreState, reminder: CalendarReminder) {
        const index = state.reminders.findIndex((x) => x.id === reminder.id);
        state.reminders[index] = reminder;
    },
    [DELETE_REMINDER](state: StoreState, reminder: CalendarReminder) {
        const index = state.reminders.findIndex((x) => x.id === reminder.id);
        state.reminders.splice(index, 1);
    },
    [DELETE_REMINDERS](state: StoreState, reminders: CalendarReminder[]) {
        reminders.forEach((x) => {
            const index = state.reminders.findIndex((y) => y.id === x.id);
            state.reminders.splice(index, 1);
        });
     },
}



