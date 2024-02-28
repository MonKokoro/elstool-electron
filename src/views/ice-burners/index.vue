<script setup>
import { ref } from 'vue';
import { Back, Warning } from '@element-plus/icons-vue'
import Information from "./information.vue"
import Result from "./result.vue"

let informationShow = ref(false)
let resultShow = ref(false)
let resultData = ref()

function gacha(num){
    resultData.value = num
    resultShow.value = true
}
</script>

<template>
    <Information
        :show="informationShow"
        @onClose="informationShow = false"
    />
    <Result
        :show="resultShow"
        :data="resultData"
        @onClose="resultShow = false"
    />
    <div class="ice-burners">
        <div class="ice-burner-header">
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
                <!-- <div class="img-key"><img src="@/assets/ice-sculpture-key.png" /></div> -->
            </div>
            <div class="ice-burner-button">
                <el-button type="success" @click="gacha(1)">抽1次</el-button>
                <el-button type="success" @click="gacha(10)">抽10次</el-button>
            </div>
        </div>
    </div>
</template>

<style scoped lang="less">
.ice-burners{
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

            display: flex;
            justify-content: center;
            flex-direction: column;
            .ice-burner-img{
                position: relative;
                // top: 50%;
                // left: 50%;
                .img-burner{
                    img{
                        width: auto;
                        max-width: 80%;
                        height: auto;
                        max-height: 50%;
                    }
                }
                // .img-key{
                //     position: absolute;
                //     top: 19%;
                //     left: 50%;
                //     transform: translate(-50%,-50%);
                // }
            }
            .ice-burner-button{
                display: flex;
                justify-content: center;
                margin-top: 12px;
                width: 100%;
            }
        }
}
</style>
