import { useState, useEffect } from "react";
import Button from "./Button";
import ImgContainer from "./ImgContainer";

export default function HistoryDisplay({ closeModal, ModalContentsData }) {
  const [postData, setPostData] = useState("");

  useEffect(() => {
    setPostData(ModalContentsData);
  }, [ModalContentsData]);

  return (
    <div>
      <div className="modal-header">
        <Button text="&times;" className="close-button" onClick={closeModal} />
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div className="title">Prior Generations:</div>
          <select name="selectDate" id="">
            <option value="">06/17/2024</option>
            <option value="">06/16/2024</option>
          </select>
        </div>
      </div>
      <DynamicInstantiation
        Component={ImgContainer}
        InstantiateData={postData}
      />
    </div>
  );
}

function DynamicInstantiation({ Component, InstantiateData }) {
  const [data, setData] = useState([{}]);

  useEffect(() => {
    if (InstantiateData.length > 0) setData(InstantiateData);
  }, [InstantiateData]);

  return (
    <div className="modal-body">
      {data.map((img, idx) => (
        <div key={idx}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <h5
              style={{
                textOverflow: "ellipsis",
                overflow: "hidden",
                textWrap: "nowrap",
              }}
            >
              {img.description}
            </h5>
            <h5 style={{ textWrap: "nowrap", padding: "0em 1em" }}>
              {typeof img.dateCreated != "undefined"
                ? " " + img.dateCreated.split("T")[0]
                : null}
            </h5>
          </div>
          <Component src={img.base64} />
        </div>
      ))}
    </div>
  );
}
