import {
  Avatar,
  Row,
  Typography,
  Card,
  Col,
  Button
} from "antd";
import { formatDateDifference } from "../../utils/util";
import MusicNoteIcon from '@material-ui/icons/MusicNote';
import React, { useState, useEffect, useMemo, useCallback } from "react";
import PropTypes from "prop-types";
import { parse } from 'date-fns';
import request from "../../utils/request";
import { useNavigate } from "react-router";

const title = {
  fontWeight: "600",
  fontSize: "16px",
  width: "max-content",
  lineHeight: "18px",
  cursor: "pointer", 
  color: "white"
}

const subtitle = {
  fontWeight: "normal",
  fontSize: "13px",
  width: "max-content",
  lineHeight: "16px",
  color: "white"
}

const Post = ({user, date, content, music, uploaded_link, width = 60}) => {
const [formattedDifference, setFormattedDifference] = useState('');
const currentDate = useMemo(() => new Date(), []); 
const targetDate = useMemo(() => new Date(date), []); 
const [song, setSong] = useState(null)
const calculateDifference = useCallback(() => {
  const differenceInMilliseconds = currentDate - targetDate;
  setFormattedDifference(formatDateDifference(differenceInMilliseconds));
}, [currentDate, targetDate]);
const navigate = useNavigate();

const [name, setName] = useState('Anonymous');
useEffect(() => {
  const fetchUser = async (id) => {
    const res = await request.get(`user/get-user/${user}`)
    setName(res.data.name)
  }
  fetchUser(user)
}, [user])

useEffect(() => {
  const fetchAudio= async () => {
    const res = await request.get(`audio/get/${music}`)
    setSong(res)
  }
  music && fetchAudio()
}, [music])

useEffect(() => {
  calculateDifference();
}, [calculateDifference]);

const handleClickListen = (id) => {
  navigate(`/audio-management?audio_id=${id}`)
}

return (
  <div style={{
      display: "flex",
      justifyContent: "center",
      zIndex: "0"
    }}>
      <Card style={{
        display: "flex",
        width: `${width}%`,
        boxShadow: "0px 0px 16px -8px rgba(0, 0, 0, 0.68)",
        height: "max-content"
      }}>
        <div style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          gap: "20px"
        }}>
          <Row style={{
            gap: "13px"
          }}>
            <Avatar
              size={42}
              style={{
                color: "#46cce3",
                backgroundColor: "#fde3cf",
                fontWeight: "bold"
              }}
            >
              {name?.charAt(0)?.toUpperCase()}
            </Avatar>
            <div style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center"
            }}>
              <Row>
                <Typography.Text style={{
                  fontSize: "15px",
                  lineHeight: "18px",
                  fontWeight: "600",
                  fontFamily: "'Montserrat', sans-serif"
                }}>
                  {name}
                </Typography.Text>
              </Row>
              <Row>
                <Typography.Text style={{
                  fontSize: "13px",
                  lineHeight: "15px",
                  fontWeight: "normal",
                  fontFamily: "'Montserrat', sans-serif"
                }}>
                  {formattedDifference}
                </Typography.Text>
              </Row>
            </div>
          </Row>
          <Row>
            <Typography.Text style={{
              fontSize: "13px",
              lineHeight: "20px",
              fontWeight: "normal",
              fontFamily: "'Montserrat', sans-serif",
            }}>
              {content}
            </Typography.Text>
          </Row>
          {uploaded_link && 
            <Row>
              {uploaded_link && uploaded_link.includes(".jpg") && <img src={`http://69.161.221.127:8001/static/image/${uploaded_link}`} alt="Your Image Alt Text" style={{ maxWidth: '80%', height: 'auto' }} />}
            </Row> 
          }
          {song && <div className="musicPlayerInPost">
                <Row style={{
                    height: "100%",
                    justifyContent: "center",
                    alignItems: "center"
                }}>
                    <Col span={8}>
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
                                <div style={title} className="underlinedWhenHovered">{song.audio_name}</div>
                                <div style={subtitle}>{song.created_by}</div>
                            </div> 
                        </Row>
                    </Col>
                    <Col span={16} style={{
                      display: "flex",
                      justifyContent: "flex-end",
                    }}>
                      <button onClick={() => handleClickListen(music)} className="musicPlayerInPostBtn">Click here to Listen!</button>
                    </Col>
                </Row>
          </div>}
          
        </div>
      </Card>
    </div>
)
}

Post.propTypes = {
  user: PropTypes.string,
  date: PropTypes.string,
  content: PropTypes.string,
  music: PropTypes.string,
  width: PropTypes.number
};

export default Post