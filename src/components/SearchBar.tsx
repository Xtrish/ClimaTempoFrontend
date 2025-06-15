import React, { useState } from 'react';
import { TextField, Button, Box } from '@mui/material';

interface SearchBarProps {
  onSearch: (cidade: string) => void;
}

const SearchBar = ({ onSearch }: SearchBarProps) => {
  const [cidade, setCidade] = useState('');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (cidade.trim() !== '') {
      onSearch(cidade.trim());
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} display="flex" gap={2} mb={4}>
      <TextField
        label="Digite a cidade"
        variant="outlined"
        value={cidade}
        onChange={(e) => setCidade(e.target.value)}
        fullWidth
      />
      <Button type="submit" variant="contained">
        Buscar
      </Button>
    </Box>
  );
};

export default SearchBar;
