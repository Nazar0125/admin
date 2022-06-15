import React from "react";
import Modal from 'react-modal';

export const OpenImg = ({photo, isOpen, closeModal}) => {
    return (
        <>
        <Modal
                isOpen = {isOpen}
                onRequestClose = {closeModal}
                className={'sdsa'}
                ariaHideApp = {false}
                style={{
                    overlay: {
                      position: 'fixed',
                      top: 0,
                      left: 0,
                      right: 0,
                      bottom: 0,
                      backgroundColor: 'rgba(51, 51, 51, 0.50)'
                    }
                  }}
            >
                <div className = "modal-img__blog">
                    <p> 4646545 </p>
                </div>        
            </Modal>
        </>
    )
};