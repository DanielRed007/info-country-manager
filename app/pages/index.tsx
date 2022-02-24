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
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

export default function Home ({ graphicsData }){

  useEffect(() => {
    console.log(graphicsData);
  }, [graphicsData]);

  const data = {
    labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
    datasets: [
      {
        label: '# of Votes',
        data: [12, 19, 3, 5, 2, 3],
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };
  
  return (
    <>
      <Container maxWidth="lg">
          <Box>
              <Grid container>

                <Grid item xs={6} md={8}>

                  <Card sx={{margin: "20px"}} variant="outlined">
                    <CardContent>
                    <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                      Continents
                    </Typography>
                    <Doughnut
                      data={data}
                      redraw={true}
                    />
                    </CardContent>
                    <CardActions>
                      {/* <Button size="small">Learn More</Button> */}
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
  
  const graphicsData = await getServerData(`http://localhost:3000/api/home`,"get");

  return { props: { graphicsData } }
}