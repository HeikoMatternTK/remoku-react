import {Button, Flex, Table, Tbody, Td, Th, Thead, Tr} from "@chakra-ui/react";
import { ReactMediaRecorder } from "react-media-recorder";
import RecordView from "./RecordView";
import {useState} from "react";
import VideoRecorder from 'react-video-recorder';

export default function Song({song}) {

    const [part, setPart] = useState(song[0]);
    const [index, setIndex] = useState(0);
    const [videoBlob, setVideoBlob] = useState(null);

    const setAndLogVideoBlob = (blob) => {
        console.log(blob);
        setVideoBlob(blob);
    };


    const parts = Object.values(song.parts)
        .map((part, index) => (
            <Tr
                key={index}
                onClick={() => {setPart(part); setIndex(index)}}>
                <Td>{index}</Td>
                <Td>{part}</Td>
                <Td>Choose</Td>
            </Tr>

        ));

    const upload = () => {
        // console.log(videoBlob.)
    };

    return (
        <Flex flexDirection={'column'} padding={'5rem'}>
            <h1>Choose one of the strophes, you want to upload </h1>
            <Table variant="simple">
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
            </Table>
            <h1>Chosen part</h1>
            <h2>{part}</h2>
            <VideoRecorder
                onRecordingComplete={videoBlob => setAndLogVideoBlob(videoBlob)}
            />
            <button hidden={videoBlob !== null} onClick={() => upload()}>Upload</button>
        </Flex>)
}
