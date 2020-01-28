<template>
  <q-page class="flex flex-center">
    <calendar/>
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
