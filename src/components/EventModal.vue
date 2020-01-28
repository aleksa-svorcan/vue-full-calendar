<template>
  <div ref="EventModal">
    <div>
      <p>Event details</p>
      <p>{{event.title}}</p>
      <p>{{event.start}}</p>
      <p>{{event.end}}</p>
      <p>{{event.id}}</p>
    </div>
    <div>
      <p>Edit event</p>
      <div class="flex justify-between items-center">
        <q-input filled v-model="title" label="Event Name" ></q-input>
        <q-btn v-if="exists" @click="updateEvent">Update</q-btn>
        <q-btn v-if="exists" @click="deleteEvent">Delete</q-btn>
        <q-btn v-else @click="createEvent">Create</q-btn>
      </div>
    </div>
  </div>
</template>

<script>
  import {mapGetters} from 'vuex'

  export default {
    name: 'EventModal',
    data() {
      return {
        exists: false,
        id: '',
        title: '',
        start: {},
        end: {},
      }
    },
    props: {
      text: String,
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
          this.exists = true
        }
        else {
          this.exists = false
        }
      }
    }
  }

</script>
