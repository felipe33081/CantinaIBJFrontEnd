import React, { useState } from 'react';
import { Box, TextField, Button } from '@mui/material';
import { v4 as uuidv4 } from 'uuid';

function CustomerForm({ addClient }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    addClient({ id: uuidv4(), name, email, phone });
    setName('');
    setEmail('');
    setPhone('');
  };

  return (
    <Box sx={{ mt: 4 }}>
      <form onSubmit={handleSubmit}>
        <TextField
          fullWidth
          label="Nome"
          value={name}
          onChange={(event) => setName(event.target.value)}
          sx={{ mb: 2 }}
        />
        <TextField
          fullWidth
          type="email"
          label="Email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          sx={{ mb: 2 }}
        />
        <TextField
          fullWidth
          type="tel"
          label="Telefone"
          value={phone}
          onChange={(event) => setPhone(event.target.value)}
          sx={{ mb: 2 }}
        />
        <Button type="submit" variant="contained">Cadastrar</Button>
      </form>
    </Box>
  );
}

export default CustomerForm;