import { Point } from "./point";

export interface HistoryState {
    data: Point[];
    fitness: number;
    generation: number;
}