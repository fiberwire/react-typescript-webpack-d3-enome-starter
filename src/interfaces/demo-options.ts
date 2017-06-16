import { IGenomeOptions } from "enome";


export interface DemoOptions extends IGenomeOptions {
    minX: number;
    maxX: number;
    minY: number;
    maxY: number;
    margin: number;
}