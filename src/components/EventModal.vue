<template>
  <div class="event-modal q-pa-md" ref="EventModal">
    <div>
      <p>Event details</p>
      <p>{{event.title}}</p>
      <p>{{event.start}}</p>
      <p>{{event.end}}</p>
      <p>{{event.id}}</p>
    </div>
    <div class="column justify-between">
      <p v-if="exists">Edit event</p>
      <p v-else>Create Event</p>
      <div class="row justify-between items-center">
        <q-input class="col-12" v-model="title" label="Event Description" ></q-input>
        <q-select class="col-12" v-model="chosenBrand" :options="brands" label="Choose brand" ></q-select>
        <q-btn color="primary" v-if="exists" @click="updateEvent">Update</q-btn>
        <q-btn color="red" v-if="exists" @click="deleteEvent">Delete</q-btn>
        <q-btn color="primary" v-else @click="createEvent">Create</q-btn>
      </div>
    </div>
  </div>
</template>

<script>

  export default {
    name: 'EventModal',
    data() {
      return {
        exists: false,
        id: '',
        title: '',
        start: {},
        end: {},
        chosenBrand: null,
        brands: [
          'Google', 'Facebook', 'Twitter', 'Apple', 'Oracle'
        ]
      }
    },
    props: {
      event: Object
    },
    mounted() {
      this.start = this.event.start
      this.end = this.event.end
      this.id = this.event.id
      this.title = this.event.title
      this.checkIfExists(this.event.id)
    },
    methods: {
      createEvent() {
        this.$store.commit("ADD_EVENT",{
          id: (new Date()).getTime(),
          title: this.title,
          start: this.start,
          end: this.end,
          allDay: false
        })
        this.$emit('close')
      },
      deleteEvent () {
        this.$store.commit('DELETE_EVENT', this.id)
        this.$emit('close')
      },
      updateEvent () {
        let id = this.id
        let title = this.title
        this.$store.commit('UPDATE_EVENT',{id,title})
        this.$emit('close')
      },
      checkIfExists (id) {
        let el =  this.$store.getters.event(id)
        if(typeof el === 'object') {
          this.exists = true;
        }
      }
    }
  }

</script>
<style lang="scss" scoped>
  .event-modal {
    height: 400px;
    width: 400px;
  }
</style>
