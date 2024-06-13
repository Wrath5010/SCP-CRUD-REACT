import React from "react";
import './style.css';
import CreateComponent from "./CreateComponent.js";
import image from './SCP-img/SCPlogo.png'

/*  Create Header for SCP Page   */

function Header({ toggleVisibility }) {
    const handleButtonClick = () => {
        toggleVisibility();
    };

    return (
        <>
            <div className="Header-container">
                <div className="Flex-row-space-between">
                    <div className="Flex-row">
                        <img src={image} alt="scp" className="logo-img"></img>
                        <div className="font-size-title">
                            <h1>SCP Foundation</h1>
                            <h3 className="sec-cont-prot">Secure Contain Protect</h3>
                        </div>
                    </div>

                    <div className="collections-input">
                        <input placeholder="Search SCP" id="Search-SCP" className="search-bar"></input>
                
                        <div className="Quick-search-links">
                            <a className="Home-link">Home</a>
                            <a className="about-link">About the Foundation</a>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Header;
