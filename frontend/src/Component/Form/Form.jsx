import React, { useEffect } from 'react'
import { useNavigate } from "react-router-dom";

export default function Form(props) {
    const navigate = useNavigate();

    useEffect(() => {
        if (!props.selectedTemplate.name) {
            navigate("/")
        }
    }, [navigate, props.selectedTemplate.name]);

    const sheetUpload = async (xl) => {
        return new Promise((resolve, reject) => {
            // const url2 = "http://localhost:4000/excel/upload";
            const url2 = "https://cg-bd.herokuapp.com/excel/upload";
            const formdata = new FormData();
            formdata.append("worksheet", xl[0]);
            fetch(url2, {
                method: "POST",
                body: formdata,
            }).then(res => { resolve({ result: true }) });
        })
    }

    const generateCertificate = (e) => {
        e.preventDefault();
        var w = document.getElementById("sheetname").value;
        var s = document.getElementById("exelname").value;
        var xl = document.getElementById("fl").files;

        if (w === "" || s === "" || xl === "") {
            alert("please enter the fields properly!!!!!!!");
            return false;
        } else {
            sheetUpload(xl).then(res => {
                if (res.result) {
                    const data1 = {
                        id: props.selectedTemplate.id,
                        name: props.selectedTemplate.name,
                        worksheetname: w,
                        excelsheet: s,
                    };
                    const options1 = {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify(data1),
                    };
                    // var url1 = "http://localhost:4000/excel/";
                    var url1 = "https://cg-bd.herokuapp.com/excel/";
                    fetch(url1, options1).then(res => { return res.json() }).then((duplicatedata) => {
                        if (duplicatedata["NumberOfDuplicateData"] !== 0) {
                            alert("There are " + duplicatedata["NumberOfDuplicateData"] + " duplicate entry in your excel Sheet!!!");
                            // fetch("http://localhost:4000/preview/" + duplicatedata["transid"]).then(res => { return res.json() }).then(certificateData => {
                            fetch("https://cg-bd.herokuapp.com/preview/" + duplicatedata["transid"]).then(res => { return res.json() }).then(certificateData => {
                                props.pageHandler(0);
                                props.certificateDataHandler(certificateData);
                                navigate("/preview");
                            })
                        }else{
                            // alert("There are " + duplicatedata["NumberOfDuplicateData"] + " duplicate entry in your excel Sheet!!!");
                            // fetch("http://localhost:4000/preview/" + duplicatedata["transid"]).then(res => { return res.json() }).then(certificateData => {
                            fetch("https://cg-bd.herokuapp.com/preview/" + duplicatedata["transid"]).then(res => { return res.json() }).then(certificateData => {
                                props.pageHandler(0);
                                props.certificateDataHandler(certificateData);
                                navigate("/preview");
                            })
                        }
                    });
                }
            })
        }
    }

    return (
        <div className='form-wrapper'>
            <h1 className="text-center" id="heading">Please fill the form to generate certificates for {props.selectedTemplate.name}</h1>
            <br /><br />
            <hr className="hr1" />
            <div className="d1">
                <div className="width">
                    <form className="row g-3">
                        <label className="form-label font" htmlFor=""> excelsheet name:</label>
                        <input className="form-control" type="text" id="exelname" />
                        <br /><br />
                        <label className="form-label font" htmlFor=""> worksheet name:</label>
                        <input className="form-control" type="text" id="sheetname" />
                        <br /><br />
                        <label className="form-label font" htmlFor=""> please upload the excel sheet:</label>
                        <input type="file" id="fl" />
                        <br /><br />
                        <div className="col-12">
                            <button className="btn btn-primary" type="submit" onClick={generateCertificate}>Generate certificate</button>
                        </div>
                    </form>
                </div>
            </div>
            <hr></hr>
        </div>
    )
}
