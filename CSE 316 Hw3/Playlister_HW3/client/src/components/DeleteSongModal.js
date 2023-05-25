import React, { useContext} from 'react';
import { GlobalStoreContext } from '../store'

function DeleteSongModal() {
const { store } = useContext(GlobalStoreContext);
    //store.history = useHistory();


   function hideDeleteSongModal() {
        let modal = document.getElementById("delete-song-modal");
        modal.classList.remove("is-visible");
    }



    function saveSongChanges (){
        let pos = document.getElementById("delete-song-position");
        let position = pos.value;
        store.deleteSongTransaction(position)
        hideDeleteSongModal();
    }
//
        return (
            <div 
                class="modal" 
                id="delete-song-modal" 
                data-animation="slideInOutLeft">
                    <div class="modal-dialog" id='verify-delete-song-root'>
                        <div class="modal-north">
                         Delete <span id = "delete-song-title"></span>?
                        </div>
                        <div class="modal-center">
                            <div class="modal-center-content">
                            Are you sure you wish to permanently delete this song?
                        </div>
                        <input type = "hidden" id = "delete-song-position"/>
                        </div>
                        <div class="modal-south">
                            <input type="button" 
                                id="delete-song-confirm-button" 
                                class="modal-button" 
                                onClick={saveSongChanges}
                                value='Confirm' />
                            <input type="button" 
                                id="delete-song-cancel-button" 
                                class="modal-button" 
                                onClick={hideDeleteSongModal}
                                value='Cancel' />
                        </div>
                    </div>
            </div>
        );
    }

    export default DeleteSongModal;