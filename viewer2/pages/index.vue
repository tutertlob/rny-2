<template>
  <section class="container">
    <div class="columns is-multiline is-mobile is-centered">
      <div v-for="sd in sensorDatas" class="column is-four-fifths">
        <div class="tile is-ancestor box">
          <div class="tile is-4 is-parent">
            <div class="tile is-child">
              <p class="is-size-2">
                <i class="fas fa-tint has-text-info"></i><br/>
                {{ sd.data.moisture }}
              </p>
            </div>
          </div>
          <div class="tile is-vertical is-parent">
            <div class="tile is-child">
              <p class="is-size-4 has-text-left">
                <i class="fas fa-seedling has-text-primary"></i>
                {{ sd.sensor.addr }}
              </p>
            </div>
            <div class="tile is-child notification">
              <p class="has-text-left">
                <i class="fas fa-clock"></i>
                {{ sd.received_at }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import axios from 'axios'

export default {
  data: () => ({
    sensorDatas: []
  }),
  mounted() {
    axios.get('http://localhost:3000/api/sensor').then(res => {
      this.sensorDatas = res.data
    })
  }
}
</script>

<style>
.container {
  margin: 0 auto;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}
</style>
