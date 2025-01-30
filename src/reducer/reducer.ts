import { Action } from "../actions/actions.ts"
import { IRootState } from "../models.ts";

const initialState: IRootState = {
    timestamp: 0,
    analyticsEventList: [],
}


export function rootReducer(state = initialState, action: Action) {
    switch (action.type) {
        case 'SET_CURRENT_TIMESTAMP':
            return {...state, timestamp: action.timestamp};

        case 'SET_ANALYTICS_EVENTS_DATA':
            return {...state, analyticsEventList: action.analyticsEventList};
        default:
            return state;
    }
}