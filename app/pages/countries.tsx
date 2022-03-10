import { useEffect } from "react";
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { getServerData } from './client/util/apiUtil';

export default function Detail ({ listData }){
    useEffect(() => {
        console.log(listData);
    }, [listData]);

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
                                {listData.countries.map((row) => (
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
                        </Table>
                    </TableContainer>
                </Box>
            </Container>
        </>
    );
};

export async function getStaticProps(ctx) {
  
    let listData = await getServerData(`http://localhost:3000/api/countries`,"get");
  
    return { props: { listData } }
}