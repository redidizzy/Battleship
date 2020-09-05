<template>
    <div class="grid gap-1" :class="`grid-cols-${this.size} sm:grid-cols-${this.size} md:grid-cols-${this.size}`">
        <Case v-for="(n, index) in size*size" :key="index" :coordinates='calculateCoordinates(index)' @clickSquare="clickSquare"></Case>
    </div>
</template>
<script>
import Case from './Case'
export default ({
    components:{
        Case
    },
    props:{
        size:{
            required: true,
            type: Number,
        }
    },
    methods:{
        calculateCoordinates(index){
            return [index%(this.size)+1, Math.floor(index/(this.size)+1)];
        },
        clickSquare(coordinates){
            switch(this.$store.state.battleship.appState){
                case 'init' : 
                    this.$store.dispatch('battleship/addShip', coordinates) 
                    break;
                case 'playing' :
                    this.$store.dispatch('battleship/attack', coordinates)
                    break;
            }
        }
    }
})
</script>
<style lang="scss">

</style>