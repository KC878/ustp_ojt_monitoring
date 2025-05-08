import { NextResponse, NextRequest } from 'next/server';
import { RowDataPacket } from 'mysql2'; 
import db from '@src/lib/database/db';
import { postLeaveAbsent } from '@src/lib/querries/querries';
import { ymdFormattedDate } from '@src/utils/date';


interface UserLogs extends RowDataPacket {
  email: string;
  userID: string
  attendanceStatus: string;
}


export async function POST(req: NextRequest){
  try{
    let body: UserLogs;
    try {
      body = await req.json();
    }catch (error) {
      console.error('Invalid JSON format: ', error);
      return NextResponse.json(
        { error: 'Invalid JSON format'},
        { status: 400},
      )
    }

    const { email, userID, attendanceStatus } = body; // receive the response
     /// UPDATE STATUS FOR USER_STATUS
  
    

    // before inserting check if user has logs today 
    await db.query(
      postLeaveAbsent, // querry to update // create a 
      [
        email,
        userID,
        ymdFormattedDate,
        null,
        null,
        null, 
        attendanceStatus,
      ]
    );
    // timeIN, timeOut and renderedTime set to null 


    return NextResponse.json(
      { message: 'Status Inserted Successfully!',
        user: {
          email: email,
          userID: userID,
          createdAt: ymdFormattedDate,
          attendanceStatus: attendanceStatus,
        }
      },
      { status: 200 }
    );
  }catch(error){
    console.error('Database Error: ', error);
    return NextResponse.json(
      { error: 'Unknown Error' },
      { status: 500 }
    );
  }
}
