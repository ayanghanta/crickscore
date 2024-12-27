import { useInnings } from "../_context/InningsContext";
import { caclTotalRun, calcLegalDelivary } from "../_lib/ulits";

function RunRate() {
  const { innings, allOvers, targetToWin, matchEnd, totalOver, over } =
    useInnings();

  const totalBallBowled = Math.trunc(over) * 6 + (over - Math.trunc(over)) * 10;
  const totalRunScored = caclTotalRun(allOvers);
  const ballRemaining = totalOver * 6 - totalBallBowled;

  const CRR =
    totalRunScored === 0
      ? "0.00"
      : ((totalRunScored / totalBallBowled) * 6).toFixed(2);
  let RRC;
  if (innings === 2)
    RRC =
      (((targetToWin - totalRunScored + 1) / ballRemaining) * 6).toFixed(2) ||
      0;

  if (matchEnd) return null;
  return (
    <div className="flex flex-col items-center gap-2 mb-6 text-gray-900">
      <div className="flex gap-2 justify-center">
        <p>Current run rate(CRR): {CRR}</p>

        {innings === 2 && <p>|</p>}
        {innings === 2 && <p>Required run rate(RRR): {RRC}</p>}
      </div>
      {innings === 2 && (
        <p className="text-center">
          Need {targetToWin - totalRunScored + 1} runs in {ballRemaining} balls
        </p>
      )}
    </div>
  );
}

export default RunRate;
