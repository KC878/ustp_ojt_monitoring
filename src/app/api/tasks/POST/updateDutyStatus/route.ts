import { NextResponse, NextRequest } from 'next/server';
import { RowDataPacket } from 'mysql2'; 
import db from '@src/lib/database/db'
import { updateDuty } from '@src/lib/querries/querries';



interface User extends RowDataPacket {
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

    const { email } = body; // receive the response
     /// UPDATE STATUS FOR USER_STATUS

     await db.query(
      updateDuty,
      ['completed', email]
    );

    return NextResponse.json(
      { message: 'Duty Completed'},
      { status: 200 }
    );
  }catch(error){
    console.error('Database Error: ', error);
    return NextResponse.json(
      { error: 'Failed Due to server err' },
      { status: 500 }
    );
  }
}
