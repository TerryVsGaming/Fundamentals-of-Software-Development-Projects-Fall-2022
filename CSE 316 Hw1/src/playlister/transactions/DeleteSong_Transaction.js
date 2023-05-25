import jsTPS_Transaction from "../../common/jsTPS.js"
/**
 * MoveSong_Transaction
 * 
 * This class represents a transaction that works with drag
 * and drop. It will be managed by the transaction stack.
 * 
 * @author McKilla Gorilla
 * @author TerryVsGaming (Terry Shvartsman)
 */
export default class DeleteSong_Transaction extends jsTPS_Transaction {
    constructor(initModel,initIndex, initDeletedSong) {
        super();
        this.model = initModel;
        this.deletedSong = initDeletedSong;
        this.index = initIndex;
    }

    doTransaction() {
        this.model.deleteSongById(this.index);
    }
    
    undoTransaction() {
        this.model.appendSong(this.index, this.deletedSong);
    }
}