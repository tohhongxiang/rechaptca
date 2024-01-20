import { Button, TextInput } from '@mantine/core';
import { useState } from "react";

export default function TypeYes({ onCorrectAnswer, onIncorrectAnswer }) {
    const [value, setValue] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault()
        if (value === "Yes") {
            onCorrectAnswer()
        } else {
            onIncorrectAnswer()
        }
    }
    return (
        <div>
            <p>Type the word "Yes" into the text input</p>
            <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                <TextInput
                    value={value}
                    onChange={(event) => setValue(event.currentTarget.value)}
                />
                <Button type="submit">Submit</Button>
            </form>
        </div>
    )
}