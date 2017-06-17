import { Drawing } from "../drawing/drawing";

import * as React from "React";
import { Flex, Box } from "reflexbox";
import { DemoStats } from "../demo-stats/demo-stats";
import { DemoControls } from "../demo-controls/demo-controls";
import { Population } from "../../population";
import { BehaviorSubject, IDisposable } from "rx";
import { Row, Col } from "react-flexbox-grid";

import * as _ from "lodash";
import { Point } from "../../interfaces/point";
import { HistoryState } from "../../interfaces/history-state";

interface Props {
    drawingWidth: number;
    drawingHeight: number;
}

interface State {
    data: Point[];
    fitness: number;
    evolving: BehaviorSubject<boolean>;
    reset: BehaviorSubject<boolean>;
    history: HistoryState[];
    generation: number;
}

export class Demo extends React.Component<Props, State> {
    pop: Population;
    evolution: IDisposable;

    constructor(props: Props) {
        super(props);
        this.pop = new Population(this.props.drawingWidth, this.props.drawingHeight, 50);
        this.state = {
            data: [],
            fitness: 0,
            evolving: new BehaviorSubject(false),
            reset: new BehaviorSubject(false),
            history: [],
            generation: 0
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

    reset = () => {
        this.stopEvolution();

        this.setState({
            data: [],
            history: [],
            generation: 0
        });

        this.state.reset.onNext(false);
    }

    startEvolution = () => {
        if (this.evolution != null) {
            this.evolution.dispose();
            this.evolution = null;
        }

        console.log("beginning evolution");

        this.evolution = this.pop.evolve$(15, 500)
            .subscribe(e => {
                console.log(e.genome.id);
                this.setState({
                    data: e.result,
                    fitness: e.fitness,
                    history: _.concat(
                        this.state.history,
                        { data: e.result, fitness: e.fitness, generation: this.state.generation }
                    ),
                    generation: this.state.generation + 1
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
        return <div>
            <Row>
                <Drawing
                    width={this.props.drawingWidth}
                    height={this.props.drawingHeight}
                    data={this.state.data}
                    margin={this.pop.genOptions.margin}
                    circleSize={10}
                />
            </Row>

            <Row>
                <Col xs>
                    <DemoStats
                        data={this.state.data}
                        history={this.state.history}
                        historyLength={10}
                        generation={this.state.generation}
                        fitness={this.state.fitness}
                    />
                </Col>
                <Col xs>
                    <DemoControls
                        evolving={this.state.evolving}
                        reset={this.reset}
                    />
                </Col>
            </Row>
        </div>;
    }
}