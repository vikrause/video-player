import {ReactElement, useEffect, useRef, useCallback, useState} from "react";
import {useStore} from "react-redux";
import {Store} from "redux";
import {IAnalyticsEvent, IRootState} from "../../models.ts";

const videoUrl: string = import.meta.env.VITE_APP_VIDEO_URL;

function VideoPlayer(): ReactElement {
    const playerRef = useRef<HTMLVideoElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [eventPathList, setEventPathList] = useState<IAnalyticsEvent[]>([]);
    const store: Store = useStore();

   function toggleVideo(): void {
       if (playerRef.current) {
           if (playerRef.current.paused) {
               playerRef.current.play();
           } else {
               playerRef.current.pause();
           }
       }
   }

    store.subscribe(() => {
        const state: IRootState = store.getState();
        setEventPathList(state.analyticsEventList);

        if (playerRef.current) {
            playerRef.current.currentTime = state.timestamp;
        }
    });

    const updateCanvas = useCallback(() => {
        if (!canvasRef.current || !playerRef.current) return;

        const ctx = canvasRef.current.getContext("2d");

        if (!ctx) return;

        ctx.drawImage(playerRef.current, 0, 0, canvasRef.current.width, canvasRef.current.height);

        ctx.strokeStyle = '#66ff00';
        ctx.lineWidth = 5;

        let multiplier = 1;

        if (playerRef.current.currentTime > 0) {
            const fractionDigits = String(playerRef.current.currentTime).split(".")[1].length;
            multiplier = Math.pow(10, fractionDigits);
        }

        eventPathList.forEach((evt) => {
            if (!playerRef.current) return;

            if(
                playerRef.current.currentTime >= Math.trunc(evt.timestamp * multiplier) / multiplier &&
                playerRef.current.currentTime <= Math.trunc((evt.timestamp + evt.duration) * multiplier) / multiplier
            ) {
                ctx.strokeRect(evt.zone.left, evt.zone.top, evt.zone.width, evt.zone.height);
            }
        });

        playerRef.current.requestVideoFrameCallback(updateCanvas);

    }, [eventPathList]);

    useEffect(() => {
        if (playerRef.current) {
            playerRef.current.requestVideoFrameCallback(updateCanvas);
        }
    }, [updateCanvas]);

    return (
        <div className="video-player">
            <video ref={playerRef} className="video-player__video" controls>
                <source src={videoUrl} type="video/mp4"/>
            </video>
            <canvas ref={canvasRef} id="player-canvas" className="video-player__canvas" height="720" width="1280" onClick={toggleVideo} ></canvas>
        </div>
    )
}

export default VideoPlayer;