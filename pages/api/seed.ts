// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { db, seedData } from '../../database'
import { Entry } from '../../models'

type Data = {
    ok: boolean
    message: string
    
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>
) {
    
    if ( process.env.NODE_ENV === 'production'){
        return res.status(401).json({ 
            ok: false,
            message: 'No tiene acceso a este servicio'})
    }

    await db.connect();  //En este Scope podemos hacer peticiones a la base de datos

    await Entry.deleteMany();                    // Primero borramos de la db la información preexistente
    await Entry.insertMany( seedData.entries );  // Luego insertamos los datos en la db  y se crea la colección entries
    await db.disconnect()
    
    
    res.status(200).json({
        ok: true,
        message: 'Proceso realizado correctamente',
        
    })
}


