import { ICircleData } from "./circle-data";
import { Point } from "../interfaces/point";
import { ICircleState } from "./circle-state";
import { Simulation } from "enome";
import { ICircleGenomeOptions } from "./options/circle-genome-options";
import { ICirclePopOptions } from "./options/circle-pop-options";
import { ICircleOrgOptions } from "./options/circle-org-options";

export class CircleSim extends Simulation<
ICircleGenomeOptions,
ICirclePopOptions,
ICircleOrgOptions,
ICircleData, Point[], ICircleState, ICircleState> {

}