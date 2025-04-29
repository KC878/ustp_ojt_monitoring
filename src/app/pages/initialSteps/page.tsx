'use client';


import InitialSteps from '@src/components/InitialSteps';
import ProtectedRoute from '@src/middleware/ProtectedRoute';

const StepsPage = () => {
  
  return(
    <ProtectedRoute>
      <InitialSteps />
    </ProtectedRoute>
  )
}

export default StepsPage;