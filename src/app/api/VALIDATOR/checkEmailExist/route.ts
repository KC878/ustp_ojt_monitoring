import { NextRequest, NextResponse } from 'next/server';
import db from '@src/lib/database/db';

import { messages } from '@src/utils/messages';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const email = body.email;

    const [rows]: any = await db.query(
      'SELECT email FROM Users WHERE email = ?',
      [email]
    );

    const exists = rows.length > 0;

    if(exists){
      return NextResponse.json(
        { message: messages.ERROR.EMAIL_EXIST},
        { status: 500 } // the api is successful 
        // but custom error for this 
      )
    }else{
      return NextResponse.json(
        { message: messages.SUCCESS.UNIQUE_EMAIL},
        { status: 200 }
      )
    }

  } catch (error) {
    console.error('Error checking email:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
