import Vue from "vue"
import Vuex from "vuex"

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        //state of the application, can store anything
    },
    mutations: {
        //mutations update the state
    },
    actions: {
        //actions can make requests to APIs but it also commit to mutations
    },
    modules: {
        //
    }
})