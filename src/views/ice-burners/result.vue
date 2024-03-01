<script setup>
import { ref, watch } from 'vue';
// import { useStore } from 'vuex'
// const store = useStore()
import { itemList, imageMap } from './data.js'

const props = defineProps({ 
    show: Boolean,
    data: Number
})
const emits = defineEmits(['onClose'])
let result = ref([])

watch(
    () => props.show,
    (newValue) => {
        if(newValue == true){
            getResult(props.data)
        }
    }
)

function imgSrc(src){
    return new URL(src, import.meta.url).href
}

/** 获取挫冰结果 */
function getResult(gacha){
    if(gacha){
        let gachaResult = []
        for(let num = 0; num < parseInt(gacha); num ++){
            /** 获取一个随机数，通过随机的数值查找抽卡结果 */
            let gachaNumber = Math.random() * 100
            /** forEach和map无法跳出，因此用for */
            let rateNum = 0
            for(let i = 0; i < itemList.length; i++){
                /** 每次循环时可以得到当前道具的概率随机数范围：rateNum ~ rateNum + item.rate */
                let item = itemList[i]
                if(gachaNumber >= rateNum && gachaNumber < rateNum + item.rate){
                    gachaResult.push(item);
                    break
                }
                else{
                    rateNum += item.rate
                }
            }
        }
        result.value = gachaResult
        // store.commit('iceBurnerSetResult', res.data)
    }
}

function handleClose(){
    emits('onClose')
}

</script>

<template>
    <el-dialog
        title="抽取结果"
        :modelValue="show"
        :before-close="handleClose"
        align-center
        width="70%"
    >
        <div class="ice-burners-result">
            <div class="result-content">
                <div :class="`result-single ${result[0] ?.highLight ? 'result-light' : ''}`" v-if="result.length == 1">
                    <div class="result-single-img">
                        <img :src="imgSrc(imageMap[result[0].key] || '../../assets/no-img.png')" />
                    </div>
                    <div>
                        {{result[0].name}}
                    </div>
                </div>
                <div class="result-complex" v-if="result.length > 1">
                    <div 
                        v-for="(item, index) in result" 
                        :key="index" 
                        :class="`result-complex-single ${item.highLight ? 'result-light' : ''}`"
                    >
                        <div class="result-single-img">
                            <img :src="imgSrc(imageMap[item.key] || '../../assets/no-img.png')" />
                        </div>
                        <div class="result-single-text">
                            {{item.name}}
                        </div>
                    </div>
                </div>
            </div>
            <div class="result-button">
                <el-button type="success" @click="getResult(1)">再抽1次</el-button>
                <el-button type="success" @click="getResult(10)">再抽10次</el-button>
            </div>
        </div>
    </el-dialog>
</template>

<style lang="less">
.ice-burners-result{
    .result-content{
        width: 100%;
        height: calc(100% - 92px);
        position: relative;
        // display: flex;
        // justify-content: center;
        // align-items: center;
        overflow-x: auto;
        overflow-y: hidden;
        .result-single{
            width: 90%;
            height: 90px;
            border: solid 1px #CCCCCC;
            position: relative;
            display: flex;
            align-items: center;
            .result-single-img{
                margin: 0 12px;
            }
        }
        .result-complex{
            // display: flex;
            // justify-content: center;
            // align-items: center;
            // flex-wrap: wrap;
            display: grid;
            grid-template-columns: repeat(5, auto);
            grid-gap: 6px;
            .result-complex-single{
                // width: 200px;
                height: 80px;
                border: solid 1px #CCCCCC;
                display: flex;
                justify-content: center;
                align-items: center;
                float: left;
                .result-single-img{
                    // margin: 0 6px;
                    transform: scale(0.8);
                    float: left;
                }
                .result-single-text{
                    width: 130px;
                    // height: 100%;
                    padding: 30px 0;
                    float: left;
                }
                .result-single-text-light{
                    color: red
                }
            }
        }
        .result-light{
            color: red;
            border: solid 1px red !important;
            animation: glow 2s ease infinite;
        }
        @keyframes glow {
            0% {
                box-shadow: 0 0 3px #CD7F32;
            }
            50% {
                box-shadow: 0 0 12px #CD7F32;
            }
            100% {
                box-shadow: 0 0 3px #CD7F32;
            }
        }
    }
    .result-button{
        width: 100%;
        height: 32px;
        margin: 8px 0;
        text-align: center;
    }
}
</style>
