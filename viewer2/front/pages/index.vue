<template>
  <section class="container">
    <div class="columns is-multiline is-mobile is-centered">
      <div v-for="(m, index) in moistures" :key="index" class="column is-four-fifths">
        <div class="tile is-ancestor box">
          <div class="tile is-4 is-parent">
            <div class="tile is-child">
              <p class="is-size-2">
                <circular
                  :percentage="m.percentage"
                  :font-size="'2rem'"
                  :radius="'70px'"
                />
              </p>
            </div>
          </div>
          <div class="tile is-vertical is-parent">
            <div class="tile is-child">
              <p class="is-size-4 has-text-left">
                <i v-if="m.moisture < m.threshold" class="fas fa-tint has-text-info" />
                <i v-else class="fas fa-tint-slash has-text-grey" />
                {{ m.name }}
              </p>
            </div>
            <div class="tile is-child notification">
              <p class="has-text-left">
                <i class="fas fa-clock" />
                {{ m.receivedAt }}
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
import Circular from '~/components/Circular'

export default {
  components: {
    Circular
  },
  data: () => ({
    moistures: []
  }),
  mounted() {
    axios.get('http://localhost:3000/api/sensor').then(res => {
      this.moistures = res.data
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
