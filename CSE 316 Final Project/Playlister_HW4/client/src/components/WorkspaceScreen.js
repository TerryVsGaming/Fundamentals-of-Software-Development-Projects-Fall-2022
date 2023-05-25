import { useContext, useEffect} from 'react'
import { useHistory } from 'react-router-dom'
import SongCard from './SongCard.js'
import MUIEditSongModal from './MUIEditSongModal'
import MUIRemoveSongModal from './MUIRemoveSongModal'
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import { GlobalStoreContext } from '../store/index.js'
import YouTubePlayerExample from '../common/YouTubePlaylister.js'
import ListCard from './ListCard.js'
import MUIDeleteModal from './MUIDeleteModal'
import { Tab,Tabs} from '@mui/material'
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography'
import AuthContext from '../auth';
import AddIcon from '@mui/icons-material/Add';
import RedoIcon from '@mui/icons-material/Redo';
import UndoIcon from '@mui/icons-material/Undo';
import CloseIcon from '@mui/icons-material/HighlightOff';
import PublishIcon from '@mui/icons-material/Publish';
import DeleteIcon from '@mui/icons-material/Delete';
/*
    This React component lets us edit a loaded list, which only
    happens when we are on the proper route.
    
    @author McKilla Gorilla
*/





function WorkspaceScreen() {
    const { store } = useContext(GlobalStoreContext);
    const { auth } = useContext(AuthContext);
    store.history = useHistory();

    



    useEffect(() => {
        store.loadIdNamePairs();
    }, []);

    
    let modalJSX = "";
    if (store.isEditSongModalOpen()) {
        modalJSX = <MUIEditSongModal />;
    }
    else if (store.isRemoveSongModalOpen()) {
        modalJSX = <MUIRemoveSongModal />;
    }


    function toAddComment(event){ 
        if (event.key == "Enter" && store.currentList !== null){
        store.currentList.comments.push({inputText: event.target.value, author: auth.user.userName})
        store.updateCurrentList()
        }
    }

    function publishList(){
        if (store.currentList === null){
            return
        }
        store.currentList.published = true
        store.currentList.publishedDate = new Date().toDateString()
        
        store.updateCurrentList()
    }

    function handleUndo() {
        store.undo();
    }
    function handleRedo() {
        store.redo();
    }

    
   

    let listCard2 = "";
    let listCardComponents2 = []
    listCardComponents2.push(<YouTubePlayerExample/>)   
    listCard2 = 
        <List sx={{ width: '100%'}}>
        {listCardComponents2}
        <Box  sx={{ p: 1, flexGrow: 1, fontSize: '35px' }}> Playlist: {store.currentList === null ? "No Playlist" : store.currentList.name}</Box>
        <Box  sx={{ p: 1, flexGrow: 1, fontSize: '35px' }}> Song #: { (store.currentList === null || store.currentList.songs.length == 0) ? "No Songs in List" : (store.getCurrentYouTubeSongIndex() + 1)}</Box>
        <Box  sx={{ p: 1, flexGrow: 1 , fontSize: '35px'}}> Title: { (store.currentList === null || store.currentList.songs.length == 0)? "No Songs in List" : store.currentList.songs[store.getCurrentYouTubeSongIndex()].title}</Box>
        <Box  sx={{ p: 1, flexGrow: 1 , fontSize: '35px'}}> Artist: { (store.currentList === null || store.currentList.songs.length == 0) ? "No Songs in List" : store.currentList.songs[store.getCurrentYouTubeSongIndex()].artist }</Box>
        </List>

    let listCard3 = ""
    let listCardComponents3 = []
    if (store.currentList !== null){
        for (let i = 0; i < store.currentList.comments.length; i++){
        listCardComponents3.push(
            <Box className = "commentStyle">
             
             <Box>{store.currentList.comments[i].author}</Box>   
             <Box >{store.currentList.comments[i].inputText}</Box>

            </Box>)
        }
    }
    listCard3 = 
        <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
        {listCardComponents3}
        </List>

    
    let tabContent = ""
    if (store.tabValue == 0){
        tabContent = 
        <div>
        {listCard2}
        </div>       
    }
    else{
        tabContent =
        <div>
       {listCard3}
       <input type="text" placeholder="Search.." onKeyUp ={toAddComment}  style={{margin: "auto"}}></input>
       </div>
    }


    async function handleDeleteList(event, id) {
        event.stopPropagation();
        let _id = event.target.id;
        _id = ("" + _id).substring("delete-list-".length);
        store.markListForDeletion(id);
    }

    function handleOpenCloseList(){
        store.openCloseList();
    }

    
    function handleAddNewSong() {
        store.addNewSong();
    }
    
   const handleTabChange = (event, newValue) => {
        store.setTabValue(newValue);
    };


    let listCard = "";
    let listCardComponents = []
    if (store) {
       
        for (let i = 0; i < store.idNamePairs.length; i++){
            let pair = store.idNamePairs[i];
            //if author search box is not "" then test to make sure the pair.author == author search box
            if (store.currentSearch !== "" && store.currentSearch !== pair.author && store.currentSearchState == "BY_AUTHOR"){
                continue
                
            }
            // All Lists (3ppl icon)
            if (store.currentSearch !== "" && !pair.name.includes(store.currentSearch) && store.currentSearchState == "BY_PLAYLIST"){
                continue
                
            }
            
            // Homebutton
            if (store.currentSearch !== "" && !pair.name.includes(store.currentSearch) && store.currentSearchState == "NONE"){
                continue
            }

            
            

            listCardComponents.push(<ListCard
                key={pair._id}
                idNamePair={pair}
                selected={store.currentList && store.currentList._id === pair._id}
            />)   
        
            if (store.currentList !== null && store.currentList._id == pair._id){
                listCardComponents.push(store.currentList.songs.map((song, index) => (
                    <SongCard
                        id={'playlist-song-' + (index)}
                        key={'playlist-song-' + (index)}
                        index={index}
                        song={song}
                    />
                )) )   



                listCardComponents.push(<Box onClick = {handleAddNewSong} className = "addSongBox" sx={{ p: 1, flexGrow: 1 }}> +</Box>)
                if (store.currentList.publishedDate){
                listCardComponents.push(<Box>Published On: {store.currentList.publishedDate}</Box>)
                }
                listCardComponents.push(<Box>Listens:  {store.currentList.listens}</Box>)

            }
        }
        listCard = <List sx={{ width: '100%'}}>
            {listCardComponents}
        </List>
        
        
    }

    return (
        <div>
            <div className = "container_left">
                <Box>
                <div id="list-selector-list">
                {
                listCard
                }
                <MUIDeleteModal />

                
                <Box >
                <IconButton 
                
                disabled={(!store.canUndo())  ||  store.currentModal !== "NONE"}
                id='undo-button'
                onClick={handleUndo}
                variant="contained">
                    <UndoIcon sx={{fontSize : "50px"}}  />
                
                </IconButton>

                <IconButton 
                     disabled={(!store.canRedo())  || store.currentModal !== "NONE"}
                     id='redo-button'
                     onClick={handleRedo}
                     variant="contained">
                        
                         <RedoIcon sx={{fontSize : "50px"}}  />
                </IconButton>
                


               
                <IconButton onClick = {publishList}>
                    <PublishIcon  sx={{fontSize : "50px"}}/>
                </IconButton>
                <IconButton onClick={(event) => {
                        if (store.currentList){
                        handleDeleteList(event, store.currentList._id)
                        }
                    }} aria-label='delete'>
                    <DeleteIcon sx={{fontSize : "40px"}} />
                </IconButton>
                <IconButton >
                    Duplicate
                </IconButton>
                </Box>



                </div>
                {modalJSX}
                </Box>


                
            </div>



            <div className = "container_right">
                <Tabs value = {store.tabValue}  onChange={handleTabChange}> 
                    <Tab label = "Player"></Tab>
                    <Tab label = "Comments"></Tab>
                </Tabs>
                {tabContent}
            </div>
        
        
        </div>

         
    )
}
//
export default WorkspaceScreen;