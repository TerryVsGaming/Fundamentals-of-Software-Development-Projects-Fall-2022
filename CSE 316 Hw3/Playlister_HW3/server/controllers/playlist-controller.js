const Playlist = require('../models/playlist-model')
/*
    This is our back-end API. It provides all the data services
    our database needs. Note that this file contains the controller
    functions for each endpoint.
    
    @author McKilla Gorilla
*/
createPlaylist = (req, res) => {
    const body = req.body;
    console.log("createPlaylist body: " + body);

    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide a Playlist',
        })
    }

    const playlist = new Playlist(body);
    console.log("playlist: " + JSON.stringify(body));
    if (!playlist) {
        return res.status(400).json({ success: false, error: err })
    }

    playlist
        .save()
        .then(() => { 
            
            return res.status(201).json({
                 success: true,
                 playlist: playlist,
                 message: 'Playlist Created!',
             })
            }
        )
        .catch(error => {
            return res.status(400).json({
                error,
                message: 'Playlist Not Created!',
            })
        })

}

createSong = async(req,res) => {
    const list = await Playlist.findOne({_id:req.params.id})
    newSong = {title: "Unknown", artist: "Untitled", youTubeId: "dQw4w9WgXcQ"}
    if(list == null){
        return res.status(400).json({ success: false, message: "Unknown Playlist" })
    }
    list.songs.push(newSong);
    await list.save()
    return res.status(200).json({ success: true, playlist: list, songId: list.songs.length-1})
}

deleteSong = async(req,res) => {
    const list = await Playlist.findOne({_id:req.params.id})
    if(list == null){
        return res.status(400).json({ success: false, message: "Unknown Playlist" })
    }
    list.songs.splice(req.params.position, 1);
    await list.save()
    return res.status(200).json({ success: true, playlist: list})
}

deletePlaylist = async(req,res) => {
    const list = await Playlist.findOne({_id:req.params.id})
    if(list == null){
        return res.status(400).json({ success: false, message: "Unknown Playlist" })
    }
    await Playlist.deleteOne(list)
    return res.status(200).json({ success: true})
}




editSong = async(req,res) => {
    const list = await Playlist.findOne({_id:req.params.id})
    if(list == null){
        return res.status(400).json({ success: false, message: "Unknown Playlist" })
    }
    const body = req.body;
    console.log("edit Song body: " + body);

    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide a Song',
        })
    }
    const song = (body); //JSON.parse   
    list.songs[req.params.position] = song;
    await list.save()
    return res.status(200).json({ success: true, playlist: list})
}

getPlaylistById = async (req, res) => {
    await Playlist.findOne({ _id: req.params.id }, (err, list) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }

        return res.status(200).json({ success: true, playlist: list })
    }).catch(err => console.log(err))
}

editPlaylist = async (req,res) => {
    const filter = {_id: req.params.id};
    // this option instructs the method to create a document if no documents match the filter
    const options = { upsert: false};
    // create a document that sets the plot of the movie
    const updateDoc = {
      $set:  req.body  
    };
    await Playlist.updateOne(filter, updateDoc, options, (err,list) =>{
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }

        return res.status(200).json({ success: true}) 
    }).catch(err => console.log(err))
    
}


getPlaylists = async (req, res) => {
    await Playlist.find({}, (err, playlists) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }
        if (!playlists.length) {
            return res
                .status(404)
                .json({ success: false, error: `Playlists not found` })
        }
        return res.status(200).json({ success: true, data: playlists })
    }).catch(err => console.log(err))
}
getPlaylistPairs = async (req, res) => {
    await Playlist.find({}, (err, playlists) => {
        if (err) {
            return res.status(400).json({ success: false, error: err})
        }
        if (!playlists.length) {
            return res
                .status(404)
                .json({ success: false, error: 'Playlists not found'})
        }
        else {
            // PUT ALL THE LISTS INTO ID, NAME PAIRS
            let pairs = [];
            for (let key in playlists) {
                let list = playlists[key];
                let pair = {
                    _id : list._id,
                    name : list.name
                };
                pairs.push(pair);
            }
            return res.status(200).json({ success: true, idNamePairs: pairs })
        }
    }).catch(err => console.log(err))
}

module.exports = {
    createPlaylist,
    getPlaylists,
    getPlaylistPairs,
    getPlaylistById,
    createSong,
    deleteSong,
    editSong,
    deletePlaylist,
    editPlaylist
}