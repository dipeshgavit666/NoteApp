import { Container, Button} from "@chakra-ui/react";
import { CiSquarePlus } from "react-icons/ci";
const Navbar = () => {
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
                        bgGradient='linear(to-l, #7928CA, #FF0080)'
                        bgClip='text'
                        fontSize='6xl'
                        fontWeight='extrabold'
                    >
                    <Link to={"/"}>Notes</Link>
                    </Text>

                    <Hstack spacing={2} alignItems={"center"}>
                        <LInk to={"/create"}>
                            <Button>
                                <CiSquarePlus />
                            </Button>
                        </LInk>
                    </Hstack>
                </Flex>
            </Container>
        </>
    )
}

export default Navbar;