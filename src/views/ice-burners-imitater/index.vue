<template>
    <div class="ice-burners-imilater">
        <!-- <Information
            :show="informationShow"
            :data="informationData"
            @onClose="informationShow = false"
        />
        <Result
            :show="resultShow"
            :data="resultData"
            @onClose="resultShow = false"
        />
        <TotalResult /> -->
        <div class="ice-burner">
            <div class="ice-burner-header">
                <router-link :to="{name: 'home'}">
                    <el-tooltip
                        class="item"
                        content="返回首页"
                        placement="bottom"
                        :enterable="false"
                    >
                        <el-icon class="ice-burner-set-icon" :size="50" color="#ccc"><back /></el-icon>
                    </el-tooltip>
                </router-link>
                <el-icon class="ice-burner-set-icon" :size="50" color="#ccc">
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
            <div class="ice-burner-center">
                <div class="ice-burner-img">
                    <div class="img-burner"><img src="@/assets/ice-burner.png" /></div>
                    <div class="img-key"><img src="@/assets/ice-sculpture-key.png" /></div>
                </div>
                <div class="ice-burner-button">
                    <el-button size="large" type="success" @click="gacha(1)">抽1次</el-button>
                    <el-button size="large" type="success" @click="gacha(10)">抽10次</el-button>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import { Back, Warning } from '@element-plus/icons-vue'
import Information from "./information.vue"
import Result from "./result.vue"
import TotalResult from "./total-result.vue"
import axios from '@/axios';

let informationShow = ref(false)
let informationData = ref()
let resultShow = ref(false)
let resultData = ref()

function gacha(num){
    resultData.value = num
    resultShow.value = true
}

/** 获取道具与概率信息 */
function getItems(){
    return axios.get({
        url: '/iceBurners/getItems',
    }).then(res => {
        informationData.value = res.data
    })
}

getItems()

</script>

<style lang="less">
.fade-enter-from, .fade-leave-to{ opacity: 0 }
.fade-enter-active, .fade-leave-active{ transition: all 0.3s ease; }
.ice-burners-imilater{
    position: absolute;
    left: 0;
    bottom: 0;
    top: 0;
    right: 0;
    background: white;
    background-image: url('@/assets/aurora-mystica.png');
    background-position: top right;
    background-size: auto 100%;
    background-repeat: no-repeat;
    .ice-burner{
        width: 100%;
        height: 100%;
        position: relative;
        .ice-burner-header{
            position: absolute;
            left: 12px;
            top: 12px;
            z-index: 50;
            .ice-burner-set-icon{
                margin-right: 16px;
                cursor: pointer;
                float: left;
                transition: all 0.3s;
            }
            .ice-burner-set-icon:hover{
                transform: scale(1.1)
            }
        }
        .ice-burner-center{
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%,-50%);
            user-select: none;
            .ice-burner-img{
                // position: absolute;
                // top: 50%;
                // left: 50%;
                // transform: translate(-50%,-50%);
                .img-burner{
                    margin: 0 auto;
                }
                .img-key{
                    position: absolute;
                    top: 19%;
                    left: 50%;
                    transform: translate(-50%,-50%);
                }
            }
            .ice-burner-button{
                text-align: center;
                margin-top: 12px;
                width: 100%;
            }
        }
    }
}
</style>
