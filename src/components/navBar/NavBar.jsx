import React, { useContext, useState } from "react";
import "./navBar.scss";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import WbSunnyOutlinedIcon from "@mui/icons-material/WbSunnyOutlined";
import GridViewOutlinedIcon from "@mui/icons-material/GridViewOutlined";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import { Link, useNavigate } from "react-router-dom";
import { DarkModeContext } from "../../context/darkModeContext";
import { AuthContext } from "../../context/authContext";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import Search from "../search/Search";
import { makeRequest } from "../../axios";
import { useQuery } from "react-query";

const NavBar = () => {
  const { toggle, darkMode } = useContext(DarkModeContext);
  const { currentUser } = useContext(AuthContext);
  const { logout } = useContext(AuthContext);
  const [err, setErr] = useState("");
  const [openSearch, setOpenSearch] = useState(false);
  const [userName, setUserName] = useState("");

  const { isLoading, error, data, refetch } = useQuery({
    queryKey: ["search"],
    manual: true,
    enabled: false,
    refetchOnWindowFocus: false,
    queryFn: () =>
      makeRequest.get("/users/search/" + userName).then((res) => {
        return res.data;
      }),
  });
  console.log(data);

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      refetch();
    }
  };

  const Navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      Navigate("/login");
    } catch (err) {
      setErr(err);
    }
  };
  return (
    <div className="navBar">
      <div className="left">
        <Link to="/" style={{ textDecoration: "none" }}>
          <span>SimpleSocial</span>
        </Link>
        <div className="icons">
        <Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
          {" "}
          <HomeOutlinedIcon />
        </Link>
        {darkMode ? (
          <WbSunnyOutlinedIcon onClick={toggle} style={{ cursor: "pointer" }} />
        ) : (
          <DarkModeOutlinedIcon
            onClick={toggle}
            style={{ cursor: "pointer" }}
          />
        )}
        </div>
        <div className="search">
          <SearchOutlinedIcon />
          <input
            type="text"
            placeholder="Cerca qualcosa..."
            onFocus={() => setOpenSearch(!openSearch)}
            onChange={(e) => setUserName(e.target.value)}
            value={userName}
            onKeyDown={handleKeyDown}
          ></input>
          {openSearch && <Search data={data} />}
        </div>
      </div>
      <div className="right">
        <PersonOutlinedIcon />
        <EmailOutlinedIcon />
        <NotificationsOutlinedIcon />
        <div className="user">
          <img src={"/upload/" + currentUser.profilePic} alt="propic" />
          <Link
            to={`/profile/${currentUser.id}`}
            style={{ textDecoration: "none", color: "inherit" }}
          >
            <span className="name">{currentUser.name}</span>
          </Link>
          {
            <LogoutOutlinedIcon
              style={{ cursor: "pointer" }}
              onClick={handleLogout}
            />
          }
        </div>
      </div>
    </div>
  );
};

export default NavBar;
