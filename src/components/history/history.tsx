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
        return _.concat(
            _.takeRight(this.props.history.map(h => <HistoryItem state={h} />),
                this.props.length).reverse(),
            this.props.history.length < this.props.length ?
                _.range(this.props.length - this.props.history.length)
                    .map(i => <HistoryItem state={null} />)
                :
                []
        )
            .map(h => {
                return <Col xs>{h}</Col>;
            });
    }

    render() {
        return <div>
            <ul className="history-list">
                {this.renderList()}
            </ul>
        </div>;
    }
}