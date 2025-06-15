import React from 'react';
import { FavoritoDetalhado } from '../interfaces/FavoritoDetalhado';

interface Props {
  favorito: FavoritoDetalhado;
  onRemover: (id: number) => Promise<void>;
}

const FavoriteWeatherCard = ({ favorito, onRemover }: Props) => {
  return (
    <div>
      <h3>{favorito.cidade}</h3>
      <p>Temperatura: {favorito.temperaturaAtual}°C</p>
      <p>Umidade: {favorito.umidade}%</p>
      <p>Descrição: {favorito.condicao}</p>
      <img src={favorito.icone} alt={favorito.condicao} />
      <button onClick={() => onRemover(favorito.id)}>Remover</button>
    </div>
  );
};

export default FavoriteWeatherCard;
