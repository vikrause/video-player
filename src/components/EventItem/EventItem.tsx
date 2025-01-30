import {useDispatch} from "react-redux";
import {setCurrentTimestamp} from "../../actions/actions.ts";

interface EventItemProps {
    key: string;
    time: string;
    timestamp: number;
}

export default function EventItem(props: EventItemProps) {
    const dispatch = useDispatch();
    return (
        <li className="event-item">
            <button className="event-item__button"
                    onClick={() => dispatch(
                        setCurrentTimestamp(props.timestamp)
                    )}>{props.time}</button>
        </li>
    )
}