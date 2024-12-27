import { useInnings } from "../_context/InningsContext";
import { useScoreBoard } from "../_context/ScoreBoardContext";

function TeamShortScore({ teamName }) {
  const {
    firstInningsData,
    currentInnings,
    currentlyBattingTeam,
    firstInningTotal,
    secondInningsTotal,
  } = useScoreBoard();
  const { totalScore, totalWicketFall, over } = useInnings();

  let isBatYet = true;
  let teamScore, totalWicket, overComplete;

  if (teamName === currentlyBattingTeam) {
    teamScore = totalScore;
    totalWicket = totalWicketFall;
    overComplete = over;
  } else {
    if (currentInnings === 1) isBatYet = false;
    if (currentInnings === 2) {
      teamScore = firstInningTotal;
      totalWicket = firstInningsData.totalWicketFall || 0;
      overComplete = firstInningsData.over;
    }
  }

  return (
    <div className="flex flex-col items-center justify-center text-xl">
      {isBatYet ? (
        <>
          <p>
            {teamScore}/{totalWicket}
          </p>
          <p>({overComplete})</p>
        </>
      ) : (
        <p className="text-center">Yet to bat</p>
      )}
    </div>
  );
}

export default TeamShortScore;
