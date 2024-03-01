<script setup lang="ts">
import { ref, watch } from 'vue';
import { useStore } from 'vuex';
import { Back, Warning } from '@element-plus/icons-vue'
import Information from "./information.vue"
import Result from "./result.vue"
import TotalResult from "./total-result.vue"
import axios from '@/axios';

let store = useStore()
let informationShow = ref<boolean>(false)
let informationData = ref<any>()
let resultShow = ref<boolean>(false)
let resultData = ref<any>()

let current = ref<number>(store.state.currentLevel || 0)
let hammer = ref<boolean>(false)
let advanced = ref<boolean>(false)
let fluorite = ref<boolean>(false)

const advancedCostMap: any = {
    7: 20,
    8: 20,
    9: 50,
    10: 50,
    11: 80,
    12: 80
}

const stoneCostMap: any = {
    7: 3,
    8: 3,
    9: 5,
    10: 7,
    11: 9,
    12: 11
}

watch(
    () => store.state.currentLevel,
    (newValue) => {
        current.value = newValue
    }
)

function upgrade(){
    resultData.value = { hammer, advanced, fluorite, current: store.state.currentLevel }
    resultShow.value = true
}

/** 获取道具与概率信息 */
async function getItems(){
    const res = await axios.get({
        url: '/upgrading/getRateList',
    });
    informationData.value = res.data;
}

getItems()

</script>

<template>
    <div class="upgrading-imilater">
        <Information
            :show="informationShow"
            :data="informationData"
            @onClose="informationShow = false"
        />
        <Result
            :show="resultShow"
            :data="resultData"
            @onClose="resultShow = false"
        />
        <TotalResult />
        <div class="upgrading">
            <div class="upgrading-header">
                <router-link :to="{name: 'home'}">
                    <el-tooltip
                        class="item"
                        content="返回首页"
                        placement="bottom"
                        :enterable="false"
                    >
                        <el-icon class="upgrading-set-icon" :size="50" color="#ccc"><back /></el-icon>
                    </el-tooltip>
                </router-link>
                <el-icon class="upgrading-set-icon" :size="50" color="#ccc">
                    <el-tooltip
                        class="item"
                        content="详细信息"
                        placement="bottom"
                        :enterable="false"
                    >
                        <warning @click="informationShow = true"/>
                    </el-tooltip>
                </el-icon>
            </div>
            <div class="upgrading-center">
                <div class="upgrading-title">装备强化</div>
                <div class="upgrading-content">
                    <div class="upgrading-item-bar">
                        <div class="upgrading-item-img"></div>
                        <div class="upgrading-item">+{{current}} 装作是个暗鬼</div>
                        <div class="upgrading-level">
                            <div class="upgrading-level-text">强化等级</div>
                            <div class="upgrading-level-number">{{current}}</div>
                        </div>
                    </div>
                    <div class="upgrading-powerups">
                        <div class="upgrading-powerups-item upgrading-powerups-advanced">
                            <div class="upgrading-check"><el-checkbox v-model="advanced" size="large" /></div>
                            <div class="upgrading-item">铁匠高级强化（以10级为准）</div>
                            <div class="upgrading-used"></div>
                        </div>
                        <div class="upgrading-powerups-item">
                            <div class="upgrading-check"><el-checkbox v-model="hammer" size="large" /></div>
                            <div class="upgrading-item">艾尔锤子</div>
                            <div class="upgrading-used"></div>
                        </div>
                        <div class="upgrading-powerups-item">
                            <div class="upgrading-check"><el-checkbox v-model="fluorite" size="large" /></div>
                            <div class="upgrading-item">神圣守护石/神圣守护水晶</div>
                            <div class="upgrading-used"></div>
                        </div>
                    </div>
                    <div class="upgrading-cost">
                        <div class="upgrading-cost-text">本次强化消耗：</div>
                        <div class="upgrading-cost-items">
                            <div class="upgrading-cost-item">
                                <div class="upgrading-cost-img icon-stone"></div>
                                <div class="upgrading-cost-number"> × {{!advanced && current >= 7 ? stoneCostMap[current] : 1}}</div>
                            </div>
                            <div class="upgrading-cost-item">
                                <div class="upgrading-cost-img icon-ed"></div>
                                <div class="upgrading-cost-number"> × 10000</div>
                            </div>
                            <div class="upgrading-cost-item" v-if="hammer">
                                <div class="upgrading-cost-img icon-hammer"></div>
                                <div class="upgrading-cost-number"> × 1</div>
                            </div>
                            <div class="upgrading-cost-item" v-if="advanced && current >= 7">
                                <div class="upgrading-cost-img icon-advanced"></div>
                                <div class="upgrading-cost-number"> × {{advancedCostMap[current]}}</div>
                            </div>
                            <div class="upgrading-cost-item" v-if="fluorite">
                                <div class="upgrading-cost-img icon-protection"></div>
                                <div class="upgrading-cost-number"> × 1</div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="upgrading-button">
                    <el-button size="large" type="success" @click="upgrade()">强化！</el-button>
                </div>
            </div>
        </div>
    </div>
