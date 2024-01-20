import { Button, TextInput } from "@mantine/core";
import { useState } from "react";

export default function BallCost({ onCorrectAnswer, onIncorrectAnswer }) {
  const [value, setValue] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const inputAmount = parseFloat(value);

    if (!isNaN(inputAmount)) {
      if (inputAmount === 0.05) {
        onCorrectAnswer();
      } else {
        onIncorrectAnswer();
      }
    } else {
      onIncorrectAnswer();
    }
  };

  return (
    <div>
      <h1>Quick, math!</h1>
      <p>
        The bat and ball together cost $1.10. The bat costs $1.00 more than the
        ball. How much does the ball cost?
      </p>
      <form
        onSubmit={handleSubmit}
        style={{ display: "flex", flexDirection: "column", gap: 16 }}
      >
        <TextInput
          type="number"
          step="0.01"
          value={value}
          onChange={(event) => setValue(event.currentTarget.value)}
        />
        <Button type="submit">Submit</Button>
      </form>
    </div>
  );
}
