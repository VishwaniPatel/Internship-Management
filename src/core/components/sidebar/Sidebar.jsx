import { useState } from "react";
import { Group, Image, Divider } from "@mantine/core";
import {
  IconHome2,
  IconUserStar,
  IconTimeline,
  IconUsers,
  IconLogout,
  IconSitemap,
  IconMenu2,
} from "@tabler/icons-react";
import Logo from "./../../../../src/assets/download.png";
import classes from "./Sidebar.module.css";
import { Link } from "react-router-dom";

const data = [
  { link: "/", label: "Home", icon: IconHome2 },
  { link: "/intern-batch", label: "Intern", icon: IconUsers },
  { link: "/mentors", label: "Mentor", icon: IconUserStar },
  { link: "/roadmap", label: "Roadmap", icon: IconSitemap },
  { link: "/", label: "Training-Tracker", icon: IconTimeline },
];

export default function Sidebar() {
  const [active, setActive] = useState("Home");

  const links = data.map((item, index) => (
    // For navigation routes added link
    <Link to={item.link} key={index}>
      <li
        className={classes.link}
        data-active={item.label === active || undefined}
        key={item.label}
        onClick={() => {
          setActive(item.label);
        }}
      >
        <item.icon className={classes.linkIcon} size={20} stroke={1.3} />
        <span>{item.label}</span>
      </li>
    </Link>
  ));

  return (
    <nav className={classes.navbar}>
      <div className={classes.navbarMain}>
        <Group
          className={classes.header}
          justify="center"
          style={{ position: "relative" }}
        >
          <IconMenu2
            className="menu-collapse"
            color="white"
            size={32}
          ></IconMenu2>
          <Image className="logo-img" src={Logo} />
        </Group>
        <ul style={{ paddingLeft: "0" }}>{links}</ul>
      </div>
      <div className={classes.footer}>
        <Divider my="md" />
        <a
          href="#"
          className={classes.link}
          onClick={(event) => event.preventDefault()}
        >
          <IconLogout className={classes.linkIcon} stroke={1.5} />
          <span>Logout</span>
        </a>
      </div>
    </nav>
  );
}
