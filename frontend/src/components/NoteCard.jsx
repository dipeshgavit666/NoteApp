import { useState, useEffect } from "react";
import { 
    Box, 
    Heading, 
    Text, 
    HStack, 
    IconButton, 
    useColorModeValue, 
    useToast, 
    Modal,
    ModalOverlay,
    ModalContent, 
    ModalHeader, 
    ModalCloseButton, 
    ModalBody,
    ModalFooter,
    VStack,
    Input,
    Textarea,
    Button,
    useDisclosure
} from "@chakra-ui/react";
import { EditIcon, DeleteIcon } from "@chakra-ui/icons";
import { useNotes } from "../note/notes";


const NoteCard = ({ note }) => {
    const bgColor = useColorModeValue("white", "gray.800");
    const borderColor = useColorModeValue("gray.200", "gray.700");

    const { isOpen, onOpen, onClose } = useDisclosure();
    const [updatedNote, setUpdatedNote] = useState(note);

    const toast = useToast();
    const { deleteNote, updateNote, notes } = useNotes();
    
    const currentNote = notes.find(n => n._id === note._id) || note;
    
    useEffect(() => {
        if (!isOpen) {
            setUpdatedNote(currentNote);
        }
    }, [currentNote, isOpen]);
    
    const handleDeleteNote = async (nid) => {
        const {success, message} = await deleteNote(nid);
        if(!success){
            toast({
                title: "Can't delete Note",
                description: message,
                status: "error",
                duration: 3000,
                isClosable: true
            })
        }
        else{
            toast({
                title: "Note Deleted",
                description: message,
                status: "success",
                duration: 3000,
                isClosable: true
            })
        }
    }

    const handleUpdateNote = async (nid, updatedNote) => {
        const {success, message} = await updateNote(nid, updatedNote);
        
        if(!success){
            toast({
                title: "Error",
                description: message,
                status: "error",
                duration: 3000,
                isClosable: true
            })
        }
        else{
            toast({
                title: "Success",
                description: message || "Note updated successfully",
                status: "success",
                duration: 3000,
                isClosable: true
            })
            onClose();
        }
    }

    return (
        <Box 
            shadow="lg"
            rounded="lg"
            overflow="hidden"
            transition="all 0.3s"
            _hover={{ transform: "translateY(-5px)", shadow: "xl" }}
            bg={bgColor}
            border="1px"
            borderColor={borderColor}
        >
            <Box p={5}>
                <Heading as="h3" size="md" mb={3} noOfLines={2}>
                    {currentNote.title}
                </Heading>

                <Text 
                    fontSize="sm" 
                    color="gray.600" 
                    mb={4} 
                    noOfLines={3}
                    minH="60px"
                >
                    {currentNote.description}
                </Text>

                <HStack spacing={2} justify="flex-end">
                    <IconButton 
                        onClick={onOpen}
                        icon={<EditIcon />} 
                        colorScheme="blue"
                        size="sm"
                        aria-label="Edit Note"
                    />
                    <IconButton 
                        icon={<DeleteIcon />} 
                        onClick={() => handleDeleteNote(currentNote._id)}
                        colorScheme="red"
                        size="sm"
                        aria-label="Delete Note"
                    />
                </HStack>
            </Box>

            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />

                <ModalContent>
                    <ModalHeader>Update Note</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <VStack spacing={4}>
                            <Input 
                                placeholder="Title" 
                                name="title" 
                                value={updatedNote.title}
                                onChange={(e) => setUpdatedNote({...updatedNote, title: e.target.value})}
                            />
                            <Textarea 
                                placeholder="Description" 
                                name="description" 
                                value={updatedNote.description}
                                onChange={(e) => setUpdatedNote({...updatedNote, description: e.target.value})}
                            />
                        </VStack>
                    </ModalBody>

                    <ModalFooter>
                        <Button colorScheme="blue" mr={3} onClick={() => handleUpdateNote(note._id, updatedNote)}>
                            Update
                        </Button>
                        <Button variant="ghost" onClick={onClose}>
                            Cancel
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </Box>
    )
}

export default NoteCard;