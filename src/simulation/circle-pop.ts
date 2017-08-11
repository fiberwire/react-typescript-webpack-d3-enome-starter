import { Population, Genome, IEvaluation } from "enome";
import { ICircleState } from "./circle-state";
import {Point} from "../interfaces/point";
import { ICircleData } from "./circle-data";
import { ICircleOrgOptions } from "./circle-org-options";
import { ICirclePopOptions } from "./circle-pop-options";
import { ICircleGenomeOptions } from "./circle-genome-options";
import { CircleOrg } from "./circle-org";

export class CirclePop extends Population<
ICircleGenomeOptions,
ICirclePopOptions,
ICircleOrgOptions,
ICircleData, Point[], ICircleState, ICircleState> {

    mutate(evaluation: IEvaluation<ICircleGenomeOptions, ICircleData, Point[]>): Genome<ICircleGenomeOptions> {
        throw new Error("Method not implemented.");
    }

    createOrganism(genome: Genome<ICircleGenomeOptions>, options: ICircleOrgOptions): CircleOrg {
        throw new Error("Method not implemented.");
    }

}