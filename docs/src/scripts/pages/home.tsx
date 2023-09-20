import React from "react";
import NavigationBar from "../components/navigationbar";
import {
    ArrowRightIcon,
    ArrowDownIcon,
    CodeBracketSquareIcon,
    CursorArrowRaysIcon,
    RectangleGroupIcon
} from "@heroicons/react/24/outline";

import Brillo8Top from "../../../../assets/brillo-8_v0.1_top.svg";
import Glass_Prism0006 from "../../assets/Glass_Prism0006.png";
import Glass_Prism0007 from "../../assets/Glass_Prism0007.png";
import Glass_Prism0097 from "../../assets/Glass_Prism0097.png";

export default class Home extends React.Component {
    onPageout(): void {
    }

    render() {
        return (
            <>
                <div className="desktop-only"><br/></div>
                <br/>
        
                <div className="m-4">
                    <div className="row">
                        <div className="col-lg-6">
                            <div className="desktop-only">
                                <br/><br/><br/><br/>
                            </div>

                            <div className="container">
                                <h1>Brillo-8: Programmable Pocket Computer</h1>
                                <p>A programmable pocket computer packed neatly on a small 80cm x 50mm circuit board. Small but powerful virtual machine, residing within the trusted ATMega328P microcontroller, offers a compelling platform for several compelling reasons.</p>
                                <button className="btn btn-outline-info rounded-0">
                                    Learn More
                                    <ArrowRightIcon className="icon-24 pl-2" />
                                </button>
                            </div>

                            <br className="desktop-only" /><br/>
                        </div>

                        <div className="col-lg-6">
                            <div className="d-flex">
                                <img src={Brillo8Top} className="w-100 h-100 brillo-8" />
                                <img src={Glass_Prism0006} className="glass-01" />
                                <img src={Glass_Prism0007} className="glass-02" />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="desktop-only">
                    <br/><br/><br/>
                    <center><ArrowDownIcon className="icon-32" /></center>
                </div>

                <div className="desktop-only"><br/></div>
                <br/>

                <NavigationBar currentPage="home" onPageout={this.onPageout} />

                <br/><br/><br/><br/><br/>
                <div className="container">
                    <center>
                        <h1>What is Brillo-8?</h1>
                        <p>Brillo-8 is a compact and versatile pocket programmable computer powered by an ATMega328P microcontroller. This innovative device allows you to create and execute custom instructions using a simple hardware interface. With Brillo-8, you can engage in a wide range of programming and learning activities on a small but powerful platform.</p>
                        <img src={Glass_Prism0097} className="glass-03" />
                    </center>
                </div>
                <br/><br/><br/><br/><br/><br/>

                <div className="container">
                    <div className="row">
                        <div className="col-lg-4">
                            <div className="card card-body border-light bg-transparent rounded-0">
                                <RectangleGroupIcon className="icon-48 justify-self-center align-self-center" />

                                <center>
                                    <br/>

                                    <h3>Compact PCB Design</h3>
                                    <p>Brillo-8 is housed on a 80cm x 50mm PCB, making it highly portable and easy to carry in your pocket.</p>

                                    <br/>
                                </center>
                            </div>
                        </div>

                        <div className="col-lg-4">
                            <div className="card card-body border-light bg-transparent rounded-0">
                                <CursorArrowRaysIcon className="icon-48 justify-self-center align-self-center" />

                                <center>
                                    <br/>

                                    <h3>User-Friendly Interface</h3>
                                    <p>Intuitive switches and button for pushing instructions, flashing firmware, and resetting the device.</p>

                                    <br/>
                                </center>
                            </div>
                        </div>

                        <div className="col-lg-4">
                            <div className="card card-body border-light bg-transparent rounded-0">
                                <CodeBracketSquareIcon className="icon-48 justify-self-center align-self-center" />

                                <center>
                                    <br/>

                                    <h3>Open-Source Firmware</h3>
                                    <p>Update and upgrade the Brillo-8's embedded system to modify or enhance and suit your needs.</p>

                                    <br/>
                                </center>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="desktop-only">
                    <br/><br/><br/><br/>
                </div>
                <br/><br/>
            </>
        );
    }
}