
import type { NextApiRequest, NextApiResponse } from 'next'
import { db } from '../../../../database';
import { Entry, IEntry } from '../../../../models';

type Data = 
    | { message: string }
    | IEntry
   

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {

    // const { id } = req.query;    // Al entrar en la url api/entries/id, obtenemos el id

    // if( !mongoose.isValidObjectId ( id )){
    //     return res.status(400).json({ message: 'Id no válido' + id })
    // }

    switch ( req.method ) {
        case 'PUT':
            return updateEntry( req, res );
            
        case 'GET':
            return getEntry( req, res );

        case 'DELETE':                     
            return deleteEntry(req, res);
    
        default:
            return res.status(400).json({ message: 'Método no existe'})
    }
}

const updateEntry = async( req: NextApiRequest, res: NextApiResponse<Data>) => {

    const { id } = req.query;                            // Obtenemos el id del url
    await db.connect();                                  // Conectamos a la bd  
    const entryToUpdate = await Entry.findById( id );    // Buscamos en la bd la entrada con ese id.

    if( !entryToUpdate ){
        await db.disconnect();
        return res.status(404).json({ message: 'No existe la entrada con ese ID'})
    }

    const { 
        description = entryToUpdate.description,    // Identificamos la nueva description 
        status = entryToUpdate.status               // y el status del body 
    } = req.body;

    // Actualizamos la entrada correspondiente a ese con la nueva description y status
    try {
        const updateEntry = await Entry.findByIdAndUpdate( id, { description, status }, { runValidators: true, new: true }); 
        await db.disconnect();                // Desconectamos de la bd
        res.status(200).json( updateEntry! ); // Damos como respuesta la entrada actualizada con la interface IEntry
    } catch (error: any) {
        await db.disconnect();
        res.status(400).json({ message: error.errors.status.message })
    }

}    

const getEntry = async( req: NextApiRequest, res: NextApiResponse<Data>) => {
    
        const { id } = req.query;                            // Obtenemos el id del url
        await db.connect();                                  // Conectamos a la bd  
        const entryInDB = await Entry.findById( id );       // Buscamos en la bd la entrada con ese id.
    
        if( !entryInDB ){
            await db.disconnect();
            return res.status(404).json({ message: 'No existe la entrada con ese ID'})
        }
    
        await db.disconnect();
        res.status(200).json( entryInDB ); // Damos como respuesta la entrada con la interface IEntry
}

const deleteEntry = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
    
    const { id } = req.query;

    await db.connect();
    const entryDBTodelete = await Entry.findByIdAndDelete(id);
    await db.disconnect();

    if (!entryDBTodelete) {
        return res.status(400).json({ message: 'No hay entrada con ese id ' + id });
    }

    return res.status(200).json(entryDBTodelete);

} 