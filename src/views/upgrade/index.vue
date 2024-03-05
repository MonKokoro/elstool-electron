<script setup>
import { ref, watch } from 'vue';
// import { useStore } from 'vuex';
import { Back, Warning } from '@element-plus/icons-vue'
// import Information from "./information.vue"
// import Result from "./result.vue"
// import TotalResult from "./total-result.vue"
import { upgradeDataMap } from './data.js'

// let store = useStore()
let informationShow = ref(false)
let informationData = ref()
let resultShow = ref(false)
let resultData = ref()

let current = ref(0)
let hammer = ref(false)
let advanced = ref(false)
let fluorite = ref(false)

// watch(
//     () => store.state.currentLevel,
//     (newValue) => {
//         current.value = newValue
//     }
// )

/** 强化 */
function upgrade(protect){
    // resultData.value = { hammer, advanced, fluorite, current }
    // resultShow.value = true
    const data = upgradeDataMap[current.value]
    const condition = [0]
    if(hammer.value){
        // 使用强化锤子，成功率翻倍，无变化概率下降
        condition[1] = data.success + data.success
        condition[2] = condition[1] + data.noChange - data.success
    }
    else{
        condition[1] = data.success
        condition[2] = condition[1] + data.noChange
    }
    condition[3] = condition[2] + data.downgrade
    condition[4] = condition[3] + data.destroy
    condition[5] = condition[4] + data.reset
    const random = Math.random()
    console.log(random)
    if(random >= condition[0] && random < condition[1]){
        // 强化+1
        console.log("成功")
        return current.value = current.value + 1;
    }
    else if(random >= condition[1] && random < condition[2]){
        // 无变化
        console.log("无变化")
        return
    }
    else if(random >= condition[2] && random < condition[3]){
        // 强化-1
        if(protect){
            console.log("失败 触发保护")
            return
        }
        else{
            console.log("失败")
            return current.value = current.value - 1;
        }
            
    }
    else if(random >= condition[3] && random < condition[4]){
        // 破坏
        console.log("破坏 暂时无变化")
        return
    }
    else{
        // 归零
        if(protect){
            console.log("归零 触发保护")
            return
        }
        else{
            console.log("归零")
            return current.value = 0;
        }
    }
}

/** 返回当前强化概率字符串 */
function percentString(curr){
    const data = upgradeDataMap[curr]
    const percentMap = {
        success: Math.min(((hammer.value ? data.success+data.success : data.success)*100), 100).toFixed(2),
        noChange: Math.max(((hammer.value ? data.noChange-data.success : data.noChange)*100), 0).toFixed(2),
        downgrade: (data.downgrade*100).toFixed(2),
        destroy: (data.destroy*100).toFixed(2),
        reset: (data.reset*100).toFixed(2)
    }
    return `成功${percentMap.success}% 无变化${percentMap.noChange}% 失败${percentMap.downgrade}% 破坏${percentMap.destroy}% 初始化${percentMap.reset}%`
}

/** 获取道具与概率信息 */
async function getItems(){
    // const res = await axios.get({
    //     url: '/upgrading/getRateList',
    // });
    // informationData.value = res.data;
}

getItems()

</script>

