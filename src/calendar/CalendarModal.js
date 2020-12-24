import React, { useEffect, useState } from 'react'
import Modal from 'react-modal';

import DateTimePicker from 'react-datetime-picker';
import moment from 'moment';

import Swal from 'sweetalert2'
import { useDispatch, useSelector } from 'react-redux';
import { close_modal, eventUpdate } from '../action/action';
import { eventAddNew, eventClearActiveEvent } from '../action/events';

const customStyles = {
    content : {
      top                   : '50%',
      left                  : '50%',
      right                 : 'auto',
      bottom                : 'auto',
      marginRight           : '-50%',
      transform             : 'translate(-50%, -50%)'
    }
  };

  Modal.setAppElement('#root')

  //handle time piker
  const now=moment().minute(0).second(0).add(1,'hours');//minuto cero ,second cero y un ahora mas
const dateEnd=now.clone().minute(0).second(0).add(1,'hours');//clonamos

const initstate={
  title:'Evento',
  notes:'',
  start:now.toDate(),
  end:dateEnd.toDate(),
}
export const CalendarModal = () => {
  const {modalOpen} = useSelector(state => state.ui);
  const {activeEvent} = useSelector(state => state.calendar);


const [dateStart, setdateStart] = useState(now.toDate());
const [date_end, setdate_end] = useState(dateEnd.toDate());
const [titleValue, settitleValue] = useState(true);

const [formValue, setformValue] = useState(initstate);

const { notes, title,start,end }=formValue;

useEffect(() => {
  if( activeEvent ){
    setformValue( activeEvent )
  }else{
    setformValue( initstate )
  }
}, [activeEvent,setformValue])


const handleInputChange=({target})=>{

setformValue({
  ...formValue,
  [target.name]:target.value,
});

}
const dispatch = useDispatch();
const closeModal=()=>{
  //TODO: cerrar el modal
  dispatch( close_modal() )
  dispatch(eventClearActiveEvent())
setformValue( initstate );

}

//start
const handleStartDateChange=(e)=>{
  setdateStart(e)

  setformValue( {
    ...formValue,
    start:e,
  } )
  console.log(e)
}
//end

const handleEndDateChange=(e)=>{
setdate_end(e);

setformValue({
  ...formValue,
  end:e,
})
  console.log(e);
}

//
const handleSubmit=(e)=>{
  e.preventDefault();
const momentStart=moment( start );
const momentEnd=moment( end );

if(momentStart.isSameOrAfter( momentEnd )){//si la fecha un es igual o mayor a la fech ados "error"

Swal.fire('Error','Fecha 2 debe ser mayor ala fecha de inicio','error');
return;
}
if( title.trim()<2){
  settitleValue(false)

}

if(activeEvent){
dispatch( eventUpdate( formValue ) )
}
else{
  dispatch( eventAddNew( {...formValue,id:new Date().getTime(),user:{ _id:123,
    name:'kisy' }} ) )
  }

settitleValue(true)
//TODO: base de datos
closeModal()

}

    return (
        <Modal
          isOpen={modalOpen}
        //   onAfterOpen={afterOpenModal}
          onRequestClose={closeModal}//para cerrar el modal
          style={customStyles}
        //   contentLabel="Example Modal"
        closeTimeoutMS={ 200 }
        className='modal' //de css
        overlayClassName='modal-fondo' //ejecuta all cerrar
        >
    <h1>{ activeEvent ? 'editar evento' :'nuevo evento' }</h1>
<hr />
<form
className="container"
onSubmit={ handleSubmit }
>

    <div className="form-group">
        <label>Fecha y hora inicio</label>
        <DateTimePicker
        onChange={handleStartDateChange}
        value={dateStart}
        className='form-control'
      />
      
    </div>

    <div className="form-group">
        <label>Fecha y hora fin</label>
        <DateTimePicker
        onChange={handleEndDateChange}
        value={date_end}
        minDate={ dateStart }//validamos que esta fecha no sea menor a la fecha anterior
        className='form-control'
      />
    </div>

    <hr />
    <div className="form-group">
        <label>Titulo y notas</label>
        <input 
            type="text" 
            className={`form-control ${ !titleValue &&  'is-invalid'} `}
            placeholder="Título del evento"
            name="title"
            autoComplete="off"
            value={ title }
            onChange={ handleInputChange }
        />
        <small id="emailHelp" className="form-text text-muted">Una descripción corta</small>
    </div>

    <div className="form-group">
        <textarea 
            type="text" 
            className="form-control"
            placeholder="Notas"
            rows="5"
            name="notes"
            value={ notes }
            onChange={ handleInputChange }
        ></textarea>
        <small id="emailHelp" className="form-text text-muted">Información adicional</small>
    </div>

    <button
        type="submit"
        className="btn btn-outline-primary btn-block"
    >
        <i className="far fa-save"></i>
        <span> Guardar</span>
    </button>

</form>
       
        </Modal>
    )
}
