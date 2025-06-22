import React, { useState, useEffect } from 'react';
import {
  Typography,
  Box,
  CssBaseline,
  Paper,
  Button,
  CircularProgress,
  Snackbar,
  Alert,
} from '@mui/material';

import SearchBar from '../components/SearchBar';
import DailyForecastCard from '../components/DailyForecastCard';

import {
  listarFavoritos,
  adicionarFavorito,
  removerFavorito,
  buscarPrevisaoHoje,
} from '../services/weatherService';

import { FavoritoDetalhado } from '../interfaces/FavoritoDetalhado';
import './Home.css';

function App() {
  const [dadosClima, setDadosClima] = useState<any>(null);
  const [favoritos, setFavoritos] = useState<FavoritoDetalhado[]>([]);
  const [loading, setLoading] = useState(false);
  const [erro, setErro] = useState<string | null>(null);
  const [notificacao, setNotificacao] = useState<string | null>(null);

  const [mostrarFavoritos, setMostrarFavoritos] = useState(() => {
    const favoritosLocal = localStorage.getItem('favoritos');
    return !!favoritosLocal && JSON.parse(favoritosLocal).length > 0;
  });



  useEffect(() => {
     setLoading(true);
    carregarFavoritos();
  }, []);

  useEffect(() => {
    localStorage.setItem('favoritos', JSON.stringify(favoritos));
  }, [favoritos]);


  const carregarFavoritos = async () => {
    try {
      const favoritosLocal = localStorage.getItem('favoritos');
      if (favoritosLocal) {
        setFavoritos(JSON.parse(favoritosLocal));

      }

      const lista = await listarFavoritos();
      const favoritosDetalhados = lista.map((fav: any): FavoritoDetalhado => ({
        id: fav.id,
        cidade: fav.nome,
        temperaturaAtual: fav.temperaturaCelsius,
        temperaturaMin: fav.temperaturaMin,
        temperaturaMax: fav.temperaturaMax,
        umidade: fav.umidade,
        condicao: fav.descricao,
        icone: fav.icone,
        chuva: fav.chuva,
      }));

      setFavoritos(favoritosDetalhados);
      localStorage.setItem('favoritos', JSON.stringify(favoritosDetalhados));
    } catch (err) {
      console.error('Erro ao buscar favoritos:', err);
      setErro('Erro ao carregar favoritos');
    }
     setLoading(false);
  };


  const buscarClima = async (cidade: string) => {
    try {
      setLoading(true);
      setErro(null);

      const dados = await buscarPrevisaoHoje(cidade);
      setDadosClima(dados);
    } catch (err) {
      console.error('Erro no front:', err);
      setErro('Erro ao buscar previsão do dia.');
      setDadosClima(null);
    } finally {
      setLoading(false);
    }
  };

  const handleAdicionarFavorito = async () => {
    try {
      if (!dadosClima) return;
      await adicionarFavorito(dadosClima.cidade);
      setNotificacao('Cidade adicionada aos favoritos!');

      await carregarFavoritos();
    } catch {
      setErro('Erro ao adicionar aos favoritos.');
    }
  };


  const handleRemoverFavorito = async (id: number) => {
    try {
      await removerFavorito(id);
      setNotificacao('Cidade removida dos favoritos.');

      await carregarFavoritos();
    } catch {
      setErro('Erro ao remover favorito.');
    }
  };

  const renderLoadingOverlay = () => {
  if (!loading) return null;

  return (
    <div className="loading-overlay">
      <CircularProgress color="inherit" />
    </div>
  );
};



  return (
    <>
      <CssBaseline />

      <Box
        sx={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          py: 4,
          bgcolor: '#f0f2f5',
          px: 2,
        }}
      >
        <Paper elevation={3} sx={{ p: 4, width: '100%', maxWidth: 1200 }}>
          <Box className="main-title-wrapper">
            <Typography variant="h4" className="main-title">
              Previsão do Tempo
            </Typography>
          </Box>

          <SearchBar onSearch={buscarClima} />
        {erro && (
            <Alert severity="error" sx={{ mt: 2 }}>
              {erro}
            </Alert>
          )}

          {dadosClima && (
            <>
              <DailyForecastCard
                cidade={dadosClima.cidade}
                dia="Hoje"
                icone={dadosClima.icone}
                condicao={dadosClima.condicao}
                min={dadosClima.temperaturaMin}
                max={dadosClima.temperaturaMax}
                chuva={dadosClima.chuva}
                temperaturaAtual={dadosClima.temperaturaAtual}
                umidade={dadosClima.umidade}
              />

              <Button
                onClick={handleAdicionarFavorito}
                variant="outlined"
                sx={{ mt: 2 }}
                fullWidth
              >
                Adicionar aos Favoritos
              </Button>
              <Button
                variant="outlined"
                fullWidth
                sx={{ mt: 1 }}
                onClick={() => setMostrarFavoritos(!mostrarFavoritos)}
              >
                {mostrarFavoritos ? 'Ocultar Favoritos' : 'Mostrar Favoritos'}
              </Button>
            </>
          )}

          {mostrarFavoritos && (
            <>
              <Box
                sx={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  gap: 2,
                  justifyContent: 'center',
                  mt: 2,
                }}
              >
                {favoritos.map((f) => (
                  <Box key={f.id} sx={{ flex: '1 1 250px', maxWidth: 300 }}>
                    <DailyForecastCard
                      cidade={f.cidade}
                      dia={f.cidade}
                      icone={f.icone}
                      condicao={f.condicao}
                      temperaturaAtual={f.temperaturaAtual}
                      min={f.temperaturaMin}
                      max={f.temperaturaMax}
                      umidade={f.umidade}
                      chuva={f.chuva}
                      onRemover={() => handleRemoverFavorito(f.id)}
                    />
                  </Box>
                ))}
              </Box>

              <Button
                variant="outlined"
                fullWidth
                sx={{ mt: 2 }}
                onClick={carregarFavoritos}
              >
                Atualizar Favoritos
              </Button>
            </>
          )}
        </Paper>
      </Box>
          {renderLoadingOverlay()}
      <Snackbar
        open={!!notificacao}
        autoHideDuration={3000}
        onClose={() => setNotificacao(null)}
      >
        <Alert severity="success">{notificacao}</Alert>
      </Snackbar>
    </>
  );
}

export default App;