<template>
    <div class="upgrade">
        <!-- <Information
            :show="informationShow"
            :data="informationData"
            @onClose="informationShow = false"
            $attr
        />
        <Result
            :show="resultShow"
            :data="resultData"
            @onClose="resultShow = false"
        />
        <TotalResult /> -->
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
        <div class="upgrading">
            <div class="upgrading-center">
                <div class="upgrading-title">强化</div>
                <div class="upgrading-weapon">
                    <div class="weapon-title">装作是个暗鬼</div>
                    <div class="weapon-img"></div>
                    <div class="weapon-detail">
                        <div class="weapon-level">强化等级 {{current}}</div>
                        <div class="weapon-bar">0.00%</div>
                    </div>
                </div>
                <div class="upgrading-attribute">
                    <div class="upgrading-attribute-item">
                        <div class="upgrading-attribute-item-text">
                            成功强化至+11时，基本能力值增加<span class="text-mark">40%</span>
                        </div>
                        <div class="upgrading-attribute-item-desc">
                            （物理攻击力/魔法攻击力/物理防御力/魔法防御力/HP）
                        </div>
                    </div>
                    <div class="upgrading-attribute-item">
                        <div class="upgrading-attribute-item-text">
                            本次强化概率
                        </div>
                        <div class="upgrading-attribute-item-desc">{{percentString(current)}}</div>
                    </div>
                </div>
                <div class="upgrading-material">
                    <div class="upgrading-material-title">可选消耗材料</div>
                    <div class="upgrading-material-item">
                        <div class="item-icon icon-hammer"></div>
                        <div class="item-content">
                            <div class="item-text">艾尔锤子</div>
                            <div class="item-desc">-强化成功概率增加至2倍</div>
                        </div>
                        <div class="item-count">100/1</div>
                        <div class="item-check">
                            <el-checkbox v-model="hammer" size="large" />使用
                        </div>
                    </div>
                    <div class="upgrading-material-item">
                        <div class="item-icon icon-hammer"></div>
                        <div class="item-content">
                            <div class="item-text">祝福的复原卷轴</div>
                            <div class="item-desc">-强化中破坏时会自动使用防止破坏</div>
                        </div>
                        <div class="item-count">100/1</div>
                        <div class="item-check">
                            <el-checkbox v-model="advanced" size="large" />使用
                        </div>
                    </div>
                </div>
                <div class="upgrading-ed">
                    <div class="ed-title">手续费</div>
                    <div class="ed-cost"><div class="icon-ed"></div>10000</div>
                </div>
                <div class="upgrading-stone">
                    <div class="stone-item">
                        <div class="stone-title">普通强化</div>
                        <div class="stone-box">
                            <div class="icon-stone"></div>
                        </div>
                        <div class="stone-text">
                            <div class="text">根据强化等级</div>
                            <div class="text">依照不等概率出现</div>
                            <div class="text text-success">提升1阶段、无变化</div>
                            <div class="text text-danger">降低1阶段、破坏、初始化</div>
                            <div class="text">现象</div>
                        </div>
                        <div class="stone-cost">
                            <div class="cost-item">
                                <div class="item-img"></div>
                                <div class="item-count">100/1</div>
                            </div>
                        </div>
                        <div class="stone-button">
                            <div class="els-button" @click="upgrade(false)">强化</div>
                        </div>
                    </div>
                    <div class="stone-item">
                        <div class="stone-title">保护强化</div>
                        <div class="stone-box">
                            <div class="icon-stone icon-enhacment"></div>
                        </div>
                        <div class="stone-text">
                            <div class="text">根据强化等级</div>
                            <div class="text">依照不等概率出现</div>
                            <div class="text text-success">提升1阶段、无变化</div>
                            <div class="text text-danger">破坏</div>
                            <div class="text">现象</div>
                        </div>
                        <div class="stone-cost">
                            <div class="cost-item">
                                <div class="item-img"></div>
                                <div class="item-count">100/1</div>
                            </div>
                            <div class="cost-item">
                                <div class="item-img"></div>
                                <div class="item-count">100/1</div>
                            </div>
                        </div>
                        <div class="stone-button">
                            <div class="els-button" @click="upgrade(true)">强化</div>
                        </div>
                    </div>
                    <div class="stone-item">
                        <div class="stone-title">特殊强化</div>
                        <div class="stone-box">
                            <div class="icon-stone"></div>
                        </div>
                        <div class="stone-text">
                            <div class="text">根据强化等级</div>
                            <div class="text">依照不等概率出现</div>
                            <div class="text text-success">提升1阶段、无变化</div>
                            <div class="text text-danger">降低1阶段、破坏</div>
                            <div class="text">现象</div>
                        </div>
                        <div class="stone-cost">
                            <div class="cost-item">
                                <div class="item-img"></div>
                                <div class="item-count">100/1</div>
                            </div>
                            <div class="cost-item">
                                <div class="item-img"></div>
                                <div class="item-count">100/1</div>
                            </div>
                        </div>
                        <div class="stone-button">
                            <div class="els-button" @click="upgrade()">强化</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style lang="less">
