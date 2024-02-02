import { useState } from "react";
// import { Group,Code,  Avatar } from "@mantine/core";
import {
  IconBellRinging,
  IconFingerprint,
//   IconKey,
//   IconSettings,
//   Icon2fa,
//   IconDatabaseImport,
  IconReceipt2,
  // IconSwitchHorizontal,
  IconLogout,
} from "@tabler/icons-react";
// import { MantineLogo } from "@mantinex/mantine-logo";
import classes from "../../assets/Sidebar/SideTabs.module.css";
import { NavLink } from "react-router-dom";

const data = [
  { link: "/", label: "Intern", icon: IconBellRinging },
  { link: "/mentor", label: "Mentor", icon: IconReceipt2 },
  { link: "/roadMap", label: "RoadMap", icon: IconFingerprint },
];

const SideBarTabs = () => {
  const [active, setActive] = useState("Intern");

  const links = data.map((item) => (
    <NavLink
      className={classes.link}
      data-active={item.label === active || undefined}
      to={item.link}
      key={item.label}
      onClick={() => {
        setActive(item.label);
      }}
    >
      <item.icon className={classes.linkIcon} stroke={1.5} />
      <span>{item.label}</span>
    </NavLink>
  ));

  return (
    <nav className={classes.navbar} style={{flexGrow:1,height:"100"}}>
      <div className={classes.navbarMain}>
        {links}
      </div>

      <div className={classes.footer}>
        {/* <a
          href="#"
          className={classes.link}
          onClick={(event) => event.preventDefault()}
        >
          <IconSwitchHorizontal className={classes.linkIcon} stroke={1.5} />
          <span>Change account</span>
        </a> */}

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
};
export default SideBarTabs;
