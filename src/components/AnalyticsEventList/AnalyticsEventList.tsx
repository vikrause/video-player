import {ReactElement, useCallback, useEffect, useState} from "react";
import {IAnalyticsEvent, IPreparedEvent} from "../../models.ts";
import EventItem from "../EventItem/EventItem.tsx";
import hash from 'object-hash';
import {useDispatch} from "react-redux";
import {setAnalyticsEventsData} from "../../actions/actions.ts";


interface AnalyticsEventListProps {
    getEventList(): Promise<IAnalyticsEvent[]>
}

export default function AnalyticsEventList(props: AnalyticsEventListProps): ReactElement {
    const [preparedEventList, setPreparedEventList] = useState<IPreparedEvent[]>([]);
    const dispatch = useDispatch();

    const getEventList = useCallback(async () => {
        const analyticsEventList = await props.getEventList();
        dispatch(setAnalyticsEventsData(analyticsEventList));
        setPreparedEventList(analyticsEventList.sort((a, b) => {
            return a.timestamp > b.timestamp ? 1 : -1
        }).map((evt: IAnalyticsEvent) => {
            const minutes = String(Math.floor(Math.trunc(evt.timestamp) / 60)).padStart(2, '0');
            const seconds = String(Math.trunc(evt.timestamp) - Number(minutes) * 60).padStart(2, '0');
            const milliseconds = (evt.timestamp.toFixed(3).split('.')[1]);
            return {
                'hash': hash(evt),
                'time': `${minutes}:${seconds}:${milliseconds}`,
                'analyticsEvent': evt
            };
        }));
    }, [props, dispatch]);

    useEffect(() => {
        getEventList();
    }, [getEventList]);

    return (
        <div className="analytics-event">
            <ul className="analytics-event__list">
                {preparedEventList.map(evt => (
                    <EventItem
                        key={evt.hash}
                        time={evt.time}
                        timestamp={evt.analyticsEvent.timestamp}
                    />
                ))}
            </ul>
        </div>
    )
}