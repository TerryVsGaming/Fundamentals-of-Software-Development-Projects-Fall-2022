import { createContext, useState } from 'react'
import jsTPS from '../common/jsTPS'
import api from '../api'
import AddSong_Transaction from '../transactions/AddSong_Transaction';
import EditSong_Transaction from '../transactions/EditSong_Transaction';
import DeleteSong_Transaction from '../transactions/DeleteSong_Transaction';
import MoveSong_Transaction from '../transactions/MoveSong_Transaction';

export const GlobalStoreContext = createContext({});
/*
    This is our global data store. Note that it uses the Flux design pattern,
    which makes use of things like actions and reducers. 
    
    @author McKilla Gorilla
*/

// THESE ARE ALL THE TYPES OF UPDATES TO OUR GLOBAL
// DATA STORE STATE THAT CAN BE PROCESSED
export const GlobalStoreActionType = {
    CHANGE_LIST_NAME: "CHANGE_LIST_NAME",
    CLOSE_CURRENT_LIST: "CLOSE_CURRENT_LIST",
    CREATE_NEW_LIST: "CREATE_NEW_LIST",
    LOAD_ID_NAME_PAIRS: "LOAD_ID_NAME_PAIRS",
    SET_CURRENT_LIST: "SET_CURRENT_LIST",
    SET_LIST_NAME_EDIT_ACTIVE: "SET_LIST_NAME_EDIT_ACTIVE",
}

// WE'LL NEED THIS TO PROCESS TRANSACTIONS
const tps = new jsTPS();

