import React from "react";
import NavigationBar from "../components/navigationbar";
import {
    ArrowRightIcon,
    ArrowDownIcon
} from "@heroicons/react/24/outline";

import Brillo8Top from "../../../../assets/brillo-8_v0.1_top.svg";

export default class Home extends React.Component {
    onPageout(): void {
    }

    render() {
        return (
            <>
                <div className="desktop-only"><br/><br/><br/></div>
                <div className="row m-4">
                    <div className="col-lg-6 pt-5">
                        <div className="desktop-only"><br/></div>
                        <h1>Brillo-8: Programmable Pocket Computer</h1>
                        <p>A programmable pocket computer packed neatly on a small 80cm x 50mm circuit board. Small but powerful virtual machine, residing within the trusted ATMega328P microcontroller, offers a compelling platform for several compelling reasons.</p>
                        <button className="btn btn-outline-info rounded-0">
                            Learn More
                            <ArrowRightIcon className="icon-24 pl-2" />
                        </button>
                        <br/><br/>
                    </div>

                    <div className="col-lg-6">
                        <img src={Brillo8Top} className="w-100 h-100 brillo-8" />
                    </div>
                </div>

                <div className="desktop-only">
                    <br/><br/><br/>

                    <center>
                        <ArrowDownIcon className="icon-32" />
                    </center>

                </div>

                <div className="desktop-only"><br/></div>
                <br/>

                <NavigationBar currentPage="home" onPageout={this.onPageout} />
            </>
        );
    }
}