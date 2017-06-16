import * as React from "react";

import "./drawing.scss";
import { Point } from "../../point";

interface Props {
    width: number;
    height: number;
    data: Point[];
    margin: number;
}

interface State { }

export class Drawing extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
    }

    renderCircles() {
        return <g>
            {this.props.data.map(data => {
                return <circle
                    cx={data.x}
                    cy={data.y}
                    r={5}
                    key={`[${data.x}, ${data.y}]`}
                    fill={"#fff"}
                ></circle >;
            })}
        </g>;

    }

    renderMargins() {
        return <g>
            {this.props.data.map(data => {
                return <circle
                    cx={data.x}
                    cy={data.y}
                    r={this.props.margin}
                    key={`[${data.x}, ${data.y}]`}
                    fill={"#fff"}
                    fillOpacity={0.25}
                ></circle>;
            })}
        </g>;
    }

    render() {
        return <svg width={this.props.width} height={this.props.height}>
            {this.renderMargins()}
            {this.renderCircles()}
        </svg>;
    }
}