import React from "react";
import roomImg from "../../assets/images/room.png";
import PersonPinIcon from "@mui/icons-material/PersonPin";

function RoomCards({ roomName, instructor, status, timeRemaining, activity }) {
  return (
    <div class="flex w-full mb-8 md:mb-0 p-5 shadow-md rounded-xl bg-cyan-500 mt-0">
      <div class="w-full text-left">
        <div className="flex flex-row items-center gap-4 mb-4">
          <img src={roomImg} class="h-10 w-10" />
          <h3 class="text-lg font-bold text-white">{roomName}</h3>
        </div>

        <p class="text-md text-white text-left leading-normal mb-5 font-lf-normal">
          Currently using this room for their <b>{activity}</b>. Won't be
          available until <b>{timeRemaining} hours remaining</b>.
        </p>
        <div class="flex flex-row item-center">
          <PersonPinIcon sx={{ fontSize: 44 }} className="text-white mr-2" />
          <div>
            <p class="text-sm text-gray-200">{instructor}</p>
            <p class="text-sm text-gray-100">{status} by</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RoomCards;
