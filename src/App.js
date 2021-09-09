import song from './songs/come_together.json';

import './App.css';
import Song from "./Song";

export default App;

function App() {

    return (<Song song={song}></Song>);
}
