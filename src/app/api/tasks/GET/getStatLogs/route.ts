import { NextResponse } from 'next/server';
import db from '../../../../../lib/database/db'; // Adjust import 

import { getStatLogs } from '../../../../../lib/querries/querries'



export async function GET(){
  try{
    const [rows] = await db.query(getStatLogs); // this will be daily logs
    
    return NextResponse.json(rows, {status: 200}); // add more get here separate -> 
  }catch(error){
    return NextResponse.json({error: error}, {status: 500});
  }
}