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
export default class MoveSong_Transaction extends jsTPS_Transaction {
    constructor(initModel, initOldIndex, initNewIndex) {
        super();
        this.model = initModel;
        this.oldIndex = initOldIndex;
        this.newIndex = initNewIndex;
    }

    doTransaction() {
        this.model.moveSong(this.oldIndex, this.newIndex);
    }
    
    undoTransaction() {
        this.model.moveSong(this.newIndex, this.oldIndex);
    }
}