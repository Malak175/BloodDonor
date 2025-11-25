import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Paper,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Badge,
  IconButton,
  Tooltip,
} from "@mui/material";
import {
  Notifications as NotificationsIcon,
  CheckCircle,
} from "@mui/icons-material";
import { useSelector } from "react-redux";
import axios from "axios";

const Notifications = () => {
  const currentUser = useSelector((state) => state.user?.currentUser);
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    if (currentUser) {
      setNotifications(currentUser.notifications || []);
    }
  }, [currentUser]);

  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <Box sx={{ p: 4, maxWidth: 800, mx: "auto" }}>
      <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 3 }}>
        <Badge badgeContent={unreadCount} color="error">
          <NotificationsIcon sx={{ fontSize: 40, color: "#d32f2f" }} />
        </Badge>
        <Typography variant="h4" fontWeight="bold">
          Notifications
        </Typography>
      </Box>

      {notifications.length === 0 ? (
        <Paper sx={{ p: 4, textAlign: "center" }}>
          <Typography color="text.secondary">No notifications yet.</Typography>
        </Paper>
      ) : (
        <List>
          {notifications.map((notif, index) => (
            <ListItem
              key={index}
              sx={{
                backgroundColor: notif.read ? "#f9f9f9" : "#ffebee",
                borderLeft: notif.read ? "none" : "5px solid #d32f2f",
                mb: 1,
                borderRadius: 2,
              }}
            >
              <ListItemAvatar>
                <Avatar sx={{ bgcolor: "#d32f2f" }}>
                  <CheckCircle />
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                primary={notif.message}
                secondary={new Date(notif.createdAt).toLocaleString()}
              />
              {!notif.read && (
                <Tooltip title="New">
                  <IconButton size="small" color="error">
                    ●
                  </IconButton>
                </Tooltip>
              )}
            </ListItem>
          ))}
        </List>
      )}
    </Box>
  );
};

export default Notifications;
