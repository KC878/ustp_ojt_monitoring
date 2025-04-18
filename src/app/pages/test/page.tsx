'use client'

import React from 'react';
import { useFetchData } from '@src/services/useFetchData'; // Adjust the import path

interface StudentType {
  userID: string;
  name: string;
  status: string;
}

const StudentList: React.FC = () => {
  // Use the custom hook with the API endpoint
  const { data, loading, error } = useFetchData<any>('/api/tasks/GET/getUserStatus');

  // Render loading state
  if (loading) {
    return <div>Loading...</div>;
  }

  // Render error state
  if (error) {
    return <div>Error: {error}</div>;
  }

  // Render the data (a list of students)
  return (
    <div>
      <h1>Student List</h1>
      <ul>
        {data.map((student) => (
          <li key={student.userID}>
            <p>Name: {student.name}</p>
            <p>Status: {student.status}</p>
            <p>User ID: {student.userID}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default StudentList;
