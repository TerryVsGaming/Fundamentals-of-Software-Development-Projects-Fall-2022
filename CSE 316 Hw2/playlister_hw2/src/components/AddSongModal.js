import React, { Component } from 'react';

export default class AddSongModal extends Component {
    render() {
        const {addSongCallback, hideAddSongModalCallback } = this.props;
       
        return (
            <div 
                class="modal" 
                id="add-song-modal" 
                data-animation="slideInOutLeft">
                    <div class="modal-root" id='verify-add-song-root'>
                        <div class="modal-north">
                            Add Song
                        </div>
                        <div class="modal-center">
                            <div class="modal-center-content">
                            <table>
                                <tbody>
                            <tr>
                                <td>
                                    Title:    
                                </td> 
                                
                                <td>
                                    <input text-align="right" value= "Untitled"  type="text" id="add-song-title"/>
                                </td>
                        </tr>

                        <tr>
                            <td>
                                Artist:    
                            </td> 
                            
                            <td>
                                <input text-align="right" value = "Unknown" type="text" id="add-song-artist"/>
                            </td>
                       </tr>

                       <tr>
                        <td>
                            YouTube Id:    
                        </td> 
                        
                        <td>
                            <input text-align="right" type="text" value = "dQw4w9WgXcQ" id="add-song-id"/> 
                        </td>
                     </tr>
                     </tbody>
            </table>
                       

                            </div>
                        </div>
                        <div class="modal-south">
                            <input type="button" 
                                id="add-song-confirm-button" 
                                class="modal-button" 
                                onClick={addSongCallback}
                                value='Confirm' />
                            <input type="button" 
                                id="add-song-cancel-button" 
                                class="modal-button" 
                                onClick={hideAddSongModalCallback}
                                value='Cancel' />
                        </div>
                    </div>
            </div>
        );
    }
}