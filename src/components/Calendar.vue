<template>
  <section>
    <nav class="level">
      <div class="level-right">
        <p class="level-item">
          <b-field label="Year">
            <b-select v-model="model.year" placeholder="Select a ayer">
              <option
                v-for="(item, key) in optionsYears"
                :value="item"
                :key="key"
              >
                {{ item }}
              </option>
            </b-select>
          </b-field>
        </p>
      </div>
      <div class="level-item">
        <div class="has-text-centered">
          <p class="title is-1">
            {{ title }}
          </p>
          <a @click="setToday" class="subtitle has-text-info">Today</a>
        </div>
      </div>
    </nav>
    <hr />
    <div class="card">
      <div class="columns seven-cols navbar is-info is-gapless mb-0" style="border-bottom: 1px solid #ffffff">
        <div class="column is-4 has-text-left">
          <div class="mt-3">
            <a @click="moveMonth(-1)" class="has-text-white has-text-weight-bold pl-5"><span class="mdi mdi-skip-previous"></span> Previous</a>
          </div>
        </div>
        <div class="column is-4">
          <p class="mt-3 has-text-white has-text-weight-bold pb-2">
            <b-select v-model="model.month" placeholder="Select a month">
              <option
                v-for="(monthNumber, key) in optionsMonths"
                :value="monthNumber"
                :key="key"
              >
                {{ months[monthNumber] }}
              </option>
            </b-select>
          </p>
        </div>
        <div class="column is-4 has-text-right pr-5">
          <div class="mt-3">
            <a @click="moveMonth(1)" class="has-text-white has-text-weight-bold pr-5">Next <span class="mdi mdi-skip-next"></span></a>
          </div>
        </div>
      </div>
      <div class="columns seven-cols navbar is-info is-gapless mb-0">
        <div class="column is-1" :key="key" v-for="(day, key) in weekDays">
          <p class="mt-3 has-text-white has-text-weight-bold">{{ day }}</p>
        </div>
      </div>
      <div>
        <div class="columns is-multiline seven-cols is-gapless">
          <div
            :key="key"
            v-for="(date, key) in calendarDates"
            class="column is-1"
            style="border: 1px solid #3298dc"
          >
            <DateComponent :date.sync="calendarDates[key]" @select="onSelectDate" @edit="onSelectReminderToEdit" @showWeather="onSelectReminderToShowWeather"/>
          </div>
        </div>
        <b-modal
          v-model="isModalActive"
          has-modal-card
          trap-focus
          :destroy-on-hide="true"
          aria-role="dialog"
          aria-label="Reminder Modal"
          aria-modal
          @close="onCloseReminderModal"
        >
          <template>
            <ShowReminderComponent v-if="isEditingReminder" :value="reminderModel" @close="onCloseReminderModal"/>
            <AddReminderComponent v-else :date="model" @close="onCloseReminderModal"/>
          </template>
        </b-modal>
      </div>
    </div>
  </section>
</template>
<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import Helpers from "@/core/helpers";
import days from "@/constants/days"
import months from "@/constants/months"
import YearModel from "@/models/YearModel";
import MonthModel from "@/models/MonthModel";
import DateModel from "@/models/DateModel";
import ReminderModel from "@/models/ReminderModel";
import DateComponent from "./Date.vue";
import AddReminderComponent from "./AddReminder.vue";
import ShowReminderComponent from "./ShowReminder.vue";

@Component({
  components: {
    DateComponent,
    AddReminderComponent,
    ShowReminderComponent,
  }
})
export default class CalendarComponent extends Vue {
  @Prop() title!: string;

  optionsYears = Helpers.getOptionsYears();
  optionsMonths = Helpers.getOptionsMonths();
  weekDays = days;
  months = months;
  isModalActive = false;
  model = new DateModel(new Date());
  reminderModel: ReminderModel | null = null;

  setToday() {
    this.model = new DateModel(new Date());
  }

  moveMonth(value: number) {
    const month = value > 0 ? 0 : 11;
    if (this.model.month == 11 && value > 0) {
      this.model.month = month;
      this.model.year++;
    } else if (this.model.month == 0 && value < 0){
      this.model.month = month;
      this.model.year--;
    } else {
      this.model.month = this.model.month + value;
    }
  }

  get calendarYear() {
    return new YearModel(this.model.year);
  }

  get calendarMonth() {
    return new MonthModel(this.model.month, this.model.year);
  }

  get previousDates() {
    let dates = [];
    let firstDay = this.calendarMonth.days[0];
    for (let index = firstDay.weekDay; index > 0; index--) {
      let previousDate = new Date(firstDay.date);
      previousDate.setDate(firstDay.date.getDate() - index);
      let date = new DateModel(previousDate);
      date.isOutOfMonth = true;
      dates.push(date);
    }
    return dates;
  }

  get nextDates() {
    let dates = [];
    let lastDay = this.calendarMonth.days[this.calendarMonth.days.length - 1];
    let startDays = 7 - (lastDay.weekDay + 1);
    for (let i = 1; i <= startDays; i++) {
      var lastDate = new Date(lastDay.date);
      lastDate.setDate(lastDate.getDate() + i);
      let date = new DateModel(lastDate);
      date.isOutOfMonth = true;
      dates.push(date);
    }
    return dates;
  }

  get isEditingReminder(){
    return !!this.reminderModel;
  }

  get calendarDates() {
    let currentDates = this.calendarMonth.days.map(
      (x) => new DateModel(x.date)
    );
    return this.previousDates.concat(currentDates).concat(this.nextDates);
  }

  onSelectDate(item: DateModel) {
    this.model = item;
    this.isModalActive = true;
  }

  onCloseReminderModal(){
    this.model = new DateModel(new Date());
    this.reminderModel = null;
    this.isModalActive = false;
  }

  onSelectReminderToEdit(value: ReminderModel) {
    this.reminderModel = value;
    this.isModalActive = true;
    this.reminderModel.editing = true;
  }

  onSelectReminderToShowWeather(value: ReminderModel) {
    this.reminderModel = value;
    this.isModalActive = true;
    this.reminderModel.editing = false;
  }
}
</script>

<style scoped>
@media (min-width: 768px) {
  .seven-cols .is-1 {
    width: 100%;
    *width: 100%;
  }
}

@media (min-width: 992px) {
  .seven-cols .is-1 {
    width: 14.285714285714285714285714285714%;
    *width: 14.285714285714285714285714285714%;
  }
}
</style>