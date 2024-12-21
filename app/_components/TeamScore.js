import { useInnings } from "../_context/InningsContext";

function TeamScore() {
  const { totalScore, totalWicketFall, over } = useInnings();
  return (
    <div>
      <p>
        RCB: {totalScore}/{totalWicketFall} ({over})
      </p>
      <p>CRR:00.00</p>
    </div>
  );
}

export default TeamScore;
