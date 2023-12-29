import "./details.css";
import { useEffect, useState, useContext, useRef } from "react";
import { Link } from "react-router-dom";
import axios from "axios";;
import { Add, Remove } from "@material-ui/icons";
import { useNavigate } from "react-router-dom";
import { Avatar } from "antd";
import { getLocalStorage } from "../../../../../utils/storage";

export default function Details({ user }) {
    const username = useRef();
    const email = useRef();
    const city = useRef();
    const from = useRef();
    const profilePic = useRef();  
    const coverPic = useRef();
    const password = useRef();
    const passwordAgain = useRef();
    const editModal = useRef();
    const editBtn = useRef();
    const editBioBtn = useRef();
    const editClose = useRef();
    const PF = "";
    const [friends, setFriends] = useState([]);
    const currentUser = getLocalStorage('tempUser');
    const navigate = useNavigate();


    useEffect(() => {
        const getFriends = async () => {
            try {
                const friendList = await axios.get(
                    "/users/friends/" + user._id
                );
                setFriends(friendList.data);
            } catch (err) {
                console.log(err);
            }
        };
        getFriends();
    }, [user]);


    const handleCLickMessage = async () => {
        const valid = await axios.get(
            "/conversations/find/" + currentUser._id + "/" + user._id
        );
        try {
            if (valid.data == null)
                await axios.post("/conversations/", {
                    senderId: currentUser._id,
                    receiverId: user._id,
                });
        } catch (err) {
            console.log(err);
        }
        navigate("/messenger");
    };

    const handleClickEdit = (e) => {
        editBtn.current.onclick = function () {
            editModal.current.style.display = "block";
        };

        editClose.current.onclick = function () {
            editModal.current.style.display = "none";
        };

        window.onclick = function (event) {
            if (event.target === editModal.current) {
                editModal.current.style.display = "none";
            }
        };
    };

    const handleSubmitEdit = async (e) => {
        e.preventDefault();
        let profilePicname = "";
        let coverPicname = "";
        if (profilePic.current.files[0]) {
            const data = new FormData();
            profilePicname = Date.now() + profilePic.current.files[0].name;
            data.append("name", profilePicname);
            data.append("file", profilePic.current.files[0]);
            try {
                await axios.post("/upload", data);
            } catch (err) {
                console.log(err);
            }
        }
        if (coverPic.current.files[0]) {
            const data = new FormData();
            coverPicname = Date.now() + coverPic.current.files[0].name;
            data.append("name", coverPicname);
            data.append("file", coverPic.current.files[0]);
            try {
                await axios.post("/upload", data);
            } catch (err) {
                console.log(err);
            }
        }
        if (passwordAgain.current.value !== password.current.value) {
            passwordAgain.current.setCustomValidity("Passwords don't match!");
        } else {
            const updatedUser = {};
            updatedUser.userId = currentUser._id;
            if (username.current.value !== "")
                updatedUser.username = username.current.value;
            if (email.current.value !== "")
                updatedUser.email = email.current.value;
            if (password.current.value !== "")
                updatedUser.password = password.current.value;
            if (passwordAgain.current.value !== "")
                updatedUser.passwordAgain = passwordAgain.current.value;
            if (city.current.value !== "")
                updatedUser.city = city.current.value;
            if (from.current.value !== "")
                updatedUser.from = from.current.value;
            if (profilePic.current.value !== "")
                updatedUser.profilePicture = profilePicname;
            if (coverPic.current.value !== "")
                updatedUser.coverPicture = coverPicname;
            console.log(updatedUser);
            // const updatedUser = {
            //     userId: currentUser._id,
            //     username: username.current.value,
            //     email: email.current.value,
            //     password: password.current.value,
            //     city: city.current.value,
            //     from: from.current.value,
            //     profilePicture: profilePicname,
            //     coverPicture: coverPicname,
            // };
            try {
                await axios.put(`/users/${currentUser._id}`, updatedUser);
                const res = await axios.get(`/users?userId=${currentUser._id}`);
                localStorage.setItem("user", JSON.stringify(res.data));
                window.location.reload();
            } catch (err) {
                console.log(err);
            }
        }
    };

    const HomeRightbar = () => {
        return (
            <>
                <div className="birthdayContainer">
                    <img className="birthdayImg" src="assets/gift.png" alt="" />
                    <span className="birthdayText">
                        <b>Bao Hang</b> and <b>3 other friends</b> have a
                        birthday today.
                    </span>
                </div>
                <img className="rightbarAd" src="assets/ad.png" alt="" />
            </>
        );
    };

    const ProfileRightbar = () => {
        return (
            <div className="detailContainer backgroundThemeColor">
                <div className="detailTitle">
                    About
                </div>
                <div className="detailQuote">
                    {"[Quote]"}
                </div>
                <button
                    className="detailButton"
                    onClick={handleClickEdit}
                    ref={editBioBtn}
                >
                    Edit Bio
                </button>
                <div className="detailInfo">
                    <div className="detailInfoItem">
                        <span className="detailInfoKey">City:</span>
                        <span className="detailInfoValue">{user.city}</span>
                    </div>
                    <div className="detailInfoItem">
                        <span className="detailInfoKey">From:</span>
                        <span className="detailInfoValue">{user.from}</span>
                    </div>
                    <div className="detailInfoItem">
                        <span className="detailInfoKey">Relationship:</span>
                        <span className="detailInfoValue">
                            {user.relationship === 1
                                ? "Single"
                                : user.relationship === 2
                                ? "Married"
                                : "-"}
                        </span>
                    </div>
                </div>
                <button
                    className="detailButton"
                    onClick={handleClickEdit}
                    ref={editBtn}
                >
                    Edit profile
                </button>
                <div className="detailTitle">
                    Friends
                </div>
                <Avatar.Group maxCount={6} size={53}>
                    <Avatar className="detailFriends" size={53}>A</Avatar>
                    <Avatar className="detailFriends" size={53}>A</Avatar>
                    <Avatar className="detailFriends" size={53}>A</Avatar>
                    <Avatar className="detailFriends" size={53}>A</Avatar>
                    <Avatar className="detailFriends" size={53}>A</Avatar>
                    <Avatar className="detailFriends" size={53}>A</Avatar>
                    <Avatar className="detailFriends" size={53}>A</Avatar>
                    <Avatar className="detailFriends" size={53}>A</Avatar>
                    <Avatar className="detailFriends" size={53}>A</Avatar>
                    <Avatar className="detailFriends" size={53}>A</Avatar>
                    {/* {friends.map((item, index) => (
                        <Avatar key={index}></Avatar>
                    ))} */}
                </Avatar.Group>
                <div className="detailTitle">
                    Featured Songs
                </div>
                <div className="detailFeatured">
                    <div className="detailFeaturedSong">
                        <div className="detailFeaturedSongName">
                            {"[Song Name]"}
                        </div>
                    </div>
                    <div className="detailFeaturedSong">
                        <div className="detailFeaturedSongName">
                            {"[Song Name]"}
                        </div>
                    </div>
                    <div className="detailFeaturedSong">
                        <div className="detailFeaturedSongName">
                            {"[Song Name]"}
                        </div>
                    </div>
                </div>
                {user.username === currentUser.username && (
                    <div class="rightbarEditContainer">
                        <div id="myModal" class="modal" ref={editModal} style={{zIndex: "9"}}>
                            <div class="modal-content" style={{zIndex: "9"}}>
                                <h2>Profile</h2>
                                <form onSubmit={handleSubmitEdit}>
                                    <label for="username">User name:</label>
                                    <br />
                                    <input
                                        type="text"
                                        name="username"
                                        placeholder={user.username}
                                        ref={username}
                                    />
                                    <br />
                                    <label for="email">Email:</label>
                                    <br />
                                    <input
                                        type="text"
                                        id="email"
                                        name="email"
                                        placeholder={user.email}
                                        ref={email}
                                    />
                                    <br />
                                    <label for="city">City:</label>
                                    <br />
                                    <input
                                        type="text"
                                        id="city"
                                        name="city"
                                        placeholder={user.city}
                                        ref={city}
                                    />
                                    <br />
                                    <label for="from">From:</label>
                                    <br />
                                    <input
                                        type="text"
                                        id="from"
                                        name="from"
                                        placeholder={user.from}
                                        ref={from}
                                    />
                                    <br />
                                    <label for="password">Password:</label>
                                    <br />
                                    <input
                                        type="text"
                                        id="password"
                                        name="password"
                                        ref={password}
                                    />
                                    <br />
                                    <label for="passwordAgain">
                                        Password again:
                                    </label>
                                    <br />
                                    <input
                                        type="text"
                                        id="passwordAgain"
                                        name="passwordAgain"
                                        ref={passwordAgain}
                                    />
                                    <br />
                                    <label for="profilePic">
                                        Profile picture:
                                    </label>
                                    <br />
                                    <input
                                        type="file"
                                        id="profilePic"
                                        name="profilePic"
                                        accept=".png,.jpeg,.jpg"
                                        ref={profilePic}
                                    />
                                    <br />
                                    <label for="coverPic">
                                        Cover picture:
                                    </label>
                                    <br />
                                    <input
                                        type="file"
                                        id="coverPic"
                                        name="coverPic"
                                        accept=".png,.jpeg,.jpg"
                                        ref={coverPic}
                                    />
                                    <br />
                                    <input type="submit" value="Submit" />
                                </form>
                                <button ref={editClose} className="close">
                                    x
                                </button>
                            </div>
                        </div>
                    </div>
                )}
                <div className="rightbarFollowings">
                    {friends.map((friend, index) => (
                        <Link
                            key={index}
                            to={"/profile/" + friend.username}
                            style={{ textDecoration: "none" }}
                        >
                            <div className="rightbarFollowing">
                                <img
                                    src={
                                        friend.profilePicture
                                            ? PF + friend.profilePicture
                                            : PF + "person/noAvatar.png"
                                    }
                                    alt=""
                                    className="rightbarFollowingImg"
                                />
                                <span className="rightbarFollowingName">
                                    {friend.username}
                                </span>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        );
    };
    return (
        <>
            {user 
                ? 
                    <ProfileRightbar />
                :
                    <div className="rightbar">
                        <div className="rightbarWrapper">
                            <HomeRightbar />
                        </div>
                    </div>
            }
            
        </>
        
    );
}