import { useInnings } from "../_context/InningsContext";
import { useScoreBoard } from "../_context/ScoreBoardContext";
import { useMatchContext } from "../_context/MatchContext";
import { caclTotalRun } from "../_lib/ulits";
import { useEffect, useState } from "react";
import confetti from "canvas-confetti";

function TeamWin() {
  const { matchEnd, allOvers, targetToWin, totalWicketFall } = useInnings();
  const { currentlyBattingTeam, dispatch, winTeam } = useScoreBoard();
  const { battingFirstTeam } = useMatchContext();
  const [winText, setWinText] = useState("");

  useEffect(() => {
    if (!matchEnd || winTeam !== "") return;

    let winningTeam, winBy;
    const totalScore = caclTotalRun(allOvers);

    if (totalScore > targetToWin) {
      winningTeam = currentlyBattingTeam;
      winBy = `win by ${10 - totalWicketFall} wickets`;
    } else if (totalScore < targetToWin) {
      winningTeam = battingFirstTeam;
      winBy = `win by ${targetToWin - totalScore} runs`;
    } else if (totalScore === targetToWin) {
      winningTeam = "DRAW";
      winBy = `Match Draw`;
    }

    dispatch({ type: "setWinner", payload: winningTeam });
    setWinText(winBy);

    if (winningTeam !== "DRAW") {
      confetti({
        particleCount: 100,
        angle: 90,
        spread: 90,
        origin: { x: 0.5, y: 0.5 },
        gravity: 0.5,
        drift: 0.3,
        scalar: 0.8,
        ticks: 300,
        shapes: ["circle", "square", "triangle"],
      });

      const duration = 5000;
      const end = Date.now() + duration;

      const interval = setInterval(() => {
        if (Date.now() > end) {
          clearInterval(interval);
          return;
        }

        confetti({
          particleCount: 50,
          spread: 100,
          origin: { x: Math.random(), y: Math.random() * 0.5 },
          startVelocity: 25,
          gravity: 0.6,
          drift: 0.2,
          scalar: 1.1,
          ticks: 250,
          shapes: ["circle", "square"],
        });
      }, 100);
    }
  }, [
    currentlyBattingTeam,
    battingFirstTeam,
    dispatch,
    matchEnd,
    winTeam,
    targetToWin,
    allOvers,
    totalWicketFall,
  ]);

  if (!matchEnd) return null;

  return (
    <div className="w-6/12 mx-auto flex flex-col items-center text-lg font-semibold text-green-600 mb-24 bg-white ">
      <p>
        {winTeam} {winText.toUpperCase()}
      </p>
    </div>
  );
}

export default TeamWin;
