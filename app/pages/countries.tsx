import { useEffect, useState } from "react";
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableFooter from "@mui/material/TableFooter";
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import Paper from '@mui/material/Paper';
import TablePagination from '@mui/material/TablePagination';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import DeleteIcon from '@mui/icons-material/Delete';
import FilterListIcon from '@mui/icons-material/FilterList';
import { visuallyHidden } from '@mui/utils';
import { useRouter } from 'next/router'
import { alpha } from '@mui/material/styles';
import { getServerData } from './client/util/apiUtil';

export default function Countries ({ listData }){

  const router = useRouter();
  const [ dataList, setDataList ] = useState(null);

  useEffect(() => {
      console.log(router, "my Router");
      setDataList(listData);
  }, [listData,router]);

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

  function stableSort(array, comparator) {
      const stabilizedThis = [].map((el, index) => [el, index]);
      stabilizedThis.sort((a, b) => {
        const order = comparator(a[0], b[0]);
        if (order !== 0) {
          return order;
        }
        return a[1] - b[1];
      });
      return stabilizedThis.map((el) => el[0]);
  }

  function handleChangePage (e) {
    console.log(e);
  }

  function handleChangeRowsPerPage (e) {
    console.log(e);
  }

  function TablePaginationActions(e) {
    console.log(e);
  }

  const headCells = [
      {
        id: 'name',
        numeric: false,
        disablePadding: true,
        label: 'Name',
      },
      {
        id: 'native',
        numeric: true,
        disablePadding: false,
        label: 'Native',
      },
      {
        id: 'flag',
        numeric: true,
        disablePadding: false,
        label: 'Flag',
      },
      {
        id: 'capital',
        numeric: true,
        disablePadding: false,
        label: 'Capital',
      },
      {
        id: 'continent',
        numeric: true,
        disablePadding: false,
        label: 'Continent',
      },
      {
          id: 'currency',
          numeric: true,
          disablePadding: false,
          label: 'Currency',
      },
      {
          id: 'phone',
          numeric: true,
          disablePadding: false,
          label: 'Phone',
      }
  ];

  return (
      <>
          <Container maxWidth="lg">
              <Box sx={{ flexGrow: 1, marginTop: "3rem" }}>
                  <TableContainer component={Paper}>
                      <Table sx={{ minWidth: 650 }} aria-label="simple table">
                          <TableHead>
                              <TableRow>
                                  <TableCell align="left">Name</TableCell>
                                  <TableCell align="left">Native</TableCell>
                                  <TableCell align="left">Flag</TableCell>
                                  <TableCell align="left">Capital</TableCell>
                                  <TableCell align="left">Continent</TableCell>
                                  <TableCell align="left">Currency</TableCell>
                                  <TableCell align="left">Phone</TableCell>
                              </TableRow>
                          </TableHead>
                          <TableBody>
                              {dataList && dataList.countries.map((row) => (
                                  <TableRow
                                  key={row.name}
                                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                  >
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
                              ))}
                          </TableBody>
                          <TableFooter>
                            <TableRow>
                            <TablePagination
                              rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
                              colSpan={5}
                              count={20}
                              rowsPerPage={20}
                              page={1}
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
                      </Table>
                  </TableContainer>
              </Box>
          </Container>
      </>
  );
};

export async function getStaticProps(ctx) {
  
    let listData = await getServerData(`http://localhost:3000/api/countries`,"get");

    // console.log(listData, "DATA!!!!");

    return { props: { listData } }
}