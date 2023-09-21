import React from "react";
import {
    CodeBracketIcon,
    CpuChipIcon,
    DocumentIcon,
    HomeModernIcon
} from "@heroicons/react/24/outline";

export default class NavigationBar extends React.Component<{
    currentPage: string
}, {}> {
    render() {
        return (
            <header className="header sticky-top">
                <nav className="navbar navbar-expand-lg shadow-lg bg-dark" data-bs-theme="dark">
                    <div className="container-fluid">
                        <a className="navbar-brand" href="#">
                            <CpuChipIcon className="icon-32"/>
                            Brillo-8
                        </a>
                        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#nav-bar" aria-controls="nav-bar" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="collapse navbar-collapse justify-content-end" id="nav-bar">
                            <ul className="navbar-nav">
                                <li className="nav-item">
                                    <a href={this.props.currentPage === "home" ? "#" : "/"} className={(this.props.currentPage == "home" ? "active ": "") + "nav-link"}>
                                        <HomeModernIcon className="icon-24"/>
                                        Home
                                    </a>
                                </li>
                                <li className="nav-item">
                                    <a href={this.props.currentPage === "docs" ? "#" : "documentation.html"} className={(this.props.currentPage == "docs" ? "active ": "") + "nav-link"}>
                                        <DocumentIcon className="icon-24"/>
                                        Documentations
                                    </a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" href="https://github.com/nthnn/Brillo-8" target="_blank">
                                        <CodeBracketIcon className="icon-24"/>
                                        GitHub
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </nav>
            </header>
        );
    }
}