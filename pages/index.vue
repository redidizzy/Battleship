<template>
  <div class="container">
    <button
      v-if="!appState"
      @click="initGame"
      class="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow mb-3"
    >start</button>
    <div v-else-if="appState === 'init'" class="mb-2">
      <h3>Click on a square to place a ship - {{shipsLeft}} ships left</h3>
      <label>
        <input type="radio" v-model="newShipDirection" value="horizontal" /> Horizontal
      </label>
      <label>
        <input type="radio" v-model="newShipDirection" value="vertical" /> Vertical
      </label>
      <br />
      <button
        v-if="shipsLeft===0"
        class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-full"
        @click="startGame"
      >Submit</button>
    </div>
    <Grid :size="gridSize" class="mb-3"/>

    <button class="bg-purple-500 hover:bg-purple-400 text-white font-bold py-2 px-4 border-b-4 border-purple-700 hover:border-purple-500 rounded" v-if="gameToLoad && (!appState || appState=='init')"  @click="loadGame">Load Game</button>
    <button class="bg-green-500 hover:bg-green-400 text-white font-bold py-2 px-4 border-b-4 border-green-700 hover:border-green-500 rounded" v-if="appState == 'playing'" @click="createNewGame">New Game</button>

  </div>
</template>

<script>
import Grid from '@/components/Grid'
export default {
  components: {
    Grid
  },
  data() {
    return {
      newShipDirection: 'horizontal',
      gridSize: 8,
    }
  },
  computed: {
    appState() {
      return this.$store.state.battleship.appState
    },
    shipsLeft() {
      return 3 - this.$store.state.battleship.actualPlayerShips.length / 2
    },
    gameToLoad(){
      return this.$store.state.battleship.savedGameId
    }
  },
  watch: {
    newShipDirection(value) {
      this.$store.commit('battleship/changeNewShipDirection', value)
    }
  },
  methods: {
    initGame() {
      this.$store.dispatch('battleship/initGame')
    },
    startGame() {
      this.$store.dispatch('battleship/startGame', {gridSize: this.gridSize})
    },
    createNewGame(){
      this.$store.dispatch('battleship/createNewGame')
    },
    loadGame(){
      this.$store.dispatch('battleship/loadGame')
    }
  },
  created(){
    this.$store.dispatch('battleship/updateSavedGameId')
  }
}
</script>

<style>
/* Sample `apply` at-rules with Tailwind CSS
.container {
@apply min-h-screen flex justify-center items-center text-center mx-auto;
}
*/
.container {
  margin: 0 auto;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  flex-direction: column;
  height: 100vh;
}

.title {
  font-family: "Quicksand", "Source Sans Pro", -apple-system, BlinkMacSystemFont,
    "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
  display: block;
  font-weight: 300;
  font-size: 100px;
  color: #35495e;
  letter-spacing: 1px;
}

.subtitle {
  font-weight: 300;
  font-size: 42px;
  color: #526488;
  word-spacing: 5px;
  padding-bottom: 15px;
}

.links {
  padding-top: 15px;
}
</style>
