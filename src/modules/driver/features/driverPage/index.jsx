import "./profile.css";
import Topbar from "../components/topbar/Topbar";
import Rightbar from "../components/rightbar/Rightbar";
import { useState, useEffect, useContext, useRef } from "react";
import { useParams } from "react-router";
import axios from "axios";
import { getLocalStorage } from "../../../../utils/storage";

export default function DriverPage() {
    const PF = "";
    const [viewUser, setUser] = useState({});
    const username = useParams().username;
    const socket = useRef();
    const user = getLocalStorage('tempUser');
    const [onlineUsers, setOnlineUsers] = useState([]);

    // useEffect(() => {
    //     socket.current.emit("addUser", user._id);
    //     socket.current.on("getUsers", (users) => {
    //         setOnlineUsers(
    //             user.followins.filter((f) => users.some((u) => u.userId === f))
    //         );
    //     });
    // }, [user]);
    
    // useEffect(() => {
    //     const fetchUser = async () => {
    //         const res = await axios.get(`/users?username=${username}`);
    //         setUser(res.data);
    //     };
    //     fetchUser();
    // }, [username]);

    return (
        <>
            <div className="profile">
                {/* <Sidebar currentId={user._id} onlineUsers={onlineUsers}/> */}
                <div className="profileRight">
                    <div className="profileRightTop">
                        <div className="profileCover">
                            <img
                                className="profileCoverImg"
                                // src={
                                //     viewUser.coverPicture
                                //         ? PF + viewUser.coverPicture
                                //         : PF + "person/noCover.png"
                                // }
                                alt=""
                            />
                            <img
                                className="profileUserImg"
                                // src={
                                //     viewUser.profilePicture
                                //         ? PF + viewUser.profilePicture
                                //         : PF + "person/noAvatar.png"
                                // }
                                alt=""
                            />
                        </div>
                        <div className="profileInfo">
                            <h4 className="profileInfoName">{viewUser.username}</h4>
                            <span className="profileInfoDesc">{viewUser.desc}</span>
                        </div>
                    </div>
                    <div className="profileRightBottom">
                        <Rightbar user={viewUser} />
                    </div>
                </div>
            </div>
        </>
    );
}