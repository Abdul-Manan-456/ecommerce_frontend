"use client";
import NavbarBigScreen from "./navbarBigScreen";
import NavbarSmallScreen from "./navbarSmallScreen";




export default function NavBar() {


    return (
        <div className="top-0 sticky z-50">
            <NavbarBigScreen />
            <NavbarSmallScreen />
        </div>

    );
}