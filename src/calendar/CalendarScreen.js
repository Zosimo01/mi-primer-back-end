import React, { useState } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar'; //libreria
import moment from 'moment'; //libreria

import { Navbar } from '../ui/Navbar'

import {messages} from '../helpers/calendar-message-es'; // objeto que cambia a español el calendario
import 'moment/locale/es'; //para utilizar " message", para cambiar los nombre a español

import 'react-big-calendar/lib/css/react-big-calendar.css'; //para darle istilo
import { CalendarEvent } from './CalendarEvent';
import { CalendarModal } from './CalendarModal';
import { useDispatch, useSelector} from 'react-redux';
import { open_modal } from '../action/action';
import { eventClearActiveEvent, eventSetActive } from '../action/events';
import { AddnewFab } from '../ui/AddnewFab';
import { DeleteEven } from '../ui/DeleteEven';

moment.locale('es');// para utilzar message

const localizer = momentLocalizer(moment);

// const events=[{ 
//     title:'Cumpleaños del jefe',
//     start:moment().toDate(),
//     end:moment().add(2,'hours').toDate(), //añadimos dos horas mas
//     bgcolor:'#fafafa',
//      user:{
//             _id:'123',
//             name:'tobby',
//         }
// }]

export const CalendarScreen = () => {
const dispatch = useDispatch();

const {events,activeEvent} = useSelector(state => state.calendar)


const [lasview, setlasview] = useState(localStorage.getItem('lastView' )|| 'month');

    const onDoubleClik=(e)=>{
        console.log( e )
        dispatch( open_modal());


    }
    const onSelectEvent=(e)=>{

        dispatch( eventSetActive(e) )

        
         
    }
    const onViewChange=(e)=>{
        setlasview(e)
        localStorage.setItem('lastView',e);
    }
            

const eventGetter =( event,start,end,isSelectot )=>{
    // console.log( event,start,end,isSelectot );  

    const style={
        backgroundColor:'#367CF7',
        borderRadius:'0px',
        opacity:0.8,
        dispaly:'block',
        color:'white',
       
    }

    return{
        style
    }
}


const onSelectSlot=(e)=>{
    dispatch( eventClearActiveEvent()  )
}
//

    return (
        <div className='calendar-screen' >
            <Navbar/>
            <h1> CalendarScreen </h1>

            <Calendar
            localizer={localizer}
            events={events}
            startAccessor="start"
            endAccessor="end"
            
            messages={ messages } //cambiamos el idioma
            components={ {
                event:CalendarEvent //= <Calendar event={events} />
            } } // renderizar un componente
            eventPropGetter={ eventGetter }  //ejecuta eventos automatico 
            onDoubleClickEvent={onDoubleClik } // doble click en nuestro nombre
            onSelectEvent={ onSelectEvent } // un solo click    
            onView={ onViewChange } // se ejecuata-en-Mes-dis_etc. muestra el nombre (e)
            view={ lasview } //se queda en la ultima vista al acutializar
            
            onSelectSlot={ onSelectSlot }//se activa en cualquier parte
            selectable={ true }// va junto con onSelectSlot

            style={{ height: 500 }}
            />

            <hr/>
            <AddnewFab/>
{
    ( activeEvent ) && <DeleteEven/>
    
    }
            <CalendarModal/>
          </div>
    )
}
