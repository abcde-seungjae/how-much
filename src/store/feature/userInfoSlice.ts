import { createSlice } from '@reduxjs/toolkit';
// import { LoginResponse } from 'types/api/accounts/accountsResponse';


export interface AccountsInitialState {
  // login_response: LoginResponse;
  access_token: string;
  email: string;
  first_name: string;
  csrf_token: string;
}


const initialState: AccountsInitialState = {
  access_token: '',
  email: '', // "test@test.co.kr",
  first_name: '', // null,
  csrf_token: '',
};


const userInfoSlice = createSlice({
  name: 'userInfo',
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    init: (state) => {
      let nextState = state;
      nextState = initialState;
      return nextState;
    },
    accountUser: (state, { payload }) => {
      state = payload;
      return state;
    },
  },
});


export const { accountUser } = userInfoSlice.actions;
export default userInfoSlice;

