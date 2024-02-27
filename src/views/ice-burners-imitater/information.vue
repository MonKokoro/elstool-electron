<template>
    <el-dialog
        title="抽取概率"
        :modelValue="show"
        :before-close="handleClose"
        align-center
    >
        <div class="ice-burners-information">
            <span>抽取概率参考Elwiki，请以实际情况为准哦</span>
            <el-table :data="data" max-height="250">
                <el-table-column property="name" label="道具">
                    <template #default="scope">
                        <div :class="scope.row.highLight ? 'high-light' : ''">{{scope.row.name}}</div>
                    </template>
                </el-table-column>
                <el-table-column property="rate" label="概率">
                    <template #default="scope">
                        <div :class="scope.row.highLight ? 'high-light' : ''">{{scope.row.rate}}%</div>
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

<script setup lang="ts">
import { ref, watch } from 'vue';
import store from '@/store';
import axios from '@/axios';

defineProps({ 
    show: Boolean,
    data: Array
})
const emits = defineEmits(['onClose'])

function handleClose(){
    emits('onClose')
}

</script>

<style lang="less">
.ice-burners-information{
    text-align: left;
    .high-light{
        color: red
    }
}
</style>
