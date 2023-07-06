<script setup>
import { reactive, ref } from 'vue';
import { data } from './fakeData';
import { Bar } from 'vue-chartjs';
const getData = reactive(data);
const  chartData =  ref({
        labels: [ 'January', 'February', 'March' ],
        datasets: [ { data: [40, 20, 12] } ]
      });

console.log(getData[0]);

</script>

<template>
  <Bar id="my-chart-id" :options="true" :data="chartData" />
  <li v-for="item in getData" :key="item.date">
    {{ item.date }}:
  <li v-for="i in item.weather">
    {{ i.h }}
    {{ i.t }}
  </li>
  </li>
</template>


