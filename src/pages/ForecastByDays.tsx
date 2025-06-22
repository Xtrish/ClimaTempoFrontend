import React, { useEffect, useState, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Box, Typography, CircularProgress, Alert, Button } from '@mui/material';
import MultiDayForecastCard from '../components/MultiDayForecastCard';
import { buscarPrevisaoPorDias } from '../services/weatherService';
import { PrevisaoHoje } from '../interfaces/PrevisaoHoje';
import './ForecastByDays.css';

const ForecastByDays: React.FC = () => {
  const { cidade } = useParams<{ cidade: string }>();
  const [diasClima, setDiasClima] = useState<PrevisaoHoje[]>([]);
  const [loading, setLoading] = useState(false);
  const [erro, setErro] = useState<string | null>(null);
  const navigate = useNavigate();
  const DIAS = 5;

  const jaBuscou = useRef(false);

  useEffect(() => {
    if (!cidade || jaBuscou.current) return;

    jaBuscou.current = true;

    const fetchData = async () => {
      setLoading(true);
      try {
        const data = await buscarPrevisaoPorDias(cidade, DIAS);
        setDiasClima(data);
      } catch (e) {
        setErro('Erro ao buscar previsão');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [cidade]);

  const renderLoadingOverlay = () => {
    if (!loading) return null;

    return (
      <div className="loading-overlay">
        <CircularProgress color="inherit" size={60} />
      </div>
    );
  };

  return (
    <>
      {renderLoadingOverlay()}

      <Box className="forecast-page">
        {erro && (
          <Alert severity="error" sx={{ mt: 2 }}>
            {erro}
          </Alert>
        )}

        <Box className="forecast-container">
          <Box className="forecast-header">
            <Typography variant="h4" className="forecast-title">
              Previsão<br />{cidade}
            </Typography>
          </Box>

          <Box className="forecast-grid">
            {diasClima.map((dia, idx) => (
              <MultiDayForecastCard key={idx} {...dia} />
            ))}
          </Box>

          <Box className="back-button-wrapper">
            <Button
              variant="contained"
              color="primary"
              onClick={() => navigate('/')}
              sx={{ px: 4, py: 1.5, fontWeight: 600, fontSize: '1rem' }}
            >
              Voltar ao Início
            </Button>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default ForecastByDays;
