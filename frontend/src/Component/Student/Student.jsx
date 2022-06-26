import React, { useState } from "react";
import Footer from "../Footer/Footer";
import Navbar from "../Navbar/Navbar";
import { useNavigate } from "react-router-dom";

export default function Student(props) {
  //console.log(props.certificateDataHandler("hiii"))
  const navigate = useNavigate();
  const [email, setEmail] = useState("");

  const checkNow = () => {
    if (email === "") {
      alert("data not found!!!!!!");
      return false;
    } else {
      let url = "http://localhost:4000/student/" + email;
      fetch(url)
        .then((res) => {
          return res.json();
        })
        .then((data) => {
        //  console.log(data);
          props.certificateDataHandler(data);
          navigate("/preview");
        });
    }
  };

  return (
    <>
      <Navbar link="student" />
      <section className="text-gray-600 body-font relative height">
        <div className="container px-5 py-10 mx-auto margin-top">
          <div className="flex flex-col text-center w-full mb-12">
            <h1
              className="
              sm:text-3xl
              text-2xl
              font-medium
              title-font
              mb-4
              text-gray-900
            "
            >
              Check your certificate
            </h1>
            <p className="lg:w-2/3 mx-auto leading-relaxed text-base font">
              Enter e-mail to continue
            </p>
          </div>
          <div className="lg:w-1/2 md:w-2/3 mx-auto">
            <div className="flex flex-wrap -m-2">
              <form className="w-full">
                <div className="p-2 w-full">
                  <div className="relative">
                    <label
                      htmlFor="email"
                      className="leading-7 text-sm text-gray-600 font"
                    >
                      Email
                    </label>
                    <input
                      type="text"
                      id="email"
                      name="email"
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                      }}
                      className="
                      w-full
                      bg-gray-100 bg-opacity-50
                      rounded
                      border border-gray-300
                      focus:border-indigo-500
                      focus:bg-white
                      focus:ring-2
                      focus:ring-indigo-200
                      text-base
                      outline-none
                      text-gray-700
                      py-1
                      px-3
                      leading-8
                      transition-colors
                      duration-200
                      ease-in-out
                    "
                    />
                  </div>
                </div>
                <div className="p-2 w-full">
                  <button
                    onClick={checkNow}
                    className="
                    flex
                    mx-auto
                    text-white
                    bg-indigo-500
                    border-0
                    py-2
                    px-8
                    focus:outline-none
                    hover:bg-indigo-600
                    rounded
                    text-lg
                  "
                  >
                    Check Now
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}
