<script setup>
// import { RouterLink, RouterView } from 'vue-router'
// import HelloWorld from './components/HelloWorld.vue'

const elstoolVersion = versions.elstool()

</script>

<template>
    <div class="home">
        <div class="title-box">
            <div class="title">
                <div class="title-text">艾尔工具箱</div>
                <div class="title-desc">v{{elstoolVersion}}</div>
            </div>
        </div>
        <div class="bottom-box">

        </div>
    </div>
</template>

<style scoped lang="less">
.home{
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    display: flex;
    flex-direction: column;
    .title-box{
        display: flex;
        justify-content: center;
        align-items: center;
        flex-grow: 1;
        .title{
            white-space: nowrap;
            .title-text{
                font-size: 48px;
                font-weight: 700
            }
            .title-desc{
                font-size: 20px;
                color: #CCCCCC
            }
        }
    }
    .bottom-box{
        display: flex;
        height: 3rem;
        flex-grow: 0;
        background-color: #EEEEEE
    }
}
</style>
