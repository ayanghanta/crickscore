"use client";

import { useMatchContext } from "@/app/_context/MatchContext";
import html2canvas from "html2canvas";
import { IoDownload } from "react-icons/io5";

function DownloadInningsCard() {
  const { inningsCardRef, teams } = useMatchContext();

  async function downloadImage() {
    try {
      const canvas = await html2canvas(inningsCardRef.current, {
        useCORS: true,
      });
      const dataUrl = canvas.toDataURL("image/png");

      const link = document.createElement("a");
      link.href = dataUrl;
      link.download = `innings-card-${teams.team1}-vs-${teams.team2}.png`;
      link.click();
    } catch (error) {
      console.error("Failed to generate image:", error);
    }
  }

  return (
    <div>
      <IoDownload
        className="text-xl text-gray-500 cursor-pointer hover:text-gray-700"
        onClick={downloadImage}
      />
    </div>
  );
}

export default DownloadInningsCard;
