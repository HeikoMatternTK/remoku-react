import song from './songs/come_together.json';

import './App.css';
import Song from "./Song";
import {BrowserRouter, Route, Router, Switch} from "react-router-dom";
import SongPart from "./SongPart";
import Test from "./Test";

export default App;

function App() {

    return (
        <BrowserRouter>
            <Switch>
                <Route path='/'>
                    <Song song={song}></Song>
                </Route>
                <Route path='/part/:index' children={<SongPart />} />
                <Route path='/test'>
                    <Test></Test>
                </Route>
            </Switch>
        </BrowserRouter>
    )
        ;
}
