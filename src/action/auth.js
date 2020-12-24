import Swal from "sweetalert2";
import { fetchConToken, fetchSinToken } from "../helpers/fetch"
import { types } from "../types/types";

export const startLogin =(email,password)=>{
    return async(dispatch)=>{

        const resp=await fetchSinToken('auth',{ email,password }, 'POST');
        const body=await resp.json();
console.log( body ) 
        if(body.ok){
            localStorage.setItem('token',body.token);
            localStorage.setItem('token-init-date', new Date().getTime());

            dispatch( login( {
                uid:body.uid,
                name:body.name
            } ) )
        }else{
            Swal.fire('Error',body.grabado, 'error' )
        }

 
    }
}

//regsiter
export const startRegister =(email,password,name)=>{

    return async( dispatch ) => {

        const resp = await fetchSinToken( 'auth/create', { email, password, name }, 'POST' );
        const body = await resp.json();
console.log( body )
        if( body.ok ) {
            localStorage.setItem('token', body.token );
            localStorage.setItem('token-init-date', new Date().getTime() );

            dispatch( login({
                uid: body.uid,
                name: body.name
            }) )
        } else {
            Swal.fire('Error', body.grabado, 'error');
        }


    }
}


export const startchecking=()=>{
    return async( dispatch ) => {

        const resp = await fetchConToken( 'auth/token');
        const body = await resp.json();
console.log( body )
        if( body.ok ) {
            localStorage.setItem('token', body.token );
            localStorage.setItem('token-init-date', new Date().getTime() );

            dispatch( login({
                uid: body.uid,
                name: body.name
            }) )
        } else {
            Swal.fire('Error', body.msg, 'error');
            dispatch( finish() )
        }


    }
}

const finish=()=>({
    type:types.authCheckingFinish
})

const login=( user )=>({
    type:types.authLogin,
    payload:user
})
// const register=(name,email,password)=>({
//     type:types.authStartRegister,
//     payload:{
//         name,
//         email,
//         password
//     }
// })

