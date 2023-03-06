import React, { useEffect } from "react";
import { app, db } from "api/firebase-util";
import { collection, doc, getDocs, query, where } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { useNavigate } from "react-router-dom";

const auth = getAuth(app);

function Travel() {
  const navigate = useNavigate();
  const collectionRef = collection(db, "travel");
  //const docRef = doc(db, "travel", "");

  useEffect(() => {
    const user = getAuth().currentUser;
    // Firestore에서 인증된 사용자의 문서 가져오기
    if (user) {
      const q = query(collection(db, "cities"), where("uid", "==", user.uid));

      getDocs(q).then((res) => {
        console.log(res);
      });
    } else {
      console.log("No user is currently logged in.");
    }
  }, []);

  return (
    <>
      <div>
        {collectionRef ? (
          <>
            <div>아직 없?</div>
            <button className="" onClick={() => navigate("/travelRegist")}>
              여행 추가하기
            </button>
          </>
        ) : (
          <>
            <div>최근여행지</div>
          </>
        )}
      </div>
    </>
  );
}

export default Travel;
