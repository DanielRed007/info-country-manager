import { useEffect } from "react";
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { getServerData } from './client/util/apiUtil';

export default function Detail ({ listData }){
    useEffect(() => {
        console.log(listData);
    }, [listData]);

    return (
        <>
            <Container maxWidth="lg">
                <Box sx={{ flexGrow: 1 }}>
                    <h1>Countries</h1>
                </Box>
            </Container>
        </>
    );
};

export async function getStaticProps(ctx) {
  
    let listData = await getServerData(`http://localhost:3000/api/countries`,"get");
  
    return { props: { listData } }
}