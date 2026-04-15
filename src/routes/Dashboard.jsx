import React, { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import DashboardIcon from "@mui/icons-material/Dashboard";
import Welcome from "../components/dashboard/Welcome";
import Calendar from "../components/dashboard/Calendar";
import RoomCards from "../components/dashboard/RoomCards";

function Dashboard() {
  const [data, setData] = useState(null);

  useEffect(() => {
    const stored = localStorage.getItem("user");
    if (stored) {
      setData(JSON.parse(stored));
    }
  }, []);
  console.log("Dashboard user data:", data);
  return (
    <div className="flex flex-row min-h-screen">
      <Sidebar user={data} />

      <div className="-ml-8 sm:ml-64 flex-1 p-1 sm:p-6">
        <div className="flex flex-row items-center gap-2 mt-24 sm:mt-0">
          <DashboardIcon className="text-blue-500" fontSize="large" />
          <p className="font-bold text-2xl">Dashboard</p>
        </div>

        <div className="mt-4 sm:mt-14 grid grid-cols-1 lg:grid-cols-[70%_30%] gap-12">
          <div>
            <Welcome />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-1 sm:gap-4 mt-4">
              <RoomCards
                roomName={"Computer Lab"}
                instructor={"Sample Instructor Name"}
                status={"Occupied"}
                activity={'Programming 101'}
                timeRemaining={10}
              />
              <RoomCards
                roomName={"Room 1"}
                instructor={"Sample Instructor Name"}
                status={"Occupied"}
                activity={'PE 101'}
                timeRemaining={10}
              />{" "}
              <RoomCards
                roomName={"Room 2"}
                instructor={"Sample Instructor Name"}
                status={"Occupied"}
                activity={'Filipino 301'}
                timeRemaining={10}
              />{" "}
              <RoomCards
                roomName={"Room 3"}
                instructor={"Sample Instructor Name"}
                status={"Occupied"}
                activity={'English 301'}
                timeRemaining={10}
              />
            </div>
          </div>

          <div className="relative sm:sticky sm:top-6 sm:self-start">
            <Calendar />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
