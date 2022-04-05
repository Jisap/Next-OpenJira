import mongoose, { Model, Schema } from 'mongoose'
import { Entry } from '../interfaces';


export interface IEntry extends Entry {} // Los tipos de datos usados en el EntryModel heredan sus props de Entry interface

const entrySchema = new Schema({    // Esquema de mongo
    description: { type: String, required: true },
    createdAt: { type: Number },
    status: { 
        type: String,
        enum:{
            values:['pending', 'in-progress', 'finished'],
            message: '{VALUE} no es un estado permitido'
        },
        default: 'pending'
    }
});

//Modelo de entrada de datos//.Elige el modelo Entry y si no existe lo crea con el schema
const EntryModel: Model<IEntry> = mongoose.models.Entry || mongoose.model('Entry', entrySchema);

export default EntryModel;