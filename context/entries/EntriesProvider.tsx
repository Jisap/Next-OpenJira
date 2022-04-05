import { FC, useEffect, useReducer} from 'react';
import { Entry } from '../../interfaces';
import { EntriesContext } from './EntriesContext';
import { entriesReducer } from './entriesReducer';
import { v4 as uuidv4 } from 'uuid';
import { entriesApi } from '../../apis';
import { useSnackbar } from 'notistack';


export interface EntriesState {  // Aquí se exporta el tipo del estado, en este caso de las entradas
     entries: Entry[],           // El estado contiene las entries que son a su vez tipo Entry[] 
}

const Entries_INITIAL_STATE: EntriesState = {
     entries: [],
}

export const EntriesProvider:FC = ({ children }) => { // El proveedor 'provee' el estado inicial y el reducer para modificarlo

  const [ state, dispatch] = useReducer( entriesReducer, Entries_INITIAL_STATE );
  const { enqueueSnackbar } = useSnackbar();

  const addNewEntry = async( description: string ) => {//Entry nueva
      
      const { data } = await entriesApi.post<Entry>('/entries', { description }); // Petición post a http:/localhost:3000/entries -> data
      dispatch({ type: '[Entry] Add-Entry', payload: data});                      // Modificamos el estado
  }

  const updateEntry = async( {_id, description, status }: Entry, showSnackbar = false ) => {//Entry con datos actualizados
      try {                                                                         
          const { data } = await entriesApi.put<Entry>(`/entries/${_id}`, { description, status });// Petición put a http:/localhost:3000/entries/:id -> data
          dispatch({ type: '[Entry] Entry-Updated', payload: data });

          if(showSnackbar)                              // Solo aparecerá el snackbar si actualizamos una entrada
          enqueueSnackbar('Entrada actualizada', {      // en el resto de casos como el drag & drop no se mostrará    
                variant: 'success',
                autoHideDuration: 2000,
                anchorOrigin: {
                    vertical: 'top',
                    horizontal: 'right',
                }
            });
          
      } catch (error) {
          console.log({error})
      }
  }

    const deleteEntry = async (entry: Entry, showSnackbar = false) => {
        try {
            const { data } = await entriesApi.delete<Entry>(`/entries/${entry._id}`) // Petición al backend

            dispatch({
                type: '[Entry] - Entry-Deleted',                                    // Modificamos el estado
                payload: data
            })

            if (showSnackbar) {                                                     // Solo aparecerá el snackbar si eliminamos una entrada
                enqueueSnackbar('Entrada borrada correctamente', {
                    variant: 'success',
                    autoHideDuration: 1500,
                    anchorOrigin: {
                        vertical: 'top',
                        horizontal: 'right',
                    }
                })
            }

        } catch (error) {
            console.log({ error });
        }
    }

  const refreshEntries = async() => {
      const { data } = await entriesApi.get<Entry[]>('/entries'); // Petición al entriesApi -> http://localhost:3000/api/entries
      dispatch({ type: '[Entry] Refresh-Data', payload: data })   
  }

  useEffect(() => {         // Cada vez que arranca el componente recargaremos las entradas.
      refreshEntries()
  }, []);

  return (
     <EntriesContext.Provider  value={{
         ...state,
         addNewEntry,
         updateEntry,
         deleteEntry
     }}>
        { children }
     </EntriesContext.Provider>
  )
}



