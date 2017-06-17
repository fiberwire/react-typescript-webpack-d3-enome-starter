import * as React from "react";
import { BehaviorSubject } from "rx";
import { Box } from "reflexbox";

import "./demo-controls.scss";
import { Col } from 'react-flexbox-grid';

interface Props {
    evolving: BehaviorSubject<boolean>;
    reset: () => void;
}

interface State {

}

export class DemoControls extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
    }


    startEvolution = () => {
        this.props.evolving.onNext(true);
    }

    stopEvolution = () => {
        this.props.evolving.onNext(false);
    }

    render() {
        return <div>
            <Col xs={3}>
                <button className="start-btn btn" onClick={this.startEvolution}>Start Evolution</button>
            </Col>

            <Col xs={3}>
                <button className="stop-btn btn" onClick={this.stopEvolution}>Stop Evolution</button>
            </Col>

            <Col xs={3}>
                <button className="reset-btn btn" onClick={this.props.reset}>Reset</button>
            </Col>

        </div>;
    }
}