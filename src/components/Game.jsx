import { Checkbox } from "@mantine/core";

export default function Game() {
    return (
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", width: "100vw", height: "100vh" }}>
            <Checkbox label="Click here to verify if you're a human" />
        </div>
    )
}