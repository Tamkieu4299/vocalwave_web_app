import "./profile.css";
import Topbar from "../components/topbar/Topbar";
import Details from "../components/detail/Details";
import { useState, useEffect, useContext, useRef } from "react";
import { useParams } from "react-router";
import axios from "axios";
import { Avatar } from "antd";
import { getLocalStorage } from "../../../../utils/storage";
import Post from "../../../../components/Post/Post"
import moonlight from "../../../../assets/moonlight.mp3"

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
                <div className="profileTop">
                    <img
                        className="profileCoverImg"
                        // src={
                        //     viewUser.coverPicture
                        //         ? PF + viewUser.coverPicture
                        //         : PF + "person/noCover.png"
                        // }
                        alt=""
                    />
                    <Avatar className="profileUserImg"
                    // src={
                    //     viewUser.profilePicture
                    //         ? PF + viewUser.profilePicture
                    //         : PF + "person/noAvatar.png"
                    // }
                    >{user?.name?.charAt(0)?.toUpperCase()}</Avatar>
                    <div className="profileUsername">{user?.name}</div>
                    <div className="profileDescription">{"22 songs uploaded"}</div>
                </div>
                <div className="profileBottom">
                    <Details user={viewUser} />
                    <div className="profileUserPosts">
                    <Post music={moonlight} user={user?.name} date="11/12/2023 09:44:00" content="Lorem ipsum dolor sit amet. Nam enim odit qui suscipit dolores et galisum dolorem est galisum nesciunt. Et quis veniam vel unde nihil eum aliquid consequuntur. Et nihil perferendis ex deserunt optio et enim eaque ut blanditiis nemo sit consequatur voluptas et minima eius At eius corrupti. Id amet quia sit excepturi consequatur nam autem sint. At dolor quia eum harum iusto eos nulla expedita ut itaque itaque et autem velit? Nam doloremque saepe 33 velit deserunt non quae libero." width={90}/>
                    <Post user={user?.name} date="11/12/2023 09:44:00" content="Lorem ipsum dolor sit amet. Nam enim odit qui suscipit dolores et galisum dolorem est galisum nesciunt. Et quis veniam vel unde nihil eum aliquid consequuntur. Et nihil perferendis ex deserunt optio et enim eaque ut blanditiis nemo sit consequatur voluptas et minima eius At eius corrupti. Id amet quia sit excepturi consequatur nam autem sint. At dolor quia eum harum iusto eos nulla expedita ut itaque itaque et autem velit? Nam doloremque saepe 33 velit deserunt non quae libero." width={90}/>
                    <Post user={user?.name} date="11/12/2023 09:44:00" content="Lorem ipsum dolor sit amet. Nam enim odit qui suscipit dolores et galisum dolorem est galisum nesciunt. Et quis veniam vel unde nihil eum aliquid consequuntur. Et nihil perferendis ex deserunt optio et enim eaque ut blanditiis nemo sit consequatur voluptas et minima eius At eius corrupti. Id amet quia sit excepturi consequatur nam autem sint. At dolor quia eum harum iusto eos nulla expedita ut itaque itaque et autem velit? Nam doloremque saepe 33 velit deserunt non quae libero." width={90}/>
                    <Post user={user?.name} date="11/12/2023 09:44:00" content="Lorem ipsum dolor sit amet. Nam enim odit qui suscipit dolores et galisum dolorem est galisum nesciunt. Et quis veniam vel unde nihil eum aliquid consequuntur. Et nihil perferendis ex deserunt optio et enim eaque ut blanditiis nemo sit consequatur voluptas et minima eius At eius corrupti. Id amet quia sit excepturi consequatur nam autem sint. At dolor quia eum harum iusto eos nulla expedita ut itaque itaque et autem velit? Nam doloremque saepe 33 velit deserunt non quae libero." width={90}/>
                    <Post user={user?.name} date="11/12/2023 09:44:00" content="Lorem ipsum dolor sit amet. Nam enim odit qui suscipit dolores et galisum dolorem est galisum nesciunt. Et quis veniam vel unde nihil eum aliquid consequuntur. Et nihil perferendis ex deserunt optio et enim eaque ut blanditiis nemo sit consequatur voluptas et minima eius At eius corrupti. Id amet quia sit excepturi consequatur nam autem sint. At dolor quia eum harum iusto eos nulla expedita ut itaque itaque et autem velit? Nam doloremque saepe 33 velit deserunt non quae libero." width={90}/>
                    <Post user={user?.name} date="11/12/2023 09:44:00" content="Lorem ipsum dolor sit amet. Nam enim odit qui suscipit dolores et galisum dolorem est galisum nesciunt. Et quis veniam vel unde nihil eum aliquid consequuntur. Et nihil perferendis ex deserunt optio et enim eaque ut blanditiis nemo sit consequatur voluptas et minima eius At eius corrupti. Id amet quia sit excepturi consequatur nam autem sint. At dolor quia eum harum iusto eos nulla expedita ut itaque itaque et autem velit? Nam doloremque saepe 33 velit deserunt non quae libero." width={90}/>
                    <Post user={user?.name} date="11/12/2023 09:44:00" content="Lorem ipsum dolor sit amet. Nam enim odit qui suscipit dolores et galisum dolorem est galisum nesciunt. Et quis veniam vel unde nihil eum aliquid consequuntur. Et nihil perferendis ex deserunt optio et enim eaque ut blanditiis nemo sit consequatur voluptas et minima eius At eius corrupti. Id amet quia sit excepturi consequatur nam autem sint. At dolor quia eum harum iusto eos nulla expedita ut itaque itaque et autem velit? Nam doloremque saepe 33 velit deserunt non quae libero." width={90}/>
                    </div>
                </div>
                {/* <div className="profileRight">
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
                </div> */}
            </div>
        </>
    );
}