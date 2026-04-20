import React, { useEffect, useState } from "react";
import roomImg from "../../assets/images/room.png";
import PersonPinIcon from "@mui/icons-material/PersonPin";
import api from "../../assets/api";
import emptyImg from "../../assets/images/empty.png";

function RoomCards({ course, year_lvl, section, selectedDate }) {
  const [reservation, setReservation] = useState(null);

  useEffect(() => {
    getReservation();
  }, [course, year_lvl, section, selectedDate]);

  const getReservation = async () => {
    try {
      const res = await api.get(
        `/api/reservations/${course}/${year_lvl}/${section}/`,
      );

      if (res.data.length > 0) {
        const selected = new Date(selectedDate);

        const filtered = res.data.find((item) => {
          const reserveDate = new Date(item.time_in);

          return (
            reserveDate.getFullYear() === selected.getFullYear() &&
            reserveDate.getMonth() === selected.getMonth() &&
            reserveDate.getDate() === selected.getDate()
          );
        });

        setReservation(filtered || null);
      } else {
        setReservation(null);
      }
    } catch (error) {
      setReservation(null);
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    });
  };

  const formatTime = (dateString) => {
    return new Date(dateString)
      .toLocaleTimeString("en-US", {
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
      })
      .replace(" AM", "am")
      .replace(" PM", "pm");
  };

  if (!reservation) {
    return (
      <div className="flex flex-col items-center justify-center w-full min-h-[320px] p-5 shadow-md rounded-xl bg-white">
        <img src={emptyImg} className="h-40 w-40 object-contain mb-4" />
        <p className="text-gray-600 font-semibold text-center">
          No schedule set on{" "}
          {new Date(selectedDate).toLocaleDateString("en-US", {
            month: "long",
            day: "numeric",
            year: "numeric",
          })}
        </p>
      </div>
    );
  }

  return (
    <div className="flex w-full p-5 shadow-md rounded-xl bg-cyan-500">
      <div className="w-full text-left">
        <div className="flex flex-row items-center gap-4 mb-4">
          <img src={roomImg} className="h-10 w-10" />
          <h3 className="text-lg font-bold text-white">
            {reservation.room.name}
          </h3>
        </div>

        <p className="text-md text-white leading-normal mb-5">
          A class for <b>{reservation.subject}</b> is scheduled on{" "}
          <b>{formatDate(reservation.time_in)}</b> -{" "}
          <b>{formatTime(reservation.time_in)}</b> to{" "}
          <b>{formatTime(reservation.time_out)}</b>
        </p>

        <div className="flex flex-row item-center">
          <PersonPinIcon sx={{ fontSize: 44 }} className="text-white mr-2" />

          <div>
            <p className="text-xs text-gray-100">Scheduled by</p>
            <p className="text-sm text-gray-200 font-bold">
              {reservation.student_full_name}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RoomCards;
