import "@/app/_styles/globals.css";
import { MatchProvider } from "./_context/MatchContext";
import { ScoreBoardProvider } from "./_context/ScoreBoardContext";

export const metadata = {
  title: {
    template: "%s / creasekeeper",
    default: "your cricket scoreboard // creasekeeper",
  },
  description:
    "Create and manage your own cricket match's score and stats with our interactive scoreboard simulator ceasekeeper",
};

function Layout({ children }) {
  return (
    <html lang="en">
      <body>
        <MatchProvider>
          <ScoreBoardProvider>
            <header></header>
            <main>{children}</main>
            <footer></footer>
          </ScoreBoardProvider>
        </MatchProvider>
      </body>
    </html>
  );
}

export default Layout;
