import type { NextApiRequest, NextApiResponse } from 'next'
import { db } from '../../../database';
import { Entry, IEntry } from '../../../models';

type Data = 
    | { message: string }
    | IEntry[]
    | IEntry

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {

    switch( req.method ) {
        case 'GET':
            return getEntries( res )

        case 'POST':
            return postEntry( req, res );
        
        default: 
            return res.status(400).json({ message: 'Endpoint no existe' });
    }
}

const getEntries = async( res: NextApiResponse<Data>) => {

    await db.connect();                                                    // Conectamos a la bd
    const entries = await Entry.find().sort({ createdAt: 'ascending'});    // Obtenemos todas las entradas de la bd
    await db.disconnect();                                                 // Desconectamos de la bd   

    res.status(200).json( entries ); // Damos como respuesta las entries= IEntry[]
}

const postEntry = async( req: NextApiRequest, res: NextApiResponse<Data>) => {
    
    const { description = '' } = req.body;  // Obtenemos la description del body
    
    const newEntry = new Entry({            // Configuramos la nueva entry
        description,
        createdAt: Date.now(), 
    })

    try {
       await db.connect();                                              
       await newEntry.save();
       await db.disconnect(); 

       return res.status(201).json( newEntry ); // La respuesta será la nueva entrada con la interface IEntry
    
    } catch (error) {
        await db.disconnect();
        console.log(error);
         
        return res.status(500).json({ message: 'Algo salio mal, revisar la consola del servidor'});
    }
            
}