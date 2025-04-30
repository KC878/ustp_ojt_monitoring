import { NextResponse, NextRequest } from 'next/server';
import { RowDataPacket } from 'mysql2'; 
import db from '@src/lib/database/db';
import { updateInitial, getSchools, registerSchool } from '@src/lib/querries/querries';


interface User extends RowDataPacket {
  duration: number;
  schoolID: string;
  email: string;
}

interface School extends RowDataPacket{
  schoolID: string;
  schoolName: string;
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
      schoolName,
      email
    } = body; // receive the response


    const [schools] = await db.query<School[]>(getSchools); // get the Schools from database

    const schoolExist = schools.find((s) => s.schoolID === schoolID); // a boolean value

    if (schoolExist){
      console.log(`School ID: ${schoolID} --> Exist`)
    }else{
      console.log(`School ID: ${schoolID} --> Does Not Exist`);
      console.log('School Name: ', schoolName);
      await db.query<School[]>(registerSchool, [schoolID, schoolName]); // Insert your school data if it 
      console.log('Registered School Successfully!');
      //does not exist 
    }

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
