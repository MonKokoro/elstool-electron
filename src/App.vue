<script setup>
import { RouterLink, RouterView } from 'vue-router'
import HelloWorld from './components/HelloWorld.vue'

const elstoolVersion = versions.elstool()

</script>

<template>
    <div class="elstool">
        <div class="menu">
            <RouterLink to="/">首页</RouterLink>
            <RouterLink to="/about">About</RouterLink>
            <RouterLink to="/ice-burners">挫冰模拟器</RouterLink>
        </div>
        <div class="content">
            <div class="view-box">
                <RouterView />
            </div>
        </div>
    </div>
</template>

<style scoped lang="less">
.elstool{
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    display: flex;
    flex-wrap: nowrap;
    .menu{
        width: 10rem;
        display: flex;
        flex-grow: 0;
        flex-direction: column;
    }
    .content{
        display: flex;
        flex-grow: 1;
        position: relative;
        .view-box{
            position: absolute;
            left: 0;
            top: 0;
            right: 0;
            bottom: 0;
        }
    }
}
</style>
