import React from 'react';
import YouTube from 'react-youtube';
import { GlobalStoreContext } from '../store'
import { useContext, useState } from 'react'

export default function YouTubePlayerExample() {
  const { store } = useContext(GlobalStoreContext);
    // THIS EXAMPLE DEMONSTRATES HOW TO DYNAMICALLY MAKE A
    // YOUTUBE PLAYER AND EMBED IT IN YOUR SITE. IT ALSO
    // DEMONSTRATES HOW TO IMPLEMENT A PLAYLIST THAT MOVES
    // FROM ONE SONG TO THE NEXT

    // THIS HAS THE YOUTUBE IDS FOR THE SONGS IN OUR PLAYLIST
    // let playlist = [
       
    // ];

    

    const playerOptions = {
        height: '850',
        
        width: '100%',
        playerVars: {
             // https://developers.google.com/youtube/player_parameters
            autoplay: 0,
        },
    };


    function getCurrentSong(){
        return store.getCurrentYouTubeSongIndex();
    }

    // THIS FUNCTION LOADS THE CURRENT SONG INTO
    // THE PLAYER AND PLAYS IT
    function loadAndPlayCurrentSong(player) {
        if(store.getYoutubeList().length == 0){
          return;
        }
        
        let song = store.getYoutubeList()[getCurrentSong()];
        player.loadVideoById(song);
        player.playVideo();
    }

    // THIS FUNCTION INCREMENTS THE PLAYLIST SONG TO THE NEXT ONE
    function incSong() {
        let currentSong = getCurrentSong() 
        currentSong++;
        // if (store.getYoutubeList().length == 0){
        //     currentSong = 0
        // }
        // else{
        currentSong = currentSong % store.getYoutubeList().length;
        // }
        store.setCurrentYouTubeSongIndex(currentSong)
    }

    function onPlayerReady(event) {
      if(store.getYoutubeList().length == 0){
        return;
      }
      
      loadAndPlayCurrentSong(event.target);
        event.target.playVideo();
    }

    // THIS IS OUR EVENT HANDLER FOR WHEN THE YOUTUBE PLAYER'S STATE
    // CHANGES. NOTE THAT playerStatus WILL HAVE A DIFFERENT INTEGER
    // VALUE TO REPRESENT THE TYPE OF STATE CHANGE. A playerStatus
    // VALUE OF 0 MEANS THE SONG PLAYING HAS ENDED.
    function onPlayerStateChange(event) {
        let playerStatus = event.data;
        let player = event.target;
        if (playerStatus === -1) {
            // VIDEO UNSTARTED
            console.log("-1 Video unstarted");
        } else if (playerStatus === 0) {
            // THE VIDEO HAS COMPLETED PLAYING
            console.log("0 Video ended");
            incSong();
            loadAndPlayCurrentSong(player);
        } else if (playerStatus === 1) {
            // THE VIDEO IS PLAYED
            console.log("1 Video played");
        } else if (playerStatus === 2) {
            // THE VIDEO IS PAUSED
            console.log("2 Video paused");
        } else if (playerStatus === 3) {
            // THE VIDEO IS BUFFERING
            console.log("3 Video buffering");
        } else if (playerStatus === 5) {
            // THE VIDEO HAS BEEN CUED
            console.log("5 Video cued");
        }
    }

    return <YouTube
        videoId={store.getYoutubeList()[getCurrentSong()]}
        opts={playerOptions}
        onReady={onPlayerReady}
        onStateChange={onPlayerStateChange} />;
}