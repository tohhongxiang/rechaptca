import { Blockquote, Button, Loader, TextInput } from "@mantine/core";
import { useEffect, useState } from "react";

const QUOTE_MAX_LENGTH = 80
const MAX_TIME_SECONDS = 15

export default function TypingSpeed({ onCorrectAnswer, onIncorrectAnswer }) {
    const [isLoading, setIsLoading] = useState(false);
    const [value, setValue] = useState('');
    const [quote, setQuote] = useState('');

    useEffect(() => {
        async function getQuote() {
            setIsLoading(true)
            const quote = await fetch(`https://api.quotable.io/random?maxLength=${QUOTE_MAX_LENGTH}`).then(res => res.json())
            setQuote(quote.content)
            setIsLoading(false)
        }
        
        getQuote()
    }, [])


    const handleSubmit = (e) => {
        e.preventDefault()
        if (value === quote) {
            onCorrectAnswer()
        } else {
            onIncorrectAnswer()
        }
    }

    return (
        <div>
            {isLoading ? (
                <Loader />
            ) : (
                <div style={{ marginBottom: 8 }}>
                    <p><i>Type the following quote:</i></p>
                    <Blockquote style={{ userSelect: "none" }}>{quote}</Blockquote>
                </div>
            )}
            
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