import { List, Paper } from '@mui/material'
import React, { DragEvent, FC, useContext, useMemo } from 'react'

import { UIContext } from '../../context/ui'
import { EntriesContext } from '../../context/entries'

import { EntryStatus } from '../../interfaces'
import { EntryCard } from './EntryCard'

import styles from './EntryList.module.css'

interface Props {
    status: EntryStatus // Tipo del arg que recibe EntryList
}

export const EntryList:FC<Props> = ({ status }) => {

  const { entries, updateEntry } = useContext( EntriesContext );                   // Recuperamos el estado de las entradas
  const { isDragging, endDragging } = useContext(UIContext);  

  const entriesByStatus = useMemo(() => entries.filter(entry => entry.status === status), [entries]) 
  
  // Filtramos la entradas según status y las memorizamos, se actualizará el filtro cuando las entries cambien.

    const allowDrop = (event: DragEvent<HTMLDivElement>) => {
       event.preventDefault()
  }

    const onDropEntry = (event: DragEvent<HTMLDivElement>) => {
        const id = event.dataTransfer.getData('text');            // Recibimos el id de la card dragada
        const entry = entries.find( e => e._id === id )!;         // Buscamos la card en entries[]    
        entry.status = status;                                    // Modificamos el estatus  
        updateEntry( entry );                                     // Actualizamos la entrada con ese status -> redibuja el componente
        endDragging();                                            // isDragging = false
    }


  return (
    // Aquí hacemos drop
    <div
        onDragOver={allowDrop}     // Le decimos al div que será zona de drop   
        onDrop={onDropEntry}       // Recibiremos el id de la Card que se movio aquí y actualizaremos el estado de la entry
        className={ isDragging ? styles.dragging : ''}
    >
          <Paper sx={{ 
              height: 'calc(100vh-180px)',
              overflow: 'scroll',
              backgroundColor: 'transparent',
              '&::-webkit-scrollbar': { display: 'none' },
              padding: '1px 3px' }}
          >
            
            {/* opacity cambiará dependiendo de si estoy haciendo drag and drop */}
            <List sx={{ opacity: isDragging ? 0.2 : 1, transition: 'all .3s'}}>
                { 
                    entriesByStatus.map( entry => (
                        <EntryCard key={ entry._id } entry={ entry }/>
                    ))
                }
                    
            </List>

        </Paper>
    </div>
  )
}
