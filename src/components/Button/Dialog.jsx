import { useState, useRef } from "react";
import ModalContainer from "@/components/Modal/containers/ModalContainer";
import { FloatButton, Row, Col, Button, Select, Tooltip } from "antd";
import icon from "../../assets/icon.png";
import request from "../../utils/request";
import { getLocalStorage, setLocalStorage } from "../../utils/storage";
import { displaySuccessMessage } from "../../utils/request";
import { useNavigate } from "react-router";

const Dialog = ({ title }) => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const userData = getLocalStorage("tempUser");

  const refreshEmotion = async () => {
    const { emotion_type, ...newUserData } = userData;
    setLocalStorage("tempUser", newUserData);
    displaySuccessMessage(`Refreshed your emotion`);
    navigate("/audio-management");
  }

  const onSubmit = async () => {
    const response = await request.get(`audio/search_emotion`)
    userData.emotion_type = response
    setLocalStorage("tempUser", userData);
    setIsOpen(false)
    displaySuccessMessage(`You are ${response}`);
    navigate("/audio-management");
  }

  const titleStyle = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    color: "#46cce3",
    fontSize: "32px",
    fontWeight: "900",
  };

  const onChange = (value) => {
    userData.emotion_type = value
    console.log(userData)
    setLocalStorage("tempUser", userData);
    setIsOpen(false)
    displaySuccessMessage(`You are ${value}`);
    navigate("/audio-management");
  };

  const onSearch = (value) => {
    console.log("search:", value);
  };

  const filterOption = (input, option) =>
    (option?.label ?? "").toLowerCase().includes(input.toLowerCase());

  return (
    // title != 'Songs' && title != 'Playlist' && <>
    <>
      <ModalContainer
        open={isOpen}
        onCancel={() => setIsOpen(false)}
        cancelButtonProps={{ style: { display: "none" } }}
        okButtonProps={{ style: { display: "none" } }}
        width={1000}
      >
        <Col
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-around",
            height: "350px",
          }}
        >
          <Row style={titleStyle}>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "space-between",
                gap: "15px",
              }}
            >
              Use our Emotion Recognition System
              <Button className="dashed-button" onClick={onSubmit}>Start</Button>
            </div>
          </Row>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <hr style={{ width: "48%" }} />
            OR
            <hr style={{ width: "48%" }} />
          </div>
          <Row style={titleStyle}>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "space-between",
                gap: "15px",
              }}
            >
              Choose your Emotion manually:
              <Select
                showSearch
                placeholder="Select your emotion"
                optionFilterProp="children"
                onChange={onChange}
                onSearch={onSearch}
                filterOption={filterOption}
                options={[
                  {
                    value: "happy",
                    label: "Happy",
                  },
                  {
                    value: "angry",
                    label: "Angry",
                  },
                  {
                    value: "sad",
                    label: "Sad",
                  },
                  {
                    value: "surprised",
                    label: "Surprised",
                  },
                  {
                    value: "disgusted",
                    label: "Disgusted",
                  },
                  {
                    value: "neutral",
                    label: "Neutral",
                  },
                ]}
              />
            </div>
          </Row>
        </Col>
      </ModalContainer>
      <Tooltip title={"Music Recommendation"} placement="left">
        <FloatButton
          className="floatButton"
          style={{ backgroundColor: "#0f2f56", insetBlockEnd: "170px" }}
          icon={<img src={icon} style={{ width: "45px" }} />}
          onClick={() => userData?.emotion_type ? refreshEmotion() : setIsOpen(true)}
        />
      </Tooltip>
    </>
  );
};

export default Dialog;
