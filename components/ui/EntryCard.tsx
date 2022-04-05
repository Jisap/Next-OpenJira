import { Card, CardActionArea, CardActions, CardContent, Typography } from '@mui/material'
import { useRouter } from 'next/router';
import React, { DragEvent, FC, useContext } from 'react'
import { UIContext } from '../../context/ui';
import { Entry } from '../../interfaces/entry';
import { dateFunctions } from '../../utils';


interface Props {
    entry: Entry    // Tipo del argumento que recibe EntryCard
}

export const EntryCard:FC<Props> = ({ entry }) => {

  const { startDragging, endDragging } = useContext( UIContext );
  const router = useRouter()

  const onDragStart = (event: DragEvent) => {
    event.dataTransfer.setData('text', entry._id); // Identificamos en 'text' el id de la entrada que se mueve
    startDragging();                               // Modificar el estado para indicar que estoy haciendo drag  
  }                                                // isDragging=true 

  const onDragEnd = () => {
      endDragging()                                // Fin del drag
  }                                                // isDragging=false

  const onClick = () => {                          // Cuando se haga click en una entrada     
    router.push(`/entries/${ entry._id }`)         // redireccionamos a la entrada según su id
  }

  return (
    <Card
        onClick={ onClick }
        sx={{ marginBottom: 1 }}
        draggable                        // Le decimos al Card que se puede hacer drag
        onDragStart={ onDragStart }      // Identificamos el id de la tarjeta que se mueve  y ponemos isAdding=true -> opacity=0.2 en el entryList 
        onDragEnd={ onDragEnd }          // isAdding=false opacity=1 en el entryList
    >
        <CardActionArea>

            <CardContent>
                <Typography sx={{ whiteSpace: 'pre-line' }}>{ entry.description }</Typography>
            </CardContent>

            <CardActions sx={{ display: 'flex', justifyContent: 'end', paddingRight: 2 }}>
                <Typography variant='body2'>{ dateFunctions.getFormatDistanceToNow( entry.createdAt ) }</Typography>
            </CardActions>

        </CardActionArea>
    </Card>
  )
}
