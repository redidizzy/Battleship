<template>
  <div
    class="bg-gray-400 w-12 h-12 flex justify-center items-center"
    :class="{
         'cursor-pointer': $store.state.battleship.appState === 'init',
         'hover:bg-green-400' :  $store.state.battleship.appState === 'init',
         }"
    @click="$emit('clickSquare', coordinates)"
  >
  <template  v-if="squareShip">
  <img src="/ship-horizontal.png" v-if="squareShip.alignment === 'horizontal'" alt="">
  <img src="/ship-vertical.png" v-if="squareShip.alignment === 'vertical'" alt="" class="h-full">
  </template>
  </div>
</template>
<script>

export default ({
  props:{
    coordinates:{
      required: true,
      type: Array
    },
  },

  computed: {
    squareShip(){
      let result = this.$store.state.battleship.actualPlayerShips.find(ship => ship.coordinates[0] == this.coordinates[0] && ship.coordinates[1] == this.coordinates[1])
      return result;
    }
  }
})
</script>
<style lang="scss">
</style>