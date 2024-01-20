import { Button } from "@mantine/core"

// { onCorrectAnswer: () => void, onIncorrectAnswer: () => void }
export default function ClickYes({ onCorrectAnswer, onIncorrectAnswer }) {
    return (
        <div>
            <h1>Click yes</h1>
            <p>Do you agree to sell your soul?</p>
            <div style={{ display: "flex", justifyContent: "space-around" }}>
                <Button onClick={onCorrectAnswer}>Yes</Button>
                <Button onClick={onIncorrectAnswer}>No</Button>
            </div>
        </div>
    )
}