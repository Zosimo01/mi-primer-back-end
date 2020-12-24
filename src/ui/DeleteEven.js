import React from 'react'
import { useDispatch } from 'react-redux';
import { eventDelete } from '../action/events';

export const DeleteEven = () => {
const dispatch = useDispatch();

const handledelete=()=>{
dispatch( eventDelete() )
}

    return (
        <button 
        onClick={ handledelete }
        >
            borrar
        </button>
    )
}
