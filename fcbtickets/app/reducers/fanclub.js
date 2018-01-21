/**
 * Configuration reducer
 * @flow
 */
'use strict';
export const type = {
  setUser: 'setUser',
  setNumberAdmins: 'setNumberAdmins',
  setNumberUsers: 'setNumberUsers',
  setNumberFans: 'setNumberFans',
  setNumberMembers: 'setNumberMembers',
  setClubName: 'setClubName'
};

let initialState = {
  user: null,
  numberMembers: 0,
  numberAdmins: 0,
  numberUsers: 0,
  numberFans: 0,
  clubName: ""
};

export function reducer(state : State = initialState, action : Action) : State {
  switch(action.type){
    case type.setUser:
      let user = action.value;
      return { ...state, user };
    case type.setNumberAdmins:
      let numberAdmins = action.value
      return { ...state, numberAdmins };
    case type.setNumberFans:
      let numberFans = action.value
      return { ...state, numberFans };
    case type.setNumberUsers:
      let numberUsers = action.value
      return { ...state, numberUsers };
    case type.setNumberMembers:
        let numberMembers = action.value
        return { ...state, numberMembers };
    case type.setClubName:
        let clubName = action.value
        return { ...state, clubName };
  }
  return state;
}