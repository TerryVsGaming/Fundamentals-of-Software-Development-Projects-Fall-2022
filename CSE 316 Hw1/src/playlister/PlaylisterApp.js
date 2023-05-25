import PlaylisterModel from './PlaylisterModel.js';
import PlaylisterView from './PlaylisterView.js';
import PlaylisterController from './PlaylisterController.js';

/**
 * PlaylisterApp
 * 
 * This is the entry point into our application, it launches the
 * app with all needed initialization.
 * 
 * @author McKilla Gorilla
 * @author TerryVsGaming (Terry Shvartsman)
 */
export class PlaylisterApp {
    constructor() {
        // FIRST MAKE THE APP COMPONENTS
        this.model = new PlaylisterModel();
        this.view = new PlaylisterView();
        this.controller = new PlaylisterController();

        // THE MODEL NEEDS THE VIEW TO NOTIFY IT EVERY TIME DATA CHANGES
        this.model.setView(this.view);

        // THE VIEW NEEDS THE CONTROLLER TO HOOK UP HANDLERS TO ITS CONTROLS
        this.view.setController(this.controller);

        // AND THE CONTROLLER NEEDS TO MODEL TO UPDATE WHEN INTERACTIONS HAPPEN
        this.controller.setModel(this.model);
    }

    /**
     * launch
     * 
     * @param {*} testFile The JSON file containing initial playlists of data.
     */
    launch() {
        // DISABLE ALL RELEVANT 
        this.view.init();

        // FIRST TRY AND GET THE LISTS FROM LOCAL STORAGE
        let success = this.model.loadLists();
        if (!success) {
            this.loadListsFromJSON("./data/default_lists.json");
        }
    }

    /*
        If the playlists have never been stored in local storage
        this function can be used to store initial playlist data
        for the purpose of testing from the provided JSON file.
    */
    loadListsFromJSON(jsonFilePath) {
        let xmlhttp = new XMLHttpRequest();
        let modelToUpdate = this.model;

        // THIS DEFINES A CALLBACK THAT WILL BE INVOKED ONCE
        // THE CONTENTS OF THE JSON FILE ARE ACTUALLY RECEIVED,
        // NOTE THAT THIS ONLY HAPPENS IN RESPONSE TO THE
        // open AND THEN send FUNCTIONS BEING CALLED ON A VALID
        // JSON FILE
        xmlhttp.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                let lists = JSON.parse(this.responseText).playlists;

                // GO THROUGH THE DATA AND LOAD IT INTO OUR APP'S DATA MODEL
                for (let i = 0; i < lists.length; i++) {
                    let listData = lists[i];
                    let songs = [];
                    for (let j = 0; j < listData.songs.length; j++) {
                        songs[j] = listData.songs[j];
                    }
                    modelToUpdate.addNewList(listData.name, songs);
                }
            }
        };
        xmlhttp.open("GET", jsonFilePath, true);
        xmlhttp.send();
    }
}

// THIS CALLBACK GETS INVOKED ONCE THE HTML PAGE HAS FULLY LOADED
// ITS ELEMENTS INTO THE DOM
window.onload = function() {
    // MAKE THE APP AND LAUNCH IT
    let app = new PlaylisterApp();
    app.launch();
}