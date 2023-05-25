import { useContext, useState } from 'react';
import { Link } from 'react-router-dom'
import AuthContext from '../auth';
import GroupsIcon from '@mui/icons-material/Groups';
import PersonIcon from '@mui/icons-material/Person';
import HomeIcon from '@mui/icons-material/Home';
import { GlobalStoreContext } from '../store'
import SortIcon from '@mui/icons-material/Sort';

import EditToolbar from './EditToolbar'

import AccountCircle from '@mui/icons-material/AccountCircle';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';



export default function AppBanner() {
    const { auth } = useContext(AuthContext);
    const { store } = useContext(GlobalStoreContext);
    const [anchorEl, setAnchorEl] = useState(null);
    const [anchorE2, setAnchorE2] = useState(null);
    const isMenuOpen = Boolean(anchorEl);

    const handleProfileMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const handleLogout = () => {
        handleMenuClose();
        auth.logoutUser();
    }

    function alphabetSort(){
        store.currentList.sort()
    }

//  New

  const open = Boolean(anchorE2);
  const handleClick = (event) => {
    setAnchorE2(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorE2(null);
  };




// New

    function toSearch(event){ 
        if (event.key == "Enter" || event.target.value === ""){
        store.setCurrentSearch(event.target.value)
        }
    }

    function searchHome () {
        store.searchStateNone()
    }
    function searchPlaylist () {
        store.searchStatePlaylist()
    }
    function searchAuthor () {
        store.searchStateAuthor()
    }

    

    const menuId = 'primary-search-account-menu';
    const menuId2 = 'sort-menu'
    const loggedOutMenu = (
        <Menu
            anchorEl={anchorEl}
            anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            id={menuId}
            keepMounted
            transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            open={isMenuOpen}
            onClose={handleMenuClose}
        >
        
            <MenuItem onClick={handleMenuClose}><Link to='/login/'>Login</Link></MenuItem>
            <MenuItem onClick={handleMenuClose}><Link to='/register/'>Create New Account</Link></MenuItem>
            <MenuItem onClick={handleMenuClose}><Link onClick = {auth.guestUser}>Continue as Guest</Link></MenuItem>
        </Menu>
    );/* Added variant = body2 on line 54 :O*/
    const loggedInMenu = 
        <Menu
            anchorEl={anchorEl}
            anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            id={menuId}
            keepMounted
            transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            open={isMenuOpen}
            onClose={handleMenuClose}
        >
            <MenuItem onClick={handleLogout}>Logout</MenuItem>
        </Menu>        

    let editToolbar = "";
    let menu = loggedOutMenu;
    if (auth.loggedIn) {
        menu = loggedInMenu;
        if (store.currentList) {
            editToolbar = <EditToolbar />;
        }
    }
    let homeColor = store.currentSearchState === "NONE" ? "red":"#1976d2"
    let listColor = store.currentSearchState === "BY_PLAYLIST" ? "red":"#1976d2"
    let authorColor = store.currentSearchState === "BY_AUTHOR" ? "red":"#1976d2"

    function getAccountMenu(loggedIn) {
        let userInitials = auth.getUserInitials();
        console.log("userInitials: " + userInitials);
        if (loggedIn) 
            return <div>{userInitials}</div>;
        else
            return <AccountCircle />;
    }

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <Toolbar>
                    <Typography                        
                        variant="h4"
                        noWrap
                        component="div"
                        sx={{ display: { xs: 'none', sm: 'block' } }}                        
                    >
                      Playlister  
                    </Typography>
                    {/* <Box sx={{ flexGrow: 1 }}>{editToolbar}</Box> */}
                     <Box sx={{ flexGrow: 1 }}></Box>
                    <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
                        <IconButton
                            size="large"
                            edge="end"
                            aria-label="account of current user"
                            aria-controls={menuId}
                            aria-haspopup="true"
                            onClick={handleProfileMenuOpen}
                            color="inherit"
                        >
                            { getAccountMenu(auth.loggedIn) }
                        </IconButton>
                    </Box>
                </Toolbar>
                
                
                <Toolbar>
                    <Box><IconButton onClick = {searchHome} style={{size : "2525px", textDecoration: 'none'}} ><HomeIcon sx={{bgcolor: homeColor}} /></IconButton></Box>
                    <Box><IconButton onClick = {searchPlaylist} style={{size : "525px", textDecoration: 'none'}} ><GroupsIcon sx={{bgcolor: listColor}}/></IconButton></Box>
                    <Box><IconButton onClick = {searchAuthor} style={{size : "55px", textDecoration: 'none'}} ><PersonIcon sx={{bgcolor: authorColor}}/></IconButton></Box>

                    <input type="text" placeholder="Search.." onKeyUp ={toSearch}  style={{margin: "auto"}}></input>



                <IconButton
            id="basic-button"
            aria-controls={open ? 'basic-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
             onClick={handleClick}
            >
            Sort
            </IconButton>              


            <SortIcon/>
            <Menu
            anchorEl={anchorE2}
            anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            id={menuId2}
            keepMounted
            transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            open={open}
            onClose={handleClose}
        >
            <MenuItem >Name (A-Z)</MenuItem>
            <MenuItem >Publish Date (Newest-Oldest)</MenuItem>
            <MenuItem >Listens (Highest-Lowest)</MenuItem>
            <MenuItem >Likes(Highest-Lowest)</MenuItem>
            <MenuItem >Dislikes(Highest-Lowest)</MenuItem>
            </Menu>


            </Toolbar>
            </AppBar>
            {
                menu
            }
        </Box>
    );
}