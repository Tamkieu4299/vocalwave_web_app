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
import axios from "axios";
import { getLocalStorage } from "../../utils/storage";
import { FileImageFilled } from '@ant-design/icons';


export default function Share() {
    const user = getLocalStorage("tempUser");
    console.log(user);
    // const PF = "";
    const desc = useRef();
    const [file, setFile] = useState(null);

    const submitHandler = async (e) => {
        e.preventDefault();
        const newPost = {
            userId: user._id,
            desc: desc.current.value,
        };
        if (file) {
            const data = new FormData();
            const fileName = Date.now() + file.name;
            data.append("name", fileName);
            data.append("file", file);
            newPost.img = fileName;
            console.log(newPost);
            try {
                await axios.post("/upload", data);
            } catch (err) {
                console.log(err);
            }
        }
        try {
            await axios.post("/posts", newPost);
            window.location.reload();
        } catch (err) {console.log("Error!");}
    };

    return (
        <div className="share">
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
                {file && (
                    <div className="shareImgContainer">
                        <img
                            className="shareImg"
                            src={URL.createObjectURL(file)}
                            alt=""
                        />
                        <Cancel
                            className="shareCancelImg"
                            onClick={() => setFile(null)}
                        />
                    </div>
                )}
                <form className="shareBottom" onSubmit={submitHandler}>
                    <div className="shareOptions">
                        <label htmlFor="file" className="shareOption">
                            <PermMedia
                                htmlColor="tomato"
                                className="shareIcon"
                                style={{color: "#0f2f56", marginRight: "3px"}}
                            />
                            <span className="shareOptionText">
                                Media
                            </span>
                            <input
                                style={{ display: "none" }}
                                type="file"
                                id="file"
                                accept=".png,.jpeg,.jpg"
                                onChange={(e) => setFile(e.target.files[0])}
                            />
                        </label>
                        <div className="shareOption">
                            <Label htmlColor="blue" className="shareIcon" style={{color: "#0f2f56"}}/>
                            <span className="shareOptionText">Tag</span>
                        </div>
                        <div className="shareOption">
                            <Room htmlColor="green" className="shareIcon" style={{color: "#0f2f56"}}/>
                            <span className="shareOptionText">Location</span>
                        </div>
                        <div className="shareOption">
                            <EmojiEmotions
                                htmlColor="goldenrod"
                                className="shareIcon"
                                style={{color: "#0f2f56"}}
                            />
                            <span className="shareOptionText">Feelings</span>
                        </div>
                    </div>
                    <button className="shareButton" type="submit" style={{backgroundColor: "#0f2f56", padding: "10px 15px"}}>
                        Share
                    </button>
                </form>
            </div>
        </div>
    );
}