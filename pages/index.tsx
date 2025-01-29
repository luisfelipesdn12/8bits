import { Button, Layout, Result, Typography } from 'antd';
import Head from 'next/head';
import styles from '../styles/Home.module.css';

const { Header, Content, Footer } = Layout;

export default function Home() {
    return (
        <Layout>
        </Layout>
    );
}

export const getServerSideProps = async (context) => {
    return {
        redirect: {
            destination: 'https://luisf.dev',
            permanent: false,
        },
    };
};
