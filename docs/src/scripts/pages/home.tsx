import React from "react";
import NavigationBar from "../components/navigationbar";
import IntroductionBanner from "../components/introductionbanner";

export default class Home extends React.Component {
    onPageout(): void {
    }

    render() {
        return (
            <>
                <IntroductionBanner />
                <NavigationBar currentPage="home" onPageout={this.onPageout} />
            </>
        );
    }
}