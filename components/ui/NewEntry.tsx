import { Button, Box, TextField } from '@mui/material';
import SaveOutlinedIcon from '@mui/icons-material/SaveOutlined';
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import { ChangeEvent, useContext, useState } from 'react';
import { EntriesContext } from '../../context/entries';
import { UIContext } from '../../context/ui';

export const NewEntry = () => {

  const { isAddingEntry, setIsAddingEntry } = useContext(UIContext); // Bandera para mostrar textarea o boton de agregar

  const [inputValue, setInputValue] = useState('');  // Estado del formulario (contenido)   
  const [ touched, setTouched] = useState( false );  // Estado para el "sinfoco" en el formulario
  const { addNewEntry } = useContext(EntriesContext)  

  const onTextFieldChanges = (event: ChangeEvent<HTMLInputElement>) => { // Cuando el contenido del textarea cambie también
    setInputValue( event.target.value )                                  // cambiará el estado del formulario (inputValue)   
  }

  const onSave = () => {
      if ( inputValue.length === 0 ) return;
      addNewEntry(inputValue);
      setIsAddingEntry( false ); 
      setTouched( false );
      setInputValue('')
  }

  return (
    <Box sx={{ marginBottom: 2, paddingX: 2 }}>

        { 
            isAddingEntry ? (
                <>
                      <TextField
                          fullWidth
                          sx={{ marginTop: 2, marginBottom: 1 }}
                          placeholder='Nueva entrada'
                          autoFocus
                          multiline
                          label='Nueva entrada'
                          helperText={ inputValue.length <= 0 && touched && 'Ingrese un valor'}
                          error={ inputValue.length <= 0 && touched }
                          value={ inputValue }
                          onChange={ onTextFieldChanges }
                          onBlur={ () => setTouched( true )}
                      />

                      <Box display='flex' justifyContent='space-between'>
                          <Button
                              variant='text'
                              onClick={() => setIsAddingEntry( false )}   
                          >
                              Cancelar
                          </Button>
                          <Button
                              variant='outlined'
                              color='secondary'
                              endIcon={<SaveOutlinedIcon />}
                              onClick={onSave}
                          >
                              Guardar
                          </Button>
                      </Box>
                </>
            )
            : (
                // Cuando le demos al boton de agregar isAdding = true -> muestra formulario para rellenar.
                <Button
                    startIcon={<AddCircleOutlineOutlinedIcon />}
                    fullWidth
                    variant='outlined'
                    onClick={() => setIsAddingEntry(true)}
                >
                    Agregar Tarea
                </Button>
            )
        
        }

    </Box>
  )
}
