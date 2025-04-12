import { NextResponse, NextRequest } from 'next/server';
import { RowDataPacket } from 'mysql2'; 
import db from '../../../../lib/database/db';
import { loginQuery } from '../../../../lib/querries/querries';



import { messages } from '@src/utils/messages';


const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');



interface User extends RowDataPacket {
  email: string;
  password: string;
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

    const { email, password } = body; // receive the response


    // 1. validate email
    const [rows]: any = await db.query(
      loginQuery,
      [email] // from the body
    )
    if (rows.length === 0){
      return NextResponse.json(
        { message: messages.ERROR.INVALID_EMAIL },
        { status: 401 }
      )
    } ////////////////////////////////////////////// EMAIL VALIDATION 

    
    const user = rows[0];

    // 2. copmare password 
    const validPassword = await bcrypt.compare(password, user.password);

    if(!validPassword){
      return NextResponse.json(
        { message: messages.ERROR.INVALID_PASSWORD},
        { status: 401 }
      )
    }
    ////////////////////////////////////////////// PASSWORD VALIDATION 

    // 3. Generate JWT token

    const payload = { 
      id: user.id, 
      name: user.name,
      email: user.email,
    };
    const token = jwt.sign(
      payload, 
      process.env.JWT_SECRET, 
      { 
        expiresIn:
        process.env.JWT_EXPIRES_IN  
      }
    )
     ////////////////////////////////////////////// GENERATE TOKEN 

    // 4. Success login
    return NextResponse.json(
      { message: 'Login Successfully!',
        token, // include the token in Response
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
        }
      },
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
