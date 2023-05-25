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
    constructor(initApp, initIndex, initOldSong, initNewSong ) {
        super();
        this.app = initApp;
        this.index = initIndex;
        this.oldSong = initOldSong;
        this.newSong = initNewSong;
    }

    doTransaction() {
        this.app.updateSong(this.index, this.newSong);
    }
    
    undoTransaction() {
        this.app.updateSong(this.index, this.oldSong);
    }
}