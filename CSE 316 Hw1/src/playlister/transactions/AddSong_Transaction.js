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
export default class AddSong_Transaction extends jsTPS_Transaction {
    constructor(initModel, initNewSong) {
        super();
        this.model = initModel;
        this.newSong = initNewSong;
    }

    doTransaction() {
        this.model.addNewSong(this.newSong);
    }
    
    undoTransaction() {
        this.model.deleteSong(this.newSong);
    }
}