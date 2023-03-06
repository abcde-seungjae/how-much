import { collection, addDoc, getDocs } from "firebase/firestore";

import * as accountsRequest from 'types/api/accountsRequest'

import {db} from "api/firebase-util"

export const travel = {
  postUser: async(params: accountsRequest.postAccountsSignupRequest) => {
    await addDoc(collection(db, "users"), params)
  },
  getUser: async(params: accountsRequest.postAccountsSignupRequest) => {
    await getDocs(collection(db, "users"));
  },
}
