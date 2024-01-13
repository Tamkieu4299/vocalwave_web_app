import "./share.css";
import {
    PermMedia,
    Label,
    Room,
    EmojiEmotions,
    Cancel,
} from "@material-ui/icons";
import {
    Avatar,
    Row,
    Typography,
    Card,
    Col
} from "antd";
import { useContext, useRef, useState } from "react";
import MusicNoteIcon from '@material-ui/icons/MusicNote';
import { getLocalStorage } from "../../../utils/storage";
import request from "../../../utils/request";
import useFetchAllInQuery from "../../../modules/home/services/useFetchAllInQuery";
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

export default function ShareAudio({currentPlaySong}) {
    const user = getLocalStorage("tempUser");
    const desc = useRef();
    const [file, setFile] = useState(null);
    const navigate = useNavigate();

    const submitHandler = async (e) => { 
        e.preventDefault();
        const newPost = {
            user_id: user.user_id,
            content: desc.current.value,
            audio_id: currentPlaySong.audio_id
            // created_at: new Date().toISOString()
        };
        const data = new FormData();
        data.append(
            "post_data",
            JSON.stringify(newPost)
          );
        try {
            await request.post("/post/create", data);
            setFile(null)
            desc.current.value = null
            navigate("/");
        } catch (err) {
            console.log(err);
        }
    };

    return (
            <div className="shareWrapperInPost">
                <div className="shareTop">
                    <Avatar
                        size={42}
                        style={{
                        color: "#46cce3",
                        backgroundColor: "#fde3cf",
                        fontWeight: "bold"
                        }}
                    >
                        {user?.name?.charAt(0)?.toUpperCase()}
                    </Avatar>
                    <input
                        placeholder={
                            "What's in your mind, " + user?.name + "?"
                        }
                        className="shareInput"
                        ref={desc}
                    />
                </div>
                <hr className="shareHr" />
                {currentPlaySong && (
                    <div className="musicPlayerInPost">
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
                                        <div style={title} className="underlinedWhenHovered">{currentPlaySong.audio_name}</div>
                                        <div style={subtitle}>{currentPlaySong.created_by}</div>
                                    </div> 
                                </Row>
                            </Col>
                            <Col span={16} style={{
                                display: "flex",
                                justifyContent: "flex-end",
                            }}>
                                <button className="musicPlayerInPostBtn">Click here to Listen!</button>
                            </Col>
                    </Row>
                </div>
                )}
                <form className="shareBottomInPost" onSubmit={submitHandler}>
                     <button className="shareButton" type="submit" style={{backgroundColor: "#0f2f56", padding: "10px 15px"}}>
                        Post
                    </button> 
                </form>
            </div>
    );
}