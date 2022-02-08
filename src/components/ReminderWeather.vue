<template>
  <section class="columns">
    <div class="column is-12">
      <div class="notification" :style="getBackground">
        <div v-if="!loading && isValid">
          <div class="">
            <p class="title">
              {{ location }}
            </p>
            <p class="subtitle">
              {{ model.weather[0].description }}
            </p>
            <div class="columns margin-o-auto">
              <figure class="image weather-image column">
                <img v-if="isThunderstorm" src="../assets/icons/weather/thunderstorm.svg" :alt="model.weather[0].description" />
                <img v-else-if="isDrizzle || isRain" src="../assets/icons/weather/rain.svg" :alt="model.weather[0].description" />
                <img v-else-if="isSnow" src="../assets/icons/weather/snow.svg" :alt="model.weather[0].description" />
                <img v-else src="../assets/icons/weather/cloud.svg" :alt="model.weather[0].description" />
              </figure>
              <div class="temperature column mt-5">
                <div class="temperature-value">
                  {{ scaleSymbol === "C" ? value : fValue }}
                </div>
                <div class="temperature-right">
                  <div class="temperature-scale">
                    <a href="#" @click.prevent="toggleTemperature"
                      >&deg;{{ scaleSymbol }}</a
                    >
                  </div>
                  <div class="temperature-high">
                    <img
                      src="../assets/icons/high.svg"
                      alt="high temperature"
                    /><span>{{ scaleSymbol === "C" ? high : fHigh }}</span
                    >&deg;
                  </div>
                  <div class="mperature-low">
                    <img
                      src="../assets/icons/low.svg"
                      alt="low temperature"
                    /><span>{{ scaleSymbol === "C" ? low : fLow }}</span
                    >&deg;
                  </div>
                </div>
              </div>
            </div>
          </div>
          <nav class="level mb-0 mt-5">
            <div class="level-item has-text-centered">
              <figure class="image is-32x32">
                <img src="../assets/icons/cloud.svg" alt="cloudiness" />
              </figure>
              <span class="cloudiness__value">{{ model.clouds.all }}</span
              >&percnt;
            </div>
            <div class="level-item has-text-centered">
              <figure class="image is-32x32">
                <img src="../assets/icons/wind.svg" alt="wind speed" />
              </figure>
              <span class="wind__value">{{ model.wind.speed }}</span
              >m/s
            </div>
            <div class="level-item has-text-centered">
              <figure class="image is-32x32">
                <img src="../assets/icons/humidity.svg" alt="humidity" />
              </figure>
              <span class="humidity__value">{{ model.main.humidity }}</span
              >&percnt;
            </div>
          </nav>
        </div>
        <div v-else-if="!loading && !isValid">
          <p class="title">Weather data could not be loaded</p>
        </div>
        <div v-else-if="loading">
          <p class="title">Loading...</p>
        </div>
      </div>
    </div>
  </section>
</template>
<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import { IWeather } from "@/core/definitions/weather";
import ReminderModel from "@/models/ReminderModel";

@Component
export default class ReminderWeatherComponent extends Vue {
  @Prop() model!: IWeather;
  @Prop() reminder!: ReminderModel;
  @Prop() loading!: boolean;
  scale = "Celcius";

  get scaleSymbol() {
    return this.scale.charAt(0);
  }
  get isValid(){
    return !this.loading && this.model && this.model.base;
  }
  get value() {
    return Math.round(this.model.main.temp);
  }
  get high() {
    return Math.round(this.model.main.temp_max);
  }
  get low() {
    return Math.round(this.model.main.temp_min);
  }
  get fValue() {
    return this.toFahrenheit(this.value);
  }
  get fHigh() {
    return this.toFahrenheit(this.high);
  }
  get fLow() {
    return this.toFahrenheit(this.low);
  }
  get getBackground() {
    return { 'background-color': this.reminder.color }
  }
  toggleTemperature() {
    this.scale === "Celcius"
      ? (this.scale = "Fahrenheit")
      : (this.scale = "Celcius");
  }
  toFahrenheit(value: number) {
    return Math.floor(value * 1.8 + 32);
  }
  get location() {
    if (!this.model) return "";
    return `${this.model.name}, ${this.model.sys.country}`;
  }
  get isThunderstorm() {
     const id = this.model.weather[0].id;
    return id > 199 && id < 233;
  }
  get isDrizzle() {
     const id = this.model.weather[0].id;
    return id > 299 && id < 322;
  }
  get isRain() {
     const id = this.model.weather[0].id;
    return id > 499 && id < 532;
  }
  get isSnow() {
     const id = this.model.weather[0].id;

    return id > 599 && id < 623;
  }

}
</script>

<style scoped>

</style>