<template>
  <div class="q-px-lg column">
    <div class="q-mb-xl row items-center">
      <span class="col-12 q-mb-md">Izaberi dozvoljen period</span>
      <q-input class="col-5" dense v-model="startDate" mask="date">
        <template v-slot:append>
          <q-icon name="event" class="cursor-pointer">
            <q-popup-proxy ref="qDateProxy" transition-show="scale" transition-hide="scale">
              <q-date v-model="startDate" @input="() => $refs.qDateProxy.hide()" ></q-date>
            </q-popup-proxy>
          </q-icon>
        </template>
      </q-input>
      <div class="col-2"></div>
      <q-input class="col-5" dense v-model="endDate" mask="date">
        <template v-slot:append>
          <q-icon name="event" class="cursor-pointer">
            <q-popup-proxy ref="qDateProxy" transition-show="scale" transition-hide="scale">
              <q-date v-model="endDate" @input="() => $refs.qDateProxy.hide()" ></q-date>
            </q-popup-proxy>
          </q-icon>
        </template>
      </q-input>
      <div class="col-12 q-mt-lg">
        <q-btn color="primary" label="potvrdi" @click="confirmDates"></q-btn>
      </div>
    </div>
    <div v-if="validRange.start && validRange.end">
      <span>Dozvoljen period</span>
      <div class="row items-center">
        <span>{{validRange.start}}</span>
        <span> - </span>
        <span>{{validRange.end}}</span>
        <q-btn flat class="q-ml-md" label="Obrisi" @click="removeAllowedDate"></q-btn>
      </div>
    </div>
  </div>
</template>
<script>

  export default {
    name: 'DatePicker',
    data () {
      return {
        startDate: '',
        endDate:'',
        validRange: {
          start: null,
          end: null
        }
      }
    },
    methods: {
      confirmDates () {
        if(this.startDate.length >= 5 && this.endDate.length >= 5) {
          this.validRange.start = this.startDate
          this.validRange.end = this.endDate
        }
        else {
          this.validRange.start = null
          this.validRange.end = null
        }
      },
      removeAllowedDate () {
        this.validRange.start = null
        this.validRange.end = null
      }
    },
    watch: {
      validRange: {
        handler(oldValue,newValue) {
          let start
          let end
          console.log('values', oldValue,newValue)
          if(newValue.start && newValue.end) {
            start = new Date(newValue.start)
            end = new Date(newValue.end)
          }
          else {
            start = nowDate
            end = nowDate.clone().add(12, 'months')
          }
          this.$emit('range', {start,end})
        },
        deep: true
      }
    }
  }
</script>
<style lang="scss" scoped></style>
