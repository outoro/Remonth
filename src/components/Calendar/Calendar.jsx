import React, { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "./Calendar.scss";
import moment from "moment";
import { AiOutlinePlus } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setCardDetail } from "../../store/card";
import { useEffect } from "react";
import categoryList from "../../constants/data"

export default function ReactCalendar({ userMoments }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [value, onChange] = useState(new Date());
  const [isDateModal, setIsDateModal] = useState(null);

  const matchedCard = userMoments
    ? userMoments.filter(
        (card) => card.date === moment(value).format("YYYY-MM-DD")
      )
    : null;

  useEffect(() => {
    dispatch(
      setCardDetail({
        date: moment(value).format("YYYY-MM-DD"),
      })
    );
  }, [value, dispatch]);

  return (
    <div className="calendar">
      <Calendar
        onChange={onChange}
        value={value}
        onClickDay={() => setIsDateModal(true)}
        formatDay={(locale, date) =>
          date.toLocaleString("en", { day: "numeric" })
        }
        next2Label={null}
        prev2Label={null}
        tileContent={({ date, view }) => {
          const momentDot = userMoments
            ? userMoments.filter(
                (card) => card.date === moment(date).format("YYYY-MM-DD")
              )
            : null;

          if (momentDot?.length > 0) {
            return (
              <div className="dot">
                <img src={momentDot[0].image} alt="" />
              </div>
            );
          }
        }}
      />
      {isDateModal && (
        <div className="date-modal" onClick={() => setIsDateModal(false)}>
          <div className="modal flex" onClick={(e) => e.stopPropagation()}>
            <div className="inner">
              <div className="date-title">
                {moment(value).format("YYYY년 MM월 DD일")}
              </div>
              {matchedCard ? (
                <ul>
                  {matchedCard.map((card) => (
                    <li
                      key={card.id}
                      className="flex"
                      onClick={() => navigate(`/moment/${card.id}`)}
                    >
                      {(() => {
                        const found = categoryList.find(
                          (e) => e.type === card.category
                        );
                        if (found.eng) {
                          return (
                            <div className={"color-box " + found.eng}></div>
                          );
                        }
                      })()}
                      <div>
                        <p className="card-title">{card.title}</p>
                        <span className="category-name">{card.category}</span>
                      </div>
                    </li>
                  ))}
                </ul>
              ) : (
                <p>이날의 기록이 없습니다</p>
              )}
            </div>
            <div className="modal-btn-area flex">
              <button
                className="category-btn flex"
                onClick={() => navigate("/builder/moment")}
              >
                <AiOutlinePlus />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
