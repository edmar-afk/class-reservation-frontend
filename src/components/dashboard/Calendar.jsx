import React, { useState } from "react";
import dayjs from "dayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";

import morningImg from "../../assets/images/calendar/morning.jpg";
import afternoonImg from "../../assets/images/calendar/afternoon.png";
import nightImg from "../../assets/images/calendar/night.png";

function Calendar() {
  const [value, setValue] = useState(dayjs());

  const getImageByTime = () => {
    const hour = value.hour();
    const minute = value.minute();
    const totalMinutes = hour * 60 + minute;

    if (totalMinutes >= 300 && totalMinutes <= 720) {
      return morningImg;
    }

    if (totalMinutes >= 721 && totalMinutes <= 1020) {
      return afternoonImg;
    }

    return nightImg;
  };

  return (
    <div className="-p-4 bg-white rounded-2xl shadow-md w-full sm:w-fit">
      <div className="relative p-4 text-white rounded-t-xl overflow-hidden">
        <img
          src={getImageByTime()}
          className="absolute inset-0 w-full h-full object-cover z-0"
          alt="Background"
        />

        <div className="absolute inset-0 bg-black/40 z-10" />

        <div className="relative z-20 py-4">
          <p className="mt-3 text-lg font-bold">
            {value.format("MMMM D, YYYY")}, {value.format("hh:mm A")}
          </p>
        </div>
      </div>

      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DateCalendar
          value={value}
          onChange={(newValue) => {
            if (newValue) {
              setValue((prev) =>
                newValue.hour(prev.hour()).minute(prev.minute()),
              );
            }
          }}
          className="bg-white rounded-xl w-full"
          sx={{
            "& .MuiPickersDay-root": {
              borderRadius: "8px",
            },
            "& .Mui-selected": {
              backgroundColor: "#3b82f6 !important",
            },
          }}
        />

        <div className="p-4 -mt-5">
          <p className="font-semibold mb-4">Browse Timezone</p>
          <TimePicker
            value={value}
            onChange={(newValue) => {
              if (newValue) {
                setValue((prev) =>
                  prev.hour(newValue.hour()).minute(newValue.minute()),
                );
              }
            }}
            minTime={dayjs().hour(5).minute(0)}
            maxTime={dayjs().hour(22).minute(0)}
            slotProps={{
              textField: {
                fullWidth: true,
              },
            }}
          />
        </div>
      </LocalizationProvider>
    </div>
  );
}

export default Calendar;
