import { IGenomeOptions } from "enome/out/src/options/genome-options";


export interface DemoOptions extends IGenomeOptions {
    minX: number;
    maxX: number;
    minY: number;
    maxY: number;
    margin: number;
}