import React from "react";
import { ArrowRightIcon } from "@heroicons/react/24/outline";

export default class HomePageCard extends React.Component<{
    icon: React.ForwardRefExoticComponent<Omit<React.SVGProps<SVGSVGElement>, "ref"> & {
        title?: string | undefined;
        titleId?: string | undefined;
    } & React.RefAttributes<SVGSVGElement>>,
    title: string,
    content: string,
    buttonText: string,
    href: string,
    target? : string
}, {}> {
    render() {
        return (
            <div className="col-lg-4">
            <div className="card card-body border-light bg-transparent rounded-0">
                <this.props.icon className="icon-48 justify-self-center align-self-center desktop-only" />

                <center>
                    <div className="mobile-only">
                        <br/>
                        <this.props.icon className="icon-mob-48" />
                    </div>

                    <br/>
                    <h3>{this.props.title}</h3>
                    <br/>
                    <p>{this.props.content}</p>

                    <br/>
                </center>

                <a href={this.props.href} className="btn btn-outline-info rounded-0 learn-more" target={this.props.target != null ? this.props.target : ""}>
                    {this.props.buttonText}
                    <ArrowRightIcon className="icon-24 pl-2" />
                </a>
            </div>
            <br className="mobile-only" />
        </div>
        );
    }
}