const baseURL=process.env.REACT_APP_API_URL

export const fetchSinToken=(endpoint,data,method='GET')=>{

const url=`${ baseURL }/${ endpoint }`;

if( method==='GET' ){
    return fetch(url);
    
}else{
    
    return fetch( url,{
        method,
        headers:{
        'Content-Type':'application/json'
    },
    body:JSON.stringify(data) 
    });
    }

}

export const fetchConToken=(endpoint,data,method='GET')=>{

    const url=`${ baseURL }/${ endpoint }`;
    const token=localStorage.getItem('token') || null
    console.log( token )
    
    if( method==='GET' ){
        return fetch(url,{
            headers:{
                'x-token':token
            }
        });
        
    }else{
        
        return fetch( url,{
            method,
            headers:{
            'Content-Type':'application/json',
            'x-token':token
        },
        body:JSON.stringify(data) 
        });
        }
    
    }
    