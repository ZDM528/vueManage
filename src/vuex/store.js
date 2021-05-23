import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
    state:{
        list:[],
    },
    mutations:{
        initList(state,list){
            state.list=list
        },
    },
    actions:{
        async getFoodList(context){
            const result=await axios.get('/getFoodList')
            const res=await axios.get("/getImage")
            result.data.image=res.data
            if(result && res){
                context.commit("initList",result.data)
            }
            return ''
        },
        async deleteFood(context,id){
            const result=await axios.get("/deleteFood",{params:{id:id}})
            if(result.data.code===200){
                 return 
            }
        }

    },
    getters:{
        
    }
})