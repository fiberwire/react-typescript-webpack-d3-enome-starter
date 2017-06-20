import * as React from "react";
import * as _ from "lodash";

import "./history-item.scss";
import { HistoryState } from "../../interfaces/history-state";
import { IEvaluation, Genome } from "enome";
import { DemoOptions } from "../../interfaces/demo-options";
import { Point } from "../../interfaces/point";

interface Props {
    history: HistoryState[];
    fitness: (genome: Genome<DemoOptions>) => IEvaluation<DemoOptions, Point[]>;
    index: number;
}

interface State {

}

export class HistoryItem extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
    }

    get prevState(): HistoryState {
        if (this.props.index <= 0) return null;
        return this.props.history[this.props.index - 1];
    }

    get currState(): HistoryState {
        if (this.props.index < 0) return null;
        return this.props.history[this.props.index];
    }

    get color(): string {
        if (this.prevState == null) {
            return "";
        }

        let curr = this.currState.fitness;
        let prev = this.prevState.fitness;

        if (this.currState.fitness >= this.prevState.fitness) {
            console.log(`BLUE: curr: ${curr} prev: ${prev}`);
            return "better";
        }
        else {
            console.log(`RED: curr: ${curr} prev: ${prev}`);
            return "worse";
        }
    }

    get difference(): string {
        if (!this.currState || !this.prevState) {
            return "";
        } else {
            let diff = this.currState.fitness - this.prevState.fitness;
            let sign = diff >= 0 ? "+" : "";

            return `${sign}${_.round(diff, 2)}`;
        }
    }

    get best(): number {
        return _.max(
            this.currState.genomes
                .map(g => this.props.fitness(g).fitness)
        );
    }

    get worst(): number {
        return _.min(
            this.currState.genomes
                .map(g => this.props.fitness(g).fitness)
        );
    }

    render() {

        if (this.currState != null) {
            return <div className="history-item">
                <div className="history-generation">
                    {`Gen ${this.currState.generation}`}
                </div>
                <div className={`history-fitness ${this.color}`} >
                    {_.round(this.currState.fitness, 2)} ({this.difference})
                </div>
                {/*<div className="history-best">
                    {`Best: ${this.best}`}
                </div>
                <div className="history-worst">
                    {`Worst: ${this.worst}`}
                </div>*/}
            </div>;
        } else {
            return <div className="history-item">...</div>;
        }

    }
}