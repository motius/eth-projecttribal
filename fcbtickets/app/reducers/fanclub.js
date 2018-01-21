/**
 * Configuration reducer
 * @flow
 */
'use strict';
export const type = {
  setUser: 'setUser'
};

let initialState = {
  user: null,
};

export function reducer(state : State = initialState, action : Action) : State {
  switch(action.type){
    case type.setUser:
      let user = action.value;
      return {
        ...state,
        user
      };
  }
  return state;
}