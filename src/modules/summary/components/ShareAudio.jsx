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
    Card
} from "antd";
import { useContext, useRef, useState } from "react";
import { getLocalStorage } from "../../../utils/storage";
import request from "../../../utils/request";
import useFetchAllInQuery from "../../../modules/home/services/useFetchAllInQuery";
import MusicPlayer from "../../../components/MusicPlayer/MusicPlayer";
import { useNavigate } from "react-router";
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
            <div className="shareWrapper">
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
                    <div className="shareImgContainer">
                        <MusicPlayer
                        inPost={true}
                        name={currentPlaySong.audio_name}
                        artist={currentPlaySong.created_by}
                        song={`http://localhost:8001/static/audio/${currentPlaySong.audio_name}.mp3`}
                        />
                    </div>
                )}
                <form className="shareBottom" onSubmit={submitHandler}>
                    <div className="shareOptions">
                
                    </div>
                     <button className="shareButton" type="submit" style={{backgroundColor: "#0f2f56", padding: "10px 15px"}}>
                        Share
                    </button> 
                </form>
            </div>
    );
}