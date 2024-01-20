import { Checkbox, Modal } from "@mantine/core";
import { useDisclosure } from '@mantine/hooks';


export default function Game() {
    const [opened, { open, close }] = useDisclosure(false);
    return (
        <>
            <div style={{ display: "flex", justifyContent: "center", alignItems: "center", width: "100vw", height: "100vh" }}>
                <Checkbox label="Click here to verify if you're a human" onClick={open} />
            </div>
            <Modal opened={opened} onClose={close} title="Captcha Challenge" centered>
                <div>
                    <h1>Are you a real human?</h1>
                </div>
            </Modal>
        </>

    )
}