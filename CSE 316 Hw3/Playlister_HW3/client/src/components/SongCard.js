import React, { useContext, useState } from 'react'
import { GlobalStoreContext } from '../store'

function SongCard(props) {
    const { store } = useContext(GlobalStoreContext);
    const [isDragging, setIsDragging] = useState(false);
    const [draggedTo, setDraggedTo] = useState(false);

    const { song, index } = props;
    let cardClass = "list-card unselected-list-card";
   
    function handleClick (event) {
        event.preventDefault();
        let id = event.target.id.replace("song-","").replace("-card","");
        showEditSong(id);
    }  

    //remove-song-
    function deleteHandleClick (event){
        event.preventDefault();
        let id = event.target.id.replace("remove-song-","")
        showDeleteSong(id);
    }

    function showEditSongModal (position) {
        let pos = document.getElementById("edit-song-position");
        pos.value = position;
        let title = document.getElementById("edit-song-title");
        title.value = document.getElementById("song-" + position + "-title").textContent
        let artist = document.getElementById("edit-song-artist");
        artist.value = document.getElementById("song-" + position + "-artist").textContent
        let id = document.getElementById("edit-song-id");
        id.value = document.getElementById("song-" + position + "-id").value
        let modal = document.getElementById("edit-song-modal");
        modal.classList.add("is-visible");
    }

    function showDeleteSongModal (position){
        let pos = document.getElementById("delete-song-position");
        pos.value = position;
        let title = document.getElementById("delete-song-title");
        title.textContent = document.getElementById("song-" + position + "-title").textContent
        let modal = document.getElementById("delete-song-modal");
        modal.classList.add("is-visible");
    }




   function showEditSong (id) {
        showEditSongModal(parseInt(id));
    }

    function showDeleteSong (id){
        showDeleteSongModal(parseInt(id));
    }

   function handleDragStart (event)  {
        event.dataTransfer.setData("song", event.target.id);
        setIsDragging(true) 
    }
    
    function handleDragOver (event) {
        event.preventDefault();
        setDraggedTo(true)
    }
    function handleDragEnter (event) {
        event.preventDefault();
        setDraggedTo(true)
    }
    function handleDragLeave (event) {
        event.preventDefault();
        setDraggedTo(false)
    }

    function handleDrop (event)  {
        event.preventDefault();
        let target = event.target;
        let targetId = target.id;
        targetId = targetId.substring(targetId.indexOf("-") + 1);
        targetId = targetId.substring(0,targetId.indexOf("-"))
        let sourceId = event.dataTransfer.getData("song");
        sourceId = sourceId.substring(sourceId.indexOf("-") + 1);
        sourceId = sourceId.substring(0,sourceId.indexOf("-"));
        
        setDraggedTo(false)
        setIsDragging(false)

        // ASK THE MODEL TO MOVE THE DATA
        store.moveSongTransaction(sourceId, targetId);
    }
    


    return (
        
        <div
            onDoubleClick = {handleClick}
            key={index}
            id={'song-' + index + '-card'}
            className={cardClass}
            onDragStart={handleDragStart}
            onDragOver={handleDragOver}
            onDragEnter={handleDragEnter}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            draggable = "true"
        >
            {index + 1}.
            <a
                id={'song-' + index + '-link'}
                className="song-link"
                href={"https://www.youtube.com/watch?v=" + song.youTubeId}>
                
                <span id = {'song-' + index + '-title'}>{song.title}</span> by <span id = {'song-' + index + '-artist'}>{song.artist}</span>
            </a>
            <input
                onClick = {deleteHandleClick}
                type="button"
                id={"remove-song-" + index}
                className="list-card-button"
                value={"\u2715"}
            />
            <input
            type = "hidden"
            id = {"song-"+index+"-id"}
            value = {song.youTubeId}
            />
        </div>
    );
}

export default SongCard;