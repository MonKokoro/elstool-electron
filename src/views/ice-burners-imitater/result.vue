<template>
    <el-dialog
        title="抽取结果"
        :modelValue="show"
        :before-close="handleClose"
        align-center
        :width="'70%'"
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

<script setup>
import { ref, watch } from 'vue';
import { useStore } from 'vuex'
import axios from '@/axios';
const store = useStore()

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
    return axios.get({
        url: '/iceBurners/gacha',
        data: { gacha }
    }).then((res) => {
        result.value = res.data
        store.commit('iceBurnerSetResult', res.data)
    })
}

function handleClose(){
    emits('onClose')
}

const imageMap = {
    "ice-burner-weapon": '../../assets/aurora-mystica-cube.png',
    "ice-burner-hair": '../../assets/aurora-mystica-cube.png',
    "ice-burner-another-hair": '../../assets/aurora-mystica-cube.png',
    "ice-burner-top-piece": '../../assets/aurora-mystica-cube.png',
    "ice-burner-bottom-piece": '../../assets/aurora-mystica-cube.png',
    "ice-burner-gloves": '../../assets/aurora-mystica-cube.png',
    "ice-burner-shoes": '../../assets/aurora-mystica-cube.png',
    "ice-burner-accessory1": '../../assets/aurora-mystica-cube.png',
    "ice-burner-accessory2": '../../assets/aurora-mystica-cube.png',
    "weapon-magic-amulent-9": '../../assets/magic-amulent-9.png',
    "weapon-magic-amulent-10": '../../assets/magic-amulent-10.png',
    "armor-magic-amulent-9": '../../assets/magic-amulent-9.png',
    "armor-magic-amulent-10": '../../assets/magic-amulent-10.png',
    "magic-amulent-8": '../../assets/magic-amulent-8.png',
    // "glory-of-victory": {name: `胜利的荣光`},
    "berserker": '../../assets/berserker.png',
    "sacrifice": '../../assets/sacrifice.png',

    "orichalcum-weapon-accessory": '../../assets/orichalcum-weapon-accessory.png',
    "promotional-costume": '../../assets/promotional-costume.png',
    // "additional-damage-magic-stone": {name: `追加伤害特级魔法石`,},
    // "damage-reduction-stone": {name: `减少伤害特级魔法石`},
    // "critical-magic-stone": {name: `暴击特级魔法石`},
    // "maximize-magic-stone": {name: `极大化特级魔法石`},
    // "action-speed-magic-stone": {name: `动作速度特级魔法石`},
    // "HP-magic-stone": {name: `HP增加特级魔法石`},
    // "elrianode-boss": {name: `艾丽阿诺德BOSS宝箱`},
    // "varnimyr-boss": {name: `帕尼米尔BOSS宝箱`},
    // "rigomor-boss": {name: `尼格摩尔BOSS宝箱`},
    // "sage-magic-stone": {name: `贤者的魔法石（2个）宝箱`},

    "complete-recovery-100": '../../assets/complete-recovery.png',
    "complete-recovery-50": '../../assets/complete-recovery.png',
    // "fighting-spirit": {name: `斗志药水`},
    // "adaptation-elixir": {name: `适应的灵药`},
    // "steel-spinning-reel": {name: `钢铁钓轮`},
    // "colorful-bobber": {name: `五颜六色的鱼漂`},

    "el-shard-mystery": '../../assets/el-shard-mystery.png',
    "el-shard-fire": '../../assets/el-shard-fire.png',
    "el-shard-water": '../../assets/el-shard-water.png',
    "el-shard-wind": '../../assets/el-shard-wind.png',
    "el-shard-nature": '../../assets/el-shard-nature.png',
    "el-shard-light": '../../assets/el-shard-light.png',
    "el-shard-dark": '../../assets/el-shard-dark.png',
    "fire-orbs-fire": '../../assets/fire-orbs-fire.png',
    "fire-orbs-water": '../../assets/fire-orbs-water.png',
    "fire-orbs-wind": '../../assets/fire-orbs-wind.png',
    "fire-orbs-nature": '../../assets/fire-orbs-nature.png',
    "fire-orbs-light": '../../assets/fire-orbs-light.png',
    "fire-orbs-dark": '../../assets/fire-orbs-dark.png',
    "ruben-boss": '../../assets/ruben-boss.png',
    "elder-boss": '../../assets/elder-boss.png',
    "bethma-boss": '../../assets/bethma-boss.png',
    "altera-boss": '../../assets/altera-boss.png',
    "feita-boss": '../../assets/feita-boss.png',
    "velder-boss": '../../assets/velder-boss.png',
    "hamel-boss": '../../assets/hamel-boss.png',
    "sander-boss": '../../assets/sander-boss.png',
    "lanox-boss": '../../assets/lanox-boss.png',
    "elysion-boss": '../../assets/elysion-boss.png',
}

</script>

<style lang="less">
.ice-burners-result{
    .result-content{
        width: 100%;
        height: calc(100% - 92px);
        position: relative;
        display: flex;
        justify-content: center;
        align-items: center;
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
            display: flex;
            justify-content: center;
            align-items: center;
            flex-wrap: wrap;
            .result-complex-single{
                width: 200px;
                height: 80px;
                border: solid 1px #CCCCCC;
                display: flex;
                justify-content: center;
                align-items: center;
                float: left;
                 margin: 6px 12px;
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
