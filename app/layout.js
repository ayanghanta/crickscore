import "@/app/_styles/globals.css";
import { MatchProvider } from "./_context/MatchContext";
import { ScoreBoardProvider } from "./_context/ScoreBoardContext";
import Header from "./_components/ui/Header";
import Footer from "./_components/ui/Footer";
import { InningsProvider } from "./_context/InningsContext";

export const metadata = {
  title: {
    template: "%s / cricSnap",
    default: "your cricket scoreboard // cricSnap",
  },
  description:
    "Create and manage your own cricket match's score and stats with our interactive scoreboard simulator ceasekeeper",
};

function Layout({ children }) {
  return (
    <html lang="en">
      <body className="grid grid-rows-[auto_1fr_auto] min-h-dvh">
        <MatchProvider>
          <ScoreBoardProvider>
            <InningsProvider>
              <Header />

              <main>{children}</main>
              <Footer />
            </InningsProvider>
          </ScoreBoardProvider>
        </MatchProvider>
      </body>
    </html>
  );
}

export default Layout;
