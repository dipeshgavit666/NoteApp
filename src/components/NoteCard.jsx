import { Box, Heading, Text, HStack, IconButton, useColorModeValue, useToast } from "@chakra-ui/react";
import { EditIcon, DeleteIcon } from "@chakra-ui/icons";
import { useNotes } from "../note/notes";

const NoteCard = ({ note }) => {
    const bgColor = useColorModeValue("white", "gray.800");
    const borderColor = useColorModeValue("gray.200", "gray.700");

    const toast = useToast()
    const deleteNote = useNotes();
    const handelDeleteNote = async (nid) => {
        const {success, message} = await deleteNote.deleteNote(nid);
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
                    {note.title}
                </Heading>

                <Text 
                    fontSize="sm" 
                    color="gray.600" 
                    mb={4} 
                    noOfLines={3}
                    minH="60px"
                >
                    {note.description}
                </Text>

                <HStack spacing={2} justify="flex-end">
                    <IconButton 
                        icon={<EditIcon />} 
                        colorScheme="green"
                        size="sm"
                        aria-label="Edit note"
                    />
                    <IconButton 
                        icon={<DeleteIcon />} 
                        onClick={() => handelDeleteNote(note._id)}
                        colorScheme="red"
                        size="sm"
                        aria-label="Delete note"
                    />
                </HStack>
            </Box>
        </Box>
    )
}

export default NoteCard;