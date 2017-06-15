import { Drawing } from "../drawing/drawing";

import * as React from "React";
import { Flex, Box } from "reflexbox";
import { DemoStats } from "../demo-stats/demo-stats";
import { DemoControls } from "../demo-controls/demo-controls";

interface Props {
    drawingWidth: number;
    drawingHeight: number;
}

interface State {

}

export class Demo extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
    }

    render() {
        return <Flex align="center" className="demo">
            <Box p={4} w={8}>
                <Drawing
                width={this.props.drawingWidth}
                height={this.props.drawingHeight}
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