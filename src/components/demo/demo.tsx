import { Drawing } from "../drawing/drawing";

import * as React from "React";
import { Flex, Box } from "reflexbox";
import { DemoStats } from "../demo-stats/demo-stats";
import { DemoControls } from "../demo-controls/demo-controls";
import { Population } from "../../population";
import { Point } from "../../point";
import { BehaviorSubject, IDisposable } from "rx";
import { Row, Col } from "react-flexbox-grid";

interface Props {
    drawingWidth: number;
    drawingHeight: number;
}

interface State {
    data: Point[];
    evolving: BehaviorSubject<boolean>;
}

export class Demo extends React.Component<Props, State> {
    pop: Population;
    evolution: IDisposable;

    constructor(props: Props) {
        super(props);
        this.pop = new Population(this.props.drawingWidth, this.props.drawingHeight, 50);
        this.state = {
            data: [],
            evolving: new BehaviorSubject(false)
        };

        this.state.evolving
            .subscribe(e => {
                if (e) {
                    this.startEvolution();
                } else {
                    this.stopEvolution();
                }
            });
    }

    startEvolution = () => {
        if (this.evolution != null) {
            this.evolution.dispose();
            this.evolution = null;
        }

        this.evolution = this.pop.evolve$()
            .subscribe(e => {
                this.setState({
                    data: e.result
                });
            });
    }

    stopEvolution = () => {
        if (this.evolution != null) {
            this.evolution.dispose();
            this.evolution = null;
        }
    }


    render() {
        return <Row className="demo">
            <Row >
                <Drawing
                    width={this.props.drawingWidth}
                    height={this.props.drawingHeight}
                    data={this.state.data}
                    margin={this.pop.genOptions.margin}
                />
            </Row>

            <Row>
                <Col >
                    <DemoStats />
                </Col>
                <Col >
                    <DemoControls
                        evolving={this.state.evolving}
                    />
                </Col>
            </Row>
        </Row>;
    }
}