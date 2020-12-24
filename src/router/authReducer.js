import { types } from "../types/types"

const initialstate={
    checking:true,
    // uid:null,
    // name:null

}

export const authReducer=(state=initialstate,action)=>{
    switch(action.type){
        case types.authLogin:return { ...state ,checking:false,...action.payload}
       case types.authCheckingFinish:return{
           ...state,
           checking:false
       }
       
        default:return state
    }
}