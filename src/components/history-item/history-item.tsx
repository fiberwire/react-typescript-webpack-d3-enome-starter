import * as React from "react";
import * as _ from "lodash";

import "./history-item.scss";
import { HistoryState } from "../../interfaces/history-state";

interface Props {
    state: HistoryState;
    prev: HistoryState;
}

interface State {

}

export class HistoryItem extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
    }

    render() {
        if (this.props.state != null) {
            return <div className="history-item">
                <div className="history-generation">
                    {`Gen ${this.props.state.generation}`}
                </div>
                <div className="history-fitness">
                    {_.round(this.props.state.fitness, 2)}
                </div>
            </div>;
        } else {
            return <div className="history-item">...</div>;
        }

    }
}