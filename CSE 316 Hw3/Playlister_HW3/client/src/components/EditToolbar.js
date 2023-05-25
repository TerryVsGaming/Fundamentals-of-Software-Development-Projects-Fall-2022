import { useContext } from 'react'
import { GlobalStoreContext } from '../store'
import { useHistory } from 'react-router-dom'
/*
    This toolbar is a functional React component that
    manages the undo/redo/close buttons.
    
    @author McKilla Gorilla
*/
function EditToolbar() {
    const { store } = useContext(GlobalStoreContext);
    const history = useHistory();

    let enabledButtonClass = "playlister-button";

    function addSong(){
        store.addSongTransaction();
    }


    function handleUndo() {
        store.undo();
    }
    function handleRedo() {
        store.redo();
    }
    function handleClose() {
        history.push("/");
        store.closeCurrentList();
    }
    let editStatus = false;
    if (store.isListNameEditActive) {
        editStatus = true;
    }

    let addSongClass = "toolbar-button";
    let undoClass = "toolbar-button";
    let redoClass = "toolbar-button";
    let closeClass = "toolbar-button";

    //foolproof
    let canAddSong = store.currentList !== null;
    let canUndo = store.hasTransactionToUndo();
    let canRedo = store.hasTransactionToRedo();
    let canClose = store.currentList !== null;

    return (
        <span id="edit-toolbar">
            <input
                type="button"
                id='add-song-button'
                //disabled={editStatus}
                value="+"
               // className={enabledButtonClass}
               className = {addSongClass}
                onClick = {addSong}
                 disabled = {!canAddSong}
            />
            <input
                type="button"
                id='undo-button'
                //disabled={editStatus}
                value="⟲"
               // className={enabledButtonClass}
               className = {undoClass}
                onClick={handleUndo}
                disabled = {!canUndo}
            />
            <input
                type="button"
                id='redo-button'
                //disabled={editStatus}
                value="⟳"
             //   className={enabledButtonClass}
             className = {redoClass}
                onClick={handleRedo}
                disabled = {!canRedo}
            />
            <input
                type="button"
                id='close-button'
               // disabled={editStatus}
                value="&#x2715;"
               // className={enabledButtonClass}
               className = {closeClass}
                onClick={handleClose}
                disabled = {!canClose}
            />
        </span>);
}

export default EditToolbar;