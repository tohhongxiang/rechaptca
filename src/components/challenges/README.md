# Challenges

Each challenge should be in a new file `<challenge-name>.jsx`.

Each challenge should satisfy the following interface

```ts
interface ChallengeInterface {
    onCorrectAnswer: () => void,
    onIncorrectAnswer: () => void
}
```

After implementing the challenge, go to `RandomChallengeModal.jsx` and fill in 

```jsx
const challenges = [
    <ClickYes onCorrectAnswer={handleCorrectAnswer} onIncorrectAnswer={handleIncorrectAnswer} />,
    <TypeYes onCorrectAnswer={handleCorrectAnswer} onIncorrectAnswer={handleIncorrectAnswer} />,
    // ...
]
```

Map `onCorrectAnswer={handleCorrectAnswer}` and `onIncorrectAnswer={handleIncorrectAnswer}`