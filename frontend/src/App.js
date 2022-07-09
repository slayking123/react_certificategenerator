import React, { useState } from "react";
import "./App.css";
import Admin from "./Component/Admin/Admin";
import Student from './Component/Student/Student';
import Authenticator from './Component/Authenticator/Authenticator';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Template from "./Component/Template/Template";
import Form from "./Component/Form/Form";
import Preview from "./Component/Preview/Preview";

function App() {
  const [page, setPage] = useState(0)
  const [template, setTemplate] = useState([]);
  const [selectedTemplate, setSelectedTemplate] = useState({});
  const [certificateData, setCertificateData] = useState([]);

  const pageHandler = (data) => {
    setPage(data)
  }
  const templateHandler = (data) => {
    setTemplate(data)
  }
  const selectedTemplateHandler = (data) => {
    setSelectedTemplate(data)
  }
  const certificateDataHandler = (data) => {
    console.log(data)
    setCertificateData(data)
  }
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Admin templateHandler={templateHandler}/>} />
          <Route path="/student" element={<Student certificateDataHandler={certificateDataHandler} pageHandler={pageHandler}/>}/>
          <Route path="/auth" element={<Authenticator certificateDataHandler={certificateDataHandler} pageHandler={pageHandler}/>} />
          <Route path="/template" element={<Template data={template} selectedTemplateHandler={selectedTemplateHandler}/>} />
          <Route path="/form" element={<Form selectedTemplate={selectedTemplate} certificateDataHandler={certificateDataHandler}  pageHandler={pageHandler}/>} />
          <Route path="/preview" element={<Preview page={page} certificateData={certificateData}/>} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;

