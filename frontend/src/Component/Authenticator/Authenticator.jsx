import React from 'react'
import Footer from '../Footer/Footer'
import Navbar from '../Navbar/Navbar'

export default function Authenticator() {
    return (
        <>
            <Navbar link="auth" />
            <section className="text-gray-600 body-font relative height">
                <div className="container px-5 py-10 mx-auto margin-top">
                    <div className="flex flex-col text-center w-full mb-12">
                        <h1 className="sm:text-3xl text-2xl font-medium title-font mb-4 text-gray-900">Authenticate your certificate</h1>
                        <p className="lg:w-2/3 mx-auto leading-relaxed text-base font">Enter certificate code to continue</p>
                    </div>
                    <div className="lg:w-1/2 md:w-2/3 mx-auto">
                        <div className="flex flex-wrap -m-2">
                            <form className="w-full" action="" method="post" name="auth">
                                <div className="p-2 w-full">
                                    <div className="relative">
                                        <label htmlFor="code" className="leading-7 text-sm text-gray-600 font">Certificate Code</label>
                                        <input type="text" id="code" name="code"
                                            className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                                    </div>
                                </div>
                                <div className="p-5 w-full">
                                    <button
                                        className="flex mx-auto text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg">Authenticate now</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
            <Footer />
        </>
    )
}