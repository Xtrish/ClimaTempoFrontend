import React from 'react';
import { Card, CardContent, Typography, Box } from '@mui/material';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import OpacityIcon from '@mui/icons-material/Opacity';
import CloudIcon from '@mui/icons-material/Cloud';


interface Props {
  data: string;
  icone: string;
  condicao: string;
  temperaturaAtual: number;
  temperaturaMin: number;
  temperaturaMax: number;
  umidade: number;
  chuva: string;
}

const MultiDayForecastCard: React.FC<Props> = ({
  data,
  icone,
  condicao,
  temperaturaAtual,
  temperaturaMin,
  temperaturaMax,
  umidade,
  chuva,
}) => {
  return (
    <Card sx={{ width: 250, minHeight: 280 ,
        backgroundColor: '#ffffff',
        boxShadow: '0 4px 10px rgba(0, 0, 0, 0.08)',
        border: '1px solid #e0e0e0',}}>
      <CardContent>
        <Typography variant="subtitle2" align="center">  {data.split('-').reverse().join('/')}</Typography>
        <Box display="flex" justifyContent="center" my={1}>
          <img src={icone} alt={condicao} />
        </Box>
        <Typography align="center">{condicao}</Typography>
        <Typography align="center" fontWeight="bold">
          {(temperaturaAtual ? `${temperaturaAtual}°C` : '')}
        </Typography>

        <Box display="flex" justifyContent="center" alignItems="center" gap={1} mt={1}>
          <ArrowDownwardIcon fontSize="small" color="primary" />
          <Typography variant="body2">{temperaturaMin}°</Typography>
          <ArrowUpwardIcon fontSize="small" color="error" />
          <Typography variant="body2">{temperaturaMax}°</Typography>
        </Box>

        <Box display="flex" justifyContent="center" alignItems="center" mt={1} gap={1}>
          <CloudIcon fontSize="small" sx={{ color: '#64b5f6' }} />
          <Typography variant="body2">Chuva: {chuva}</Typography>
        </Box>

        <Box display="flex" justifyContent="center" alignItems="center" gap={1}>
          <OpacityIcon fontSize="small" sx={{ color: '#81c784' }} />
          <Typography variant="body2">Umidade: {umidade}%</Typography>
        </Box>
      </CardContent>
    </Card>
  );
};

export default MultiDayForecastCard;
