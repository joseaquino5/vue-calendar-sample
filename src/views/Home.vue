<template>
  <div class="section">
    <CalendarComponent title="Vue Calendar Sample"/>
  </div>
</template>

<script>
// @ is an alias to /src
import CalendarComponent from '@/components/Calendar.vue'

export default {
  name: 'Home',
  components: {
    CalendarComponent
  }
}
</script>
