import { Button, Checkbox } from "@mantine/core";
import { useDisclosure } from '@mantine/hooks';
import { useState } from "react";
import RandomChallengeModal from "./RandomChallengeModal";

export default function Game() {
    const [opened, { open, close }] = useDisclosure(false);
    const [score, setScore] = useState(0)

    const handleCorrectAnswer = () => {
        setScore(c => c + 1)
    }

    const [isGameOver, setIsGameOver] = useState(false)
    const handleIncorrectAnswer = () => {
        setIsGameOver(true)
        close()
    }

    const handleRetry = () => {
        setScore(0)
        setIsGameOver(false)
    }

    return (
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", width: "100vw", height: "100vh" }}>
            {isGameOver ? (
                <div>
                    <h1>Game Over</h1>
                    <p>You are deemed to be a robot. You have solved {score} challenges</p>
                    <Button onClick={handleRetry}>Retry</Button>
                </div>
            ) : (
                <Checkbox label="Click here to verify if you're a human" checked={opened} onChange={open} />
            )}
            <RandomChallengeModal opened={opened} onClose={close} onCorrectAnswer={handleCorrectAnswer} onIncorrectAnswer={handleIncorrectAnswer} />
        </div>
    )
}