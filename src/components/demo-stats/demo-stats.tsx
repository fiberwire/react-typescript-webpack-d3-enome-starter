import * as React from "react";
import { Row } from "react-flexbox-grid";

import * as _ from "lodash";

import "./demo-stats.scss";
import { HistoryState } from "../../interfaces/history-state";
import { Point } from "../../interfaces/point";

interface Props {
    data: Point[];
    history: HistoryState[];
    historyLength: number;
}

interface State {

}

export class DemoStats extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
    }

    renderHistory = () => {
        return <ul>
            {
                _.takeRight(
                    this.props.history.map(h => {
                        return <li>
                            {h.fitness}
                        </li>;
                    }),
                    this.props.historyLength)
            }
        </ul>;
    }

    render() {
        return <div>
            <Row>
                <p>History:</p>
                {this.renderHistory()}
            </Row>

        </div>;
    }
}