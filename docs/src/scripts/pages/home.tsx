import React from "react";
import NavigationBar from "../components/navigationbar";
import {
    ArrowRightIcon,
    ArrowDownIcon,
    CodeBracketSquareIcon,
    CursorArrowRaysIcon,
    RectangleGroupIcon
} from "@heroicons/react/24/outline";

import ArduinoLogo from "../../assets/arduino-logo.png";
import BootstrapLogo from "../../assets/bootstrap-logo.svg";
import BootswatchLogo from "../../assets/bootswatch-logo.svg";
import Brillo8Top from "../../../../assets/brillo-8_v0.1_top.svg";
import EasyEDALogo from "../../assets/easyeda-logo.png";
import Glass_Prism0006 from "../../assets/Glass_Prism0006.png";
import Glass_Prism0007 from "../../assets/Glass_Prism0007.png";
import Glass_Prism0097 from "../../assets/Glass_Prism0097.png";
import NodeJSLogo from "../../assets/nodejs-logo.png";
import NPMLogo from "../../assets/npm-logo.png";
import ParcelLogo from "../../assets/parcel-logo.png";
import PlatformIOLogo from "../../assets/platformio-labs-logo.png";
import ReactLogo from "../../assets/react-logo.png";
import TypeScriptLogo from "../../assets/typescript-logo.png";
import VercelLogo from "../../assets/vercel-logo.png";
import VSCodeLogo from "../../assets/vscode-logo.png";
import StackIcon from "../components/stackicon";

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
                                <br/><br/>
                            </div>

                            <div className="row">
                                <div className="col-md-1"></div>

                                <div className="col-md-9">
                                    <div className="container">
                                        <h1>Brillo-8: Programmable Pocket Computer</h1>
                                        <p>A programmable pocket computer packed neatly on a small 80cm x 50mm circuit board. Small but powerful virtual machine, residing within the trusted ATMega328P microcontroller, offers a compelling platform for several compelling reasons.</p>

                                        <a className="btn btn-outline-info rounded-0 learn-more" href="#main-section">
                                            Learn More
                                            <ArrowRightIcon className="icon-24 pl-2" />
                                        </a>
                                    </div>
                                </div>

                                <div className="col-md-2"></div>
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

                <div className="desktop-only"><br/><br/></div>
                <br/>

                <NavigationBar currentPage="home" onPageout={this.onPageout} />

                <br id="main-section"/><br/><br/><br/><br/><br/>
                <div className="desktop-only"><br/></div>

                <div className="container">
                    <div className="row">
                        <div className="col-sm-2"></div>

                        <div className="col-sm-8">
                            <center>
                                <h1>What is Brillo-8?</h1>
                                <p>Brillo-8 is a compact and versatile pocket programmable computer powered by an ATMega328P microcontroller. This innovative device allows you to create and execute custom instructions using a simple hardware interface. With Brillo-8, you can engage in a wide range of programming and learning activities on a small but powerful platform.</p>
                                <img src={Glass_Prism0097} className="glass-03" />
                            </center>
                        </div>

                        <div className="col-sm-2"></div>
                    </div>
                </div>
                <br/><br/><br/><br/><br/><br/><br/>

                <div className="container">
                    <div className="row">
                        <div className="col-lg-4">
                            <div className="card card-body border-light bg-transparent rounded-0">
                                <RectangleGroupIcon className="icon-48 justify-self-center align-self-center desktop-only" />

                                <center>
                                    <div className="mobile-only">
                                        <br/>
                                        <RectangleGroupIcon className="icon-mob-48" />
                                    </div>

                                    <br/>
                                    <h3>Compact PCB Design</h3>
                                    <br/>
                                    <p>Brillo-8 is housed on a 80cm x 50mm PCB, making it highly portable and easy to carry in your pocket.</p>

                                    <br/>
                                </center>

                                <a href="#" className="btn btn-outline-info rounded-0 learn-more">
                                    See PCB Files
                                    <ArrowRightIcon className="icon-24 pl-2" />
                                </a>
                            </div>
                        </div>

                        <div className="col-lg-4">
                            <div className="card card-body border-light bg-transparent rounded-0">
                                <CursorArrowRaysIcon className="icon-48 justify-self-center align-self-center desktop-only" />

                                <center>
                                    <div className="mobile-only">
                                        <br/>
                                        <CursorArrowRaysIcon className="icon-mob-48" />
                                    </div>

                                    <br/>
                                    <h3>User-Friendly Interface</h3>
                                    <br/>
                                    <p>Intuitive switches and button for pushing instructions, flashing firmware, and resetting the device.</p>

                                    <br/>
                                </center>

                                <a href="#" className="btn btn-outline-info rounded-0 learn-more">
                                    Hardware Interface
                                    <ArrowRightIcon className="icon-24 pl-2" />
                                </a>
                            </div>
                        </div>

                        <div className="col-lg-4">
                            <div className="card card-body border-light bg-transparent rounded-0">
                                <CodeBracketSquareIcon className="icon-48 justify-self-center align-self-center desktop-only" />

                                <center>
                                    <div className="mobile-only">
                                        <br/>
                                        <CodeBracketSquareIcon className="icon-mob-48" />
                                    </div>

                                    <br/>
                                    <h3>Open-Source Firmware</h3>
                                    <br/>
                                    <p>Update and upgrade the Brillo-8's embedded system to modify or enhance and suit your needs.</p>

                                    <br/>
                                </center>

                                <a href="https://github.com/nthnn/Brillo-8" className="btn btn-outline-info rounded-0 learn-more">
                                    GitHub Repository
                                    <ArrowRightIcon className="icon-24 pl-2" />
                                </a>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="desktop-only">
                    <br/><br/><br/>
                </div>
                <br/><br/>

                <div className="bg-light text-dark">
                    <div className="container">
                        <br className="desktop-only" />
                        <br/><br/>

                        <h1>Why Brillo-8?</h1>
                        <br/>

                        <div className="row">
                            <div className="col-lg-1" align="center">
                                <h1>1</h1>
                            </div>

                            <div className="col-lg-11">
                                <div className="container">
                                    <p>Brillo-8 stands as an excellent educational resource, making it easy for individuals of all skill levels to grasp the inner workings of microcontrollers, EEPROMs (memory chips), and virtual machines. With its user-friendly interface, featuring DIP switches and straightforward buttons, Brillo-8 is accessible even for beginners. It provides an opportunity to explore fundamental programming concepts, memory management, and hardware integration in a compact and hands-on manner.</p>
                                </div>
                            </div>
                        </div>
                        <br/>

                        <div className="row">
                            <div className="col-lg-1" align="center">
                                <h1>2</h1>
                            </div>

                            <div className="col-lg-11">
                                <div className="container">
                                    <p>For those eager to get hands-on experience with electronics, Brillo-8 offers a practical playground. Assembling the hardware components, including the PCB (circuit board) and various switches, provides a deeper understanding of electronic design and soldering techniques. This tangible aspect of Brillo-8 enriches the learning process and hones valuable skills for electronics enthusiasts.</p>
                                </div>
                            </div>
                        </div>
                        <br/>

                        <div className="row">
                            <div className="col-lg-1" align="center">
                                <h1>3</h1>
                            </div>

                            <div className="col-lg-11">
                                <div className="container">
                                    <p>Brillo-8 is an excellent platform for rapid prototyping and experimentation. It serves as a perfect testing ground for developing and testing new algorithms, code snippets, or entire programs. By using Brillo-8, you can quickly try out different ideas, observe their effects, and refine your solutions before implementing them in more extensive projects.</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="desktop-only"><br/><br/></div>
                    <br/>
                </div>

                <div className="container">
                    <div className="desktop-only">
                        <br/><br/><br/>
                    </div>
                    <br/><br/>

                    <center>
                        <h1>Techstack</h1>
                        <p>Special thanks to all the technologies, frameworks, softwares, languages, and libraries below.<br/>Brillo-8 would be impossible without you.</p>
                        <br/><br className="desktop-only" />

                        <StackIcon logo={VSCodeLogo} url="https://code.visualstudio.com/" />
                        <StackIcon logo={ArduinoLogo} url="https://www.arduino.cc/" />
                        <StackIcon logo={PlatformIOLogo} url="https://platformio.org/" />
                        <StackIcon logo={EasyEDALogo} url="https://easyeda.com/" />
                        <StackIcon logo={VercelLogo} url="https://vercel.com/" />
                        <StackIcon logo={NodeJSLogo} url="https://nodejs.org/" />
                        <br/>

                        <StackIcon logo={NPMLogo} url="https://www.npmjs.com/" />
                        <StackIcon logo={TypeScriptLogo} url="https://www.typescriptlang.org/" />
                        <StackIcon logo={BootstrapLogo} url="https://getbootstrap.com/" />
                        <StackIcon logo={BootswatchLogo} url="https://bootswatch.com/" />
                        <StackIcon logo={ReactLogo} url="https://react.dev/" />
                        <StackIcon logo={ParcelLogo} url="https://github.com/parcel-bundler/parcel" />
                    </center>

                    <div className="desktop-only">
                        <br/><br/><br/><br/>
                    </div>
                    <br/>
                </div>
            </>
        );
    }
}