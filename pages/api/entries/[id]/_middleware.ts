
import mongoose from "mongoose";
import { NextRequest, NextFetchEvent, NextResponse } from "next/server";



export function middleware( req: NextRequest, ev:NextFetchEvent){
    
    const id  = req.page.params?.id || '';                        // Al entrar en la url api/entries/id, obtenemos el id
    const checkMongoIDRegExp = new RegExp("^[0-9a-fA-F]{24}$");   // Expresión regular para verificar que es un id de mongo 

    if (!checkMongoIDRegExp.test( id )) {
       
        return new Response(JSON.stringify({ message: 'Id no válido' + id }),{
            status: 400,
            headers:{
                'Content-Type': 'application/json'
            }

        })
    }
    
    return NextResponse.next()
}