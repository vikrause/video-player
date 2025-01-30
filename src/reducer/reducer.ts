import {SET_CURRENT_TIMESTAMP} from "../constants/ActionTypes.ts"


interface IActionSetCurrentTimestamp {
    type: string,
    timestamp: number
}
type IAction = IActionSetCurrentTimestamp;

export function rootReducer(state = 0, action:  IAction) {
    switch (action.type) {
        case SET_CURRENT_TIMESTAMP:
            return action.timestamp;
        default:
            return state;
    }
}