import { NextResponse, NextRequest } from 'next/server';
import { RowDataPacket } from 'mysql2'; 
import db from '../../../../lib/database/db';
import { updateStatusLogout, getDailyDuty, insertDailyLogs, afterLogsUpdateStatus } from '../../../../lib/querries/querries';
import { ymdFormattedDate } from '@src/utils/date';

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

    console.log(`Status Logout: ${timeOut} ${email}`);
    await db.query(
      updateStatusLogout,
      [timeOut, email]
    );

    console.log(`Status Logout: ${timeOut} ${email}`);
    const [resultStatus]: any = await db.query(getDailyDuty, [email]);
    // const [resultLogs]: any = await db.query()
    // console.log(String(resultStatus[0].dateIn) === '0000-00-00');


    // const manilaTime = date.toLocaleString("en-PH", { timeZone: "Asia/Manila"});
    // const time = manilaTime.slice(10);

    console.log(`STATUS: ${resultStatus[0].duty}`);
    if(resultStatus[0].duty === 'complete'){
      const inTime = Number(resultStatus[0].timeIn);
      const newTime = new Date(inTime);
      const manilaTimeIn = newTime.toLocaleString("en-PH", { timeZone: "Asia/Manila"});

      const outTime = Number(resultStatus[0].timeOut);
      const newOut = new Date(outTime);
      const manilaTimeOut = newOut.toLocaleString("en-PH", { timeZone: "Asia/Manila"});


      const timeIn = newTime.toISOString().slice(0, 10); // this is date for time In
      // const dateIn = date.toISOString().slice(0, 10);
      console.log(timeIn);
      console.log(ymdFormattedDate); // check date 


      // insert daily logs
      if( timeIn === ymdFormattedDate && resultStatus[0].duty === 'complete'){ // only works if the same date && status complete

        const userID = resultStatus[0].userID;
        const timeInFormat = manilaTimeIn.slice(10); // register only the time + Pm or Am 
        const timeOutFormat = manilaTimeOut.slice(10);
        
        await db.query(
          insertDailyLogs,
          [
            email,
            userID,
            ymdFormattedDate, // createdAt
            timeInFormat, // timeIn
            timeOutFormat // timeOut     
          ]
        );

        console.log(`Finish Insert into Daily_Logs`);

        // re update the user_status 
        await db.query(
          afterLogsUpdateStatus,
          [email]
        );
        console.log(`Reupdate User Status`);

      }
    }

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
