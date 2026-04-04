import React from "react";
import { Box, Typography, Card, CardContent } from "@mui/material";
import { useSelector } from "react-redux";

const Profile = () => {
  const { userInfo } = useSelector((state) => state.auth);

  return (
    <Box p={3}>
      <Card>
        <CardContent>
          <Typography variant="h4">Profile</Typography>

          <Typography mt={2}>
            Name: {userInfo?.name}
          </Typography>

          <Typography>
            Email: {userInfo?.email}
          </Typography>

          <Typography>
            Role: {userInfo?.role}
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
};

export default Profile;