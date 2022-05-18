import { useEffect, useState } from 'react';
import { getServerData } from "./client/util/apiUtil";
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Link from "@mui/material/Link";
import { Chart as ChartJS, 
  ArcElement, 
  Tooltip, 
  Legend, 
  CategoryScale,
  LinearScale,
  BarElement,
  Title } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import { Bar } from 'react-chartjs-2';
import { getSpinner } from './client/shared/util/Spinner';

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, Title);

export default function Home ({ graphicsData, url }){
  const [spinner, setSpinner] = useState(false);

  useEffect(() => {
    console.log(url,"URL!");
  }, [graphicsData]);
  
  // example: https://react-chartjs-2.netlify.app
  
  return (
    <>
      <Container maxWidth="lg">
          <Box>
              <Grid container>

                <Grid item xs={6} md={6}>

                  <Card sx={{margin: "20px", borderColor: "text.secondary"}} variant="outlined">
                    <CardContent>
                      <Typography sx={{ fontSize: 32}} color="text.secondary" gutterBottom>
                        Countries per Continent
                      </Typography>

                      { spinner ? 
                        getSpinner()
                      : <Doughnut
                          data={graphicsData.continents}
                          redraw={true}
                        /> 
                      }

                    </CardContent>
                  </Card>

                </Grid>

                <Grid item xs={6} md={6}>
                    
                  <Card sx={{margin: "20px", borderColor: "text.secondary"}} variant="outlined">
                    <CardContent>
                      <Typography sx={{ fontSize: 32}} color="text.secondary" gutterBottom>
                        Languages by Countries
                      </Typography>


                      { spinner ? 
                        getSpinner()
                      : <Bar data={graphicsData.languages} redraw={true} />
                      }
                    </CardContent>
                  </Card>

                </Grid>
              
              </Grid>
          </Box>
      </Container>
    </>
  )
};

export async function getStaticProps(ctx) {
  
  let graphicsData = await getServerData(`http://localhost:3000/api/home`,"get");

  return { props: { graphicsData } }
}