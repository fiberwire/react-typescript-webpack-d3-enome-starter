import * as React from "react";
import * as _ from "lodash";
import { HistoryState } from "../../interfaces/history-state";
import { HistoryItem } from "../history-item/history-item";

import "./history.scss";
import { Col } from "react-flexbox-grid";
interface Props {
    history: HistoryState[];
    length: number;
}

interface State {

}

export class History extends React.Component<Props, State> {

    constructor(props: Props) {
        super(props);
    }

    renderList() {

        let histItems = _.range(this.props.history.length)
            .map(i => {
                return <HistoryItem history={this.props.history} index={i} />;
            }).reverse();

        let filled = _.concat(
            histItems,
            this.props.history.length < this.props.length ?
                _.range(this.props.length - this.props.history.length)
                    .map(i => <HistoryItem history={this.props.history} index={-1} />)
                :
                []
        );

        let wrappedInCol = filled.map(h => {
            return <Col xs={2}>{h}</Col>;
        });

        return wrappedInCol;
    }

    render() {
        return <div>
            <ul className="history-list">
                {this.renderList()}
            </ul>
        </div>;
    }
}