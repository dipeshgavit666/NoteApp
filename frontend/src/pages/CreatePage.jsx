import { Box, Button, Container, Heading, Input, useColorModeValue, VStack, Textarea } from "@chakra-ui/react";
import { useState } from "react";
import { useNotes } from "../note/notes";
import { useToast } from '@chakra-ui/react';

const CreatePage = () => {
    const [newNote, setNewNote] = useState({
        title: "",
        description: ""
    });

    const toast = useToast();

    const {createNote} = useNotes()
    const handleCreateNote = async() => {
        const {success, message} = await createNote(newNote)
        if(!success){
            toast({
                title: 'Error',
                description: message,
                status: 'error',
                duration: 3000,
                isClosable: true,
        });
        } else {
            toast({
                title: 'Note created.',
                description: "New Note created successfully",
                status: 'success',
                duration: 3000,
                isClosable: true,
        })
        }
        setNewNote({title: "", description: ""})

        
    }
    return (
        <>
            <Container maxW={Container.sm}>
                <VStack spacing={8}>
                    <Heading as={"h1"} size={"2xl"} textAlign={"center"} mb={8}>Create new Note</Heading>
                    <Box 
                        w={"full"} bg={useColorModeValue("white", "gray-800")}
                        p={6} rounded={"lg"} shadow={"md"}
                    >
                        <VStack spacing={4}>
                            <Input 
                                placeholder="Title" 
                                name="title" 
                                value={newNote.title}
                                onChange={(e) => setNewNote({...newNote, title: e.target.value})}
                            />
                            <Textarea 
                                placeholder="Description" 
                                name="description" 
                                value={newNote.description}
                                onChange={(e) => setNewNote({...newNote, description: e.target.value})}
                            />

                            <Button colorScheme="green" onClick={handleCreateNote} w={"full"}>
                                Create Note
                            </Button>
                        </VStack>
                    </Box>
                </VStack>
            </Container>
        </>
    )
}

export default CreatePage;