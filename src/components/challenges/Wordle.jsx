import { Button, TextInput } from '@mantine/core';
import { useState } from "react";

export default function Wordle_Check({ onCorrectAnswer, onIncorrectAnswer }) {
    const [User_Input, setValue] = useState('');

    const handleSubmit = async (e) => {
        const url = 'https://wordle-game-api1.p.rapidapi.com/word';
        const options = {
            method: 'GET',
            headers: {
                'X-RapidAPI-Key': '515ec7ee65msh7d671bdc3970a34p19a3d5jsndbe90581d1f6',
                'X-RapidAPI-Host': 'wordle-game-api1.p.rapidapi.com'
            }
        };

        try {
            const response = await fetch(url, options);
            const result = await response.text();
            console.log(result);
        } catch (error) {
            console.error(error);
        }
        e.preventDefault()
        if (value === result) {
            onCorrectAnswer()
        } else {
            onIncorrectAnswer()
        }
        }
    return (
        <div>
            <p>Type the word of the day for Wordle.</p>
            <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                <TextInput
                    value={User_Input}
                    onChange={(event) => setValue(event.currentTarget.value)}
                />
                <Button type="submit">Submit</Button>
            </form>
        </div>
    )
}


