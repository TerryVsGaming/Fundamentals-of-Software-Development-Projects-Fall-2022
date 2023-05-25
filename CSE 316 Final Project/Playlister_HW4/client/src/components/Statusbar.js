import { useContext, useEffect } from 'react'
import { GlobalStoreContext } from '../store'
import { Typography } from '@mui/material'
import AuthContext from '../auth';
import IconButton from '@mui/material/IconButton';
import { useHistory } from 'react-router-dom'
import MUIEditSongModal from './MUIEditSongModal'
import MUIDeleteModal from './MUIDeleteModal'
import MUIRemoveSongModal from './MUIRemoveSongModal'
import AddIcon from '@mui/icons-material/Add';
import Box from '@mui/material/Box';
import Fab from '@mui/material/Fab'
/*
    Our Status bar React component goes at the bottom of our UI.
    
    @author McKilla Gorilla
*/





function Statusbar() {
    const { store } = useContext(GlobalStoreContext);
    const { auth } = useContext(AuthContext);
    store.history = useHistory();

    useEffect(() => {
        store.loadIdNamePairs();
    }, [store.newListCounter]);
    

    function handleCreateNewList() {
        if (auth.loggedIn){
            store.createNewList()
    
        }
    }
    
     let modalJSX = "";
    if (store.isEditSongModalOpen()) {
        modalJSX = <MUIEditSongModal />;
    }
    else if (store.isRemoveSongModalOpen()) {
        modalJSX = <MUIRemoveSongModal />;
    }
    
    return (
        <div id="playlister-statusbar">
          <Fab 
                    color="primary" 
                    aria-label="add"
                    id="add-list-button"
                    onClick={handleCreateNewList}
                >
                <AddIcon />
            </Fab>
            {modalJSX}
            
        </div>
    );
}

export default Statusbar;