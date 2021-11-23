import React from 'react';
import { ReactJSXElement } from "@emotion/react/types/jsx-namespace";
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

const taskList = [
    {
        id : 1,
        subject: 'Augmenter les écosystèmes en one-shot ',
        assignee: 'Larry Golade',
        status: 'In Progress',
        project: 'Excellant',
        due_date: '05/11/2021',
    },
    {
        id: 2,
        subject: 'Structurer un zoning scratching continu',
        assignee: 'Jerry Golay',
        status: 'To Do',
        project: 'Sagittalle',
        due_date: '05/09/2021',
    },
    {
        id: 3,
        subject: 'Structurer les use cases court-termiste',
        assignee: 'Jerry Khan',
        status: 'Done',
        project: 'Sagittalle',
        due_date: '05/06/2022',
    },
]
const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
        border: 0,
    },
}));

function TaskTable(): ReactJSXElement {
    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <StyledTableCell>Subject</StyledTableCell>
                        <StyledTableCell align="right">Project</StyledTableCell>
                        <StyledTableCell align="right">Status</StyledTableCell>
                        <StyledTableCell align="right">Assignee</StyledTableCell>
                        <StyledTableCell align="right">Due date</StyledTableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {taskList &&
                        taskList.map(({ id, subject, project, status, assignee, due_date }) => (
                        <StyledTableRow
                            key={id}
                        >
                            <TableCell component="th" scope="row">
                                {subject}
                            </TableCell>
                            <TableCell align="right">{project}</TableCell>
                            <TableCell align="right">{status}</TableCell>
                            <TableCell align="right">{assignee}</TableCell>
                            <TableCell align="right">{due_date}</TableCell>
                        </StyledTableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    )
}

export default TaskTable;
