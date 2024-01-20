import { Modal } from "@mantine/core";
import { useState } from "react";
import ClickYes from "./challenges/ClickYes";
import TypeYes from "./challenges/TypeYes";
import HumanBody from "./challenges/SelectHumanPart";
import GuessNumber from "./challenges/GuessNumber";

export default function RandomChallengeModal({
  opened,
  onClose,
  onCorrectAnswer,
  onIncorrectAnswer,
}) {
  const [randomIndex, setRandomIndex] = useState(0);

  const handleCorrectAnswer = () => {
    onCorrectAnswer();
    setRandomIndex(
      (currentIndex) =>
        randomExcluded(0, challenges.length, currentIndex) % challenges.length
    );
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
    <HumanBody
      onCorrectAnswer={handleCorrectAnswer}
      onIncorrectAnswer={handleIncorrectAnswer}
    />,
  ];

  return (
    <Modal
      opened={opened}
      onClose={onClose}
      title="Captcha Challenge"
      centered
      closeOnEscape={false}
      closeOnClickOutside={false}
      withCloseButton={false}
    >
      {challenges[randomIndex]}
    </Modal>
  );
}

function randomExcluded(min, max, excluded) {
  let n = Math.floor(Math.random() * (max - min) + min);
  if (n >= excluded) n++;
  return n;
}
