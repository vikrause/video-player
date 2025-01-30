import {useDispatch} from "react-redux";

interface EventItemProps{
    key: string;
    time: string;
    timestamp: number;
}

export default function EventItem(props: EventItemProps) {
    const dispatch = useDispatch();
    return(
        <li className="event-item">
            <button className="event-item__button" onClick={() => dispatch({type: 'SET_CURRENT_TIMESTAMP', timestamp: props.timestamp })}>{props.time}</button>
        </li>
    )
}