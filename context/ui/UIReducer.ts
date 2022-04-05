
import { UIState } from './';

type UIActionType = 
| { type: 'UI - Open Sidebar' } 
| { type: 'UI - Close Sidebar'} 
| { type: 'UI - Set isAddingEntry', payload: boolean }
| { type: 'UI - Start Dragging' }
| { type: 'UI - End Dragging' }

export const uiReducer = ( state: UIState, action: UIActionType ): UIState => {

    switch (action.type) {

        case 'UI - Open Sidebar':
            return{ 
                ...state,
                sidemenuOpen: true
            }
        case 'UI - Close Sidebar':
            return{ 
                ...state,
                sidemenuOpen: false
            }
        case 'UI - Set isAddingEntry':
            return { 
                ...state,                        // Cambia el estado de isAddingEntry según
                isAddingEntry: action.payload    // el argumento que se le proporcione
            }
        case 'UI - Start Dragging':
            return { 
                ...state,                        // Cambia el estado de isDraggin a true
                isDragging: true
            }

        case 'UI - End Dragging':
            return {
                ...state,                        // Cambia el estado de isDraggin a false
                isDragging: false
            }
    
        default:
            return state;
    }
}

