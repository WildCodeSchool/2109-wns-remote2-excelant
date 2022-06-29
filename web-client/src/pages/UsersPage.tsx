import React, { useState } from "react";
import { Container, Typography } from "@mui/material";
import UserTable from "../components/users/UserTable";

const UsersPage: React.FC = () => {
  const [reload, setReload] = useState<number>(0);
  return (
    <Container maxWidth="lg">
      <Typography variant="h1" sx={{ backgroundColor: "primary.light" }}>
        UsersPage
      </Typography>
      <UserTable reload={reload} />
    </Container>
  );
};
export default UsersPage;
