<template>
  <q-page class="flex flex-center">
    <div class="calendar-container">
      <calendar/>
    </div>
  </q-page>
</template>

<script>
import Calendar  from "../components/Calendar";
import Vue from 'vue'
import modal from 'vue-js-modal'

Vue.use(modal, {dialog: true, dynamic: true})


export default {
  name: 'PageIndex',
  components: {
    Calendar
  }
}
</script>
<style lang="scss" scoped>
  .calendar-container {
    width: 50%;
    height: 50%;
  }
</style>
