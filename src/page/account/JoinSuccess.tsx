import React, { useState } from "react";
import { getAuth } from "firebase/auth";
import "firebase/auth";
import { app } from "api/firebase-util";

import { ReactComponent as Beach } from "asset/image/account/join_beach.svg";
import { ReactComponent as Circle } from "asset/image/account/join_circle.svg";
import { ReactComponent as CreditCard } from "asset/image/account/join_credit_card.svg";
import { ReactComponent as Dollar } from "asset/image/account/join_dollar.svg";
import { ReactComponent as Euro } from "asset/image/account/join_euro.svg";
import { ReactComponent as Flight } from "asset/image/account/join_flight.svg";
import { ReactComponent as Luggage } from "asset/image/account/join_luggage.svg";
import { ReactComponent as Saving } from "asset/image/account/join_savings.svg";
import { ReactComponent as Square } from "asset/image/account/join_square.svg";
import { ReactComponent as Triangle } from "asset/image/account/join_triangle.svg";
import { useNavigate } from "react-router-dom";

const auth = getAuth(app);

function JoinSuccess() {
  const navigate = useNavigate();

  return (
    <>
      <div className="flex flex-col items-center justify-center w-full h-full min-h-screen my-auto">
        <div className="flex flex-col items-center w-full px-10">
          <div className="flex items-center justify-center w-full h-96">
            <div className="flex items-center justify-center">
              <div className="absolute opacity-0 animate-fadein">
                <h2>반갑습니다!</h2>
              </div>
              <div className="absolute opacity-0 animate-particle-1">
                <Beach className="fill-hm-plum animate-spin" />
              </div>
              <div className="absolute opacity-0 animate-particle-2">
                <Circle className="fill-purple-700 animate-spin_mirror" />
              </div>
              <div className="absolute opacity-0 animate-particle-3">
                <CreditCard className="fill-hm-green animate-spin" />
              </div>
              <div className="absolute opacity-0 animate-particle-4">
                <Dollar className="fill-hm-brown animate-spin_mirror" />
              </div>
              <div className="absolute opacity-0 animate-particle-5">
                <Euro className="fill-hm-black animate-spin" />
              </div>
              <div className="absolute opacity-0 animate-particle-6">
                <Flight className=" fill-cyan-700 animate-spin" />
              </div>
              <div className="absolute opacity-0 animate-particle-7">
                <Luggage className="fill-hm-gray animate-spin_mirror" />
              </div>
              <div className="absolute opacity-0 animate-particle-8">
                <Saving className="fill-orange-600 animate-spin_mirror" />
              </div>
              <div className="absolute opacity-0 animate-particle-9">
                <Square className="fill-hm-yellow animate-spin" />
              </div>
              <div className="absolute opacity-0 animate-particle-10">
                <Triangle className="fill-rose-700 animate-spin" />
              </div>
            </div>
          </div>
          <button
            type="button"
            className="w-full px-4 py-2 mt-2 transition-colors duration-300 rounded-lg shadow-xl h-14 text-slate-800 bg-hm-yellow shadow-hm-yellow/40"
            onClick={() => {
              navigate("/travel");
            }}
          >
            바로 시작하기
          </button>
        </div>
      </div>
    </>
  );
}

export default JoinSuccess;
