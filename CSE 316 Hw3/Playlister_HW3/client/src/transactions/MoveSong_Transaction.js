import jsTPS_Transaction from "../common/jsTPS.js"
/**
 * MoveSong_Transaction
 * 
 * This class represents a transaction that works with drag
 * and drop. It will be managed by the transaction stack.
 * /
 * @author McKilla Gorilla
 * @author ?
 */
export default class MoveSong_Transaction extends jsTPS_Transaction {
    constructor(initStore, initOldPosition, initNewPosition ) {
        super();
        this.store = initStore;
        this.oldPosition = initOldPosition;
        this.newPosition = initNewPosition;
    }

    doTransaction() {
        this.store.moveCallback(this.oldPosition, this.newPosition);
    }
    
    undoTransaction() {
        this.store.moveCallback(this.newPosition, this.oldPosition);
    }
}