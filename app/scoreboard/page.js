import MatchDetails from "../_components/MatchDetails";
import ScoreCard from "../_components/ScoreCard";
import { InningsProvider } from "../_context/InningsContext";

export const metadata = {
  title: "score board",
};

function page() {
  return (
    <InningsProvider>
      <div>
        <h1>Score board</h1>
        <MatchDetails />
        <ScoreCard />
      </div>
    </InningsProvider>
  );
}

export default page;
