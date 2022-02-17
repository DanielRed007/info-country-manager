import type { NextPage } from 'next'
import Head from 'next/head';
import Image from 'next/image';
import styles from '../styles/Home.module.css';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import { ReactElement } from 'react';
import Layout from "./client/components/Layout";

export default function Home (){
  return (
    <>
        <Container maxWidth="md">
            <Box sx={{ flexGrow: 1 }}>
                <Grid container spacing={2}>
                <Grid xs={6} md={8}>
                    <h1>xs=6 md=8</h1>
                </Grid>
                <Grid xs={6} md={4}>
                    <h1>xs=6 md=4</h1>
                </Grid>
                <Grid xs={6} md={4}>
                    <h1>xs=6 md=4</h1>
                </Grid>
                <Grid xs={6} md={8}>
                    <h1>xs=6 md=8</h1>
                </Grid>
                </Grid>
            </Box>
        </Container>
    </>
  )
};

Home.getLayout = function getLayout(page: ReactElement){
  return (
    <Layout>
      {page}
    </Layout>
  )
};