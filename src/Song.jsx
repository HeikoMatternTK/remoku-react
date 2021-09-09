import {Button, Flex, Table, Tbody, Td, Th, Thead, Tr, Box} from "@chakra-ui/react";
import {ReactMediaRecorder} from "react-media-recorder";
import RecordView from "./RecordView";
import {useState} from "react";
import VideoRecorder from 'react-video-recorder';
import axios from 'axios';

export default function Song({song}) {

    const randomPartChooser = () => Math.floor(Math.random() * (song.parts.length));
    const randomChosenPart = randomPartChooser();

    const [part, setPart] = useState(song.parts[randomChosenPart]);
    const [index, setIndex] = useState(randomChosenPart);
    const [listenPart, setListePart] = useState(song.snippets[randomChosenPart]);
    const [videoBlob, setVideoBlob] = useState(null);
    const [uploaded, setUploaded] = useState(false);

    const setAndLogVideoBlob = (blob) => {
        console.log(blob);
        setVideoBlob(blob);
    };


    const parts = Object.values(song.parts)
        .map((part, index) => (
            <Tr
                key={index}
                onClick={() => {
                    setPart(part);
                    setIndex(index)
                }}>
                <Td>{index}</Td>
                <Td>{part}</Td>
                <Td>Choose</Td>
            </Tr>

        ));

    const show = () => {
        console.log(videoBlob);
    };

    const getPartFilename = () => {
        return listenPart
            .replaceAll('.wav', '.webm');
    }

    const axiosConfig = {
        headers: {
            'Content-Type': 'multipart/form-data',
            'uploadHash': '34n23lr8b2d9b32o32h2323'
        }
    };

    const upload = async () => {
        const formData = new FormData();
        formData.append('video', videoBlob);
        formData.append('uploadHash', '34n23lr8b2d9b32o32h2323');
        formData.append('fileName', getPartFilename());
        const response = await axios.post(
            'https://turbine-kreuzberg.dev',
            formData,
            axiosConfig
        );
        setUploaded(true);
    };

    return (
        <div display>
            <Flex flexDirection={'column'} alignItems={'center'} padding={'5rem'} maxWidth={'50rem'}>
                {/*<Table variant="simple">
                <Thead>
                    <Tr>
                        <Th>Strophe Number</Th>
                        <Th>Strophe</Th>
                        <Th>Number of Uploads</Th>
                        <Th>Add</Th>
                    </Tr>
                </Thead>
                <Tbody>
                    {parts}
                </Tbody>
            </Table>*/}
                <h1><span>Co</span>llaborative Re<span color={"red"}>mo</span>te Karao<span color={"red"}>ke</span></h1>

                <img src={'/help.png'}/>

                <p>This is the first <strong>Collaborative Remote Karaoke Tool</strong> of the world! In this app you will be performing a small part of the Beatles song <strong>"Come together"</strong>, which will later be added together automagically! You can first listen to the part you will sing, then commit the lyrics to memory (or read them), and then click the record button (make sure video is enabled), and sing your part! <strong>Don't forget to push the upload button afterwards!!!</strong></p>

                <Box>
                    <h1>Listen to your part</h1>
                    <audio controls>
                        <source src={`/parts/${listenPart}`} type={'audio/mp3'}/>
                    </audio>
                </Box>

                <h1>Sing your part!</h1>
                <h2>{part}</h2>

                <h1>Record your part!</h1>

                <VideoRecorder style="width: 500px; height: 500px;"
                               onRecordingComplete={videoBlob => setAndLogVideoBlob(videoBlob)}
                />

                <h1 hidden={videoBlob !== null}>Upload will be available once you've recorded</h1>
                <button
                    hidden={videoBlob === null}
                    onClick={() => upload()}><h1>Upload you part!</h1>
                </button>

                <h1 hidden={uploaded}>
                    Thanks for your Upload!
                </h1>

            </Flex>
        </div>)
}
