/** 记录每个强化等级下的概率、消耗等 */
/**
 * @param {*} target 目标等级
 * @param {*} success 成功概率
 * @param {*} destory 破坏概率
 * @param {*} noChange 无变化概率
 * @param {*} downgrade 降级概率
 * @param {*} reset 归零概率
 * @returns 
 */
const upgradeDataMap = {
    0: {
        target: 1,
        success: 1,
        destory: 0,
        noChange: 0,
        downgrade: 0,
        reset: 0
    },
    1: {
        target: 2,
        success: 1,
        destory: 0,
        noChange: 0,
        downgrade: 0,
        reset: 0
    },
    2: {
        target: 3,
        success: 0.9,
        destory: 0,
        noChange: 0.1,
        downgrade: 0,
        reset: 0
    },
    3: {
        target: 4,
        success: 0.8,
        destory: 0,
        noChange: 0.2,
        downgrade: 0,
        reset: 0
    },
    4: {
        target: 5,
        success: 0.7,
        destory: 0,
        noChange: 0.3,
        downgrade: 0,
        reset: 0
    },
    5: {
        target: 6,
        success: 0.6,
        destory: 0,
        noChange: 0.4,
        downgrade: 0,
        reset: 0
    },
    6: {
        target: 7,
        success: 0.2,
        destory: 0,
        noChange: 0.8,
        downgrade: 0,
        reset: 0
    },
    7: {
        target: 8,
        success: 0.05,
        destory: 0,
        noChange: 0.15,
        downgrade: 0.3,
        reset: 0.5
    },
    8: {
        target: 9,
        success: 0.02,
        destory: 0.2,
        noChange: 0.1,
        downgrade: 0.28,
        reset: 0.4
    },
    9: {
        target: 10,
        success: 0.01,
        destory: 0.25,
        noChange: 0.07,
        downgrade: 0.27,
        reset: 0.4
    },
    10: {
        target: 11,
        success: 0.007,
        destory: 0.353,
        noChange: 0.07,
        downgrade: 0.27,
        reset: 0.3
    },
    11: {
        target: 12,
        success: 0.01,
        destory: 0.25,
        noChange: 0.07,
        downgrade: 0.27,
        reset: 0.4
    },
    12: {
        target: 13,
        success: 0.01,
        destory: 0.29,
        noChange: 0.03,
        downgrade: 0.27,
        reset: 0.4
    }
}