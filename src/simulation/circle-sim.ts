import { ICircleData } from "./circle-data";
import { Point } from "../interfaces/point";
import { ICircleOrgOptions } from "./circle-org-options";
import { ICirclePopOptions } from "./circle-pop-options";
import { ICircleGenomeOptions } from "./circle-genome-options";
import { ICircleState } from "./circle-state";
import { Simulation } from "enome";

export class CircleSim extends Simulation<
ICircleGenomeOptions,
ICirclePopOptions,
ICircleOrgOptions,
ICircleData, Point[], ICircleState, ICircleState> {

}