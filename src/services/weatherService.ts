
import axios from 'axios';
import { PrevisaoHoje } from '../interfaces/PrevisaoHoje';
import { FavoritoDetalhado } from '../interfaces/FavoritoDetalhado';

const API_FAVORITOS = 'https://localhost:44337/api/Favoritos';

export const buscarPrevisaoHoje = async (cidade: string): Promise<PrevisaoHoje> => {
  const response = await fetch(`https://localhost:44337/api/Clima?cidade=${encodeURIComponent(cidade)}`);

  if (!response.ok) throw new Error('Erro ao buscar previsão do dia');
  return response.json();
};


export const listarFavoritos = async (): Promise<FavoritoDetalhado[]> => {
  const response = await axios.get<FavoritoDetalhado[]>('https://localhost:44337/api/Favoritos');
  return response.data;
};

export const adicionarFavorito = async (nomeCidade: string) => {
  const response = await axios.post(API_FAVORITOS, { nome: nomeCidade });
  return response.data;
};

export const removerFavorito = async (id: number) => {
  const response = await axios.delete(`${API_FAVORITOS}/${id}`);
  return response.data;
};

export const buscarPrevisaoPorDias = async (
  cidade: string,
  dias: number
): Promise<PrevisaoHoje[]> => {
  const response = await fetch(
    `https://localhost:44337/api/Clima/previsao?cidade=${encodeURIComponent(cidade)}&dias=${dias}`
  );

  if (!response.ok) throw new Error('Erro ao buscar previsão estendida');
  return response.json();
};
