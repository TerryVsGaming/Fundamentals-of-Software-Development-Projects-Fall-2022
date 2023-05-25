/*
    This is where we'll route all of the received http requests
    into controller response functions.
    
    @author McKilla Gorilla
*/
const express = require('express')
const PlaylistController = require('../controllers/playlist-controller')
const router = express.Router()

router.post('/playlist', PlaylistController.createPlaylist)
router.get('/playlist/:id', PlaylistController.getPlaylistById)
router.get('/playlists', PlaylistController.getPlaylists)
router.get('/playlistpairs', PlaylistController.getPlaylistPairs)

router.post('/playlist/:id/song', PlaylistController.createSong)
router.delete('/playlist/:id/song/:position', PlaylistController.deleteSong)
router.post('/playlist/:id/song/:position', PlaylistController.editSong)
router.delete('/playlist/:id', PlaylistController.deletePlaylist)
router.post('/playlist/:id', PlaylistController.editPlaylist)


module.exports = router