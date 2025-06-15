import React from 'react';
import { Card, CardContent, Typography, Box } from '@mui/material';

interface WeatherCardProps {
  clima: {
    cidade: string;
    condicao: string;
    icone: string;
    temperaturaAtual: number;
  };
}

const WeatherCard: React.FC<WeatherCardProps> = ({ clima }) => {
  if (!clima) return null;

  return (
    <Card sx={{ mt: 4 }}>
      <CardContent>
        <Typography variant="h5" gutterBottom>
          {clima.cidade}
        </Typography>

        <Box display="flex" alignItems="center" gap={2}>
          <img
            src={clima.icone}
            alt={clima.condicao}
            width={64}
            height={64}
          />
          <Typography variant="body1">{clima.condicao}</Typography>
        </Box>

        <Typography variant="body2" mt={2}>
          🌡 Temperatura atual: <strong>{clima.temperaturaAtual}°C</strong>
        </Typography>
      </CardContent>
    </Card>
  );
};

export default WeatherCard;
