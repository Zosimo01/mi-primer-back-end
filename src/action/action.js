import { types } from "../types/types";

export const open_modal=()=>({
type:types.uiOpenModal,
});

export const close_modal=()=>({
    type:types.uiCloseModal,
})

export const eventUpdate=(event)=>({
    type:types.eventUpdate,
    payload:event,
}) ;