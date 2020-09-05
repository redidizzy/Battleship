<template>
  <div
    class="bg-gray-400 w-12 h-12 flex justify-center items-center"
    :class="{
         'cursor-pointer': isCursorPointer,
         'hover:bg-green-400' :  $store.state.battleship.appState === 'init',
         'hover:bg-red-400' : $store.state.battleship.appState==='playing' && !squareShip,
         'bg-red-900' : isAttackedShip,
         }"
    @click="$emit('clickSquare', coordinates)"
  >
    <template v-if="squareShip">
      <img src="/ship-horizontal.png" v-if="squareShip.alignment === 'horizontal'" alt />
      <img src="/ship-vertical.png" v-if="squareShip.alignment === 'vertical'" alt class="h-full" />
    </template>
    <template v-if="squareAttacked">
      <img src="/hit.png" v-if="squareAttacked.hasTouchedOpponentShip" alt />
      <img src="/miss.png" v-else alt class="h-full" />
    </template>
  </div>
</template>
<script>

export default ({
  props: {
    coordinates: {
      required: true,
      type: Array
    },
  },

  computed: {
    squareShip() {
      let result = this.$store.state.battleship.actualPlayerShips.find(this.checkCoordinates())
      return result;
    },
    squareAttacked(){
      return this.$store.state.battleship.actualPlayerAttacks.find(this.checkCoordinates())
    },
    isCursorPointer(){
      return  this.$store.state.battleship.appState === 'init'  || this.$store.state.battleship.appState === 'playing'
    },
    isAttackedShip(){
      return this.squareShip && this.$store.state.battleship.opponentPlayerAttacks.find(this.checkCoordinates())
    }
  },
  methods: {
    checkCoordinates(){
      return placement => placement.coordinates[0] == this.coordinates[0] && placement.coordinates[1] == this.coordinates[1]
    }
  }
})

</script>
<style lang="scss">
</style>