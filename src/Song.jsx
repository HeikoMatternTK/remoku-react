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
    const [uploaded, setUploaded] = useState('not');

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
            .replaceAll('.mp3', '.webm');
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
        setUploaded('uploaded');
        const response = await axios.post(
            'https://turbine-kreuzberg.dev',
            formData,
            axiosConfig
        );
        console.log(response);
    };

    return (
        <div display>
            <Flex flexDirection={'column'} justifyContent={'center'} alignItems={'center'} padding={'5rem'}>
                <Flex flexDirection={'column'} justifyContent={'center'} alignItems={'center'} className='flex-gap'>
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
                    <h1><span className='red'>Co</span>llaborative Re<span className='red'>mo</span>te Karao<span
                        className='red'>ke</span>
                    </h1>

                    <img src={'/help.png'} className='object-fit-contain'/>

                    <Box border={'1px solid black'} padding={'2rem'} width={'100%'} display={'flex'}
                         flexDirection={'column'} alignItems={'center'} className='shadow'>
                        <p>This is the first <strong>Collaborative Remote Karaoke Tool</strong> of the world! In this
                            app
                            you will be performing a small part of the Beatles song <strong>"Come together"</strong>,
                            which
                            will later be added together automagically! You can first listen to the part you will sing,
                            then
                            commit the lyrics to memory (or read them), and then click the record button (make sure
                            video is
                            enabled), and sing your part! <strong>Don't forget to push the upload button
                                afterwards!!!</strong></p>

                    </Box>

                    <Box border={'1px solid black'} padding={'2rem'} width={'100%'} display={'flex'}
                         flexDirection={'column'} alignItems={'center'} className='shadow'>
                        <h1>Listen to your part</h1>
                        <audio controls>
                            <source src={`/parts/${listenPart}`} type={'audio/mp3'}/>
                        </audio>
                    </Box>

                    <Box border={'1px solid black'} padding={'2rem'} width={'100%'} display={'flex'}
                         flexDirection={'column'} alignItems={'center'} className='shadow'>
                        <h1>Sing your part!</h1>
                        <h2>{part}</h2>
                    </Box>

                    <Box border={'1px solid black'} padding={'2rem'} width={'100%'} display={'flex'}
                         flexDirection={'column'} alignItems={'center'} className='shadow'>
                        <h1>Record your part!</h1>

                        <VideoRecorder style="width: 500px; height: 500px;"
                                       onRecordingComplete={videoBlob => setAndLogVideoBlob(videoBlob)}
                        />
                    </Box>

                    <Box border={'1px solid black'} padding={'2rem'} width={'100%'} display={'flex'}
                         flexDirection={'column'} alignItems={'center'} className='shadow'>
                        <h1 hidden={videoBlob !== null}>Upload will be available once you've recorded</h1>
                        <button
                            hidden={videoBlob === null}
                            onClick={() => upload()}><h1>Upload you part!</h1>
                        </button>
                    </Box>

                    <div hidden={uploaded == 'not'}>
                        <Box className={uploaded == 'not' ? 'hide' : ''} border={'1px solid black'} padding={'2rem'}
                             width={'100%'} display={'flex'}
                             flexDirection={'column'} alignItems={'center'} className='shadow'>
                            <h1>Thanks for the Upload! It will automagically become mashed together and shown at the
                                Breakout Review Show!</h1>
                        </Box>
                    </div>
                </Flex>
            </Flex>
        </div>)
}
