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
        let hist = _.takeRight(this.props.history,
            this.props.length).reverse();

        let prev = hist
            .map(h => this.props.history.indexOf(h))
            .map(i => {
                if (i >= 0)
                    return this.props.history[i];
                else
                    return null;
            });


        let histItems = _.zip(hist, prev)
            .map(states => {
                return <HistoryItem state={states[0]} prev={states[1]} />;
            });

        let filled = _.concat(
            histItems,
            this.props.history.length < this.props.length ?
                _.range(this.props.length - this.props.history.length)
                    .map(i => <HistoryItem state={null} prev={null} />)
                :
                []
        );

        return filled.map(h => {
            return <Col xs={2}>{h}</Col>;
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