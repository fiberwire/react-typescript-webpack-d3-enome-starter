import {ICircleOrgOptions} from "./options/circle-org-options";
import {ICirclePopOptions} from "./options/circle-pop-options";
import {ICircleGenomeOptions} from "./options/circle-genome-options";
import { Population, Genome, IEvaluation } from "enome";
import { ICircleState } from "./circle-state";
import {Point} from "../interfaces/point";
import { ICircleData } from "./circle-data";
import { CircleOrg } from "./circle-org";

import * as _ from "lodash";

export class CirclePop extends Population<
ICircleGenomeOptions,
ICirclePopOptions,
ICircleOrgOptions,
ICircleData, Point[], ICircleState, ICircleState> {


    createOrganism(genome: Genome<ICircleGenomeOptions>, options: ICircleOrgOptions): CircleOrg {
        return new CircleOrg(new Genome<ICircleGenomeOptions>(this.genOptions), this.orgOptions);
    }

}