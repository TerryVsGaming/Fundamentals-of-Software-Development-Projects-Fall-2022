import React from "react";

export default class SongCard extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isDragging: false,
            draggedTo: false
        }
    }
    handleDragStart = (event) => {
        event.dataTransfer.setData("song", event.target.id);
        this.setState(prevState => ({
            isDragging: true,
            draggedTo: prevState.draggedTo
        }));
    }
    handleDragOver = (event) => {
        event.preventDefault();
        this.setState(prevState => ({
            isDragging: prevState.isDragging,
            draggedTo: true
        }));
    }
    handleDragEnter = (event) => {
        event.preventDefault();
        this.setState(prevState => ({
            isDragging: prevState.isDragging,
            draggedTo: true
        }));
    }
    handleDragLeave = (event) => {
        event.preventDefault();
        this.setState(prevState => ({
            isDragging: prevState.isDragging,
            draggedTo: false
        }));
    }
    handleDrop = (event) => {
        event.preventDefault();
        let target = event.target;
        let targetId = target.id;
        targetId = targetId.substring(target.id.indexOf("-") + 1);
        let sourceId = event.dataTransfer.getData("song");
        sourceId = sourceId.substring(sourceId.indexOf("-") + 1);
        
        this.setState(prevState => ({
            isDragging: false,
            draggedTo: false
        }));

        // ASK THE MODEL TO MOVE THE DATA
        this.props.moveCallback(sourceId, targetId);
    }

    handleClick = (event) =>{
        event.preventDefault();
        let id = event.target.id.replace("song-","");
        this.props.editCallback(id);
    }   

    getItemNum = () => {
        return this.props.id.substring("playlist-song-".length);
    }

    showDeleteSongModal = (event) => {
        event.preventDefault();
        let id = event.target.id.replace("delete-song-","delete-song-modal-");
        let modal = document.getElementById(id);
        modal.classList.add("is-visible");
    }

    hideDeleteSongModal = (event) => {
        event.preventDefault();
        let id = event.target.id.replace("delete-song-cancel-button-","delete-song-modal-");
        let modal = document.getElementById(id);
        modal.classList.remove("is-visible");
    }

    deleteSongCallback = (event) => {
        event.preventDefault();
        let id = event.target.id.replace("delete-song-confirm-button-","");
        this.props.deleteSongConfirm(id-1, this.props.song);
        let modal = document.getElementById("delete-song-modal-" + id)
        modal.classList.remove("is-visible");
    }

    

    render() {
        const { song, selected} = this.props;
        let num = this.getItemNum();
        console.log("num: " + num);
        let itemClass = "playlister-song";
        if (this.state.draggedTo) {
            itemClass = "playlister-song-dragged-to";
        }

        let selectClass = "unselected-list-card";
        if (selected) {
            selectClass = "selected-list-card";
        }

        return (
            <div>

            <div 

                id={'song-' + num}
                className={itemClass + " " + selectClass}
                onDragStart={this.handleDragStart}
                onDragOver={this.handleDragOver}
                onDragEnter={this.handleDragEnter}
                onDragLeave={this.handleDragLeave}
                onDrop={this.handleDrop}
                onDoubleClick = {this.handleClick}
                draggable="true"
            >
                {num + "."}
                <a href={"https://www.youtube.com/watch?v=" + song.youTubeId} >
                {song.title} by {song.artist}
                </a>
                <input type="button" id={'delete-song-' + num} class="list-card-button" value="X" onClick = {this.showDeleteSongModal} ></input>
            </div>

            <div 
                class="modal" 
                id= {"delete-song-modal-" + num} 
                data-animation="slideInOutLeft">
                    <div class="modal-root" id='verify-delete-song-root'>
                        <div class="modal-north">
                            Delete Song?
                        </div>
                        <div class="modal-center">
                            <div class="modal-center-content">
                            Are you sure you wish to permanently delete the song? 
                            </div>
                        </div>
                        <div class="modal-south">
                            <input type="button" 
                                id={"delete-song-confirm-button-" + num} 
                                class="modal-button" 
                                onClick={this.deleteSongCallback}
                                value='Confirm' />
                            <input type="button" 
                                id={"delete-song-cancel-button-" + num} 
                                class="modal-button" 
                                onClick={this.hideDeleteSongModal}
                                value='Cancel' />
                        </div>
                    </div>
            </div>

            </div>
        )
    }
}