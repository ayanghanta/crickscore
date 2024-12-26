import MatchDetails from "../_components/MatchDetails";
import ScoreCard from "../_components/ScoreCard";

export const metadata = {
  title: "score board",
};

function page() {
  return (
    <div className="max-w-[1300px] mx-auto px-3">
      <MatchDetails />
      <ScoreCard />
    </div>
  );
}

export default page;
