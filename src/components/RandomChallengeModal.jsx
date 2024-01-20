import { Modal } from "@mantine/core";
import { useEffect, useState } from "react";
import shuffle from "../utils/shuffle";
import AvoidingButton from "./challenges/AvoidingButton";
import BallCost from "./challenges/BallCost";
import CatchCountDownTimer from "./challenges/CatchCountDownTimer";
import ClickYes from "./challenges/ClickYes";
import FindWaldo from "./challenges/FindWaldo";
import GuessNumber from "./challenges/GuessNumber";
import HumanBody from "./challenges/SelectHumanPart";
import SelectPicture from "./challenges/SelectPicture";
import ChessPuzzle from "./challenges/SolveChessPuzzle";
import Sudoku from "./challenges/Sudoku";
import TypeYes from "./challenges/TypeYes";
import TypingSpeed from "./challenges/TypingSpeed";
import Check_URL_youtube from "./challenges/URL_youtube";

export default function RandomChallengeModal({
  opened,
  onClose,
  onCorrectAnswer,
  onIncorrectAnswer,
}) {
  const [index, setIndex] = useState(0);
  const [randomFactOpen, setRandomFactOpen] = useState(true);

  const handleRandomFactClose = () => {
    setRandomFactOpen(false);
  };
  const handleCorrectAnswer = () => {
    onCorrectAnswer();
    setIndex(c => (c + 1) % challenges.length);
    setRandomFactOpen(true);
  };

  const handleIncorrectAnswer = () => {
    onIncorrectAnswer();
  };

  const [challenges, setChallenges] = useState([
    <AvoidingButton
      onCorrectAnswer={handleCorrectAnswer}
      onIncorrectAnswer={handleIncorrectAnswer}
    />,
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
    <BallCost
      onCorrectAnswer={handleCorrectAnswer}
      onIncorrectAnswer={handleIncorrectAnswer}
    />,
    <Sudoku
      onCorrectAnswer={handleCorrectAnswer}
      onIncorrectAnswer={handleIncorrectAnswer}
    />,
    <CatchCountDownTimer
      onCorrectAnswer={handleCorrectAnswer}
      onIncorrectAnswer={handleIncorrectAnswer}
    />,
    <ChessPuzzle
      onCorrectAnswer={handleCorrectAnswer}
      onIncorrectAnswer={handleIncorrectAnswer}
    />,
    <SelectPicture
      onCorrectAnswer={handleCorrectAnswer}
      onIncorrectAnswer={handleIncorrectAnswer}
      />,
  ]);

  useEffect(() => {
    if (index === 0) {
      setChallenges(c => shuffle(c))
    }
  }, [index])

  useEffect(() => {
    if (!randomFactOpen && opened && Math.random() < 1) {
      // RandomFact has closed, the modal is still open, and 50% probability, show challenges
      setIndex(c => (c + 1) % challenges.length);
    }
  }, [randomFactOpen, opened, challenges.length]);

  console.log(challenges[index], index)
  console.log("API key:", import.meta.env.VITE_YOUTUBE_API_KEY)
  return (
    <Modal
      opened={opened}
      onClose={onClose}
      title="Captcha Challenge"
      centered
      closeOnEscape={false}
      closeOnClickOutside={false}
      withCloseButton={false}
      size={"lg"}
      style={{ display: "relative"}}
    >
      {/* <p>{index}</p> */}
      {/* {randomFactOpen && Math.random() < 0.5 ? (
        <RandomFact onClose={handleRandomFactClose} />
      ) : ( */}
        {challenges[index]}
      {/* )} */}
    </Modal>
  );
}
