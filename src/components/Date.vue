<template>
  <section>
    <div class="card-content">
      <b-button
        @click="selectDate"
        rounded
        outlined
        :class="{ 'has-text-grey-lighter': date.isOutOfMonth }"
        :type="{
          'is-info': date.isToday,
          'is-ghost': !date.isToday,
        }"
        :style="{ color: date.isWeekend ? 'red' : '' }"
      >
        {{ date.day }}
      </b-button>
      <div class="mt-1">
        <div v-for="(reminder, key) in myReminders" :key="key">
          <ReminderItemComponent
            :reminder="reminder"
            @showWeather="(value) => $emit('showWeather', value)"
            @edit="(value) => $emit('edit', value)"
          />
        </div>

        <a
          v-show="myReminders.length > 1"
          class="is-size-7 has-text-danger"
          @click="confirmRemoveAllReminders"
          >Delete all</a
        >
      </div>
    </div>
  </section>
</template>
<script lang="ts">
import { mapState } from "vuex";
import { Component, Vue, Prop } from "vue-property-decorator";
import moment from "moment";
import CalendarDate from "@/models/DateModel";
import CalendarReminder from "@/models/ReminderModel";
import { DELETE_REMINDERS_ACTION } from "@/store/actions";
import ReminderItemComponent from "./ReminderItem.vue";

@Component({
  components: { ReminderItemComponent },
  computed: mapState(["reminders"]),
})
export default class DateComponet extends Vue {
  @Prop() date!: CalendarDate;
  reminders!: CalendarReminder[];

  get myReminders() {
    let reminders = this.reminders.filter(
      (x) =>
        new Date(x.date).toLocaleString() === this.date.date.toLocaleString()
    );
    var ordered = reminders.sort((x, y) => {
      return new Date(x.time).getTime() - new Date(y.time).getTime();
    });
    return ordered;
  }

  async removeAllReminders() {
    await this.$store.dispatch(DELETE_REMINDERS_ACTION, this.myReminders);
    this.$buefy.toast.open({
      message: "Reminders removed",
      type: "is-success",
    });
  }

  selectDate() {
    this.$emit("select", this.date);
  }

  confirmRemoveAllReminders() {
    this.$buefy.dialog.confirm({
      title: `Deleting reminders for ${moment(this.date.date).format("L")}`,
      message: `Are you sure you want to delete this <b>${this.myReminders.length}</b> reminders?`,
      confirmText: "Delete reminders",
      type: "is-danger",
      hasIcon: true,
      onConfirm: () => this.removeAllReminders(),
    });
  }
}
</script>

<style scoped>

[data-badge]::after {
  z-index: 30;
}
</style>