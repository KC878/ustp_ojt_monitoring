import { NextResponse, NextRequest } from 'next/server';
import { RowDataPacket } from 'mysql2'; 
import db from '@src/lib/database/db';
import { updateInitial } from '@src/lib/querries/querries';


interface User extends RowDataPacket {
  duration: number;
  schoolID: string;
  email: string;
}

export async function POST(req: NextRequest){
  try{
    let body: User;

    try {
      body = await req.json();
    }catch (error) {
      console.error('Invalid JSON format: ', error);
      return NextResponse.json(
        { error: 'Invalid JSON format'},
        { status: 400},
      )
    }

    const { 
      duration,
      schoolID,
      schoolValue,
      email
    } = body; // receive the response

      // have logic here if schoolID exist in school if not then enter first the ID then ententer the school ID 

     // when updating make it so that receive only the capital letters of the school
     const [result] = await db.query(
      updateInitial,
      [
        duration,
        schoolID,
        email
      ]
      );

      return NextResponse.json(
        { message: 'Duration and School Updated Successfully', result},
        { status: 200 }
      );
  }catch(error){
    console.error('Database Error: ', error);
    return NextResponse.json(
      { error: 'Failed to updated User' },
      { status: 500 }
    );
  }
}
