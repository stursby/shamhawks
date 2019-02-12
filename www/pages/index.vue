<template>
  <div>
    <game-card v-for="(game, i) in games" :key="i" :game="game"/>
  </div>
</template>

<script>
import axios from 'axios'
import GameCard from '~/components/GameCard'

export default {
  name: 'Home',

  components: {
    GameCard
  },

  async asyncData() {
    const { data: games } = await axios.get('https://shamhawks.now.sh/api')
    return {
      games
    }
  }
}
</script>
