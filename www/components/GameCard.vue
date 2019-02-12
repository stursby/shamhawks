<template>
  <div>
    <p>{{ game.date }}</p>
    <p>{{ game.time }}</p>
    <p>{{ game.rink }}</p>
    <p>{{ game.home }}</p>
    <p>{{ game.away }}</p>
  </div>
</template>

<script>
export default {
  name: 'GameCard',

  props: ['game']
}
</script>

