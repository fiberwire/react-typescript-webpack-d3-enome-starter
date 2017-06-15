import * as React from "react";

import "./drawing.scss";
import { Point } from "../../point";

interface Props {
    width: number;
    height: number;
    data: Point[];
}

interface State { }

export class Drawing extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
    }

    renderCircles() {
        return this.props.data.map(data => {
            return <circle cx={data.x} cy={data.y} key={`[${data.x}, ${data.y}]`}></circle >;
        });
    }

    render() {
        return <svg width={this.props.width} height={this.props.height}>
            {this.renderCircles()}
        </svg>;
    }
}