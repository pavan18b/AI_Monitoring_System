import React from "react";
import PropTypes from "prop-types";
import { NavLink } from "react-router-dom";

// MUI
import {
  ListItemIcon,
  ListItem,
  List,
  styled,
  ListItemText,
} from "@mui/material";

const NavItem = ({ item, level, pathDirect, onClick }) => {
  const Icon = item.icon;
  const itemIcon = <Icon stroke={1.8} size="1.4rem" />;

  // 🔥 PREMIUM NEON STYLE
  const ListItemStyled = styled(ListItem)(() => ({
    whiteSpace: "nowrap",
    marginBottom: "6px",
    padding: "12px 14px",
    borderRadius: "12px",

    color: "#cbd5e1",
    backgroundColor: "transparent",

    transition: "all 0.25s ease",

    // ✨ HOVER EFFECT
    "&:hover": {
      background: "rgba(99,102,241,0.15)",
      color: "#fff",
      transform: "translateX(6px)",

      boxShadow: "0 0 10px rgba(99,102,241,0.6)",
    },

    // 🎯 ACTIVE ITEM
    "&.Mui-selected": {
      background: "rgba(99,102,241,0.25)",
      color: "#fff",
      fontWeight: "600",
      transform: "translateX(6px)",

      boxShadow: "0 0 15px rgba(99,102,241,0.9)",

      "&:hover": {
        background: "rgba(99,102,241,0.35)",
      },
    },
  }));

  return (
    <List component="li" disablePadding key={item.id}>
      <ListItemStyled
        button
        component={item.external ? "a" : NavLink}
        to={item.href}
        href={item.external ? item.href : ""}
        disabled={item.disabled}
        selected={pathDirect === item.href}
        target={item.external ? "_blank" : ""}
        onClick={onClick}
      >
        {/* 🔥 ICON WITH ANIMATION */}
        <ListItemIcon
          sx={{
            minWidth: "36px",
            color: "#94a3b8",
            transition: "all 0.3s",

            ".Mui-selected &": {
              color: "#38bdf8",
              transform: "scale(1.2)",
            },
          }}
        >
          {itemIcon}
        </ListItemIcon>

        {/* TEXT */}
        <ListItemText
          primary={item.title}
          sx={{
            color: "inherit",
            fontWeight: 500,
          }}
        />
      </ListItemStyled>
    </List>
  );
};

NavItem.propTypes = {
  item: PropTypes.object,
  level: PropTypes.number,
  pathDirect: PropTypes.any,
};

export default NavItem;