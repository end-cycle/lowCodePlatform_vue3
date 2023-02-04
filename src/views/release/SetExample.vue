<template>

</template>

<script>
import example from '@/data/example.js';
export default {
    created() {
        let id = this.$route.params.num
        let form = new FormData()
        form.append('id', id)
        localStorage.setItem('views', example.one)
        this.$router.replace({ path: '/' })
    }
}
</script>

<style>

</style>