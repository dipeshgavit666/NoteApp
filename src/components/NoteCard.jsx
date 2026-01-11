import { Box, Heading, Text, HStack, IconButton, useColorModeValue } from "@chakra-ui/react";
import { EditIcon, DeleteIcon } from "@chakra-ui/icons";

const NoteCard = ({ note }) => {
    const bgColor = useColorModeValue("white", "gray.800");
    const borderColor = useColorModeValue("gray.200", "gray.700");

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
                        colorScheme="blue"
                        size="sm"
                        aria-label="Edit note"
                    />
                    <IconButton 
                        icon={<DeleteIcon />} 
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