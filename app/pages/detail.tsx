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

export default function Detail (){
  return (
    <>
        <Container maxWidth="lg">
            <Box sx={{ flexGrow: 1 }}>
                <h1>Hello</h1>
            </Box>
        </Container>
    </>
  )
};
