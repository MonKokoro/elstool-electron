import { createStore } from 'vuex'

import upgrading from './upgrading'

export default createStore({
    state: {
        iceBurnerTotalResult: {},
        iceBurnerTotal: 0,

        currentLevel: 0,
        upgradingTimes: 0,
        itemsCost: {
            hammer: 0,
            ed: 0,
            advanced: 0,
            fluoriteOre: 0,
            fluoriteCrystal: 0,
            scroll: 0
        }
    },
    getters: {
    },
    mutations: {
        iceBurnerSetResult(state, result){
            let totalResult = {...state.iceBurnerTotalResult}
            result.map((item) => {
                if(totalResult[item.id]){
                    totalResult[item.id].times++
                }
                else{
                    totalResult[item.id] = {...item, times: 1}
                }
            })
            state.iceBurnerTotalResult = totalResult
            state.iceBurnerTotal += result.length
            console.log(state.iceBurnerTotalResult)
        },

        upgradingSetResult(state, result){
            state.upgradingTimes = state.upgradingTimes + 1
            state.currentLevel = result.result
            state.itemsCost = {
                hammer: state.itemsCost.hammer + result.hammerCost,
                ed: state.itemsCost.ed + result.edCost,
                advanced: state.itemsCost.advanced + result.advancedCost,
                fluoriteOre: state.itemsCost.fluoriteOre + result.fluoriteOreCost,
                fluoriteCrystal: state.itemsCost.fluoriteCrystal + result.fluoriteCrystalCost,
                scroll: state.itemsCost.scroll + result.scrollCost
            }
        }
    },
    actions: {
    },
    modules: {
        
    }
})
