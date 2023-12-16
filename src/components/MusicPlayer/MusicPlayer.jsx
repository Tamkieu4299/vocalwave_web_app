import React from 'react'
import { Layout, Col, Row } from "antd";
import MusicNoteIcon from '@material-ui/icons/MusicNote';
import VolumeUpIcon from '@material-ui/icons/VolumeUp';
import { PlayCircleFilled, StepBackwardFilled, StepForwardFilled } from "@ant-design/icons";

const { Footer } = Layout;

const title = {
    fontWeight: "600",
    fontSize: "16px",
    width: "max-content",
    lineHeight: "18px"
}

const subtitle = {
    fontWeight: "normal",
    fontSize: "13px",
    width: "max-content",
    lineHeight: "16px"
}

const MusicPlayer = ({name, artist, duration }) => {
  return (
    <Footer className='musicPlayer'>
        <Row style={{
            height: "100%",
            justifyContent: "center",
            alignItems: "center"
        }}>
            <Col span={7}>
                <Row style={{gap: "10px"}}>
                    <div
                        style={{
                            backgroundColor: "#fde3cf",
                            width: "64px",
                            height: "64px",
                            borderRadius: "4px",
                            cursor: "pointer",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center"
                        }}
                    >
                        <Col>
                            <MusicNoteIcon className='themeColor2'/>
                        </Col>
                    </div>
                    <div style={{display: "flex", justifyContent: "center", flexDirection: "column"}}>
                        <div style={{...title, cursor: "pointer", color: "white"}} className="underlinedWhenHovered">{name}</div>
                        <div style={{...subtitle, color: "white"}}>{artist}</div>
                    </div> 
                </Row>
            </Col>
            <Col span={10} style={{display: "flex", flexDirection: "column", gap: "10px"}}>
                <Row style={{justifyContent: "center", gap: "30px"}}>
                    <StepBackwardFilled className='musicPlayerIcon'/>
                    <PlayCircleFilled className='musicPlayerIcon'/>
                    <StepForwardFilled className='musicPlayerIcon'/>
                </Row>
                <Row style={{alignItems: "center", justifyContent: "space-between"}}>
                    <Col className="progress-time-current milli" span={2}>
                        15:23
                    </Col>
                    <Col span={19} style={{height: "15px"}}><input type='range' /></Col>
                    <Col className="progress-time-total milli" span={2}>
                        34:40
                    </Col>
                </Row>
            </Col>
            <Col span={3}/>
            <Col span={4}>
                <Row style={{alignItems: "center", gap: "10px", justifyContent: "flex-end"}}>
                    <Col style={{color: "#fde3cf"}}><VolumeUpIcon /></Col>
                    <Col span={20} style={{height: "21px", boxSizing: "border-box", display: "flex", alignItems: "center"}}><input type='range' /></Col>
                </Row>
            </Col>
        </Row>
    </Footer>
  )
}

export default MusicPlayer