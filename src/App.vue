<script setup>
import { RouterLink, RouterView } from 'vue-router'
import HelloWorld from './components/HelloWorld.vue'
import fs from 'fs-extra'

console.log(fs.readFileSync('../package.json'));

</script>

<template>
    <header>
        <div class="title">
            <div class="title-text">艾尔工具箱</div>
            <div class="title-desc">艾尔工具箱</div>
        </div>
    </header>

    <RouterView />
</template>

<style scoped>

</style>
