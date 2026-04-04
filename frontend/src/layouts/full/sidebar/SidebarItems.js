import React from "react";
import Menuitems from "./MenuItems";
import { useLocation } from "react-router-dom";
import { Box, List } from "@mui/material";
import NavItem from "./NavItem";
import NavGroup from "./NavGroup/NavGroup";
import { useSelector } from "react-redux";

const SidebarItems = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const { pathname } = useLocation();

  return (
    <Box sx={{ px: 2 }}>
      <List sx={{ pt: 1 }} className="sidebarNav">
        {Menuitems.map((item) => {
          const role = userInfo?.role;

          // 🔥 Hide teacher features for student
          if (
            role === "student" &&
            ["Create Exam", "Add Questions", "Exam Logs"].includes(item.title)
          ) {
            return null;
          }

          // 🔥 Subheaders
          if (item.subheader) {
            if (role === "student" && item.subheader === "Teacher") {
              return null;
            }

            return <NavGroup item={item} key={item.subheader} />;
          }

          // 🔥 Normal Items
          return (
            <NavItem
              item={item}
              key={item.id}
              pathDirect={pathname} // ✅ FIX highlight issue
            />
          );
        })}
      </List>
    </Box>
  );
};

export default SidebarItems;