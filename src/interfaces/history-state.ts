import { ICircleGenomeOptions } from "../simulation/options/circle-genome-options";
import { Genome } from "enome";
import { Point } from "./point";

export interface HistoryState {
    data: Point[];
    fitness: number;
    generation: number;
    genomes: Genome<ICircleGenomeOptions>[];
}