// WITH THIS WE'RE MAKING OUR GLOBAL DATA STORE
// AVAILABLE TO THE REST OF THE APPLICATION
export const useGlobalStore = () => {
    // THESE ARE ALL THE THINGS OUR DATA STORE WILL MANAGE
    const [store, setStore] = useState({
        idNamePairs: [],
        currentList: null,
        newListCounter: 0,
        listNameActive: false
    });

    // HERE'S THE DATA STORE'S REDUCER, IT MUST
    // HANDLE EVERY TYPE OF STATE CHANGE
    const storeReducer = (action) => {
        const { type, payload } = action;
        switch (type) {
            // LIST UPDATE OF ITS NAME
            case GlobalStoreActionType.CHANGE_LIST_NAME: {
                return setStore({
                    idNamePairs: payload.idNamePairs,
                    currentList: payload.playlist,
                    newListCounter: store.newListCounter,
                    listNameActive: false
                });
            }
            // STOP EDITING THE CURRENT LIST
            case GlobalStoreActionType.CLOSE_CURRENT_LIST: {
                return setStore({
                    idNamePairs: store.idNamePairs,
                    currentList: null,
                    newListCounter: store.newListCounter,
                    listNameActive: false
                })
            }
            // CREATE A NEW LIST
            case GlobalStoreActionType.CREATE_NEW_LIST: {
                return setStore({
                    idNamePairs: store.idNamePairs,
                    currentList: payload,
                    newListCounter: store.newListCounter + 1,
                    listNameActive: false
                })
            }

            // GET ALL THE LISTS SO WE CAN PRESENT THEM
            case GlobalStoreActionType.LOAD_ID_NAME_PAIRS: {
                return setStore({
                    idNamePairs: payload,
                    currentList: null,
                    newListCounter: store.newListCounter,
                    listNameActive: false
                });
            }
            // PREPARE TO DELETE A LIST
            case GlobalStoreActionType.MARK_LIST_FOR_DELETION: {
                return setStore({
                    idNamePairs: store.idNamePairs,
                    currentList: null,
                    newListCounter: store.newListCounter,
                    listNameActive: false
                });
            }
            // UPDATE A LIST
            case GlobalStoreActionType.SET_CURRENT_LIST: {
                return setStore({
                    idNamePairs: store.idNamePairs,
                    currentList: payload,
                    newListCounter: store.newListCounter,
                    listNameActive: false
                });
            }
            // START EDITING A LIST NAME
            case GlobalStoreActionType.SET_LIST_NAME_EDIT_ACTIVE: {
                return setStore({
                    idNamePairs: store.idNamePairs,
                    currentList: payload,
                    newListCounter: store.newListCounter,
                    listNameActive: true
                });
            }
            default:
                return store;
        }
    }
    // THESE ARE THE FUNCTIONS THAT WILL UPDATE OUR STORE AND
    // DRIVE THE STATE OF THE APPLICATION. WE'LL CALL THESE IN 
    // RESPONSE TO EVENTS INSIDE OUR COMPONENTS.

    // THIS FUNCTION PROCESSES CHANGING A LIST NAME
    store.changeListName = function (id, newName) {    
        // GET THE LIST
        async function asyncChangeListName(id) {
            let response = await api.getPlaylistById(id);
            if (response.data.success) {
                let playlist = response.data.playlist;
                playlist.name = newName;
                async function updateList(playlist) {
                    response = await api.updatePlaylistById(playlist._id, playlist);
                    if (response.data.success) {
                        async function getListPairs(playlist) {
                            response = await api.getPlaylistPairs();
                            if (response.data.success) {
                                let pairsArray = response.data.idNamePairs;
                                storeReducer({
                                    type: GlobalStoreActionType.CHANGE_LIST_NAME,
                                    payload: {
                                        idNamePairs: pairsArray,
                                        playlist: playlist
                                    }
                                });
                            }
                        }
                        getListPairs(playlist);
                    }
                }
                updateList(playlist);
            }
        }
        asyncChangeListName(id);
    }

    // THIS FUNCTION PROCESSES CLOSING THE CURRENTLY LOADED LIST
    store.closeCurrentList = function () {
        tps.clearAllTransactions()
        storeReducer({
            type: GlobalStoreActionType.CLOSE_CURRENT_LIST,
            payload: {}
        });
    }

    // THIS FUNCTION LOADS ALL THE ID, NAME PAIRS SO WE CAN LIST ALL THE LISTS
    store.loadIdNamePairs = function () {
        async function asyncLoadIdNamePairs() {
            const response = await api.getPlaylistPairs();
            if (response.data.success) {
                let pairsArray = response.data.idNamePairs;
                storeReducer({
                    type: GlobalStoreActionType.LOAD_ID_NAME_PAIRS,
                    payload: pairsArray
                });
            }
            else {
                console.log("API FAILED TO GET THE LIST PAIRS");
            }
        }
        asyncLoadIdNamePairs();
    }

    store.setCurrentList = function (id) {
        async function asyncSetCurrentList(id) {
            let response = await api.getPlaylistById(id);
            if (response.data.success) {
                let playlist = response.data.playlist;

                if (response.data.success) {
                    storeReducer({
                        type: GlobalStoreActionType.SET_CURRENT_LIST,
                        payload: playlist
                    });
                    store.history.push("/playlist/" + playlist._id, playlist);
                }
            }
        }
        asyncSetCurrentList(id);
    }
    store.getPlaylistSize = function() {
        return store.currentList.songs.length;
    }
    store.undo = function () {
        tps.undoTransaction();
    }
    store.redo = function () {
        tps.doTransaction();
    }

    store.hasTransactionToUndo = function(){
        return tps.hasTransactionToUndo() 
    }
    store.hasTransactionToRedo = function(){
        return tps.hasTransactionToRedo() 
    }

    store.canClose = function (){
        return store.currentList != null
    }

    store.canAdd = function (){
        return store.currentList != null
    }

    // THIS FUNCTION ENABLES THE PROCESS OF EDITING A LIST NAME
    store.setlistNameActive = function () {
        storeReducer({
            type: GlobalStoreActionType.SET_LIST_NAME_EDIT_ACTIVE,
            payload: null
        });
    }

    store.createNewList = function () {
        async function asyncCreateNewList () {
            let response = await api.createNewPlaylist();
            if (response.data.success) {
                const pair = {_id: response.data.playlist._id, name: response.data.playlist.name};
                store.idNamePairs.push(pair)
                storeReducer({
                    type: GlobalStoreActionType.CREATE_NEW_LIST,
                    payload: {name: "Untitled", songs: [] }
                });
            }
        }
        asyncCreateNewList()
    }

    store.addSong = function () {
        async function asyncAddSong () {
            let response = await api.createSong(store.currentList._id);
            if (response.data.success) {
                // const pair = {_id: response.data.playlist._id, name: response.data.playlist.name};
                // store.idNamePairs.push(pair)
                store.currentList.songs.push({title: "Unknown", artist: "Untitled", youTubeId: "dQw4w9WgXcQ"})
                storeReducer({
                    type: GlobalStoreActionType.SET_CURRENT_LIST,
                    payload: store.currentList
                });
            }
        }
        asyncAddSong()
    }

    store.addSongTransaction = function (){
        let transaction = new AddSong_Transaction(this, store.currentList.songs.length);
        tps.addTransaction(transaction);
    }

    store.editSongTransaction = function (position, newSong){
        let transaction = new EditSong_Transaction(this,position,store.currentList.songs[position],newSong);
        tps.addTransaction(transaction);
    }

    store.deleteSongTransaction = function(position){
        let transaction = new DeleteSong_Transaction(this,position,store.currentList.songs[position]);
        tps.addTransaction(transaction);
    }

    store.moveSongTransaction = function (oldPosition, newPosition){
        let transaction = new MoveSong_Transaction(this,oldPosition,newPosition);
        tps.addTransaction(transaction);
    }


    // store.deleteSongTransaction = function (){
    //     let transaction = new DeleteSong_Transaction(this, store.currentList.songs.length);
    //     tps.addTransaction(transaction);
    // }


    store.editSong = function (position, newSong){
        async function asyncEditSong () {
            let response = await api.editSong(store.currentList._id, position, newSong);
            if (response.data.success) {
                // const pair = {_id: response.data.playlist._id, name: response.data.playlist.name};
                // store.idNamePairs.push(pair)
                store.currentList.songs[position] = newSong
                storeReducer({
                    type: GlobalStoreActionType.SET_CURRENT_LIST,
                    payload: store.currentList
                });
            }
        }
        asyncEditSong()
    }
    

    store.deleteSong = function (position){
        async function asyncDeleteSong () {
            let response = await api.deleteSong(store.currentList._id, position);
            if (response.data.success) {
                // const pair = {_id: response.data.playlist._id, name: response.data.playlist.name};
                // store.idNamePairs.push(pair)
                store.currentList.songs.splice(position, 1) 
                storeReducer({
                    type: GlobalStoreActionType.SET_CURRENT_LIST,
                    payload: store.currentList
                });
            }
        }
        asyncDeleteSong()
    }

    store.deleteSongUndo = function(position, song){
        let playlist = store.currentList
        playlist.songs.splice(position, 0, song)

        async function updateList(playlist) {
            let response = await api.updatePlaylistById(playlist._id, playlist);
            if (response.data.success) {
                storeReducer({
                    type: GlobalStoreActionType.SET_CURRENT_LIST,
                    payload: store.currentList
                });
            }
        }
        updateList(playlist);
    }

    store.moveCallback = function (oldPosition, newPosition){
        let song = store.currentList.songs[oldPosition]
        store.currentList.songs.splice(oldPosition, 1)
        store.currentList.songs.splice(newPosition, 0, song)
        let playlist = store.currentList
        async function updateList(playlist) {
        let response = await api.updatePlaylistById(playlist._id, playlist);   
        if (response.data.success) {
                storeReducer({
                    type: GlobalStoreActionType.SET_CURRENT_LIST,
                    payload: store.currentList
                });
            }
        }
        updateList(playlist);
    }


    store.deleteList = function (id){
        async function asyncDeleteList (){
            let response = await api.deletePlaylist(id);
            if (response.data.success) {
                // const pair = {_id: response.data.playlist._id, name: response.data.playlist.name};
                // store.idNamePairs.push(pair)
                store.currentList = null
                store.idNamePairs = store.idNamePairs.filter(function (value, index, array){return value._id !== id})

                storeReducer({
                    type: GlobalStoreActionType.MARK_LIST_FOR_DELETION,
                    payload: null
                });
            } 
        }
        asyncDeleteList()
    }
    
    store.setIsListNameEditActive = function(){
        store.listNameActive = true
    }


    // THIS GIVES OUR STORE AND ITS REDUCER TO ANY COMPONENT THAT NEEDS IT
    return { store, storeReducer };
}