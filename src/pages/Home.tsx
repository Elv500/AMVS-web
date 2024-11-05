import Container from '@mui/material/Container'
import React from 'react';
import TeamsList from '../components/TeamsList';

function Home() {
    return (
        <Container>
            <h1>Hola Home.</h1>
            <TeamsList/>
        </Container>
    )
}

export default Home