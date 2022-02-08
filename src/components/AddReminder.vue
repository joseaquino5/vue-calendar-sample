<template>
  <section>
    <div class="card">
      <header class="modal-card-head">
        <p class="modal-card-title">Add Reminder for {{ model.date | formatDate }}</p>
        <button type="button" class="delete" @click="$emit('close')" />
      </header>
      <section class="modal-card-body">
        <div class="columns is-multiline">
          <div class="column is-half">
            <b-field
              label="Description"
              :type="{ 'is-danger': errors.has('text') }"
              :message="errors.first('text')"
            >
              <b-input
              id="input-text"
                v-model="model.text"
                name="text"
                data-vv-as="text"
                v-validate="'required|max:30'"
                placeholder="Required"
              />
            </b-field>
          </div>
          <div class="column is-half">
            <b-field
              label="Time"
              :type="{ 'is-danger': errors.has('time') }"
              :message="errors.first('time')"
            >
              <b-timepicker
               id="input-time"
                icon="clock"
                name="time"
                v-model="model.time"
                v-validate="'required'"
                placeholder="Required"
                hour-format="24"
                locale="en-US"
              >
              </b-timepicker>
            </b-field>
          </div>
          <div class="column is-half">
            <b-field
              label="City"
              :type="{ 'is-danger': errors.has('city') }"
              :message="errors.first('city')"
            >
              <b-input
              id="input-city"
                v-model="model.city"
                name="city"
                data-vv-as="city"
                v-validate="'required'"
                placeholder="Required"
              />
            </b-field>
          </div>
          <div class="column is-half">
            <b-field
              label="Color"
              :type="{ 'is-danger': errors.has('color') }"
              :message="errors.first('color')"
            >
              <b-input
              id="input-color"
                type="color"
                v-model="model.color"
                name="color"
                data-vv-as="color"
                v-validate="'required'"
                placeholder="Required"
              />
            </b-field>
          </div>
        </div>
      </section>
      <footer class="modal-card-foot">
        <b-button label="Close" @click="$emit('close')" />
        <b-button class="button-save" label="Save" type="is-info" @click="valid" />
      </footer>
    </div>
  </section>
</template>
<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import { NEW_REMINDER_ACTION } from "@/store/actions";
import DateModel from "@/models/DateModel";
import CalendarReminder from "@/models/ReminderModel";

@Component
export default class AddReminderComponent extends Vue {
  @Prop() date!: DateModel;
  model = new CalendarReminder(this.date.date);

  created() {
    this.model.time = this.model.date;
  }

  async valid() {
    const isModelValid = await this.$validator.validateAll();
    if (!isModelValid) {
      const errors = this.$validator.errors.items;
      errors.forEach((e) =>
        this.$buefy.toast.open({
          message: e.msg,
          duration: 3000,
          queue: false,
          type: "is-danger",
          position: "is-top-right",
        })
      );
      return;
    }
    this.save();
  }

  async save() {
    try {
      this.model.setId();
      await this.$store.dispatch(NEW_REMINDER_ACTION, this.model);
      this.$buefy.toast.open({
        message: "Reminder saved",
        type: "is-success",
      });
      this.$validator.errors.clear();
      this.$emit("saved", true);
      this.$emit("close");
    } catch (error) {
      this.$emit("error", error);
    }
  }
}
</script>

<style scoped>
</style>