import {
    Avatar,
    Row,
    Typography,
    Card
} from "antd";
import { formatDateDifference } from "../../../utils/util";
import { useState, useEffect, useMemo, useCallback } from "react";
import PropTypes from "prop-types";
import { parse } from 'date-fns';

const Post = ({user, date, content, music}) => {
  const [formattedDifference, setFormattedDifference] = useState('');
  const currentDate = useMemo(() => new Date(), []); 
  const parseDate = useCallback((dateString) => parse(dateString, 'dd/MM/yyyy HH:mm:ss', new Date()), []);
  const targetDate = useMemo(() => parseDate(date), [parseDate, date]);
  const calculateDifference = useCallback(() => {
    const differenceInMilliseconds = currentDate - targetDate;
    setFormattedDifference(formatDateDifference(differenceInMilliseconds));
  }, [currentDate, targetDate]);

  useEffect(() => {
    calculateDifference();
  }, [calculateDifference]);


  return (
    <div style={{
        display: "flex",
        justifyContent: "center"
      }}>
        <Card style={{
          display: "flex",
          width: "60%",
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
                {user?.charAt(0)?.toUpperCase()}
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
                    {user}
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
          </div>
        </Card>
      </div>
  )
}

Post.propTypes = {
    user: PropTypes.string,
    date: PropTypes.string,
    content: PropTypes.string,
    music: PropTypes.string
};

export default Post