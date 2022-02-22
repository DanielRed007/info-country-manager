import '../styles/globals.css';
import type { AppProps } from 'next/app';
import Layout from "./client/components/Layout";
import { InfoContentManagerProvider } from "./client/context/InfoContentManagerProvider";


export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <InfoContentManagerProvider>
      <Layout>
        <Component />
      </Layout>
    </InfoContentManagerProvider>
  );
}