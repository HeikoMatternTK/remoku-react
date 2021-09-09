import { useReactMediaRecorder } from "react-media-recorder";
import {Button, ButtonGroup, Flex} from "@chakra-ui/react";

export default function RecordView () {
    const {
        status,
        startRecording,
        stopRecording,
        mediaBlobUrl,
    } = useReactMediaRecorder({ video: true });

    return (
        <Flex flexDirection={'column'}>
            <p>{status}</p>
            <ButtonGroup>
                <Button onClick={startRecording}>Start Recording</Button>
                <Button onClick={stopRecording}>Stop Recording</Button>
            </ButtonGroup>
            <video src={mediaBlobUrl} controls autoPlay />
        </Flex>
    );
};
