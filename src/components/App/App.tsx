import Main from "../Main/Main.tsx";
import api from "../../api/Api.ts";
import {IAnalyticsEvent} from "../../models.ts";
import {ReactElement} from "react";

function App(): ReactElement {

    async function getEventList(): Promise<IAnalyticsEvent[]> {
        try {
            return await api.getEventList();
        } catch (err) {
            console.error(err);
            throw err;
        }
    }

    return (
        <div className="app">
            <Main getEventList={getEventList}/>
        </div>
    )
}

export default App
