import { Modal, Card, CardHeader, CardActions, Button } from "@mui/material";
import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { useSnackbar } from "notistack";
import { modalStyle } from "../../_utils/modalStyle";
import GqlRequest from "../../_graphql/GqlRequest";
import { UserType } from "../../_types/_userTypes";

const DeleteUserModal: React.FC<{
  open: boolean;
  handleClose: () => void;
  refetch: () => void;
  user: UserType & { _id: string };
}> = ({ open, handleClose, refetch, user }) => {
  const { enqueueSnackbar } = useSnackbar();

  const [loading, setLoading] = useState(false);

  const [deleteUser] = useMutation(new GqlRequest("User").delete("name"));

  const handleDelete = async () => {
    setLoading(true);
    try {
      await deleteUser({
        variables: { input: { _id: user._id } },
      });
    } catch (err) {
      // eslint-disable-next-line
      console.log("Error", err);
    } finally {
      enqueueSnackbar(`The user has been deleted successfully!`, {
        variant: "error",
        anchorOrigin: {
          vertical: 'top',
          horizontal: 'right'
        }
      });
      refetch();
      handleClose();
      setLoading(false);
    }
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <Card
        sx={{
          ...modalStyle,
          padding: "8px 24px",
          width: { xs: "95%", sm: "80%", md: "auto" },
        }}
      >
        <CardHeader
          title={`Are you sure you want to delete ${user.name}?`}
          sx={{ textAlign: "center" }}
        />
        <CardActions sx={{ display: "flex", justifyContent: "center", gap: 5 }}>
          <Button onClick={handleDelete} disabled={loading} variant="contained">
            Delete
          </Button>
          <Button
            onClick={handleClose}
            disabled={loading}
            variant="outlined"
            color="error"
          >
            Cancel
          </Button>
        </CardActions>
      </Card>
    </Modal>
  );
};

export default DeleteUserModal;
