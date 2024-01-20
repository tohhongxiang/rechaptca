import { Button, Checkbox, Modal } from "@mantine/core";
import { useDisclosure } from '@mantine/hooks';
import { useState } from "react";

export default function Game() {
    const [opened, { open, close }] = useDisclosure(false);
    const [score, setScore] = useState(0)

    const [isGameOver, setIsGameOver] = useState(false)
    const handleGameOver = () => {
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
            <Modal opened={opened} onClose={close} title="Captcha Challenge" centered>
                <div>
                    <h1>Click yes</h1>
                    <div style={{ display: "flex", justifyContent: "space-around" }}>
                        <Button onClick={() => setScore(c => c + 1)}>Yes</Button>
                        <Button onClick={() => handleGameOver()}>No</Button>
                    </div>
                </div>
            </Modal>
        </div>
    )
}