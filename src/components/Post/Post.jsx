import {
    Avatar,
    Row,
    Typography,
    Card
} from "antd";
import { formatDateDifference } from "../../utils/util";
import { useState, useEffect, useMemo, useCallback } from "react";
import PropTypes from "prop-types";
import { parse } from 'date-fns';
import request from "../../utils/request";
import MusicPlayer from "../MusicPlayer/MusicPlayer"

const Post = ({user, date, content, music, width = 60}) => {
  const [formattedDifference, setFormattedDifference] = useState('');
  const currentDate = useMemo(() => new Date(), []); 
  const parseDate = useCallback((dateString) => parse(dateString, 'dd/MM/yyyy HH:mm:ss', new Date()), []);
  const targetDate = useMemo(() => parseDate(date), [parseDate, date]);
  const calculateDifference = useCallback(() => {
    const differenceInMilliseconds = currentDate - targetDate;
    setFormattedDifference(formatDateDifference(differenceInMilliseconds));
  }, [currentDate, targetDate]);
  const [name, setName] = useState('Anonymous');
  useEffect(() => {
    const fetchUser = async (id) => {
      const res = await request.get(`user/get-user/${user}`)
      setName(res.data.name)
    }
    fetchUser(user)
  }, [user])
  


  useEffect(() => {
    calculateDifference();
  }, [calculateDifference]);


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
            gap: "10px"
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
                <img src={`http://localhost:8001/static/image/${uploaded_link}.jpg`} alt="Your Image Alt Text" style={{ maxWidth: '80%', height: 'auto' }} />
              </Typography.Text>
            </Row>
          </div>
          {music && <MusicPlayer song={music} inPost={true}/>}
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