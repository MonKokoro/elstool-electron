<template>
    <div :class="`ice-burners-total-result ${expand ? 'ice-burners-total-result-expand' : ''}`">
        <div 
            class="result-handle"
            @click="expand = !expand"
        >结果统计</div>
        <div class="result-content">
            <div>当前共已抽取：{{$store.state.iceBurnerTotal}}次</div>
            <div>已获取道具：</div>
            <el-scrollbar height="320px">
                <div class="result-items">
                    <div :class="`${val.highLight ? 'high-light' : ''}`" v-for="(val) in $store.state.iceBurnerTotalResult">
                        {{val.name}} × {{val.times}}
                    </div>
                </div>
            </el-scrollbar>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

let expand = ref<boolean>(false)
</script>

<style lang="less">
.ice-burners-total-result{
    display: flex;
    align-items: center;
    height: 324px;
    z-index: 3000;
    position: fixed;
    right: -324px;
    top: 50%;
    transform: translate(0, -50%);
    transition: all .3s ease-in-out;
    color: #FFFFFF;
    .result-handle{
        // display: inline-block;
        padding: 8px;
        background: rgba(0,0,0,0.5);
        border-radius: 4px 0 0 4px;
        width: 24px;
        cursor: pointer;
        white-space: pre-wrap;
    }
    .result-content{
        text-align: left;
        width: 300px;
        height: 360px;
        background: rgba(0,0,0,0.5);
        border-radius: 4px 0 0 4px;
        padding: 12px;
    }
    .high-light{
        color: red;
    }
}
.ice-burners-total-result-expand{
    transform: translate(-324px, -50%);
}
</style>
