import { useState } from "react";
import { useInnings } from "../_context/InningsContext";
import { useScoreBoard } from "../_context/ScoreBoardContext";
import Button from "./Button";
import { IoCloseOutline } from "react-icons/io5";
import TeamScore from "./TeamScore";

function InningEnd() {
  const [modal, setModal] = useState(true);
  const { isInningsEnd, totalScore, totalWicketFall, over } = useInnings();
  const { currentInnings } = useScoreBoard();

  function handleCloseModal() {
    setModal(false);
  }

  if (isInningsEnd && currentInnings === 1 && modal)
    return (
      <div className="fixed inset-0 w-full h-screen bg-black/20 backdrop-blur-sm z-[1000] flex justify-center items-center transition-all duration-500">
        <div className="flex flex-col max-h-[90vh] overflow-hidden rounded-md shadow-lg w-6/12">
          <div className="relative overflow-y-auto bg-gray-50 rounded-md px-12 py-8">
            <IoCloseOutline
              className="p-1 absolute top-1 right-1 text-4xl text-gray-800 z-[999] cursor-pointer rounded hover:bg-gray-200 transition-all duration-300"
              onClick={handleCloseModal}
            />
            <p className="text-center text-xl text-indigo-500 mb-6 font-bold">
              End of the First Innings
            </p>

            {/* <div className="flex flex-col items-center justify-center text-lg">
            <p>
              {totalScore}/{totalWicketFall}
            </p>
            <p>({over})</p>
          </div> */}
            <TeamScore />
            <div className="flex gap-4 justify-end mt-8">
              <Button type="modalPrimary">Start 2nd Innings</Button>
              <Button type="modalSecondary" onClick={handleCloseModal}>
                Ok
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
}

export default InningEnd;
