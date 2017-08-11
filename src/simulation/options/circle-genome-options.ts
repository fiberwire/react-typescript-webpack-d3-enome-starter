
import { IGenomeOptions } from "enome";

export interface ICircleGenomeOptions extends IGenomeOptions {
    circles: number;
    minX: number;
    maxX: number;
    minY: number;
    maxY: number;
    radius: number;
    margin: number;
}