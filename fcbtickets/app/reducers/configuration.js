/**
 * Configuration reducer
 * @flow
 */
'use strict';
export const type = {
  firstRun: 'firstRun'
};

let initialState = {
  firstRun: false,
};

export function reducer(state : State = initialState, action : Action) : State {
  switch(action.type){
    case type.firstRun:
      let firstRun = action.value;
      return {
        ...state,
        firstRun
      };
  }

  return state;
}