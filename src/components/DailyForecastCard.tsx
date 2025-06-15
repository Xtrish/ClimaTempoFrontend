import React from 'react';
import { Card, CardContent, Typography, Box, IconButton } from '@mui/material';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import OpacityIcon from '@mui/icons-material/Opacity';
import CloudIcon from '@mui/icons-material/Cloud';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';

interface DailyForecastCardProps {
  dia: string;
  icone: string;
  condicao: string;
  min: number;
  max: number;
  temperaturaAtual: number;
  chuva: string;
  umidade: number;
  onRemover?: () => void;
}

const DailyForecastCard: React.FC<DailyForecastCardProps> = ({
  dia,
  icone,
  condicao,
  min,
  max,
  chuva,
  temperaturaAtual,
  umidade,
  onRemover,
}) => {
  return (
    <Card
      sx={{
        maxWidth: 300,
        mx: 'auto',
        mt: 3,
        borderRadius: 2,
        backgroundColor: '#ffffff',
        boxShadow: '0 4px 10px rgba(0, 0, 0, 0.08)',
        border: '1px solid #e0e0e0',
        position: 'relative',
      }}
    >
      <CardContent sx={{ px: 3, py: 2 }}>
        {onRemover && (
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 1 }}>
            <IconButton
              size="small"
              color="error"
              onClick={onRemover}
            >
              <DeleteOutlineIcon />
            </IconButton>
          </Box>
        )}

        <Box display="flex" justifyContent="center" mb={1}>
          <img src={icone} alt={condicao} width={40} />
        </Box>

        <Typography align="center" variant="subtitle2" fontWeight="bold" textTransform="capitalize">
          {dia}
        </Typography>

        <Typography align="center" variant="body1" sx={{ mt: 1 }}>
          {condicao}
        </Typography>

        <Typography align="center" variant="h6" fontWeight="bold">
          {temperaturaAtual}°C
        </Typography>

        <Box display="flex" justifyContent="center" alignItems="center" gap={1} mt={1}>
          <ArrowDownwardIcon fontSize="small" color="primary" />
          <Typography variant="body2">{min}°</Typography>
          <ArrowUpwardIcon fontSize="small" color="error" />
          <Typography variant="body2">{max}°</Typography>
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

export default DailyForecastCard;