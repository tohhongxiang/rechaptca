import { Blockquote, Button, Loader, TextInput, Title } from "@mantine/core";
import { useEffect, useState } from "react";
import Countdown from "react-countdown";

const QUOTE_MAX_LENGTH = 80
const MAX_TIME_SECONDS = 15

export default function TypingSpeed({ onCorrectAnswer, onIncorrectAnswer }) {
    const [isLoading, setIsLoading] = useState(false);
    const [value, setValue] = useState('');
    const [quote, setQuote] = useState('');
    const [startTime, setStartTime] = useState(Date.now())

    useEffect(() => {
        async function getQuote() {
            setIsLoading(true)
            const quote = await fetch(`https://api.quotable.io/random?maxLength=${QUOTE_MAX_LENGTH}`).then(res => res.json())
            setQuote(quote.content)
            setIsLoading(false)
            setStartTime(Date.now())
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
                    <div style={{ display: "flex", justifyContent: "center" }}>
                        <Countdown
                            date={startTime + 1000 * MAX_TIME_SECONDS}
                            intervalDelay={0}
                            precision={2}
                            renderer={props => <Title>{(props.total / 1000).toFixed(2)}</Title>}
                            onComplete={onIncorrectAnswer}
                        />
                    </div>
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