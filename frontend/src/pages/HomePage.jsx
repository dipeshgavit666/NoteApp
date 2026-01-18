import { Container, VStack, Text, SimpleGrid } from "@chakra-ui/react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useNotes } from "../note/notes";
import NoteCard from "../components/NoteCard";

const HomePage = () => {
    const fetchNotes = useNotes((state) => state.fetchNotes);
    const notes = useNotes((state) => state.notes);

    useEffect(() => {
        fetchNotes();
    }, [fetchNotes]);
    console.log("Notes: ", notes);
    
    return(
        <>
            <Container maxW="container.xl" py={12}>
                <VStack spacing={8}>
                    <Text 
                        fontSize={"30"}
                        fontWeight={"bold"}
                        bgGradient="linear(to-r, teal.500, green.500)"
                        bgClip="text"
                        textAlign={"center"}
                    >
                        Current Notes
                    </Text>


                <SimpleGrid 
                columns={{
                    base: 1,
                    md: 2,
                    lg: 3
                }}
                spacing={10}
                w={"full"}
                >

                {notes.map((note) => (
                    <NoteCard key={note._id} note={note} />
                ))}
                </SimpleGrid>

                    {notes.length === 0 && (
                        <Text fontSize="xl" textAlign={"center"} fontWeight="bold" color="gray.500">
                        Not Notes Found {" "}
                        <Link to={"create"}>
                            <Text as="span" color="green.500" _hover={{textDecoration: "underline"}}>
                                Create a Note
                            </Text>
                        </Link>
                    </Text>
                    )}
                </VStack>
            </Container>
        </>
    )
}

export default HomePage;