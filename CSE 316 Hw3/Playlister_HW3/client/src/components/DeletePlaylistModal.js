import React, { useContext} from 'react';
import { GlobalStoreContext } from '../store'

function DeletePlaylistModal() {
const { store } = useContext(GlobalStoreContext);
    //store.history = useHistory();


   function hideDeletePlaylistModal() {
        let modal = document.getElementById("delete-playlist-modal");
        modal.classList.remove("is-visible");
    }



    function savePlaylistChanges (){
        let pos = document.getElementById("delete-playlist-position");
        let position = pos.value;
        store.deleteList(position)
        hideDeletePlaylistModal();
    }
//
        return (
            <div 
                class="modal" 
                id="delete-playlist-modal" 
                data-animation="slideInOutLeft">
                    <div class="modal-dialog" id='verify-delete-playlist-root'>
                        <div class="modal-north">
                         Delete this playlist?

                        </div>
                        <div class="modal-center">
                            <div class="modal-center-content">
                            Are you sure you wish to permanently delete the <span id = "delete-playlist-title"></span> playlist?
                        </div>
                        
                        <input type = "hidden" id = "delete-playlist-position"/>
                        </div>
                        <div class="modal-south">
                            <input type="button" 
                                id="delete-playlist-confirm-button" 
                                class="modal-button" 
                                onClick={savePlaylistChanges}
                                value='Confirm' />
                            <input type="button" 
                                id="delete-playlist-cancel-button" 
                                class="modal-button" 
                                onClick={hideDeletePlaylistModal}
                                value='Cancel' />
                        </div>
                    </div>
            </div>
        );
    }

    export default DeletePlaylistModal;