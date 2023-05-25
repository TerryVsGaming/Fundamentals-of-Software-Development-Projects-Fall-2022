import './App.css';
import { React } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { Banner, ListSelector, PlaylistCards, Statusbar, EditSongModal, DeleteSongModal, DeletePlaylistModal} from './components'
// import EditSongModal from './components/EditSongModal.js';
/*
    This is our application's top-level component.
    
    @author McKilla Gorilla
*/
const App = () => {

    
    return (
        <Router>
            <Banner />
            <Switch>
                <Route path="/" exact component={ListSelector} />
                <Route path="/playlist/:id" exact component={PlaylistCards} />
            </Switch>
            <Statusbar />
                <EditSongModal  
                />
                <DeleteSongModal
                />
                <DeletePlaylistModal
                />
                
        </Router>
    )
}

export default App