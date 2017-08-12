import { ICircleOrgOptions } from "../../simulation/options/circle-org-options";
import { ICirclePopOptions } from "../../simulation/options/circle-pop-options";
import { ICircleGenomeOptions } from "../../simulation/options/circle-genome-options";
import { ICircleEnvOptions } from "../../simulation/options/circle-env-options";
import { CircleEnv } from "../../simulation/circle-env";
import { CirclePop } from "../../simulation/circle-pop";
import { CircleSim } from "../../simulation/circle-sim";
import { Drawing } from "../drawing/drawing";

import * as React from "React";
import { DemoStats } from "../demo-stats/demo-stats";
import { DemoControls } from "../demo-controls/demo-controls";
import { Row, Col } from "react-flexbox-grid";

import * as _ from "lodash";
import { Point } from "../../interfaces/point";
import { HistoryState } from "../../interfaces/history-state";

import { GenomeRefill, FitnessObjective, MutateOp, UpdateType } from "enome";
import { Subscription } from "rxjs/Subscription";
import { BehaviorSubject } from "rxjs/BehaviorSubject";

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
    evolution: Subscription;
    sim: CircleSim;

    constructor(props: Props) {
        super(props);

        // initialize state
        this.state = {
            data: [],
            fitness: 0,
            evolving: new BehaviorSubject(false),
            reset: new BehaviorSubject(false),
            history: [],
            generation: 0
        };

        const genOptions: ICircleGenomeOptions = {
            genomeLength: 100,
            geneLength: 1,
            circles: 50,
            minX: 0,
            maxX: this.props.drawingWidth,
            minY: 0,
            maxY: this.props.drawingHeight,
            radius: 5,
            margin: 35,
            refill: GenomeRefill.extend,
        };

        const popOptions: ICirclePopOptions = {
            generations: 1000,
            mutate: {
                mutateChance: 0.05,
                mutateOp: MutateOp.sub,
            },
            objective: FitnessObjective.maximize,
            progress: true,
            size: 10,
            topPercent: .25,
            weights: {
                keep: 5,
                mutate: 15,
                randomize: 10,
                reproduce: 70,
            },
        };

        const orgOptions: ICircleOrgOptions = {
            interactions: 1,
            radius: 35,
        };

        const envOptions: ICircleEnvOptions = {
            interactionRate: 1000,
            updateType: UpdateType.random,
        };

        // initialize sim
        let pop = new CirclePop(
            genOptions,
            popOptions,
            orgOptions
        );

        let env = new CircleEnv(envOptions);
        this.sim = new CircleSim(pop, env);

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
            generation: 0,
            fitness: 0
        });

        this.state.reset.next(false);
    }

    startEvolution = () => {
        if (this.evolution != null) {
            this.evolution.unsubscribe();
            this.evolution = null;
        }

        console.log("beginning evolution");

        this.evolution = this.sim.start().best
            .subscribe(e => {
                console.log(e.genotype.id);
                this.setState({
                    data: e.phenotype,
                    fitness: e.fitness,
                    history: _.concat(
                        this.state.history,
                        {
                            data: e.phenotype,
                            fitness: e.fitness,
                            generation: this.state.generation,
                            genomes: this.sim.organisms.value
                                .map((o) => o.genotype),
                        }
                    ),
                    generation: this.state.generation + 1
                });
            });
    }

    stopEvolution = () => {
        if (this.evolution != null) {
            this.evolution.unsubscribe();
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
                    margin={this.sim.population.genOptions.margin}
                    circleSize={this.sim.population.genOptions.radius}
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