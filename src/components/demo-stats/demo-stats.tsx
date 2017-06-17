import * as React from "react";
import * as _ from "lodash";
import { Col, Row } from "react-flexbox-grid";

import "./demo-stats.scss";
import { HistoryState } from "../../interfaces/history-state";
import { Point } from "../../interfaces/point";

interface Props {
    fitness: number;
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
                        return <li className="history-item">
                            {`Gen ${h.generation}: ${_.round(h.fitness, 4)}`}
                        </li>;
                    }),
                    this.props.historyLength)
                    .reverse();
            } else {
                return _.concat(
                    _.takeRight(this.props.history.map(h => `Gen ${h.generation}: ${_.round(h.fitness, 4)}`), this.props.historyLength).reverse(),
                    _.range(this.props.historyLength - this.props.history.length).map(i => "...")
                )
                    .map(h => {
                        return <li className="history-item">{h}</li>;
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
        return <div className="demo-stats">
            <Row>
                <Col xs={3}>
                    <div className="generation-label label">
                        Generation
                    </div>
                </Col>
                <Col xs>
                    <div className="generation">
                        {this.props.generation}
                    </div>
                </Col>
            </Row>

            <Row>
                <Col xs={3}>
                    <div className="fitness-label label">
                        Fitness:
                    </div>
                </Col>
                <Col xs>
                    <div className="fitness">
                        {this.props.fitness}
                    </div>
                </Col>
            </Row>

            <Row >
                <Col xs={3}>
                    <div className="history-label label">
                        History:
                    </div>
                </Col>
                <Col xs>
                    <div className="history">
                        {this.renderHistory()}
                    </div>
                </Col>
            </Row>

        </div>;
    }
}