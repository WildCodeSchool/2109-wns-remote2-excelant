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
import { UserType } from "../../_types/_userTypes";
import GqlRequest from "../../_graphql/GqlRequest";
import UserTableItem from "./UserTableItem";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const UserTable: React.FC<{ reload: number }> = ({ reload }) => {
  const limit = 12;
  const [page, setPage] = useState<number>(1);
  const [users, setUsers] = useState<(UserType & { _id: string })[]>([]);
  const [totalPages, setTotalPages] = useState<number>(0);
  const { data, loading, refetch } = useQuery(
    new GqlRequest("User").getByLimitAndPage(
      "docs {_id, name, email}, totalPages"
    ),
    { variables: { input: { limit, page } } }
  );

  const onPageChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  useEffect(() => {
    refetch();
  }, [reload, page]);

  useEffect(() => {
    if (data?.findUserByLimitAndPage) {
      setUsers(data.findUserByLimitAndPage.docs);
      setTotalPages(data.findUserByLimitAndPage.totalPages);
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
              <StyledTableCell>name</StyledTableCell>
              <StyledTableCell align="right">email</StyledTableCell>
              <StyledTableCell align="right">Actions</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users &&
              users.map((user: UserType & { _id: string }) => (
                <UserTableItem user={user} refetch={refetch} key={user._id} />
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

export default UserTable;
