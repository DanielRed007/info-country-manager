import { useEffect } from 'react';
import { getServerData } from "./client/util/apiUtil";
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

export default function Home ({ data }){

  useEffect(() => {
    console.log(data);
  }, [data]);

  return (
    <>
      <Container maxWidth="lg">
          <Box>
              <Grid container>

                <Grid item xs={6} md={8}>

                  <Card sx={{margin: "20px"}} variant="outlined">
                    <CardContent>
                      <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                        Test
                      </Typography>
                      <Typography variant="h5" component="div">
                        be
                      </Typography>
                      <Typography sx={{ mb: 1.5 }} color="text.secondary">
                        adjective
                      </Typography>
                      <Typography variant="body2">
                        well meaning and kindly.
                        <br />
                        {'"a benevolent smile"'}
                      </Typography>
                    </CardContent>
                    <CardActions>
                      <Button size="small">Learn More</Button>
                    </CardActions>
                  </Card>

                </Grid>

                <Grid item xs={6} md={4}>
                    
                  <Card sx={{margin: "20px"}} variant="outlined">
                    <CardContent>
                      <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                        Word of the Day
                      </Typography>
                      <Typography variant="h5" component="div">
                        be
                      </Typography>
                      <Typography sx={{ mb: 1.5 }} color="text.secondary">
                        adjective
                      </Typography>
                      <Typography variant="body2">
                        well meaning and kindly.
                        <br />
                        {'"a benevolent smile"'}
                      </Typography>
                    </CardContent>
                    <CardActions>
                      <Button size="small">Learn More</Button>
                    </CardActions>
                  </Card>

                </Grid>
              
              </Grid>
          </Box>
      </Container>
    </>
  )
};

export async function getStaticProps(ctx) {
  
  const data = await getServerData(`http://localhost:3000/api/home`,"get");

  return { props: { data } }
}