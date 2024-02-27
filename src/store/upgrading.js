import { createStore } from 'vuex'

export default createStore({
    state: {
        currentLevel: 0,
        itemsCost: {
            hammer: 0,
            ed: 0,
            advanced: 0,
            fluoriteOre: 0,
            fluoriteCrystal: 0,
            scroll: 0,
            stone: 0
        }
    },
    getters: {
    },
    mutations: {
        upgradingSetResult(state, result){
            state.currentLevel = result.result
            state.itemsCost = {
                hammer: state.itemsCost.hammer + result.hammerCost,
                ed: state.itemsCost.ed + result.edCost,
                advanced: state.itemsCost.advanced + result.advancedCost,
                fluoriteOre: state.itemsCost.fluoriteOre + result.fluoriteOreCost,
                fluoriteCrystal: state.itemsCost.fluoriteCrystal + result.fluoriteCrystalCost,
                scroll: state.itemsCost.scroll + result.scrollCost,
                stone: state.itemsCost.stone + result.stoneCost
            }
        }
    },
    actions: {
    },
    modules: {
    }
})