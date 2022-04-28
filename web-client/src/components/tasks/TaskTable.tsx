import React, { useState, useEffect } from "react";
import { styled } from "@mui/material/styles";
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Pagination,
} from "@mui/material";
import { tableCellClasses } from "@mui/material/TableCell";
import { useQuery } from "@apollo/client";
import { TaskType } from "../../_types/_taskTypes";
import GqlRequest from "../../_graphql/GqlRequest";
import TaskTableItem from "./TaskTableItem";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const TaskTable: React.FC<{ reload: number }> = ({ reload }) => {
  const limit = 12;
  const [page, setPage] = useState<number>(1);
  const [tasks, setTasks] = useState<TaskType[]>([]);
  const [totalPages, setTotalPages] = useState<number>(0);
  const { data, loading, refetch } = useQuery(
    new GqlRequest("Task").get(
      "docs { _id, name, status, project { _id, name }, assigne, dueDate }, totalPages"
    ),
      { variables: { input: { limit, page } } }
  );

  const onPageChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  useEffect(() => {
    if (reload > 0) {
      refetch();
    }
  }, [reload, page]);

  useEffect(() => {
    if (data?.findTaskByLimitAndPage) {
      setTasks(data.findTaskByLimitAndPage.docs);
      setTotalPages(data.findTaskByLimitAndPage.totalPages);
    }
  }, [data]);

  return loading ? (
    <Box>Loading ... </Box>
  ) : (
    <>
      <TableContainer component={Paper} sx={{ width: "100%" }}>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Subject</StyledTableCell>
              <StyledTableCell align="right">Project</StyledTableCell>
              <StyledTableCell align="right">Status</StyledTableCell>
              <StyledTableCell align="right">Assignee</StyledTableCell>
              <StyledTableCell align="right">Due date</StyledTableCell>
              <StyledTableCell align="right">Actions</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {tasks &&
            tasks.map((task: TaskType) => (
                <TaskTableItem
                    task={task}
                    refetch={refetch}
                    key={task._id}
                />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Box sx={{ width: "100%", display: "flex", justifyContent: "center" }}>
        {totalPages > 1 && (
            <Pagination count={totalPages} page={page} onChange={onPageChange} />
        )}
      </Box>
    </>
  );
};

export default TaskTable;
