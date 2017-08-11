import { ICircleState } from "./circle-state";
import { Point } from "../interfaces/point";
import { ICircleData } from "./circle-data";
import { ICircleOrgOptions } from "./circle-org-options";
import { ICirclePopOptions } from "./circle-pop-options";
import { ICircleGenomeOptions } from "./circle-genome-options";
import { Organism, IStateUpdate, Genome, IEvaluation } from "enome";

    export class CircleOrg extends Organism<
        ICircleGenomeOptions,
        ICirclePopOptions,
        ICircleOrgOptions,
        ICircleData, Point[], ICircleState, ICircleState> {
    perceive(state: IStateUpdate<ICircleState>): IStateUpdate<ICircleState> {
        throw new Error("Method not implemented.");
    }
    interact(state: IStateUpdate<ICircleState>, phenotype: Point[]): IStateUpdate<ICircleState> {
        throw new Error("Method not implemented.");
    }
    observe(interaction: IStateUpdate<ICircleState>): ICircleData {
        throw new Error("Method not implemented.");
    }
    evaluate(data: ICircleData[], genotype: Genome<ICircleGenomeOptions>, phenotype: Point[]): IEvaluation<ICircleGenomeOptions, ICircleData, Point[]> {
        throw new Error("Method not implemented.");
    }
    createPhenotype(genome: Genome<ICircleGenomeOptions>): Point[] {
        throw new Error("Method not implemented.");
    }

}