import React, { useState } from "react";

import axios from "axios";
import { db } from "api/firebase-util";
import { getAuth } from "firebase/auth";
import { collection, doc, setDoc } from "firebase/firestore";

function GetContries() {
  // API 호출
  async function fetchData() {
    try {
      const response = await axios.get(
        "/1262000/CountryCodeService2/getCountryCodeList2",
        {
          headers: {
            "Access-Control-Allow-Origin": "*",
          },
          params: {
            serviceKey:
              "/+VVViKnw2ZayyWdAs7CoZj5h4YbuKBhMcqATAqeL+aHxi96Lzex/cQl3Y+KQF80/sfaLOkcKNOL5RdStl7rcQ==",
            numOfRows: 999, // 최대 999개까지 가져올 수 있음
          },
        }
      );

      console.log(response);
      return response.data.data;
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  // Firestore에 저장
  async function saveData() {
    const items = (await fetchData()) as [];

    if (!items) {
      console.log("Failed to fetch data.");
      return;
    }

    items.forEach(async (item: any) => {
      const { iso_alp3, country_nm, country_eng_nm, country_iso_alp2 } = item;

      await setDoc(doc(db, "countries", iso_alp3), {
        country_nm,
        country_eng_nm,
        iso_alp3,
        country_iso_alp2,
        country_img_url: `https://firebasestorage.googleapis.com/v0/b/how-much-73d13.appspot.com/o/${country_iso_alp2}.jpg?alt=media`,
      });
    });

    console.log("Data saved successfully.");
  }

  return (
    <>
      <button type="button" onClick={saveData}>
        여행 등록하기
      </button>
    </>
  );
}

export default GetContries;
