import MatchDetails from "../_components/MatchDetails";
import ScoreCard from "../_components/ScoreCard";
import DownloadScoreboard from "../_components/toolbar/DownloadScoreboard";

export const metadata = {
  title: "score board",
};

function page() {
  return (
    <div className="max-w-[1300px] mx-auto px-3">
      <div className="bg-slate-100 px-4 py-3 flex gap-4 items-center">
        <MatchDetails />
        <DownloadScoreboard />
      </div>
      <ScoreCard />
    </div>
  );
}

export default page;
