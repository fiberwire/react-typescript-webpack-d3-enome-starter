import * as React from "react";
import { Demo } from "./demo/demo";
import { Grid } from "react-flexbox-grid";


require("./App.scss");

const reactLogo = require("./react_logo.svg");

export interface AppProps {
}

export default class App extends React.Component<AppProps, undefined> {
    render() {
        return <Grid fluid>
            <Demo
                drawingWidth={window.innerWidth * 0.9}
                drawingHeight={window.innerHeight * 0.5}
            />
        </Grid>;
    }
}
