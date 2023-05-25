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
export default class EditSong_Transaction extends jsTPS_Transaction {
    constructor(initStore, initIndex, initOldSong, initNewSong ) {
        super();
        this.store = initStore;
        this.index = initIndex;
        this.oldSong = initOldSong;
        this.newSong = initNewSong;
    }

    doTransaction() {
        this.store.editSong(this.index, this.newSong);
    }
    
    undoTransaction() {
        this.store.editSong(this.index, this.oldSong);
    }
}