<template>
  <div class="calendar-layout row">
    <div class="col-9">
      <full-calendar
        class="col-10"
        ref="calendar"
        locale="en"
        :plugins="calendarPlugins"
        :header="header"
        :buttonText="buttonText"
        :weekends="false"
        :selectable="selectable"
        :events="events"
        :minTime="minTime"
        :maxTime="maxTime"
        :slotLabelFormat="slotLabelFormat"
        :slotDuration="slotDuration"
        :slotLabelInterval="slotLabelInterval"
        :datesRender="checkView"
        :allDaySlot="false"
        @eventClick="handleClick"
        @dateClick="dateClicked"
        @select="handleSelect"
      />
    </div>
    <div class="col-3 column items-center">
      <date-picker @range="checkValidRange"/>
    </div>
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

  import DatePicker from "./DatePicker";

  let calendar

  export default {
    name: 'Calendar',
    components: {
      FullCalendar,
      DatePicker
    },
    data: () => ({
      selectable: false,
      minTime: "07:00:00",
      maxTime: "21:00:00",
      slotDuration: '00:15:00',
      slotLabelInterval: 15,
      slotLabelFormat: [
        {
          hour: '2-digit',
          minute: '2-digit',
          hour12:false
        }
      ],
      header: {
        center: 'dayGridMonth, dayGridWeek, timeGridDay',
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
    mounted() {
      calendar = this.$refs.calendar.getApi()
    },
    computed: {
      ...mapGetters(['events']),
    },
    methods: {
      dateClicked(event) {
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
      checkValidRange (range) {
        console.log('emit worked', range)
        calendar.setOption('validRange', range)
        calendar.setOption( 'visibleRange', range)
      },
      checkView (event) {
        event.view.type === "dayGridMonth" || event.view.type === "dayGridWeek" ? this.selectable = false : this.selectable = true
      }
    }
  }
</script>
<style lang='scss'>
  @import '~@fullcalendar/core/main.css';
  @import '~@fullcalendar/daygrid/main.css';
  @import '~@fullcalendar/timegrid/main.css';

</style>
