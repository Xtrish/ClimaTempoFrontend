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

import SearchBar from './components/SearchBar';
import DailyForecastCard from './components/DailyForecastCard';

import {
  listarFavoritos,
  adicionarFavorito,
  removerFavorito,
  buscarPrevisaoHoje,
} from './services/weatherService';

import { FavoritoDetalhado } from './interfaces/FavoritoDetalhado';

function App() {
  const [dadosClima, setDadosClima] = useState<any>(null);
  const [favoritos, setFavoritos] = useState<FavoritoDetalhado[]>([]);
  const [loading, setLoading] = useState(false);
  const [erro, setErro] = useState<string | null>(null);
  const [notificacao, setNotificacao] = useState<string | null>(null);
  const [mostrarFavoritos, setMostrarFavoritos] = useState(false);

  useEffect(() => {
    carregarFavoritos();
  }, []);

  const carregarFavoritos = async () => {
    try {
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
    } catch (err) {
      console.error('Erro ao buscar favoritos:', err);
      setErro('Erro ao carregar favoritos');
    }
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
      carregarFavoritos();
    } catch {
      setErro('Erro ao adicionar aos favoritos.');
    }
  };

  const handleRemoverFavorito = async (id: number) => {
    try {
      await removerFavorito(id);
      setNotificacao('Cidade removida dos favoritos.');
      carregarFavoritos();
    } catch {
      setErro('Erro ao remover favorito.');
    }
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
        <Paper elevation={3} sx={{ p: 4, width: '100%', maxWidth: 500 }}>
          <Typography variant="h4" align="center" gutterBottom>
            Previsão do Tempo
          </Typography>

          <SearchBar onSearch={buscarClima} />

          {loading && <CircularProgress sx={{ my: 2 }} />}

          {erro && (
            <Alert severity="error" sx={{ mt: 2 }}>
              {erro}
            </Alert>
          )}

          {dadosClima && (
            <>
              <DailyForecastCard
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
              <Box sx={{ mt: 2, display: 'flex', justifyContent: 'center' }}>
                <Button
                  variant="outlined"
                  fullWidth
                  onClick={() => setMostrarFavoritos(false)}
                >
                  Ocultar Favoritos
                </Button>
              </Box>

              {favoritos.map((f) => (
                <DailyForecastCard
                  key={f.id}
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
              ))}

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