<template>
    <div class="grid gap-1" :class="`grid-cols-${this.size} sm:grid-cols-${this.size} md:grid-cols-${this.size}`">
        <div v-for="index in this.size*this.size" :key="index" class="bg-gray-400 w-12 h-12"></div>
    </div>
</template>
<script>

export default ({
    props:{
        size:{
            required: true,
            type: Number,
        }
    }
})
</script>
<style lang="scss">

</style>