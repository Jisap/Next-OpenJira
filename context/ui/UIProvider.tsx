
import { FC, useReducer } from 'react'
import { UIContext, } from './UIContext';
import { uiReducer } from './UIReducer';


export interface UIState {
    sidemenuOpen: boolean;
    isAddingEntry: boolean;
    isDragging: boolean;
}

const UI_INITIAL_STATE: UIState = {
    sidemenuOpen: false,
    isAddingEntry: false,
    isDragging: false,
}

export const UIProvider:FC = ({ children }) => { // Creamos el proveedor del context, el que provee la información al resto de componentes

  const [ state, dispatch ] = useReducer( uiReducer, UI_INITIAL_STATE ); // Cuando el state cambie se redibuja el componente
    
  const openSideMenu = () => {
    dispatch({ type: 'UI - Open Sidebar' });  // Esta funcíon modifica el state mediante la action del reducer
  }

  const closeSideMenu = () => {               // Idem para cerrar.
    dispatch({ type: 'UI - Close Sidebar' })
  }
  
  const setIsAddingEntry = (isAdding: boolean) => {
    dispatch({ type:'UI - Set isAddingEntry', payload: isAdding})
  }

  const startDragging = () => {
    dispatch({ type: 'UI - Start Dragging'})
  }

  const endDragging = () => {
    dispatch({ type: 'UI - End Dragging' })
  }


  return (
    <UIContext.Provider  value={{
        ...state,
        openSideMenu,
        closeSideMenu,
        setIsAddingEntry,
        startDragging,
        endDragging
        
    }}>
        { children }
    </UIContext.Provider>
  )
}

