import React from "react";
import NavigationBar from "../components/navigationbar";
import IntroductionBanner from "../components/introductionbanner";

export default class Home extends React.Component {
    onPageout(): void {
    }

    render() {
        return (
            <>
                <NavigationBar currentPage="home" onPageout={this.onPageout} />
                <div className="rows">
                    <div className="col-lg-6">
                        <h1>Brillo-8: Programmable Pocket Computer</h1>
                        <p>A programmable pocket computer packed neatly on a small 80cm x 50mm circuit board.</p>
                        <button className="btn-outline-primary">Learn More</button>
                    </div>
                </div>
            </>
        );
    }
}