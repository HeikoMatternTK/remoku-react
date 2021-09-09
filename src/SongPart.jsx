import {Flex} from "@chakra-ui/react";
import {useParams} from "react-router-dom";

export default function SongPart({songPart}) {

    let {index} = useParams();

    return (
        <Flex flexDirection={'column'} padding={'5rem'}>
            <h1>This is part {index}</h1>
            {songPart}
        </Flex>)
}
