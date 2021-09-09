import {Button, Flex, Table, Tbody, Td, Th, Thead, Tr} from "@chakra-ui/react";
import { ReactMediaRecorder } from "react-media-recorder";
import {Link} from "react-router-dom";
import RecordView from "./RecordView";

export default function Song({song}) {

    const parts = Object.values(song.parts)
        .map((part, index) => (
            <Tr data-index={index} key={index}>
                <Td>{index}</Td>
                <Td>{part}</Td>
                <Td><Link to={`/parts/${index}`}>I want</Link></Td>
            </Tr>

        ));

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
            <Link to='/test'>Link</Link>
            <RecordView></RecordView>
        </Flex>)
}
