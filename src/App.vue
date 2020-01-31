<template>
  <div id="q-app">
    <router-view />
  </div>
</template>

<script>
  import Vue from 'vue'
  import moment from 'vue-moment'
  Vue.use(moment);

  export default {
  name: 'App'
}
</script>
