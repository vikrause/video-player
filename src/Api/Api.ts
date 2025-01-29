import {IAnalyticsEvent, IApi} from "../models.ts";

class Api implements IApi {
    _baseUrl: string;
    _headers: HeadersInit;

    constructor(
        baseUrl: string,
        headers: HeadersInit
    ) {
        this._baseUrl = baseUrl;
        this._headers = headers;
    }

    _checkResponse(res: Response) {
        return (res.ok) ? res.json() : Promise.reject(res.json());
    }

    async getEventList(): Promise<IAnalyticsEvent[]> {
        const res = await fetch(`${this._baseUrl}/json/1`, {
            method: 'GET',
            headers: this._headers,
        });
        return await this._checkResponse(res);
    }
}

const api: Api = new Api(
    import.meta.env.VITE_APP_API_URL,
    {'Content-Type': 'application/json'}
);

export default api;