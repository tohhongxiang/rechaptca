import { Modal } from "@mantine/core";
import { useEffect, useState } from "react";
import RandomFact from "./RandomFact";
import ClickYes from "./challenges/ClickYes";
import FindWaldo from "./challenges/FindWaldo";
import GuessNumber from "./challenges/GuessNumber";
import HumanBody from "./challenges/SelectHumanPart";
import TypeYes from "./challenges/TypeYes";
import TypingSpeed from "./challenges/TypingSpeed";
import Check_URL_youtube from "./challenges/URL_youtube";

export default function RandomChallengeModal({
  opened,
  onClose,
  onCorrectAnswer,
  onIncorrectAnswer,
}) {
  const [randomIndex, setRandomIndex] = useState(0);
  const [randomFactOpen, setRandomFactOpen] = useState(true);

  const handleRandomFactClose = () => {
    setRandomFactOpen(false);
  };
  const handleCorrectAnswer = () => {
    onCorrectAnswer();
    setRandomIndex(
      (currentIndex) =>
        randomExcluded(0, challenges.length, currentIndex) % challenges.length
    );
    setRandomFactOpen(true);
  };

  const handleIncorrectAnswer = () => {
    onIncorrectAnswer();
  };

  const challenges = [
    <ClickYes
      onCorrectAnswer={handleCorrectAnswer}
      onIncorrectAnswer={handleIncorrectAnswer}
    />,
    <TypeYes
      onCorrectAnswer={handleCorrectAnswer}
      onIncorrectAnswer={handleIncorrectAnswer}
    />,
    <GuessNumber 
      onCorrectAnswer={handleCorrectAnswer}
      onIncorrectAnswer={handleIncorrectAnswer}
    />,
    <HumanBody
      onCorrectAnswer={handleCorrectAnswer}
      onIncorrectAnswer={handleIncorrectAnswer}
    />,
    <FindWaldo
      onCorrectAnswer={handleCorrectAnswer}
      onIncorrectAnswer={handleIncorrectAnswer}
    />,
    <TypingSpeed
      onCorrectAnswer={handleCorrectAnswer}
      onIncorrectAnswer={handleIncorrectAnswer}
    />,
    <Check_URL_youtube
      onCorrectAnswer={handleCorrectAnswer}
      onIncorrectAnswer={handleIncorrectAnswer}
    />,
  ];

  useEffect(() => {
    if (!randomFactOpen && opened && Math.random() < 1) {
      // RandomFact has closed, the modal is still open, and 50% probability, show challenges
      setRandomIndex(
        (currentIndex) =>
          randomExcluded(0, challenges.length, currentIndex) % challenges.length
      );
    }
  }, [randomFactOpen, opened, challenges.length]);

  return (
    <Modal
      opened={opened}
      onClose={onClose}
      title="Captcha Challenge"
      centered
      closeOnEscape={false}
      closeOnClickOutside={false}
      withCloseButton={false}
      size={"auto"}
    >
      {randomFactOpen && Math.random() < 0.5 ? (
        <RandomFact onClose={handleRandomFactClose} />
      ) : (
        challenges[randomIndex]
      )}
    </Modal>
  );
}

function randomExcluded(min, max, excluded) {
  let n = Math.floor(Math.random() * (max - min) + min);
  if (n >= excluded) n++;
  return n;
}
