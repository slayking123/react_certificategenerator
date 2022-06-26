import React from 'react'

export default function Footer() {
  return (
    <footer className="text-gray-600 body-font" id="footer">
        <div className="container px-5 py-4 mx-auto flex items-center sm:flex-row flex-col">
            <img className="logo" src="./Images/2.png" alt="logo"/>
            <p className="text-sm text-gray-500 sm:ml-4 sm:pl-4 sm:border-l-2 sm:border-gray-200 sm:py-2 sm:mt-0 mt-4">©
                2021 Certifiate Generator —
                <a href="https://www.rcciit.org/" className="text-gray-600 ml-1" rel="noopener noreferrer"
                    target="_blank">@RCCIIT</a>
            </p>
            <span className="inline-flex sm:ml-auto sm:mt-0 mt-4 justify-center sm:justify-start">
                <a className="ml-3 text-gray-500 icon" rel='noreferrer' href="https://twitter.com/LunaticVKG" target="_blank">
                    <svg fill="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                        className="w-5 h-5" viewBox="0 0 24 24">
                        <path
                            d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z">
                        </path>
                    </svg>
                </a>
                <a className="ml-3 text-gray-500 icon" rel='noreferrer' href="mailto: imvivek94@outlook.com" target="_blank">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                            d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z">
                        </path>
                    </svg>
                </a>
            </span>
        </div>
    </footer>
  )
}
