import { isValidObjectId } from 'mongoose';
import { Entry, IEntry } from '../models';
import { db } from './';


export const getEntryById = async( id:string ): Promise<IEntry | null> => {

    if(!isValidObjectId(id)) return null;            // Sino es un objeto de mongo retornamos null

    await db.connect();                              // Si si lo es conectamos a la bd  
    const entry = await Entry.findById(id).lean();   // y obtenemos la entrada por id 
    await db.disconnect();                           // Desconectamos de la bd 

    return JSON.parse( JSON.stringify(entry));       // Retornamos la entrada como un string de un objeto json
}

