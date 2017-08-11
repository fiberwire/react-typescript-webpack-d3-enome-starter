import { ICircleGenomeOptions } from "./circle-genome-options";
import { ICirclePopOptions } from "./circle-pop-options";
import { ICircleOrgOptions } from "./circle-org-options";
import { ICircleData } from "./circle-data";
import { Point } from "../interfaces/point";
import { ICircleState } from "./circle-state";
import { Environment, IStateUpdate } from "enome";

export class CircleEnv extends Environment<
    ICircleGenomeOptions,
    ICirclePopOptions,
    ICircleOrgOptions,
    ICircleData, Point[], ICircleState, ICircleState> {

    public get initialState(): IStateUpdate<ICircleState>{
        return {
            interaction: 0,
            state: {
                points: [],
            }
        };
    }

}