export interface IApi {
    _baseUrl: string;
    _headers: HeadersInit
}

export interface IAnalyticsEvent {
    "timestamp": number,
    "duration": number,
    "zone": {
        "left": number,
        "top": number,
        "width": number,
        "height": number
    }
}

export interface IPreparedEvent {
    "hash": string,
    "time": string,
    "analyticsEvent": IAnalyticsEvent
}