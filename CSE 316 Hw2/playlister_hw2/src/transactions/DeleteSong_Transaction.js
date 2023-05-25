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
export default class RemoveSong_Transaction extends jsTPS_Transaction {
    constructor(initApp, initOldSongIndex, initOldSong) {
        super();
        this.app = initApp;
        this.oldSongIndex = initOldSongIndex;
        this.oldSong = initOldSong;
    }

    doTransaction() {
        this.app.deleteSongConfirm(this.oldSongIndex);
    }
    
    undoTransaction() {
        this.app.deleteSongUndo(this.oldSongIndex, this.oldSong);
    }
}