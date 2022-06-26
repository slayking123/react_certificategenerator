import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { degrees, PDFDocument, rgb, StandardFonts } from 'pdf-lib';
import Pdf from '../template.pdf';
import { saveAs } from '@progress/kendo-file-saver';

export default function Preview(props) {
console.log(props)
    const navigate = useNavigate();

    useEffect(() => {
        console.log(props.certificateData.length === 0);
        if (props.certificateData.length === 0) {
            // navigate("/")
        }
    }, [navigate, props.certificateData.length]);

    const generatePDF = async (name, branch, slno, cid, ret = false) => {
        const existingPdfBytes = await fetch(Pdf).then(res => res.arrayBuffer())

        const pdfDoc = await PDFDocument.load(existingPdfBytes)
        // const helveticaFont = await pdfDoc.embedFont(StandardFonts.Helvetica)

        const pages = pdfDoc.getPages()
        const firstPage = pages[0]
        const { width, height } = firstPage.getSize()

        firstPage.drawText(name, {
            x: 60,
            y: 275,
            size: 58,
            // font: SanChezFont,
            color: rgb(0, 0, 0),
        });

        firstPage.drawText(branch, {
            x: 60,
            y: 135,
            size: 25,
            color: rgb(0, 0, 0),
        });

        firstPage.drawText(slno.toString(), {
            x: 30,
            y: 20,
            size: 10,
            color: rgb(0, 0, 0),
        });

        const pdfBytes = await pdfDoc.save()

        if (ret) {
            let file = new File([pdfBytes], name + "-" + cid + ".pdf", {
                type: "application/pdf;charset=utf-8",
            });
            return (file);
        } else {
            let file = new File([pdfBytes], {
                type: "application/pdf;charset=utf-8",
            });
            return saveAs(file, name + "-" + cid + ".pdf");
        }
    }

    const downloadCertificate = () => {
        for (let i = 0; i < props.certificateData.length; i++) {
            generatePDF(props.certificateData[i]["studentname"], props.certificateData[i]["branch"], props.certificateData[i]["slno"], props.certificateData[i]["id"]);
        }
    }

    const mailCertificate = async () => {
        for (let i = 0; i < props.certificateData.length; i++) {
            var pdf = await generatePDF(props.certificateData[i]["studentname"], props.certificateData[i]["branch"], props.certificateData[i]["slno"], props.certificateData[i]["id"], true);
            let url2 = 'http://localhost:4000/mail';
            let formdata = new FormData()
            formdata.append('email', props.certificateData[i]["studentemail"])
            formdata.append('cname', props.certificateData[i]["certificatename"])
            formdata.append('certificate', pdf)
            fetch(url2, {
                method: 'POST',
                body: formdata
            }).catch(console.error)
        }
    }

    return (
        <div className='preview-wrapper'>
            <div className="hd1">
                <h1>This is your preview!!!!</h1>
            </div>
            <div id="preview">
                {props.certificateData.map((item, i) => (
                    <div className="img" key={i}>
                        <img src={"http://localhost/day2/image.php?id=" + item.id} alt={item.studentname} />
                        <h1 className="name">{item.studentname}</h1>
                        <h3 className="branch">{item.branch}</h3>
                    </div>
                ))}
            </div>
            <footer>
                <button className="b1" onClick={downloadCertificate}>download</button>
                <button className="b2" onClick={mailCertificate}>mail</button>
            </footer>
        </div>
    )
}
