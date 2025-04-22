import { NextResponse, NextRequest } from 'next/server';
import { RowDataPacket } from 'mysql2'; 
import db from '../../../../lib/database/db';
import { updateStatusLogout } from '../../../../lib/querries/querries';



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
  
     const timeOut = Date.now();
     await db.query(
      updateStatusLogout,
      [timeOut, email]
    );

    return NextResponse.json(
      { message: 'Logout Successfully!'},
      { status: 200 }
    );
  }catch(error){
    console.error('Database Error: ', error);
    return NextResponse.json(
      { error: 'Login failed due to server error' },
      { status: 500 }
    );
  }
}
