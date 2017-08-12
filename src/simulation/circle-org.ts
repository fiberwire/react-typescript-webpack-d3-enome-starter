import { ICircleOrgOptions } from "./options/circle-org-options";
import { ICirclePopOptions } from "./options/circle-pop-options";
import { ICircleGenomeOptions } from "./options/circle-genome-options";
import { ICircleState } from "./circle-state";
import { Point } from "../interfaces/point";
import { ICircleData } from "./circle-data";
import { Organism, IStateUpdate, Genome, IEvaluation, IAgentUpdate } from "enome";

import * as _ from "lodash";

export class CircleOrg extends Organism<
    ICircleGenomeOptions,
    ICirclePopOptions,
    ICircleOrgOptions,
    ICircleData, Point[], ICircleState, ICircleState> {

    perceive(state: IStateUpdate<ICircleState>): IStateUpdate<ICircleState> {
        return state;
    }

    interact(state: IStateUpdate<ICircleState>, phenotype: Point[]): IAgentUpdate<ICircleState> {
        return {
            agentID: this.genotype.id,
            interaction: state.interaction++,
            state: {
                points: this.phenotype,
            }
        };
    }

    observe(interaction: IStateUpdate<ICircleState>): ICircleData {
        return interaction.state;
    }

    evaluate(data: ICircleData[], genotype: Genome<ICircleGenomeOptions>, phenotype: Point[]): IEvaluation<ICircleGenomeOptions, ICircleData, Point[]> {
        const points = data[0].points;

        // how far each point is from each other point
        const distances: Array<Array<number>> = points.map(point => {
            const others = _.without(points, point);

            return others.map((other) => {
                const dist = this.distance(other, point);
                return dist;
            });
        });

        // average distance between points
        const fitness = Math.abs(this.options.radius * 2 - _.mean(distances.map(_.mean)));

        return {
            genotype: this.genotype,
            phenotype: this.phenotype,
            data,
            fitness
        };
    }

    createPhenotype(genome: Genome<ICircleGenomeOptions>): Point[] {
        const options = this.genotype.options;

        return _.range(options.circles)
        .map((i) => {
            return {
                x: this.genotype.g.float(options.minX, options.maxX),
                y: this.genotype.g.float(options.minY, options.maxY),
            };
        });
    }

    private distance(a: Point, b: Point): number {
        return Math.sqrt(
            Math.pow(a.x - b.x, 2) + Math.pow(a.y - b.y, 2)
        );
    }

}