"use client";

import * as ReactDOMClient from "react-dom/client";
import React from "react";
import Home from "./pages/home";

import "bootstrap/dist/js/bootstrap.bundle";
import "../../node_modules/bootswatch/dist/darkly/bootstrap.min.css";

let appRoot: ReactDOMClient.Root | null = null;
let docRoot: HTMLElement | null = document.getElementById('root');

if(docRoot != null) {
    appRoot = ReactDOMClient.createRoot(docRoot);
    appRoot.render(<Home />);
}

export default appRoot;