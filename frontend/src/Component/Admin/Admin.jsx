import React, { useState } from "react";
import Footer from "../Footer/Footer";
import Navbar from "../Navbar/Navbar";
import { useNavigate } from "react-router-dom";

export default function Admin(props) {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const navigate = useNavigate();

  const adminLogin = async (e) => {
    e.preventDefault();
    // var email = document.getElementById("email").value;
    // var pass = document.getElementById("password").value;

    if (email === "" || pass === "") {
      alert("please enter all the fields!!!!");
      return false;
    } else {
      const data = {
        id: email,
        password: pass,
      };

      const options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      };

      // var url = "http://localhost:4000/admin";
      var url = "https://cg-bd.herokuapp.com/admin";

      var res = await fetch(url, options);
      var f = await res.json();
      if(f.result){
        // fetch("http://localhost:4000/template/"+f["message"][0]["id"]).then(res=>{
        fetch("https://cg-bd.herokuapp.com/template/"+f["message"][0]["id"]).then(res=>{
          return res.json()
        }).then(data=>{
          if(data){
            props.templateHandler(data);
            navigate("/template");
          }
        })
      }
      else{
        alert(f.message)
      }
    }
  };

  return (
    <>
      <Navbar link="admin" />
      <section className="text-gray-600 body-font relative height">
        <div className="container px-5 py-10 mx-auto margin-top">
          <div className="flex flex-col text-center w-full mb-12">
            <h1 className="sm:text-3xl text-2xl font-medium title-font mb-4 text-gray-900">
              Login
            </h1>
            <p className="lg:w-2/3 mx-auto leading-relaxed text-base font">
              Enter your details below to continue
            </p>
          </div>
          <div className="lg:w-1/2 md:w-2/3 mx-auto">
            <div className="flex flex-wrap -m-2">
              <form className="w-full" id="f1" name="admin">
                <div className="p-2 w-full">
                  <div className="relative">
                    <label
                      htmlFor="ID"
                      className="leading-7 text-sm text-gray-600 font"
                    >
                      college ID
                    </label>
                    <input
                      type="text"
                      id="email"
                      name="id"
                      value={email}
                      onChange={(e)=>{setEmail(e.target.value)}}
                      className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                    />
                  </div>

                  <div className="relative py-4">
                    <label
                      htmlFor="password"
                      className="leading-7 text-sm text-gray-600 font"
                    >
                      Password
                    </label>
                    <input
                      type="text"
                      id="password"
                      name="password"
                      value={pass}
                      onChange={(e)=>{setPass(e.target.value)}}
                      className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                    />
                  </div>
                </div>
                <div className="p-2 w-full">
                  <button
                    className="flex mx-auto text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg"
                    onClick={adminLogin}
                  >
                    Login
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
      <Footer/>
    </>
  );
}
