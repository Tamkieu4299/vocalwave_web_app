import PropTypes from "prop-types";
import { Col, Row } from "antd";
import { CustomerServiceFilled } from "@ant-design/icons";
import MusicNoteIcon from '@material-ui/icons/MusicNote';
import { LABEL } from "../../localization/en";

const centered = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
}

const title = {
    fontWeight: "600",
    fontSize: "16px",
    width: "max-content"
}

const subtitle = {
    fontWeight: "normal",
    fontSize: "13px",
    width: "max-content"
}

const Track = ({name, artist, playlistName = "Unknown", duration, isHeader = false}) => {
  return (
    <Row className={isHeader ? "trackHeader" : "track"} style={{alignItems: "center", padding: "15px 0"}}>
        {
            isHeader 
            ? 
            (
                <>
                    <Col span={1} />
                    <Col span={1} />
                    <Col span={10}>
                        <div style={title}>{LABEL.trackTable.song.toUpperCase()}</div>
                    </Col>  
                    <Col span={10}>
                        <div style={title}>{LABEL.trackTable.playlist.toUpperCase()}</div>
                    </Col>
                    <Col span={2} style={{ ...title, display: "flex", justifyContent: "flex-start" }}>
                        {LABEL.trackTable.duration.toUpperCase()}
                    </Col>
                </>
            ) 
            :
            (
                <>
                    <Col span={1} style={centered}>
                        <CustomerServiceFilled />
                    </Col>
                    <Col span={1}>
                        <div
                            style={{
                                backgroundColor: "#c3c3c3",
                                width: "40px",
                                height: "40px",
                                borderRadius: "4px",
                                cursor: "pointer",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center"
                            }}
                        >
                        <MusicNoteIcon />
                        </div>
                    </Col>
                    <Col span={10}>
                        <div style={{...title, cursor: "pointer"}} className="underlinedWhenHovered">{name}</div>
                        <div style={subtitle}>{artist}</div>
                    </Col>
                    <Col span={10}>
                        <div style={subtitle}>{playlistName}</div>
                    </Col>
                    <Col span={2} style={{ ...subtitle, display: "flex", justifyContent: "flex-start" }}>
                        {duration}
                    </Col>
                </>
            )
        }
    </Row>
  )
}

Track.propTypes = {
    name: PropTypes.string,
    artist: PropTypes.string,
    playlistName: PropTypes.string,
    duration: PropTypes.string,
    isHeader: PropTypes.bool,
};

export default Track