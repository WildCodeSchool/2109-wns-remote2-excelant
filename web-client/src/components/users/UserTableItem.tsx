import { IconButton, styled, TableCell, TableRow } from "@mui/material";
import React, { useState } from "react";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import ArticleIcon from "@mui/icons-material/Article";
import { UserType } from "../../_types/_userTypes";
import DeleteUserModal from "./DeleteUserModal";

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

const UserTableItem: React.FC<{
  user: UserType & { _id: string };
  refetch: () => void;
}> = ({ user, refetch }) => {
  const [openDelete, setOpenDelete] = useState<boolean>(false);
  const [open, setOpen] = useState<boolean>(false);

  return (
    <>
      <StyledTableRow key={user._id}>
        <TableCell component="th" scope="row">
          {user.name}
        </TableCell>
        <TableCell data-testid="name" align="right">
          {user.email}
        </TableCell>
        <TableCell align="right">
          <IconButton color="primary" onClick={() => setOpen(true)}>
            <ArticleIcon />
          </IconButton>
          <IconButton color="error" onClick={() => setOpenDelete(true)}>
            <DeleteForeverIcon />
          </IconButton>
        </TableCell>
      </StyledTableRow>

      <DeleteUserModal
        user={user}
        open={openDelete}
        handleClose={() => setOpenDelete(false)}
        refetch={refetch}
      />
    </>
  );
};

export default UserTableItem;
