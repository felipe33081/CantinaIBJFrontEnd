import React, { useState } from 'react';
import { Box, TextField, Button } from '@mui/material';

function OrderForm() {
  const [name, setName] = useState('');
  const [item, setItem] = useState('');
  const [quantity, setQuantity] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    alert(`Pedido recebido: ${name} pediu ${quantity} ${item}(s)`);
    setName('');
    setItem('');
    setQuantity('');
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
          label="Item"
          value={item}
          onChange={(event) => setItem(event.target.value)}
          sx={{ mb: 2 }}
        />
        <TextField
          fullWidth
          type="number"
          label="Quantidade"
          value={quantity}
          onChange={(event) => setQuantity(event.target.value)}
          sx={{ mb: 2 }}
        />
        <Button type="submit" variant="contained">Fazer pedido</Button>
      </form>
    </Box>
  );
}

export default OrderForm;