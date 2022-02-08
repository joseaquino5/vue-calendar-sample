<template>
  <section>
    <div class="card">
      <header class="modal-card-head">
        <p class="modal-card-title">{{ getTitle }} details for {{ model.date | formatDate }}</p>
        <button type="button" class="delete" @click="$emit('close')" />
      </header>
      <section class="modal-card-body">
        <EditReminderComponent
            v-if="model.editing"
            :model="model"
            ref="edit"
            @saved="$emit('saved')"
            @close="$emit('close')"
          />
        <ReminderWeatherComponent 
            v-else 
            :model="weather" 
            :reminder="model" 
            :loading="loading" 
          />
      </section>
      <footer class="modal-card-foot">
        <b-button label="Close" @click="$emit('close')" />
        <b-button
          v-show="model.editing"
          label="Save"
          type="is-info"
          @click="valid"
        />
      </footer>
    </div>
  </section>
</template>
<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import {
  GET_CURRENT_WEATHER_ACTION,
} from "@/store/actions";
import { IWeather } from "@/core/definitions/weather";
import ReminderModel from "@/models/ReminderModel";
import EditReminderComponent from "./EditReminder.vue";
import ReminderWeatherComponent from "./ReminderWeather.vue";

@Component({
  components: {
    EditReminderComponent,
    ReminderWeatherComponent,
  },
})
export default class ReminderInfoComponent extends Vue {
  @Prop() value!: ReminderModel;
  model = JSON.parse(JSON.stringify(this.value)) as ReminderModel;
  activeTab = 0;
  loading = false;
  weather: IWeather | null = null;

  created() {
    this.getWeatherInfo();
  }
  
  valid() {
    const editComponent = this.$refs["edit"] as EditReminderComponent;
    editComponent.valid();
  }

    async getWeatherInfo() {
    if (!this.value.city) {
      this.$buefy.toast.open({
        message: "Invalid city name",
        type: "is-danger",
      });
    }
    try {
      this.loading = true;
      const response = await this.$store.dispatch(
        GET_CURRENT_WEATHER_ACTION,
        this.value.city
      );
      this.weather = (await response.json()) as IWeather;
    } catch (error) {
      this.weather = null;
    } finally {
      this.loading = false;
    }
  }

  get getTitle() {
    return this.model.editing ? 'Reminder' : 'Weather'
  }

  get city() {
    return this.value.city;
  }
}
</script>

<style scoped>
</style>