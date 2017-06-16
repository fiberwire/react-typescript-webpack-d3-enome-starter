import * as React from "react";
import { Col, Row } from "react-flexbox-grid";
import * as _ from "lodash";

import "./demo-stats.scss";
import { HistoryState } from "../../interfaces/history-state";
import { Point } from "../../interfaces/point";

interface Props {
    data: Point[];
    history: HistoryState[];
    historyLength: number;
    generation: number;
}

interface State {

}

export class DemoStats extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
    }

    renderHistory = () => {
        let history = () => {
            if (this.props.history.length > this.props.historyLength) {
                return _.takeRight(
                    this.props.history.map(h => {
                        return <li>
                            {`Gen ${h.generation}: ${h.fitness}`}
                        </li>;
                    }),
                    this.props.historyLength)
                    .reverse();
            } else {
                return _.concat(
                    _.takeRight(this.props.history.map(h => `Gen ${h.generation}: ${h.fitness}`), this.props.historyLength).reverse(),
                    _.range(this.props.historyLength - this.props.history.length).map(i => "-")
                )
                    .map(h => {
                        return <li>{h}</li>;
                    });

            }
        };

        return <ul>
            {
                history()
            }
        </ul>;
    }

    render() {
        return <div>

            <Row className="generation-row">
                <Col>
                    <div className="generation-label">
                        Generation:
                    </div>
                </Col>
                <Col>
                    <div className="generation">
                        {` ${this.props.generation}`}
                    </div>
                </Col>
            </Row>

            <Row className="history-row">
                <Col className="history-label">History:</Col>
                <Col className="history">
                    {this.renderHistory()}
                </Col>
            </Row>

        </div>;
    }
}