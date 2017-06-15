import { Drawing } from "../drawing/drawing";

import * as React from "React";
import { Flex, Box } from "reflexbox";
import { DemoStats } from "../demo-stats/demo-stats";
import { DemoControls } from "../demo-controls/demo-controls";
import { Population } from "../../population";
import { Point } from "../../point";

interface Props {
    drawingWidth: number;
    drawingHeight: number;
}

interface State {
    data: Point[];
}

export class Demo extends React.Component<Props, State> {
    pop: Population;

    constructor(props: Props) {
        super(props);
        this.pop = new Population(this.props.drawingWidth, this.props.drawingHeight, 50);
    }

    render() {
        return <Flex align="center" className="demo">
            <Box p={4} w={8}>
                <Drawing
                    width={this.props.drawingWidth}
                    height={this.props.drawingHeight}
                    data={this.state.data}
                />
            </Box>

            <Box>
                <Box w={4} p={4}>
                    <DemoStats />
                </Box>
                <Box w={4} p={4}>
                    <DemoControls />
                </Box>
            </Box>
        </Flex>;
    }
}