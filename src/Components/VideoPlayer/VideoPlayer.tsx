import {ReactElement} from "react";

const videoUrl: string = import.meta.env.VITE_APP_VIDEO_URL;

function VideoPlayer(): ReactElement {
    return (
        <div className="video-player">
            <video className="video-player__video" controls>
                <source src={videoUrl} type="video/mp4"/>
            </video>
        </div>
    )
}

export default VideoPlayer;