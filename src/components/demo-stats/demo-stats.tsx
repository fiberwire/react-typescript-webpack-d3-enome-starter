import * as React from "react";
import * as _ from "lodash";
import { Col, Row } from "react-flexbox-grid";

import "./demo-stats.scss";
import { HistoryState } from "../../interfaces/history-state";
import { Point } from "../../interfaces/point";
import { HistoryItem } from "../history-item/history-item";
import { History } from "../history/history";
import { IEvaluation, Genome } from "enome";
import { DemoOptions } from "../../interfaces/demo-options";

interface Props {
    fitness: number;
    data: Point[];
    history: HistoryState[];
    historyLength: number;
    generation: number;
    fitnessFunc: (genome: Genome<DemoOptions>) => IEvaluation<DemoOptions, Point[]>;
}

interface State {

}

export class DemoStats extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
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
                    <History
                        history={this.props.history}
                        length={this.props.historyLength}
                        fitness={this.props.fitnessFunc}
                    />
                </Col>
            </Row>

        </div>;
    }
}