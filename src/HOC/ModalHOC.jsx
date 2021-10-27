import React from 'react'
import { Modal } from 'react-responsive-modal';
import { useSelector, useDispatch } from 'react-redux';
import { setModalHidden } from '../redux/actions/modalActions';
import { SET_MODAL_HIDDEN } from '../redux/types/modalTypes';

export default function ModalHOC() {
    const {visiable, Component} = useSelector(state => state.modal)
    const dispatch = useDispatch()
    console.log(visiable)
    return (
        <div>
        <Modal open={visiable} onClose={() => {
            dispatch(setModalHidden(SET_MODAL_HIDDEN))
        }} center blockScroll={false}>
            {Component}
        </Modal>
    </div>
    )
}
