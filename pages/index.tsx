import type { NextPage } from 'next';
import { Card, CardHeader, Grid } from '@mui/material';
import { Layout } from '../components/layouts';
import { EntryList } from '../components/ui/EntryList';
import { NewEntry } from '../components/ui';


const HomePage: NextPage = () => {
  return (
    <Layout title='Home - OpenJira'>

      <Grid container spacing={ 2 }>
        <Grid item xs={ 12 } sm={ 4 }>
          <Card sx={{ height: 'calc(100vh - 100px)'}}>
            <CardHeader title="Pendientes" />

              {/* Agregar una nueva entrada */}
              <NewEntry />

              {/* Listado de las entradas */}
              <EntryList status='pending' />
              
          </Card>
        </Grid>

        <Grid item xs={12} sm={4}>
          <Card sx={{ height: 'calc(100vh - 100px)' }}>
            <CardHeader title="En progreso" />
            <EntryList status='in-progress'/>
          </Card>
        </Grid>

        <Grid item xs={12} sm={4}>
          <Card sx={{ height: 'calc(100vh - 100px)' }}>
            <CardHeader title="Completadas" />
            <EntryList status='finished'/>
          </Card>
        </Grid>
      </Grid>
      
    </Layout>
  )
}

export default HomePage


//npx create-next-app@latest --ts
//npm install @mui/material @emotion/react @emotion/styled
//npm install @mui/icons-material
//npm install uuid
//npm i --save-dev @types/uuid