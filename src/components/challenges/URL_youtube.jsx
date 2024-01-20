import { TextInput } from '@mantine/core';
import { Button } from "@mantine/core";
import { useState } from "react";

export default function Check_URL_youtube({ onCorrectAnswer, onIncorrectAnswer }) {
    const [inputURL, setURL] = useState('https://www.youtube.com/watch?v=gWnOpUqTzBg');
    let todaysDate = new Date()
    let youtubeCreationDate = new Date(2010, 1, 1)

    const [targetDate, setTargetDate] = useState(randomDate(youtubeCreationDate, todaysDate));
    const handleSubmit = async (e) => {
        e.preventDefault()

        const TempVideoKey = inputURL.split("v=")[1]
        let VideoKey = TempVideoKey
        try {
            VideoKey = TempVideoKey.split("&")[0]
        }
        catch (error) {
            console.error(error)
        }

        const APIKey = import.meta.env.VITE_YOUTUBE_API_KEY
        const URL_check = "https://www.googleapis.com/youtube/v3/videos?part=contentDetails&id=$vidkey&key=$apikey&part=snippet"
        let URL_check_video = URL_check.replace("$vidkey", VideoKey)
        let URL_check_video_api = URL_check_video.replace("$apikey", APIKey)
        let data_youtube = (await fetch(URL_check_video_api));
        let video_date_published = await data_youtube.json()
        video_date_published = (video_date_published["items"][0]["snippet"]["publishedAt"]).split("T")[0]
        video_date_published = new Date(video_date_published)
        console.log("Random date")
        console.log(targetDate);
        console.log("User's input")
        console.log(video_date_published)
        if (targetDate.getDate() == video_date_published.getDate() && targetDate.getMonth() == video_date_published.getMonth()
            && targetDate.getFullYear() == video_date_published.getFullYear()) {
            onCorrectAnswer()
        }
        else {
            onIncorrectAnswer()
        }

    }

    return (
        <div>
            <p>Input URL of a Youtube Video that is uploaded on <strong>{new Intl.DateTimeFormat("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
            }).format(targetDate)}</strong>.</p>
            <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                <TextInput
                    value={inputURL}
                    onChange={(event) => setURL(event.currentTarget.value)}
                />
                <Button type="submit">Submit</Button>
            </form>
        </div>
    )

}

function randomDate(start, end) {
    return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
}

