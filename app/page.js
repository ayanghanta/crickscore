import Image from "next/image";
import Button from "./_components/Button";

function page() {
  return (
    <div>
      <section className="text-center relative">
        <Image
          src="/hero-1.jpg"
          alt="criker match image for the over photo of this application"
          fill
          className="object-cover object-center z-1"
        />
        <div className="relative z-10 pt-24 pb-32 px-3">
          <h1 className="text-4xl font-bold text-gray-200 mb-4 ">
            Your Ultimate Cricket Scoreboard Simulator
          </h1>
          <p className="text-lg text-gray-200 mb-16">
            Simulate a full cricket match, manage scores, players, and more with
            Scorely.
          </p>
          <Button href="/teams" type="primary">
            Let&apos; play &rarr;
          </Button>
        </div>
      </section>
      <section className="py-24 bg-indigo-50 px-3">
        <h2 className="text-3xl font-bold text-center mb-12 text-gray-700">
          Features You&apos;ll Love!😎
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-y-4 gap-x-6 max-w-[1200px] mx-auto">
          <div className="bg-white text-gray-800 shadow-md rounded-lg p-6 w-full max-w-xs justify-self-center">
            <h3 className="text-2xl font-semibold mb-4">
              📥 Download Match Scorecard
            </h3>
            <p>
              Download a full scorecard of your match to keep a record of every
              run, wicket, and over.
            </p>
          </div>

          <div className="bg-white text-gray-800 shadow-md rounded-lg p-6 w-full max-w-xs justify-self-center">
            <h3 className="text-2xl font-semibold mb-4">
              💾 Save Full Match Scoreboard
            </h3>
            <p>
              Save your match&apos;s complete scoreboard to revisit and relive
              the action anytime.
            </p>
          </div>

          <div className="bg-white text-gray-800 shadow-md rounded-lg p-6 w-full max-w-xs justify-self-center">
            <h3 className="text-2xl font-semibold mb-4">
              ⚡ Real-Time Score Tracking
            </h3>
            <p>
              Enjoy a highly efficient, real-time scoreboard that updates
              instantly as the match progresses.
            </p>
          </div>

          <div className="bg-white text-gray-800 shadow-md rounded-lg p-6 w-full max-w-xs justify-self-center">
            <h3 className="text-2xl font-semibold mb-4">📊 Player Stats</h3>
            <p>
              View in-depth player stats throughout the match, from runs scored
              to wickets taken!
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}

export default page;
