import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Template(props) {
  const navigate = useNavigate();

  useEffect(() => {
    if(props.data.length === 0){
      navigate("/")
    }
  }, [navigate,props.data.length]);

  const selectTemplate = (item) => {
    props.selectedTemplateHandler(item);
    navigate("/form")
  }

  return (
    <div className="template-wrapper">
      <div id="d1">
        {props.data.map((item) => (
          <img
            key={item.id}
            className="certificateimg"
            // src={"http://localhost/day2/image.php?id=" + item.id}
            src={"https://cg-php.herokuapp.com/image.php?id=" + item.id}
            alt={item.name}
            onClick={() => selectTemplate(item)}
          />
        ))}
      </div>
    </div>
  );
}
