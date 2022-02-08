<template>
  <div class="tags mb-0 has-addons">
    <a
      role="button"
      tabindex="0"
      class="tag has-text-white h40 b-right"
      :style="getBackground"
      @click="showWeather(reminder)"
    >
      <span class="mdi mdi-weather-cloudy is-size-4"></span>
    </a>
    <b-tooltip v-if="reminder.text.length >= ELLIPSIS_TEXT_LENGTH" multilined :delay="1000">
      <template v-slot:content :style="getBackground">
        <p class="has-text-breaked">
          {{ reminder.text }}
        </p>
      </template>
      <span
        @click="editReminder(reminder)"
        class="tag has-cursor-pointer has-text-white has-text-weight-bold reminder-tooltip h40"
         :style="getBackground"
      >
        {{ reminder.text | ellipsisText(ELLIPSIS_TEXT_LENGTH) }}  <br/> {{ getTime }}
      </span>
    </b-tooltip>
    <span
      v-else
      @click="editReminder(reminder)"
      class="tag has-cursor-pointer has-text-white has-text-weight-bold h40"
      :style="getBackground"
    >
      {{ reminder.text }} <br/> {{ getTime }}
    </span>
    <a
      role="button"
      aria-label="Close tag"
      tabindex="0"
      class="tag has-text-white h40 b-left"
      :style="getBackground"
      @click="removeReminder(reminder)"
    >
      <span class="mdi mdi-close is-size-4"></span>
    </a>
  </div>
</template>
<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import ReminderModel from "@/models/ReminderModel";
import { DELETE_REMINDER_ACTION } from "@/store/actions";

const ELLIPSIS_TEXT_LENGTH = 12

@Component
export default class ReminderItemComponent extends Vue {
  @Prop() reminder!: ReminderModel;
  ELLIPSIS_TEXT_LENGTH = ELLIPSIS_TEXT_LENGTH;

  get getBackground() {
    return { 'background-color': this.reminder.color }
  }

  get getTime() {
    return new Date(this.reminder.time).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
  }

  editReminder(reminder: ReminderModel) {
    this.$emit("edit", reminder);
  }
  showWeather(reminder: ReminderModel) {
    this.$emit("showWeather", reminder);
  }
  async removeReminder(reminder: ReminderModel) {
    await this.$store.dispatch(DELETE_REMINDER_ACTION, reminder);
    this.$buefy.toast.open({
      message: "Reminder deleted",
      type: "is-success",
    });
  }
}
</script>

<style scoped>
.h40 {
min-height: 40px
}
.b-left {
  border-left: 1px solid white;
}
.b-right {
  border-right: 1px solid white;
}
.reminder-tooltip {
  border-radius: 0px !important;
  margin-bottom: 10px !important;
}
</style>