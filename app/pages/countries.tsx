import { useEffect, useState, ChangeEvent } from "react";
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import InfoTable from "../pages/client/shared/InfoTable/InfoTable";
import { useRouter } from 'next/router';
import { getServerData } from './client/util/apiUtil';

export default function Countries ({ listData }){

  const router = useRouter();
  const [ dataList, setDataList ] = useState(null);

  useEffect(() => {
      setDataList(listData);
  }, [listData,router]);

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
                  <InfoTable 
                    list={dataList} 
                    headers={headCells} 
                  />
              </Box>

          </Container>
      </>
  );
};

export async function getStaticProps(ctx) {
  
    let listData = await getServerData(`http://localhost:3000/api/countries`,"get");

    return { props: { listData } }
}