.fade-enter-from, .fade-leave-to{ opacity: 0 }
.fade-enter-active, .fade-leave-active{ transition: all 0.3s ease; }
.upgrade{
    position: absolute;
    left: 0;
    bottom: 0;
    top: 0;
    right: 0;
    background: white;
    font-size: 0.8rem;
    line-height: 0.8rem;
    .upgrading-header{
        position: absolute;
        left: 12px;
        top: 12px;
        z-index: 10;
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
    .upgrading{
        width: 100%;
        height: 100%;
        position: relative;
        margin: 0 2rem;
        .upgrading-center{
            display: flex;
            flex-direction: column;
            width: 30rem;
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%,-50%);
            user-select: none;
            border: 1px solid #000000;
            border-radius: 2px;
            box-shadow: 4px 2px 6px #CCCCCC;
            background: #EEEEEE;
            .upgrading-title{
                display: flex;
                align-items: center;
                height: 2rem;
                padding: 0 1rem;
                font-size: 0.8rem;
                text-align: left;
                border-bottom: 1px solid #CCCCCC;
                background: #FFFFFF;
            }
            .upgrading-weapon{
                display: flex;
                align-items: center;
                flex-direction: column;
                background: #454545;
                margin: 0.25rem;
                gap: 0.25rem;
                .weapon-title{
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    width: 100%;
                    color: #FFFFFF;
                    background: #333333;
                    padding: 0.25rem 0;
                    -webkit-clip-path: polygon(20% 0,80% 0%, 75% 100%, 20% 100%);
                    clip-path: polygon(20% 0,80% 0%, 75% 100%, 25% 100%);
                }
                .weapon-img{
                    width: 2.5rem;
                    height: 2.5rem;
                    flex-shrink: 0;
                    border: 1px solid #CCCCCC;
                }
                .weapon-detail{
                    display: flex;
                    align-items: center;
                    flex-direction: column;
                    width: 100%;
                    background: #232323;
                    margin-top: 0.5rem;
                    padding: 0.2rem;
                    .weapon-level{
                        display: flex;
                        justify-content: center;
                        color: yellow;
                        padding: 0.2rem 0;
                    }
                    .weapon-bar{
                        display: flex;
                        justify-content: center;
                        background: #555555;
                        height: 0.8rem;
                        flex-shrink: 1;
                        font-size: 0.5rem;
                        width: 100%;
                        color: #FFFFFF;
                        text-shadow: 1px 1px 1px #000000;
                    }
                }
            }
            .upgrading-attribute{
                display: flex;
                flex-direction: column;
                gap: 0.25rem;
                margin: 0.25rem;
                font-size: 0.7rem;
                .upgrading-attribute-item{
                    display: flex;
                    align-items: center;
                    flex-direction: column;
                    background: #FFFFFF;
                    border: 1px solid #333333;
                    padding: 0.25rem;
                    .upgrading-attribute-item-desc{
                        color: #CCCCCC;
                    }
                }
                .text-mark{
                    color: blue;
                }
            }
            .upgrading-material{
                display: flex;
                flex-direction: column;
                gap: 0.25rem;
                margin: 0 0.25rem;
                padding-bottom: 0.5rem;
                background: #555555;
                border-radius: 2px;
                .upgrading-material-title{
                    padding: 0.3rem 0.5rem;
                    color: blue;
                    overflow: hidden;
                    -webkit-clip-path: polygon(0 0,10rem 0%, 9.5rem 100%, 0% 100%);
                    clip-path: polygon(0 0,10rem 0%, 9.5rem, 0% 100%);
                    background: #333333;
                }
                .upgrading-material-item{
                    display: flex;
                    flex-direction: row;
                    flex-wrap: nowrap;
                    align-items: center;
                    padding: 0.5rem;
                    margin: 0 0.5rem;
                    gap: 0.5rem;
                    background: #454545;
                    color: #FFFFFF;
                    font-size: 0.75rem;
                    border-radius: 2px;
                    .item-icon{
                        display: flex;
                        width: 2rem;
                        height: 2rem;
                        border: 1px solid #CCCCCC;
                        background: white;
                        background-size: auto 100%;
                        background-repeat: no-repeat;
                        flex-shrink: 0;
                        flex-grow: 0;
                    }
                    .item-content{
                        display: flex;
                        flex-direction: column;
                        gap: 0.2rem;
                        flex-shrink: 1;
                        flex-grow: 1;
                        overflow: hidden;
                        .item-text{
                            color: skyblue;
                        }
                    }
                    .item-count{
                        display: flex;
                        flex-shrink: 0;
                        flex-grow: 0;
                        font-size: 0.5rem;
                        background: #555555;
                        padding: 0.1rem 0.3rem;
                        border-radius: 1rem;
                    }
                    .item-check{
                        display: flex;
                        align-items: center;
                        gap: 0.25rem;
                        flex-shrink: 0;
                        flex-grow: 0;
                    }
                }
            }
            .upgrading-ed{
                display: flex;
                flex-direction: space-between;
                flex-wrap: nowrap;
                margin: 0.25rem;
                background: #555555;
                border-radius: 2px;
                .ed-title{
                    padding: 0.3rem 0.5rem;
                    color: blue;
                    overflow: hidden;
                    -webkit-clip-path: polygon(0 0,10rem 0%, 9.5rem 100%, 0% 100%);
                    clip-path: polygon(0 0,10rem 0%, 9.5rem, 0% 100%);
                    background: #333333;
                    width: 100%;
                }
                .ed-cost{
                    display: flex;
                    flex-wrap: nowrap;
                    align-items: center;
                    padding: 0.3rem 2.5rem;
                    background: #454545;
                    color: yellow;
                    .icon-ed{
                        width: 0.8rem;
                        height: 0.8rem;
                        background-size: auto 100%;
                        background-repeat: no-repeat;
                        background-image: url('@/assets/ED.png');
                        margin-right: 0.25rem;
                    }
                }
            }
            .upgrading-stone{
                display: grid;
                grid-template-columns: 1fr 1fr 1fr;
                column-gap: 0.25rem;
                margin: 0.25rem;
                padding: 0.25rem;
                background: #454545;
                .stone-item{
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    background: #DDDDDD;
                    .stone-title{
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        width: 100%;
                        -webkit-clip-path: polygon(10% 0%,90% 0%, 85% 100%, 15% 100%);
                        clip-path: polygon(10% 0%,90% 0%, 85% 100%, 15% 100%);
                        background: #333333;
                        padding: 0.3rem;
                        margin-top: -0.1rem;
                        color: skyblue;
                    }
                    .stone-box{
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        flex-shrink: 0;
                        width: 4rem;
                        height: 4rem;
                        margin: 0.5rem 0;
                        background: #FFFFFF;
                        border-radius: 50%;
                        .icon-enhacment{
                            background-image: url('@/assets/upgrading/Blessed_Enhacment_Stone.png');
                        }
                    }
                    .stone-text{
                        display: flex;
                        flex-direction: column;
                        align-items: center;
                        gap: 0.1rem;
                        font-size: 0.6rem;
                        .text-success{
                            color: skyblue;
                        }
                        .text-danger{
                            color: red;
                        }
                    }
                    .stone-cost{
                        display: flex;
                        flex-direction: column;
                        justify-content: flex-end;
                        gap: 0.2rem;
                        width: 100%;
                        margin: 0.2rem 0;
                        flex-grow: 1;
                        .cost-item{
                            display: flex;
                            flex-wrap: nowrap;
                            align-items: center;
                            border-radius: 2px;
                            background: #454545;
                            margin: 0 0.5rem;
                            .item-img{
                                display: flex;
                                flex: 0 0 auto;
                                width: 1.2rem;
                                height: 1.2rem;
                                background-size: auto 100%;
                                background-repeat: no-repeat;
                                background-image: url('@/assets/ED.png');
                            }
                            .item-count{
                                display: flex;
                                flex: 1 1 auto;
                                justify-content: center;
                                color: #FFFFFF;
                                font-size: 0.6rem;
                            }
                        }
                    }
                    .stone-button{
                        display: flex;
                        margin: 0.5rem 0;
                        height: 1.6rem;
                        .els-button{
                            display: flex;
                            justify-content: center;
                            align-items: center;
                            width: 6rem;
                            padding: 0.5rem;
                            background: skyblue;
                            color: #FFFFFF;
                            font-size: 0.7rem;
                            cursor: pointer;
                        }
                    }
                }
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
