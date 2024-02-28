<script setup lang="ts">
import { ref, watch } from 'vue';
import store from '@/store';
import { itemList } from './data.js'

defineProps({ 
    show: Boolean
})
const emits = defineEmits(['onClose'])

function handleClose(){
    emits('onClose')
}

function getLight(item){
    if(item.highLight){
        return 'high-light'
    }
    else if(item.midLight){
        return 'mid-light'
    }
    else{
        return ''
    }
}

</script>

<template>
    <el-dialog
        title="抽取概率"
        :modelValue="show"
        :before-close="handleClose"
        align-center
        width="80%"
    >
        <div class="ice-burners-information">
            <span>抽取概率参考Elwiki，请以实际情况为准哦</span>
            <el-table :data="itemList" max-height="250">
                <el-table-column property="name" label="道具">
                    <template #default="scope">
                        <div :class="getLight(scope.row)">{{scope.row.name}}</div>
                    </template>
                </el-table-column>
                <el-table-column property="rate" label="概率">
                    <template #default="scope">
                        <div :class="getLight(scope.row)">{{scope.row.rate}}%</div>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <template #footer>
            <span class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
            </span>
        </template>
    </el-dialog>
</template>

<style lang="less">
.ice-burners-information{
    text-align: left;
    .high-light{
        color: red
    }
    .mid-light{
        color: blue
    }
}
</style>
