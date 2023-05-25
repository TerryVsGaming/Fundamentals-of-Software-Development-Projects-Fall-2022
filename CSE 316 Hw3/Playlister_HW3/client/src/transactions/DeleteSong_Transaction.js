import jsTPS_Transaction from "../common/jsTPS.js"
/**
 * MoveSong_Transaction
 * 
 * This class represents a transaction that works with drag
 * and drop. It will be managed by the transaction stack.
 * 
 * @author McKilla Gorilla
 * @author ?
 */
//
export default class DeleteSong_Transaction extends jsTPS_Transaction {
    constructor(initStore, initOldSongIndex, initOldSong) {
        super();
        this.store = initStore;
        this.oldSongIndex = initOldSongIndex;
        this.oldSong = initOldSong;
    }

    doTransaction() {
        this.store.deleteSong(this.oldSongIndex);
    }
    
    undoTransaction() {
        this.store.deleteSongUndo(this.oldSongIndex, this.oldSong);
    }
}