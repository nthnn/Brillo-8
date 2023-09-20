import React from "react";

export default class StackIcon extends React.Component<{
    logo: string,
    url: string
}, {}> {
    render() {
        return (
            <a href={this.props.url} target="_blank">
                <img className="tech-stack" src={this.props.logo} />
            </a>
        );
    }
}