</template>

<style lang="less">
.fade-enter-from, .fade-leave-to{ opacity: 0 }
.fade-enter-active, .fade-leave-active{ transition: all 0.3s ease; }
.upgrading-imilater{
    position: absolute;
    left: 0;
    bottom: 0;
    top: 0;
    right: 0;
    background: white;
    .upgrading{
        width: 100%;
        height: 100%;
        position: relative;
        .upgrading-header{
            position: absolute;
            left: 12px;
            top: 12px;
            z-index: 50;
            .upgrading-set-icon{
                margin-right: 16px;
                cursor: pointer;
                float: left;
                transition: all 0.3s;
            }
            .upgrading-set-icon:hover{
                transform: scale(1.1)
            }
        }
        .upgrading-center{
            display: flex;
            flex-direction: column;
            width: 800px;
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%,-50%);
            user-select: none;
            border: 4px solid #CCCCCC;
            border-radius: 4px;
            box-shadow: 4px 2px 6px #CCCCCC;
            background: #EEEEEE;
            .upgrading-title{
                width: calc("100% - 64px");
                height: 32px;
                line-height: 32px;
                padding: 16px 24px;
                font-size: 20px;
                text-align: left;
                border-bottom: 2px solid #CCCCCC;
            }
            .upgrading-content{
                padding: 16px 24px;
                .upgrading-item-bar{
                    display: flex;
                    flex-direction: row;
                    align-items: center;
                    height: 76px;
                    margin: 6px 0;
                    padding: 6px;
                    border: 1px solid #CCCCCC;
                    border-radius: 4px;
                    background: #FFFFFF;
                    box-shadow: 2px 2px 4px #CCCCCC;
                    .upgrading-item-img{
                        width: 68px;
                        height: 68px;
                        border: 1px solid #CCCCCC;
                        flex-grow: 0;
                    }
                    .upgrading-item{
                        padding: 0 6px;
                        flex-grow: 1;
                        text-align: left;
                    }
                    .upgrading-level{
                        width: 120px;
                        height: 68px;
                        border-radius: 4px;
                        background: #EEEEEE;
                        flex-grow: 0;
                        .upgrading-level-text{
                            height: 28px;
                            line-height: 28px;
                            font-size: 24px;
                            font-weight: 600;
                        }
                        .upgrading-level-number{
                            height: 40px;
                            line-height: 40px;
                            font-size: 36px;
                            font-weight: 600;
                            font-style: italic;
                        }
                    }
                }
                .upgrading-powerups{
                    background: #FFFFFF;
                    display: flex;
                    flex-direction: column;
                    .upgrading-powerups-item{
                        display: flex;
                        flex-direction: row;
                        align-items: center;
                        height: 32px;
                        padding: 6px;
                        .upgrading-check{
                            width: 24px;
                            flex-grow: 0;
                        }
                        .upgrading-item{
                            padding: 0 6px;
                            flex-grow: 1;
                            text-align: left;
                        }
                        .upgrading-used{
                            flex-grow: 0;
                            width: 120px;
                            height: 24px;
                            border-radius: 4px;
                            background: #EEEEEE;
                        }
                    }
                    .upgrading-powerups-advanced{
                        border-bottom: 1px solid #EEEEEE
                    }
                }
            }
            .upgrading-cost{
                background: #FFFFFF;
                height: 36px;
                margin-top: 12px;
                padding: 6px 12px;
                display: flex;
                flex-direction: space-between;
                align-items: center;
                .upgrading-cost-text{
                    flex-grow: 0
                }
                .upgrading-cost-items{
                    display: flex;
                    flex-direction: row;
                    flex-grow: 1;
                    .upgrading-cost-item{
                        display: flex;
                        flex-grow: 1;
                        justify-content: space-between;
                        align-items: center;
                        background: #EEEEEE;
                        max-width: 150px;
                        height: 24px;
                        border-radius: 6px;
                        margin: 0 4px;
                        .upgrading-cost-img{
                            background: #FFFFFF;
                            width: 32px;
                            height: 32px;
                            border: 1px solid #CCCCCC;
                            background-size: auto 100%;
                            background-repeat: no-repeat;
                        }
                        .icon-stone{
                            background-image: url('@/assets/upgrading/Blessed_Enhacment_Stone.png');
                        }
                        .icon-ed{
                            background-image: url('@/assets/ED.png');
                        }
                        .icon-advanced{
                            background-image: url('@/assets/upgrading/Item_-_Sturdy_Mithril.png');
                        }
                        .upgrading-cost-number{
                            margin-right: 8px;
                        }
                    }
                }
            }
            .upgrading-button{
                text-align: center;
                margin-bottom: 12px;
                width: 100%;
            }
        }
    }
}
</style>
