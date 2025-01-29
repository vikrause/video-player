import {ReactElement} from "react";
import VideoPlayer from "../VideoPlayer/VideoPlayer.tsx";
import AnalyticsEventList from "../AnalyticsEventList/AnalyticsEventList.tsx";
import {IAnalyticsEvent} from "../../models.ts";

interface MainProps {
    getEventList(): Promise<IAnalyticsEvent[]>;
}

function Main(props: MainProps): ReactElement {
    return (
        <section className="main">
            <VideoPlayer/>
            <AnalyticsEventList getEventList={props.getEventList}/>
        </section>
    )
}

export default Main;