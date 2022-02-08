<template>
  <section>
    <div class="columns is-multiline">
      <div class="column is-half">
        <b-field
          label="Description"
          :type="{ 'is-danger': errors.has('text') }"
          :message="errors.first('text')"
        >
          <b-input
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
</template>
<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import { EDIT_REMINDER_ACTION } from "@/store/actions";
import ReminderModel from "@/models/ReminderModel";

@Component
export default class ReminderEditComponent extends Vue {
  @Prop() model!: ReminderModel;

  created() {
    this.model.date = new Date(this.model.date);
    this.model.time = new Date(this.model.time);
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
    await this.$store.dispatch(EDIT_REMINDER_ACTION, this.model);
    this.$buefy.toast.open({
      message: "Reminder edited",
      type: "is-success",
    });
    this.$validator.errors.clear();
    this.$emit("saved");
    this.$emit("close");
  }
}
</script>

<style scoped>
</style>