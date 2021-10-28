import { SET_MODAL_HIDDEN, SET_MODAL_VISIABLE } from "../types/modalTypes";

const modal = {
    visiable : false,
    Component : ''
}

const modalReducers = (state = modal, action) => {
    switch (action.type) { 

    case SET_MODAL_VISIABLE:
        state.visiable = true;
        state.Component = action.Component;
        return { ...state}
    case SET_MODAL_HIDDEN:
        state.visiable = false;
        return { ...state}
    default:
        return state
    }
}

export default modalReducers;
