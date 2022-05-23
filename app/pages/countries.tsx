import { useEffect, useState, ChangeEvent } from "react";
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
  const [ order, setOrder ] = useState("asc");
  const [ orderBy, setOrderBy ] = useState("name");
  const [ selected, setSelected ] = useState([]);
  const [ page, setPage ] = useState(0);
  const [ rowsPerPage, setRowsPerPage ] = useState(10);

  useEffect(() => {
      console.log(router, "my Router");
      setDataList(listData);
  }, [listData,router]);
  interface EnhancedTableProps {
    numSelected: number;
    onRequestSort: (event: React.MouseEvent<unknown>, property: any) => void;
    onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void;
    order: any;
    orderBy: string;
    rowCount: number;
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

  function handleChangePage (e: unknown, newPage: number) {
    console.log(e);
    setPage(newPage);
  }

  function handleChangeRowsPerPage (event: ChangeEvent<HTMLInputElement>) {
    console.log(event);
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  }

  function TablePaginationActions(e) {
    console.log(e);
  }

  function isSelected (name: string) {
    return  selected.indexOf(name) !== -1
  }

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

  function EnhancedTableHead(props: EnhancedTableProps) {
    const { onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } =
      props;
    const createSortHandler =
      (property: any) => (event: React.MouseEvent<unknown>) => {
        onRequestSort(event, property);
      };
  
    return (
      <TableHead>
        <TableRow>
          <TableCell padding="checkbox">
            <Checkbox
              color="primary"
              indeterminate={numSelected > 0 && numSelected < rowCount}
              checked={rowCount > 0 && numSelected === rowCount}
              onChange={onSelectAllClick}
              inputProps={{
                'aria-label': 'select all desserts',
              }}
            />
          </TableCell>
          {headCells.map((headCell) => (
            <TableCell
              key={headCell.id}
              align={'left'}
              padding={headCell.disablePadding ? 'none' : 'normal'}
              sortDirection={orderBy === headCell.id ? order : false}
            >
              <TableSortLabel
                active={orderBy === headCell.id}
                direction={orderBy === headCell.id ? order : 'asc'}
                onClick={createSortHandler(headCell.id)}
              >
                {headCell.label}
                {orderBy === headCell.id ? (
                  <Box component="span" sx={visuallyHidden}>
                    {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                  </Box>
                ) : null}
              </TableSortLabel>
            </TableCell>
          ))}
        </TableRow>
      </TableHead>
    );
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

  interface EnhancedTableToolbarProps {
    numSelected: number;
    title: string;
  };

  const EnhancedTableToolbar = (props: EnhancedTableToolbarProps) => {
    const { numSelected , title } = props;
  
    return (
      <Toolbar
        sx={{
          pl: { sm: 2 },
          pr: { xs: 1, sm: 1 },
          ...(numSelected > 0 && {
            bgcolor: (theme) =>
              alpha(theme.palette.primary.main, theme.palette.action.activatedOpacity),
          }),
        }}
      >
        {numSelected > 0 ? (
          <Typography
            sx={{ flex: '1 1 100%' }}
            color="inherit"
            variant="subtitle1"
            component="div"
          >
            {numSelected} selected
          </Typography>
        ) : (
          <Typography
            sx={{ flex: '1 1 100%' }}
            variant="h6"
            id="tableTitle"
            component="div"
          >
            { title }
          </Typography>
        )}
        {numSelected > 0 ? (
          <Tooltip title="Delete">
            <IconButton>
              <DeleteIcon />
            </IconButton>
          </Tooltip>
        ) : (
          <Tooltip title="Filter list">
            <IconButton>
              <FilterListIcon />
            </IconButton>
          </Tooltip>
        )}
      </Toolbar>
    );
  };

  return (
      <>
          <Container maxWidth="lg">
              <Box sx={{ flexGrow: 1, marginTop: "3rem" }}>
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
                        count={dataList && dataList.countries.length}
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
          </Container>
      </>
  );
};

export async function getStaticProps(ctx) {
  
    let listData = await getServerData(`http://localhost:3000/api/countries`,"get");

    // console.log(listData, "DATA!!!!");

    return { props: { listData } }
}