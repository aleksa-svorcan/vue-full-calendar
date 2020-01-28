<template>
  <div class="calendar-layout">
    <full-calendar
      ref="calendar"
      locale="en"
      :plugins="calendarPlugins"
      :header="header"
      :buttonText="buttonText"
      :weekends="false"
      :selectable="selectable"
      :events="events"
      @eventClick="handleClick"
      @dateClick="dateClicked"
      @select="handleSelect"
    />
    <modals-container />
  </div>
</template>

<script>
  import {mapGetters} from 'vuex'
  import FullCalendar from '@fullcalendar/vue'
  import DayGridPlugin from '@fullcalendar/daygrid'
  import TimeGridPlugin from '@fullcalendar/timegrid'
  import InteractionPlugin from '@fullcalendar/interaction'
  import ListPlugin from '@fullcalendar/list'
  import EventModal from "./EventModal";

  export default {
    name: 'Calendar',
    components: {
      FullCalendar
    },
    data: () => ({
      selectable: false,
      header: {
        center: 'dayGridMonth, dayGridWeek, timeGridDay, listMonth',
        right: 'title',
        left: 'prev today next'
      },
      buttonText: {
        today: 'Danas',
        dayGridMonth: 'Pregled Meseca',
        dayGridWeek: 'Pregled Nedelje',
        timeGridDay: 'Pregled Dana',
        listMonth: 'Lista Termina'
      },
      calendarPlugins: [
        DayGridPlugin,
        TimeGridPlugin,
        InteractionPlugin,
        ListPlugin
      ],

    }),
    computed: {
      ...mapGetters(['events']),
      checkView() {
        let calendar = this.$refs.calendar.getApi()
        console.log('view', calendar.fullCalendar( 'getView' ))
        return calendar.fullCalendar( 'getView' )
      }
    },
    methods: {
      dateClicked(event) {
        let calendar = this.$refs.calendar.getApi()
        calendar.gotoDate(event.dateStr)
        calendar.changeView('timeGridDay')
        this.selectable = true
      },
      handleSelect(event) {
        this.$modal.show(EventModal, {
          text: 'this is from the component',
          event: event,
          id: event.id
        })
      },
      handleClick (event) {
        this.$modal.show(EventModal, {
          text: 'this is from the component',
          event: event.event,
          id: event.id
        })
      },
      updateEvent (event) {
        this.$store.commit('UPDATE_EVENT', event.event)
      }
    }
  }
</script>
<style lang='scss'>
  @import '~@fullcalendar/core/main.css';
  @import '~@fullcalendar/daygrid/main.css';
  @import '~@fullcalendar/timegrid/main.css';

</style>
