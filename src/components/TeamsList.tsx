import React, { useEffect, useState } from 'react';
import { TextField, Stack, Button, Container } from '@mui/material';
import Grid from '@mui/material/Grid2';

type Team = {
    id: number;
    name: string;
    coach: string;
};

const TeamsList: React.FC = () => {
    const [teams, setTeams] = useState<Team[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [newTeam, setNewTeam] = useState({ name: '', coach: '' });
    const [isEditing, setIsEditing] = useState(false);
    const [editTeamId, setEditTeamId] = useState<number | null>(null);

    useEffect(() => {
        fetchTeams();
    }, []);

    const fetchTeams = () => {
        fetch('http://localhost:8000/api/teams')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Error al obtener los equipos');
                }
                return response.json();
            })
            .then(data => setTeams(data))
            .catch(error => setError(error.message));
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setNewTeam({ ...newTeam, [name]: value });
    };

    const createTeam = () => {
        fetch('http://localhost:8000/api/teams', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newTeam),
        })
            .then(response => response.json())
            .then(data => {
                setTeams([...teams, data]);
                setNewTeam({ name: '', coach: '' });
            })
            .catch(error => setError(error.message));
    };

    const updateTeam = (id: number) => {
        fetch(`http://localhost:8000/api/teams/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newTeam),
        })
            .then(response => response.json())
            .then(data => {
                setTeams(teams.map(team => (team.id === id ? data : team)));
                setIsEditing(false);
                setEditTeamId(null);
                setNewTeam({ name: '', coach: '' });
            })
            .catch(error => setError(error.message));
    };

    const deleteTeam = (id: number) => {
        fetch(`http://localhost:8000/api/teams/${id}`, { method: 'DELETE' })
            .then(() => {
                setTeams(teams.filter(team => team.id !== id));
            })
            .catch(error => setError(error.message));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (isEditing && editTeamId !== null) {
            updateTeam(editTeamId);
        } else {
            createTeam();
        }
    };

    return (
        <Container>
            <h1>Lista de Equipos</h1>
            {error && <p>Error: {error}</p>}

            <form onSubmit={handleSubmit}>
                <Stack spacing={2} direction="row" justifyContent="center" mb={3}>
                    <TextField
                        label="Nombre del equipo"
                        variant="outlined"
                        name="name"
                        value={newTeam.name}
                        onChange={handleChange}
                        required
                    />
                    <TextField
                        label="Nombre del entrenador"
                        variant="outlined"
                        name="coach"
                        value={newTeam.coach}
                        onChange={handleChange}
                        required
                    />
                    <Button variant="contained" type="submit">
                        {isEditing ? 'Actualizar Equipo' : 'Agregar Equipo'}
                    </Button>
                    {isEditing && (
                        <Button variant="outlined" onClick={() => setIsEditing(false)}>
                            Cancelar
                        </Button>
                    )}
                </Stack>
            </form>

            <Grid container spacing={2} justifyContent="center">
                {teams.map(team => (
                    <Grid container justifyContent="center" size={8} key={team.id}>
                        <Stack direction="row" spacing={2} alignItems="center">
                            <span>{team.name} - Entrenador: {team.coach}</span>
                            <Button
                                variant="contained"
                                onClick={() => {
                                    setIsEditing(true);
                                    setEditTeamId(team.id);
                                    setNewTeam({ name: team.name, coach: team.coach });
                                }}
                            >
                                Editar
                            </Button>
                            <Button variant="outlined" onClick={() => deleteTeam(team.id)}>
                                Eliminar
                            </Button>
                        </Stack>
                    </Grid>
                ))}
            </Grid>
        </Container>
    );
};

export default TeamsList;