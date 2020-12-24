import React from 'react'
import { useDispatch } from 'react-redux'
import { open_modal } from '../action/action'

export const AddnewFab = () => {
    

    const dispatch = useDispatch()
    const handelAddEvent=()=>{
        dispatch( open_modal() )
    }
    
    return (
        
            <button 
            onClick={ handelAddEvent }
            >  add new event </button>
        
    )
}
