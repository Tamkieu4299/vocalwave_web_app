import { useState, useRef } from "react";
import ModalContainer from "@/components/Modal/containers/ModalContainer";
import { FloatButton, Row, Col, Button, Select } from 'antd';
import icon from "../../assets/icon.png"

const Dialog = () => {
  const [isOpen, setIsOpen] = useState(false);

  const titleStyle = {
    display: "flex", 
    justifyContent: "center", 
    alignItems: "center",
    color: "#46cce3",
    fontSize: "23px",
    fontWeight: "900",
  }

  const onChange = (value) => {
    console.log(`selected ${value}`);
  };

  const onSearch = (value) => {
    console.log('search:', value);
  };

  const filterOption = (input, option) => (option?.label ?? '').toLowerCase().includes(input.toLowerCase());

  return (
    <>
      <ModalContainer
          open={isOpen}
          onCancel={() => setIsOpen(false)}
          cancelButtonProps={{ style: {display: "none"} }}
          okButtonProps={{ style: {display: "none"} }}
          width={1000}
      >
        <Col style={{display: "flex", flexDirection: "column", justifyContent: "space-around", height: "350px"}}>
          <Row style={titleStyle}>
            <div style={{display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "space-between", gap: "15px"}}>
              Use our Emotion Recognition System
              <Button>Start</Button>
            </div>
          </Row>
          <div style={{display: "flex", alignItems: "center", justifyContent: "space-between"}}>
            <hr style={{width: "48%"}}/>
            OR
            <hr style={{width: "48%"}}/>
          </div>
          <Row style={titleStyle}>
            <div style={{display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "space-between", gap: "15px"}}>
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
                    value: 'Happy',
                    label: 'Happy',
                  },
                  {
                    value: 'Angry',
                    label: 'Angry',
                  },
                  {
                    value: 'Sad',
                    label: 'Sad',
                  },
                ]}
              />
            </div>
          </Row>
        </Col>
      </ModalContainer>
      <FloatButton 
      className="floatButton" 
      style={{backgroundColor: "#0f2f56"}} 
      icon={<img src={icon} style={{width: "45px"}}/>} 
      onClick={() => setIsOpen(true)} />
    </>
    
  )
}

export default Dialog