import { Container,Flex, Button, HStack, Text, useColorMode} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { CiSquarePlus} from "react-icons/ci";
import { IoMoon } from "react-icons/io5";
import { LuSun } from "react-icons/lu";


const Navbar = () => {

    const { colorMode, toggleColorMode } = useColorMode()

    return(
        <>
            <Container maxW={"1140px"} px={4}>
                <Flex
                    h={16}
                    alignItems={"center"}
                    justifyContent={"space-between"}
                    flexDir={{
                        base:"column",
                        sm:"row"
                    }}
                >
                    <Text
                        bgGradient='linear(to-l, #226802ff, #28ca30ff)'
                        bgClip='text'
                        fontSize='6xl'
                        fontWeight='extrabold'
                    >
                    <Link to={"/"}>Notes</Link>
                    </Text>

                    <HStack spacing={2} alignItems={"center"}>
                        <Link to={"/create"}>
                            <Button>
                                <CiSquarePlus  fontSize={20} />
                            </Button>
                        </Link>
                        <Button onClick={toggleColorMode}>
                            {colorMode === "dark" ? <LuSun /> : <IoMoon />}
                        </Button>
                    </HStack>
                </Flex>
            </Container>
        </>
    )
}

export default Navbar;