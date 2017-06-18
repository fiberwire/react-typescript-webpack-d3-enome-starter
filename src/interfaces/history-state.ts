import { Genome } from "enome";
import { Point } from "./point";
import { DemoOptions } from "./demo-options";

export interface HistoryState {
    data: Point[];
    fitness: number;
    generation: number;
    genomes: Genome<DemoOptions>[];
}