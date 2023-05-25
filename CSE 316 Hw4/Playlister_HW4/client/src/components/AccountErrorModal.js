import { useContext } from 'react'
import GlobalStoreContext from '../store';
import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};
//
export default function AccountErrorModal() {
    const { store } = useContext(GlobalStoreContext);
    
    let errorMessage = "";
    if (store.currentError) {
        errorMessage = store.currentError;
    }

    function handleDeleteList(event) {
        store.deleteMarkedList();
    }
    function handleConfirm(event) {
        store.setError(null);
    }

    return (
        /* If theres an error, open error modal*/
        <Modal
            open={store.currentError !== null}
        >
            <Box sx={style}>
                <div className="modal-dialog">
                <header className="dialog-header">
                    Error Registering!
                </header>
                {errorMessage}
                <div id="confirm-cancel-container">

                    <button
                        id="dialog-yes-button"
                        className="modal-button"
                        onClick={handleConfirm}
                    >Confirm</button>
                   
                </div>
            </div>
            </Box>
        </Modal>
    );
}