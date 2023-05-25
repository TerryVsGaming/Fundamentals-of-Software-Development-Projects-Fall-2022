import React, { useContext} from 'react';
import { GlobalStoreContext } from '../store'

function EditSongModal() {
const { store } = useContext(GlobalStoreContext);
    //store.history = useHistory();


   function hideEditSongModal() {
        let modal = document.getElementById("edit-song-modal");
        modal.classList.remove("is-visible");
    }

    
    // function showAddSongModal() {
    //     let modal = document.getElementById("add-song-modal");
    //     modal.classList.add("is-visible");

    // }
    // THIS FUNCTION IS FOR HIDING THE MODAL
    // function hideAddSongModal() {
    //     let modal = document.getElementById("add-song-modal");
    //     modal.classList.remove("is-visible");
    // }
///
    function saveSongChanges (){
        let title = document.getElementById("edit-song-title");
        let artist = document.getElementById("edit-song-artist");
        let id = document.getElementById("edit-song-id");
        let pos = document.getElementById("edit-song-position");
        let newSong = {title: title.value , artist: artist.value, youTubeId: id.value};
        let position = pos.value;
       // let list = store.currentList;
       //let oldSong = list.songs[position];
        
        store.editSongTransaction(position, newSong)

        hideEditSongModal();
    }

        return (
            <div 
                class="modal" 
                id="edit-song-modal" 
                data-animation="slideInOutLeft">
                    <div class="modal-dialog" id='verify-edit-song-root'>
                        <div class="modal-north">
                            Edit Song
                        </div>
                        <div class="modal-center">
                            <div class="modal-center-content">
                            <table>
                                <tbody>
                            <tr>
                                <td>
                                    Title:    
                                </td> 
                                <input type = "hidden" id = "edit-song-position"/>
                                <td>
                                    <input text-align="right"  type="text" id="edit-song-title"/>
                                </td>
                        </tr>

                        <tr>
                            <td>
                                Artist:    
                            </td> 
                            
                            <td>
                                <input text-align="right" type="text" id="edit-song-artist"/>
                            </td>
                       </tr>

                       <tr>
                        <td>
                            YouTube Id:    
                        </td> 
                        
                        <td>
                            <input text-align="right" type="text" id="edit-song-id"/> 
                        </td>
                     </tr>
                     </tbody>
            </table>
                       

                            </div>
                        </div>
                        <div class="modal-south">
                            <input type="button" 
                                id="edit-song-confirm-button" 
                                class="modal-button" 
                                onClick={saveSongChanges}
                                value='Confirm' />
                            <input type="button" 
                                id="edit-song-cancel-button" 
                                class="modal-button" 
                                onClick={hideEditSongModal}
                                value='Cancel' />
                        </div>
                    </div>
            </div>
        );
    }

    export default EditSongModal;