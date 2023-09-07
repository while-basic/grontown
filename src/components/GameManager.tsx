import {
  AspectRatio,
  Box,
  Button,
  Center,
  Flex,
  HStack,
  Heading,
  Image,
  Spinner,
  VStack,
} from "@chakra-ui/react";
import ChatModal from "./ChatModal";
import { EastworldClient } from "eastworld-client";
import { useEffect, useState } from "react";
import { Game } from "./Game";

// This wrapper mostly exists so the Phaser component in Game.tsx doesn't get re-rendered.
export const GameManager = () => {
  const [sessionId, setSessionId] = useState<string>();
  const eastworldClient = new EastworldClient({
    BASE: "http://localhost:8000",
  });
  useEffect(() => {
    const fetchSession = async () => {
      setSessionId(
        await eastworldClient.gameSessions.createSession(
          "5dcd12ef-7489-4d5e-9ce1-202451fd1c5f",
        ),
      );
    };
    fetchSession();
  }, []);

  return (
    <Box height={"100vh"} width={"100vw"}>
      {!sessionId && (
        <Center>
          <Spinner size={"xl"} />
        </Center>
      )}
      {sessionId && (
        <Box width={"100vw"} height={"100vh"}>
          <HStack width={"100%"} height={"100%"} alignItems={"center"} gap={0}>
            <Box width={"90%"} maxHeight={"100vh"} height={"100%"}>
              <Center width={"100%"} height={"100vh"}>
                <Game />
              </Center>
            </Box>
            <Flex
              width={"10%"}
              height={"100%"}
              alignItems={"center"}
              justifyContent={"center"}
            >
              <VStack width={"90%"} gap={5}>
                <Box
                  as="button"
                  width={"100%"}
                  backgroundColor={"gray.700"}
                  padding={4}
                  borderRadius={"25px"}
                  transition="transform 0.3s ease-in-out"
                  _hover={{ transform: "scale(1.1)", cursor: "pointer" }}
                >
                  <VStack>
                    <Image
                      src="/assets/web/typewriter.png"
                      alt="button image"
                      width={"100%"}
                    />
                    <Heading size="xl">Notes</Heading>
                  </VStack>
                </Box>
                <Box
                  as="button"
                  width={"100%"}
                  backgroundColor={"gray.700"}
                  padding={4}
                  borderRadius={"25px"}
                  transition="transform 0.3s ease-in-out"
                  _hover={{ transform: "scale(1.1)", cursor: "pointer" }}
                >
                  <VStack>
                    <Image
                      src="/assets/web/detective.png"
                      alt="button image"
                      width={"100%"}
                    />
                    <Heading size="xl">Evidence</Heading>
                  </VStack>
                </Box>
              </VStack>
            </Flex>
          </HStack>
          <ChatModal
            eastworldClient={eastworldClient}
            sessionId={sessionId}
          ></ChatModal>
        </Box>
      )}
    </Box>
  );
};