import React, { ChangeEvent, FC, useContext, useMemo, useState } from 'react'
import { GetServerSideProps } from 'next';
import { capitalize, Button, Card, CardActions, CardContent, CardHeader, FormControl, FormControlLabel, FormLabel, Grid, Radio, RadioGroup, TextField, IconButton } from '@mui/material';
import SaveOutlinedIcon from '@mui/icons-material/SaveOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import { Layout } from '../../components/layouts';
import { Entry, EntryStatus } from '../../interfaces';
import { dbEntries } from '../../database';
import { EntriesContext } from '../../context/entries';
import { useRouter } from 'next/router';
import { dateFunctions } from '../../utils';

const validStatus: EntryStatus[] =['pending', 'in-progress', 'finished'];

interface Props { 
    entry: Entry;
}

const EntryPage:FC<Props> = ({ entry }) => {

  const router = useRouter();

  const { updateEntry, deleteEntry } = useContext(EntriesContext)

  const [inputValue, setInputValue] = useState( entry.description);
  const [status, setStatus] = useState<EntryStatus>( entry.status );
  const [touched, setTouched] = useState(false);

  const isNotValid = useMemo(() => inputValue.length <= 0 && touched, [inputValue, touched]);

  const onInputValueChanged = (event: ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  }

  const onStatusChanged = (event: ChangeEvent<HTMLInputElement>) => {
    setStatus(event.target.value as EntryStatus);
  }

  const onSave = () => {

    if( inputValue.trim().length === 0 ) return; // No se permiten entradas vacias

    const updatedEntry: Entry = {   // Se crea una nueva entrada con los valores actualizados
        ...entry,                   // Se copian los valores de la entrada actual
        status,                     // Se actualiza el estado
        description: inputValue     // Se actualiza la descripcion con el valor del input
    }

    updateEntry( updatedEntry, true ); // Se actualiza la entrada en la base de datos y se muestra el snackbar
  }

    const onDelete = () => {    
        deleteEntry(entry, true);
        router.push('/')
    }

  return (
    <Layout title={ inputValue.substring(0,20)+'...'}>
        <Grid
            container
            justifyContent="center"
            sx={{ marginTop: 2}}
        >
            <Grid item xs={12} sm={ 8 } md={ 6 }>
                <Card>
                    <CardHeader 
                        title={`Entrada: ${ inputValue }`}
                        subheader={`Creada ${ dateFunctions.getFormatDistanceToNow( entry.createdAt ) }`}
                    />
                    <CardContent>
                        <TextField 
                            sx={{ marginTop: 2, marginBottom: 1}}
                            fullWidth
                            placeholder="Nueva entrada"
                            autoFocus
                            multiline
                            label="Nueva entrada"
                            value={ inputValue }
                            onBlur={ () => setTouched(true) }
                            onChange={onInputValueChanged }
                            helperText={ isNotValid && 'Ingrese un valor'}
                            error={ isNotValid }
                        />

                        <FormControl>
                            <FormLabel>Estado:</FormLabel>
                            <RadioGroup 
                              row 
                              value={ status }
                              onChange={ onStatusChanged }  
                            >
                                {
                                    validStatus.map(option => (
                                        <FormControlLabel 
                                            key={ option }
                                            value={ option }
                                            control={ <Radio /> }
                                            label={ capitalize(option) }
                                        />      
                                    ))
                                }
                            </RadioGroup>
                        </FormControl>

                    </CardContent>

                    <CardActions>
                        <Button
                            startIcon={<SaveOutlinedIcon />}
                            variant="contained"
                            fullWidth
                            onClick={ onSave }
                            disabled={ inputValue.length <= 0 }
                        >
                            Save
                        </Button>
                    </CardActions>

                </Card>
            </Grid>
        </Grid>

        <IconButton 
            onClick={ onDelete }
            sx={{ 
                position:'fixed',
                bottom: 30,
                right: 30,
                backgroundColor: 'error.dark',    
            }}
        >
            <DeleteOutlineOutlinedIcon />
        </IconButton>

    </Layout>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
    
    const { id } = params as { id:string };             // Obtenemos el id de los params de esta página

    const entry = await dbEntries.getEntryById( id );   // Obtenemos la entrada correspondiente al id 

    if( !entry ){                                       // Si no existe la entrada
        return { 
            redirect:{
                destination: '/',                       // Redireccionamos a la home
                permanent: false,
            }
         }
    }

    return {                            // Pero si existe la entrada 
        props: {                        // retornamos la entry como prop
            entry                       // y se renderiza la página con el contendio a editar.
        }
    }
}



export default EntryPage;

