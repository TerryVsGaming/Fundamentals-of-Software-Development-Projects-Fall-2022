import React, { Component } from 'react';

export default class EditSongModal extends Component {
    render() {
        const {editSongCallback, hideEditSongModalCallback } = this.props;
       
        return (
            <div 
                class="modal" 
                id="edit-song-modal" 
                data-animation="slideInOutLeft">
                    <div class="modal-root" id='verify-edit-song-root'>
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
                                onClick={editSongCallback}
                                value='Confirm' />
                            <input type="button" 
                                id="edit-song-cancel-button" 
                                class="modal-button" 
                                onClick={hideEditSongModalCallback}
                                value='Cancel' />
                        </div>
                    </div>
            </div>
        );
    }
}