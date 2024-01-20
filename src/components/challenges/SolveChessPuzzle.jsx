import { ChessPuzzle } from "@react-chess-tools/react-chess-puzzle";
import { useState } from "react";
import getRandomInt from "../../utils/getRandomInt";

const puzzles = [
    {
        fen: "4kb1r/p2r1ppp/4qn2/1B2p1B1/4P3/1Q6/PPP2PPP/2KR4 w k - 0 1",
        moves: ["Bxd7+", "Nxd7", "Qb8+", "Nxb8", "Rd8#"],
        makeFirstMove: false,
    },
    {
        fen: "6k1/5p1p/p1q1p1p1/1pB1P3/1Pr3Pn/P4P1P/4Q3/3R2K1 b - - 0 31",
        moves: ["h4f3", "e2f3", "c4c5", "d1d8", "g8g7", "f3f6"],
        makeFirstMove: true,
    },
    {
        fen: "r2qkb1r/pp2nppp/3p4/2pNN1B1/2BnP3/3P4/PPP2PPP/R2bK2R w KQkq - 1 1",
        moves: ["Nf6+", "gxf6", "Bxf7#"],
        makeFirstMove: false
    },
    {
        fen: "1rb4r/pkPp3p/1b1P3n/1Q6/N3Pp2/8/P1P3PP/7K w - - 1 1",
        moves: ["Qd5+", "Ka6", "cxb8=N#"],
        makeFirstMove: false
    },
    {
        fen: "5rk1/1p1q2bp/p2pN1p1/2pP2Bn/2P3P1/1P6/P4QKP/5R2 w - - 1 1",
        moves: ["Qxf8+", "Bxf8", "Rxf8#"],
        makeFirstMove: false
    },
    {
        fen: "5r1r/1p6/p1p2p2/2P1bPpk/4R3/6PP/P2B2K1/3R4 w - - 0 1",
        moves: ["Rh4+", "gxh4", "g4#"],
        makeFirstMove: false
    },
];

export default function SolveChessPuzzle({ onCorrectAnswer, onIncorrectAnswer }) {
    const [key, setKey] = useState(Date.now())
    const handleSolve = (changePuzzle) => {
        changePuzzle(puzzles[getRandomInt(0, puzzles.length)])
        setKey(Date.now())
        onCorrectAnswer()
    }
    
    return (
        <div style={{ width: '100%', height: '100%' }} key={key}>
            <p>Find the best moves</p>
            <ChessPuzzle.Root puzzle={puzzles[getRandomInt(0, puzzles.length)]} onFail={onIncorrectAnswer} onSolve={handleSolve}>
                <ChessPuzzle.Board arePiecesDraggable={true} />
            </ChessPuzzle.Root>
        </div>
    )
}