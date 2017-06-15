import * as React from "react";

interface Props {
    width: number;
    height: number;
}

interface State { }

export class Drawing extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
    }

    render() {
        return <svg width={this.props.width} height={this.props.height}>

        </svg>;
    }
}