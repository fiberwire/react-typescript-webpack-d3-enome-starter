import {
    FitnessObjective,
    MutateType,
    FillType,
    Genome,
    MutateOp,
    ReproduceType,
    NaturalSelectionOptions,
    NaturalSelection,
    replenish,
} from "enome";
import { Point } from "./point";
import { DemoOptions } from "./demo-options";
import * as _ from "lodash";

export class Population extends NaturalSelection<DemoOptions, NaturalSelectionOptions, Point[]> {
    constructor(width: number, height: number, circles: number) {

        let gOptions: DemoOptions = {
            genomeLength: 100,
            geneLength: 1,
            loopGenes: false,
            minX: 0,
            maxX: width,
            minY: 0,
            maxY: height,
            margin: 35
        };

        let pOptions: NaturalSelectionOptions = {
            populationSize: 10,
            fillType: FillType.none,
            fillPercent: 0.15,
            reproduceOptions: {
                type: ReproduceType.safeSampled,
                sampleSize: 5,
            },
            mutateOptions: {
                mutateChance: 0.15,
                mutateOp: MutateOp.sub,
                type: MutateType.normal,
                sampleSize: 5
            },
            objective: FitnessObjective.minimize
        };

        let createPoints = (genome: Genome<DemoOptions>) => {
            genome = replenish(genome);

            return _.range(circles)
                .map(i => {
                    return {
                        x: genome.g.float(gOptions.minX, gOptions.maxX),
                        y: genome.g.float(gOptions.minY, gOptions.maxY)
                    };
                });
        };

        let fitness = (genome: Genome<DemoOptions>) => {
            genome = replenish(genome);

            let distance = (p1: Point, p2: Point) => {
                return Math.sqrt(
                    Math.pow(p1.x - p2.x, 2) +
                    Math.pow(p1.y - p2.y, 2)
                );
            };

            let distances = (p1: Point, points: Point[]) => {
                return points
                    .filter(p2 => p1 !== p2)
                    .map(p2 => {
                        return distance(p1, p2);
                    });
            };

            let findOverlap = (points: Point[]) => {
                let overlap = points.map(p1 => {
                    let ol = distances(p1, points)
                        .filter(d => d < gOptions.margin)
                        .map(d => gOptions.margin - d);
                    return _.sum(ol);
                });
                return _.sum(overlap);
            };

            let points = createPoints(genome);

            return { genome: replenish(genome), fitness: findOverlap(points), result: points };
        };


        super(pOptions,
            gOptions,
            createPoints,
            fitness
        );
    }
}