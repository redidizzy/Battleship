<template>
    <div class="grid gap-1" :class="`grid-cols-${this.size} sm:grid-cols-${this.size} md:grid-cols-${this.size}`">
        <Case v-for="(n, index) in size*size" :key="index" :coordinates='calculateCoordinates(index)' @clickSquare="placeShip"></Case>
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
    data(){
        return {
            ships:[]
        }
    },
    methods:{
        calculateCoordinates(index){
            return [index%(this.size)+1, Math.floor(index/(this.size)+1)];
        },
        placeShip(coordinates){
            this.$store.dispatch('battleship/addShip', coordinates) 
        }
    }
})
</script>
<style lang="scss">

</style>