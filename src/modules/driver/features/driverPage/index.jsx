import "./profile.css";
import Topbar from "../components/topbar/Topbar";
import Details from "../components/detail/Details";
import React, { useState, useEffect, useContext, useRef, useMemo } from "react";
import { useParams } from "react-router";
import axios from "axios";
import { Avatar } from "antd";
import { getLocalStorage } from "../../../../utils/storage";
import Post from "../../../../components/Post/Post"
import useFetchPostByUserID from "../../../home/services/useFetchPostByUserID";

const musicInfoTest = {
    name: 'test',
    artist: 'test'
}

export default function DriverPage() {
    const PF = "";
    const [viewUser, setUser] = useState({});
    const username = useParams().username;
    const socket = useRef();
    const user = getLocalStorage('tempUser');
    const [onlineUsers, setOnlineUsers] = useState([]);

    const { data: listPosts, isLoading, refetch } = useFetchPostByUserID(user.user_id, {});

    useEffect(() => {
        refetch()
    }, [user.user_id])
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
                    {/* <img
                        className="profileCoverImg"
                        // src={
                        //     viewUser.coverPicture
                        //         ? PF + viewUser.coverPicture
                        //         : PF + "person/noCover.png"
                        // }
                        alt=""
                    /> */}
                    <Avatar className="profileUserImg"
                    // src={
                    //     viewUser.profilePicture
                    //         ? PF + viewUser.profilePicture
                    //         : PF + "person/noAvatar.png" 
                    // }
                    >{user?.name?.charAt(0)?.toUpperCase()}</Avatar>
                    <div className="profileUsername">{user?.name}</div>
                </div>
            <div className="profileBottom">
                    <Details user={viewUser} />
                    <div className="profileUserPosts">
                            {listPosts?.map((data, index) => {
                            return <Post width={100} key={data.post_id} user={data.user_id} date={data.created_at} content={data.content} uploaded_link = {data.uploaded_link} music={musicInfoTest}/>
                        })}
                        <Post music={musicInfoTest} user={user?.user_id} date="11/12/2023 09:44:00" content="Lorem ipsum dolor sit amet. Nam enim odit qui suscipit dolores et galisum dolorem est galisum nesciunt. Et quis veniam vel unde nihil eum aliquid consequuntur. Et nihil perferendis ex deserunt optio et enim eaque ut blanditiis nemo sit consequatur voluptas et minima eius At eius corrupti. Id amet quia sit excepturi consequatur nam autem sint. At dolor quia eum harum iusto eos nulla expedita ut itaque itaque et autem velit? Nam doloremque saepe 33 velit deserunt non quae libero." width={100}/>
                        <Post music={musicInfoTest} user={user?.user_id} date="11/12/2023 09:44:00" content="Lorem ipsum dolor sit amet. Nam enim odit qui suscipit dolores et galisum dolorem est galisum nesciunt. Et quis veniam vel unde nihil eum aliquid consequuntur. Et nihil perferendis ex deserunt optio et enim eaque ut blanditiis nemo sit consequatur voluptas et minima eius At eius corrupti. Id amet quia sit excepturi consequatur nam autem sint. At dolor quia eum harum iusto eos nulla expedita ut itaque itaque et autem velit? Nam doloremque saepe 33 velit deserunt non quae libero." width={100}/>
                        <Post music={musicInfoTest} user={user?.user_id} date="11/12/2023 09:44:00" content="Lorem ipsum dolor sit amet. Nam enim odit qui suscipit dolores et galisum dolorem est galisum nesciunt. Et quis veniam vel unde nihil eum aliquid consequuntur. Et nihil perferendis ex deserunt optio et enim eaque ut blanditiis nemo sit consequatur voluptas et minima eius At eius corrupti. Id amet quia sit excepturi consequatur nam autem sint. At dolor quia eum harum iusto eos nulla expedita ut itaque itaque et autem velit? Nam doloremque saepe 33 velit deserunt non quae libero." width={100}/>
                        <Post music={musicInfoTest} user={user?.user_id} date="11/12/2023 09:44:00" content="Lorem ipsum dolor sit amet. Nam enim odit qui suscipit dolores et galisum dolorem est galisum nesciunt. Et quis veniam vel unde nihil eum aliquid consequuntur. Et nihil perferendis ex deserunt optio et enim eaque ut blanditiis nemo sit consequatur voluptas et minima eius At eius corrupti. Id amet quia sit excepturi consequatur nam autem sint. At dolor quia eum harum iusto eos nulla expedita ut itaque itaque et autem velit? Nam doloremque saepe 33 velit deserunt non quae libero." width={100}/>
                        <Post music={musicInfoTest} user={user?.user_id} date="11/12/2023 09:44:00" content="Lorem ipsum dolor sit amet. Nam enim odit qui suscipit dolores et galisum dolorem est galisum nesciunt. Et quis veniam vel unde nihil eum aliquid consequuntur. Et nihil perferendis ex deserunt optio et enim eaque ut blanditiis nemo sit consequatur voluptas et minima eius At eius corrupti. Id amet quia sit excepturi consequatur nam autem sint. At dolor quia eum harum iusto eos nulla expedita ut itaque itaque et autem velit? Nam doloremque saepe 33 velit deserunt non quae libero." width={100}/>
                        <Post music={musicInfoTest} user={user?.user_id} date="11/12/2023 09:44:00" content="Lorem ipsum dolor sit amet. Nam enim odit qui suscipit dolores et galisum dolorem est galisum nesciunt. Et quis veniam vel unde nihil eum aliquid consequuntur. Et nihil perferendis ex deserunt optio et enim eaque ut blanditiis nemo sit consequatur voluptas et minima eius At eius corrupti. Id amet quia sit excepturi consequatur nam autem sint. At dolor quia eum harum iusto eos nulla expedita ut itaque itaque et autem velit? Nam doloremque saepe 33 velit deserunt non quae libero." width={100}/>
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