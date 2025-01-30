import {ReactElement, useRef} from "react";
import {useStore} from "react-redux";
import {Store} from "redux";

const videoUrl: string = import.meta.env.VITE_APP_VIDEO_URL;

function VideoPlayer(): ReactElement {
    const playerRef = useRef<HTMLVideoElement>(null);
    const store:Store = useStore();
    store.subscribe(()=>{
        if(playerRef.current){
            playerRef.current.currentTime = store.getState();
        }
    });

    return (
        <div className="video-player">
            <video ref={playerRef} className="video-player__video" controls>
                <source src={videoUrl} type="video/mp4"/>
            </video>
        </div>
    )
}

export default VideoPlayer;