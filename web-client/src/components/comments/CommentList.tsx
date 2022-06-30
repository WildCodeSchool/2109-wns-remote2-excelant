import React, { useState, useEffect } from "react";
import { Grid, Button, Paper, Avatar } from "@mui/material";
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { useMutation, useQuery } from "@apollo/client";
import moment from "moment";
import GqlRequest from "../../_graphql/GqlRequest";
import { TaskType } from "../../_types/_taskTypes";
import { CommentType } from "../../_types/_commentTypes";
import Comment from "./Comment";
import UserAvatar from "../../images/person-circle.png";


const CommentsList: React.FC<{
    task: TaskType;
  }> = ({ task }) => {

    /* TODO USE CONTEXT */
    const fakeUser = {
        _id: "62bd90721252e074022bb349",
        name: "John Doe",
    }

    const [comments, setComments] = useState<CommentType[]>([]);

    const { data, loading, refetch } = useQuery(
      new GqlRequest("Comment", "Task").getAllBy(
        "_id, content, date, author {_id, name}"
      ),
      { variables: { id:  task._id }}
    );

    useEffect(() => {
      if (data) {
        setComments(data.findAllCommentsByTask);
      };
    }, [data]);
    
    const [commentInput, setCommentInput] = useState("");

    const [addComment] = useMutation(new GqlRequest("Comment").create("_id, author {_id}, date, content"));


    const handleSubmit = () => {
      try {
        addComment({
          variables: { 
            input: {
              task: {_id : task._id},
              content: commentInput,
              author: {
                _id: fakeUser._id, /* TODO USE CONTEXT */
              },
              date: moment(),
          } 
          },
        });
      } catch (err) {
        // eslint-disable-next-line
        console.log("Error", err);
      } finally {
        refetch();
        setCommentInput("");
      }
    };

    return loading ? (
      <Box>Loading ... </Box>
    ) : (
      <>
        <Grid item xs={6} >
          <h2 className="modal__task_second-title">Comments</h2>
          { comments.length ?
              comments.map((comment) => (
                  <Comment comment={comment} key={comment._id} refetch={refetch}/>
              ))
          :
            <p style={{ textAlign: "left", color: "gray" }} >No comments yet</p>
          }
          <Paper style={{ padding: "10px 10px", margin: "40px 0px" }}>
            <Grid container wrap="nowrap" spacing={2} >
                <Grid item>
                    <Avatar alt={fakeUser.name} src={UserAvatar}/> {/* TODO USE CONTEXT */}
                </Grid>
                <Grid item sx={{ display: "flex", flexDirection: "column", flexGrow: 1 }}>
                    <h4 style={{ margin: 0, textAlign: "left" }}>{fakeUser.name}</h4> {/* TODO USE CONTEXT */}
                    <TextField
                      type="text"
                      variant="outlined"
                      sx={{ mt: 1 }}
                      value={commentInput}
                      onChange={(event) => {
                        setCommentInput(event.target.value);
                      }}
                    />
                    <Box sx={{ display: "flex", justifyContent: "flex-end"}}>
                      <Button
                        variant="contained"
                        onClick={handleSubmit}
                        sx={{ mt: .5, mb: 5, flexGrow: .3, mr: 4 }}
                      >
                        Add comment
                      </Button>
                      <Button
                        variant="outlined"
                        onClick={() => setCommentInput("")}
                        sx={{ mt: .5, mb: 5 }}
                        color="error"
                      >
                        Cancel
                      </Button>
                    </Box>
                </Grid>
            </Grid>
          </Paper>
        </Grid>
      </>
    );
  };
  
  export default CommentsList;
  