import { Entry } from '../../interfaces';
import { EntriesState } from './';

type EntriesActionType = 
    | { type: '[Entry] Add-Entry', payload: Entry }
    | { type: '[Entry] Entry-Updated', payload: Entry }
    | { type: '[Entry] Refresh-Data', payload: Entry[]}
    | { type: '[Entry] - Entry-Deleted', payload: Entry }

export const entriesReducer = (state: EntriesState, action: EntriesActionType): EntriesState => {

    switch (action.type) {

        case '[Entry] Add-Entry':
            return {
                ...state,
                entries: [ ...state.entries, action.payload]
            }
        
            case '[Entry] Entry-Updated':
                return{
                    ...state,                       
                    entries: state.entries.map( entry => {
                        if( entry._id === action.payload._id){               // Buscamos la entry que hace drag 
                            entry.status = action.payload.status;            // Cambiamos el status
                            entry.description = action.payload.description;  // Establecemos la description
                        }
                        return entry; // Devolvemos la entry modificada
                    })
                }

            case '[Entry] Refresh-Data':
                return {
                    ...state,
                    entries: [...action.payload] // Actualizamos el state con las entries que recibimos.
                }

            case '[Entry] - Entry-Deleted':
                return {
                    ...state,                                            //entrada a borrar
                    entries: state.entries.filter(entry => entry._id !== action.payload._id)    // Del state, filtramos las que no coinciden con la entrada a borrar
                }

        default:
            return state;
    }
}