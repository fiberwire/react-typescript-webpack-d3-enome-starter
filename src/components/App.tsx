import * as React from "react";
import { Demo } from "./demo/demo";
import { Flex } from "reflexbox";


require("./App.scss");

const reactLogo = require("./react_logo.svg");

export interface AppProps {
}

export default class App extends React.Component<AppProps, undefined> {
    render() {
        return <Flex className="app">
            <Demo />
        </Flex>;
    }
}
