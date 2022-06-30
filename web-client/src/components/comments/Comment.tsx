import React, {useState} from "react";
import moment from "moment";
import { useMutation } from "@apollo/client";
import { Avatar, Grid, Paper, IconButton, Box, TextField, Button } from "@mui/material";
import BorderColorIcon from '@mui/icons-material/BorderColor';
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { useSnackbar } from "notistack";
import GqlRequest from "../../_graphql/GqlRequest";
import { CommentType } from "../../_types/_commentTypes";
import UserAvatar from "../../images/person-circle.png";

const Comment: React.FC<{
    comment: CommentType;
    refetch: () => void;
  }> = ({ comment, refetch }) => {
  const { enqueueSnackbar } = useSnackbar();


    /* TODO USE CONTEXT */
    const fakeUser = {
        _id: "62bd90721252e074022bb349",
        name: "John Doe",
    }

    const [currentComment, setCurrentComment] = useState({
        content: comment.content,
        date: moment(comment.date)
    });

    const [modify, setModify] = useState<boolean>(false);

    const [updateComment] = useMutation(new GqlRequest("Comment").update("content, date"));
    const [deleteComment] = useMutation(new GqlRequest("Comment").delete("content"));

    const handleSubmit = () => {
        try {
            updateComment({
                variables: { 
                    id: comment._id,
                    input: {
                        ...currentComment,
                        date: moment()
                    }
                },
            });
        } catch (err) {
            // eslint-disable-next-line
            console.log("Error", err);
        } finally {
            refetch();
            setModify(false);
            enqueueSnackbar("Your comment has been modified successfully!", {
                variant: "success",
                anchorOrigin: {
                  vertical: 'top',
                  horizontal: 'right'
                }
            });
        }
    };

    const handleDelete = () => {
        try {
            deleteComment({
                variables: { 
                    input: {_id: comment._id}
                },
            });
        } catch (err) {
            // eslint-disable-next-line
            console.log("Error", err);
        } finally {
            refetch();
            enqueueSnackbar(`Your comment has been deleted successfully!`, {
                variant: "error",
                anchorOrigin: {
                  vertical: 'top',
                  horizontal: 'right'
                }
            });
        };
    };
  
    return (
        <Paper style={{ padding: "10px 10px", margin: "2px 0px" }}>
            <Box sx={{ display: "flex", justifyContent: "space-betwween"}} >
                <Grid container>
                    <Grid item>
                        <Avatar src={UserAvatar} key={comment._id}/>
                    </Grid>
                    <Grid justifyContent="left" item xs >
                        <h4 style={{ margin: 0, textAlign: "left" }}>
                            {comment.author.name}
                        </h4>
                        <p style={{ textAlign: "left", color: "gray" }}>
                            {moment(comment.date).format("DD/MM/YYYY HH:mm")}
                        </p>
                        {!modify ?
                            <p style={{ textAlign: "left" }}>
                                {comment.content}
                            </p>
                            :
                            <>
                                <TextField
                                    type="text"
                                    variant="outlined"
                                    sx={{ mt: 1 }}
                                    value={currentComment.content}
                                    onChange={(event) => {
                                        setCurrentComment({
                                            ...currentComment,
                                            content: event.target.value,
                                        });
                                    }}
                                />
                                <Box sx={{ display: "flex", justifyContent: "flex-end"}}>
                                    <Button
                                        variant="contained"
                                        onClick={handleSubmit}
                                        sx={{ mt: .5, mb: 5, flexGrow: .3, mr: 4 }}
                                    >
                                        Modify
                                    </Button>
                                    <Button
                                        variant="outlined"
                                        onClick={() => setModify(false)}
                                        sx={{ mt: .5, mb: 5 }}
                                        color="error"
                                    >
                                        Cancel
                                    </Button>
                                </Box>
                            </>
                        }
                    </Grid>
                </Grid>
                {/* TODO USE CONTEXT */}
                {comment.author.id === fakeUser._id /* || user.isAdmin */  &&
                    <Grid justifyContent="right" item xs >
                        <IconButton color="primary" onClick={() => setModify(true)}>
                            <BorderColorIcon />
                        </IconButton>
                        <IconButton color="error" onClick={() => handleDelete()}>
                            <DeleteForeverIcon />
                        </IconButton>
                    </Grid>
                }             
            </Box>
        </Paper>
    );
  };
  
  export default Comment;
  