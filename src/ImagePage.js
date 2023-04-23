import useStore from "./useStore";
import './styles/diplomPageStyles.css'
import CreateField from "./createField";
import Papa from 'papaparse'
import React, { useState } from "react";
import PDFexporter from "./PDFexporter";
import Diplom from "./DiplomPage";

function SetImage() {
    const { fields, fieldId, setFieldId, setNameImage} = useStore();

    function readFile(e) {
        var file = e.target.files[0];
        var reader = new FileReader();
              reader.onload = (function (file) {
          return function (e) {
            var r = e.target;
            setNameImage(r.result);
          };
        })(file);
        // получает URL файла
        reader.readAsDataURL(file);
    }

    console.log("fieldId",fieldId)
   

    const[data, setData] = useState([]);
    const[columnsArray, setColumn] = useState([]);
    const[values, setValues] = useState([]);

    const {parseData, setParseData, parseColumnsArray, parseValuesArray, setParseColumnsArray, setParsevaluesArray } = useStore();

    const handleFile = (event) => 
    {
      Papa.parse(event.target.files[0], {
        header: true,
        encoding: "utf-8",
        skipEmptyLines:true,
        complete: function(result) {
          const columnsArray = [];
          const valuesArray = [];

          console.log("result", result);
          result.data.map((d) => {
            columnsArray.push(Object.keys(d));
            valuesArray.push(Object.values(d));
          })
          setData(result.data);
          setColumn(columnsArray[0]);
          setValues(valuesArray);

          setParseData(result.data);
          setParseColumnsArray(columnsArray[0]);
          setParsevaluesArray(valuesArray);

          console.log("result.data", result.data, valuesArray);
          console.log("columnsArray[0]", columnsArray[0], valuesArray);
          console.log("valuesArray", valuesArray);
        }
      })

      console.log("klkl", columnsArray, values);
      drawField();
      console.log("fields", fields);
    }

    function drawField() {
      for(let i=0; i<columnsArray.length; i++)
      {
        fields[i] = document.createElement('div');
        fields[i].className = columnsArray[i];
        fields[i].id = columnsArray[i];
        fields[i].innerHTML = `<div {...bindfieldPos()} id=${columnsArray[i]} style={{ position: 'relative', top: fieldPos.y, left: fieldPos.x, border: '2px solid teal',}}> <Resizable onResizeStop={() => { setResize({ width: resize.width, height: resize.height});}}> </Resizable> </div>`;
      }
    }

    return (
      <div className="diplomPage">
        <input  
            type="file" onChange={(e)=> readFile(e)}/>
        <input type="file" accept='.csv' onChange={(e) => handleFile(e)}/>
        {/* <button onClick={CreateField()}> Create FIELDS</button> */}
      </div>
    );
  }
  
  export default SetImage;
  