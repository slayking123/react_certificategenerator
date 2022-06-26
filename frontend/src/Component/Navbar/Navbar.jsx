import React from 'react'
import { Link } from "react-router-dom";

export default function Navbar(props) {
  return (
    <header className="text-gray-600 body-font" id="header">
        <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
            <a className="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0" href="student.html">
                <img className="logo" src="./Images/2.png" alt="logo" />
                <span className="ml-3 text-xl">Certificate Generator</span>
            </a>

            <nav className="md:ml-auto flex flex-wrap items-center text-base justify-center">
                <Link to="/" className={props.link === "admin" ? "mr-5 hover:text-gray-900 hover-effect active" : "mr-5 hover:text-gray-900 hover-effect"}>Admin</Link>
                <Link to="/student" className={props.link === "student" ? "mr-5 hover:text-gray-900 hover-effect active" : "mr-5 hover:text-gray-900 hover-effect"}>Student</Link>
                <Link to="/auth" className={props.link === "auth" ? "mr-5 hover:text-gray-900 hover-effect active" : "mr-5 hover:text-gray-900 hover-effect"}>Authenticator</Link>
            </nav>
        </div>
    </header>
  )
}
