import Box from '@mui/material/Box';

export default function SplashScreen() {
    
    return (
        <div id="splash-screen">
            <Box>Playlister</Box>


            <Box sx = {{fontSize : '45px', color : "purple"}}>Welcome to the Best Music Application That has Ever been Made</Box>
            
            <Box sx = {{fontSize : '45px',  color:"red"}}> Have You Even Been on some Music Streaming Website and Wished You Could Listen to YouTube Songs???</Box>
            <Box sx = {{fontSize : '45px',  color:"red"}}> WELL NOW YOU CAN!!</Box>

            <Box sx={{fontSize : '65px', color:"black"}}> Created By Terry Shvartsman</Box>
        </div>
        
    )
}