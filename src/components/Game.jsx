import { Button, Card, Checkbox, Image, Flex, Text } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useState } from "react";
import RandomChallengeModal from "./RandomChallengeModal";
import ReCaptchaSymbol from "../assets/Recycling_symbol_blue.png";

export default function Game() {
  const [opened, { open, close }] = useDisclosure(false);
  const [score, setScore] = useState(0);

  const handleCorrectAnswer = () => {
    setScore((c) => c + 1);
  };

  const [isGameOver, setIsGameOver] = useState(false);
  const handleIncorrectAnswer = () => {
    setIsGameOver(true);
    close();
  };

  const handleRetry = () => {
    setScore(0);
    setIsGameOver(false);
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100vw",
        height: "100vh",
      }}
    >
      {isGameOver ? (
        <Card shadow="md" padding="xl" radius="md" withBorder>
          <h1>ReCHAPTCA Verification Failed</h1>
          <Text fz="lg" mb="lg">
            You are deemed to be a robot. You have solved only{" "}
            <strong>{score}</strong> challenges. <br />
            Please try again.
          </Text>
          <Button onClick={handleRetry} size="md">
            Retry
          </Button>
        </Card>
      ) : (
        <Card shadow="md" padding="xl" radius="md" withBorder>
          <Flex justify="spawn-between" align="center" gap="md">
            <Checkbox
              styles={{
                input: {
                  cursor: "pointer",
                  marginTop: "8px",
                  border: "2px solid #cccccc",
                },
                labelWrapper: {
                  marginLeft: "8px",
                },
              }}
              label="Click here to verify if you're a human"
              description={
                <span>
                  Powered by <i>reCHAPTCA</i> technology
                </span>
              }
              checked={opened}
              onChange={open}
              size="xl"
              radius="md"
            />
            <Image src={ReCaptchaSymbol} width={64} height={64} mt={12} />
          </Flex>
        </Card>
      )}
      <RandomChallengeModal
        opened={opened}
        onClose={close}
        onCorrectAnswer={handleCorrectAnswer}
        onIncorrectAnswer={handleIncorrectAnswer}
      />
    </div>
  );
}
