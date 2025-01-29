interface EventItemProps{
    key: string;
    time: string;
    timestamp: number;
}

export default function EventItem(props: EventItemProps) {
    return(
        <li className="event-item">
            <button className="event-item__button">{props.time}</button>
        </li>
    )
}