import React from 'react';
import {
  List,
  ListItem,
  ListItemText,
  IconButton,
  Typography,
  Divider,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

import { FavoritoDetalhado } from '../interfaces/FavoritoDetalhado';

interface FavoriteListProps {
  favoritos: FavoritoDetalhado[];
  onRemover: (id: number) => void;
  onBuscar: (cidade: string) => void;
}

const FavoriteList = ({ favoritos, onBuscar, onRemover }: FavoriteListProps) => {
  if (!favoritos || favoritos.length === 0) return null;

  return (
    <>
      <Typography variant="h6" mt={4}>
        Cidades Favoritas
      </Typography>
      <Divider sx={{ my: 1 }} />
      <List>
        {favoritos.map((fav: FavoritoDetalhado) => (
          <ListItem
            key={fav.id}
            secondaryAction={
              <IconButton edge="end" aria-label="remover" onClick={() => onRemover(fav.id)}>
                <DeleteIcon />
              </IconButton>
            }
          >
            <button onClick={() => onBuscar(fav.cidade)}>{fav.cidade}</button>
            <ListItemText primary={fav.cidade} />
          </ListItem>
        ))}
      </List>
    </>
  );
};

export default FavoriteList;
