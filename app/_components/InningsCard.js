import { useInnings } from "../_context/InningsContext";

function InningsCard() {
  const { allBatters, allBowlers } = useInnings();
  return (
    <div className="border px-2 mt-2">
      <h1>Innings Card</h1>
      <h2>Batting</h2>
      {allBatters.map((batter) => (
        <div key={batter.id}>
          {batter.name}{" "}
          {batter.runs
            .map((run) => run.run)
            .reduce((cur, acc) => cur + acc, 0) / 2}
          ({batter.runs?.length / 2 || 0})
        </div>
      ))}
      <h2>Bowling</h2>
      {allBowlers.map((bowler) => (
        <div key={bowler.id}>
          {bowler.name} - R.C(
          {bowler.delivarys
            .map((delivary) => delivary.run)
            .reduce((cur, acc) => cur + acc, 0) / 2}
          ) Ball-
          {bowler.delivarys.filter((ball) => ball.isLegal).length / 12}
        </div>
      ))}
    </div>
  );
}

export default InningsCard;
