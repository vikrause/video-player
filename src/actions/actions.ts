import {IAnalyticsEvent} from "../models.ts";

export type Action =
    | { type: 'SET_CURRENT_TIMESTAMP'; timestamp: number }
    | { type: 'SET_ANALYTICS_EVENTS_DATA'; analyticsEventList: IAnalyticsEvent[] }


// action creators
export function setCurrentTimestamp(timestamp: number): Action {
    return { type: 'SET_CURRENT_TIMESTAMP', timestamp };
}

export function setAnalyticsEventsData(analyticsEventList: IAnalyticsEvent[]): Action {
    return { type: 'SET_ANALYTICS_EVENTS_DATA', analyticsEventList };
}