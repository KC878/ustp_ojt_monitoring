import { NextResponse, NextRequest } from 'next/server';
import { RowDataPacket } from 'mysql2'; 
import db from '../../../../lib/database/db';
import { addUser } from '../../../../lib/querries/querries';

interface User extends RowDataPacket {
  userID : string;
  name: string;
  email: string;
  password: string;
  roleID: number;
  created_at: string;
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
      userID,
      name,
      email,
      password,
      roleID,
      created_at,
    } = body; // receive the response

     // Insert new transactions into the database
     const [result] = await db.query(
      addUser, 
        [
          userID,
          name,
          email,
          password,
          roleID,
          created_at,
        ]);

      return NextResponse.json(
        { message: 'User added successfully!', result},
        { status: 201 }
      );
  }catch(error){
    console.error('Database Error: ', error);
    return NextResponse.json(
      { error: 'Failed to add cashier' },
      { status: 500 }
    );
  }
}
