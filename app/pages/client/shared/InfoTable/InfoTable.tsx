import React, { useState, useEffect, ChangeEvent } from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableFooter from "@mui/material/TableFooter";
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import TablePagination from '@mui/material/TablePagination';
import Checkbox from '@mui/material/Checkbox';
import { EnhancedTableToolbar } from "./EnhancedToolbar";
import { EnhancedTableHead } from "./EnhancedTableHead";

const InfoTable = ({list, headers }) => {
    const [ dataList, setDataList ] = useState(null);
    const [ order, setOrder ] = useState("asc");
    const [ orderBy, setOrderBy ] = useState("name");
    const [ selected, setSelected ] = useState([]);
    const [ page, setPage ] = useState(0);
    const [ rowsPerPage, setRowsPerPage ] = useState(10);

    useEffect(() => {
        setDataList(list);
    }, [list]);

    interface EnhancedTableProps {
        numSelected: number;
        onRequestSort: (event: React.MouseEvent<unknown>, property: any) => void;
        onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void;
        order: any;
        orderBy: string;
        rowCount: number;
    }

    interface EnhancedTableToolbarProps {
        numSelected: number;
        title: string;
    };

    function isSelected (name: string) {
        return  selected.indexOf(name) !== -1
    }

    function handleChangePage (e: unknown, newPage: number) {
        console.log(e);
        setPage(newPage);
    }
    
    function handleChangeRowsPerPage (event: ChangeEvent<HTMLInputElement>) {
        console.log(event);
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    }

    function descendingComparator(a, b, orderBy) {
        if (b[orderBy] < a[orderBy]) {
            return -1;
        }
        if (b[orderBy] > a[orderBy]) {
            return 1;
        }
        return 0;
    };
        
    function getComparator(order, orderBy) {
        return order === 'desc'
            ? (a, b) => descendingComparator(a, b, orderBy)
            : (a, b) => -descendingComparator(a, b, orderBy);
    };

    const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.checked) {
          const newSelecteds = dataList.countries.map((n) => n.name);
          setSelected(newSelecteds);
          return;
        }
        setSelected([]);
      };
    
    const handleRequestSort = (
        event: React.MouseEvent<unknown>,
        property: string
    ) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    function handleClick (event: React.MouseEvent<unknown>, name: string) {
        const selectedIndex = selected.indexOf(name);
        let newSelected: string[] = [];
    
        if (selectedIndex === -1) {
          newSelected = newSelected.concat(selected, name);
        } else if (selectedIndex === 0) {
          newSelected = newSelected.concat(selected.slice(1));
        } else if (selectedIndex === selected.length - 1) {
          newSelected = newSelected.concat(selected.slice(0, -1));
        } else if (selectedIndex > 0) {
          newSelected = newSelected.concat(
            selected.slice(0, selectedIndex),
            selected.slice(selectedIndex + 1),
          );
        }
    
        setSelected(newSelected);
    };

    return (
        <>
            <Box>
                <EnhancedTableToolbar numSelected={selected.length} title="Countries"/>
                    <TableContainer component={Paper}>
                        <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <EnhancedTableHead
                            numSelected={selected.length}
                            order={order}
                            orderBy={orderBy}
                            onSelectAllClick={handleSelectAllClick}
                            onRequestSort={handleRequestSort}
                            rowCount={dataList ? dataList.countries.length : 5}
                            headers={headers}
                        />
                            <TableBody>
                                {dataList && 
                                    dataList.countries.slice().sort(getComparator(order, orderBy))
                                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row,index) => {
                                    const isItemSelected = isSelected(row.name);
                                    const labelId = `enhanced-table-checkbox-${index}`;

                                    return (
                                        <TableRow
                                        hover
                                        key={row.name}
                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                        onClick={(event) => handleClick(event, row.name)}
                                        role="checkbox"
                                        aria-checked={isItemSelected}
                                        tabIndex={-1}
                                        selected={isItemSelected}
                                        >
                                            <TableCell padding="checkbox">
                                            <Checkbox
                                                color="primary"
                                                checked={isItemSelected}
                                                inputProps={{
                                                'aria-labelledby': labelId,
                                                }}
                                            />
                                            </TableCell>
                                            <TableCell align="left" component="th" scope="row">
                                                {row.name}
                                            </TableCell>
                                            <TableCell align="left">{row.native}</TableCell>
                                            <TableCell align="left">{row.emoji}</TableCell>
                                            <TableCell align="left">{row.capital}</TableCell>
                                            <TableCell align="left">{row.continent}</TableCell>
                                            <TableCell align="left">{row.currency}</TableCell>
                                            <TableCell align="left">+ {row.phone}</TableCell>
                                        </TableRow>
                                    )
                                    })}
                            </TableBody>
                            
                        </Table>
                    </TableContainer>

                    <TableFooter>
                        <TableRow>
                            <TablePagination
                            rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
                            colSpan={5}
                            count={dataList ? dataList.countries.length : 10}
                            component="div"
                            rowsPerPage={rowsPerPage}
                            page={page}
                            SelectProps={{
                                inputProps: {
                                'aria-label': 'rows per page',
                                },
                                native: true,
                            }}
                            onPageChange={handleChangePage}
                            onRowsPerPageChange={handleChangeRowsPerPage}
                            />  
                        </TableRow>
                    </TableFooter>
            </Box>
        </>
    )
}

export default InfoTable;