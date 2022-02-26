import React from 'react';
import { Routes, Route } from 'react-router';
import { CreateAssetAccountPage } from './CreateAssetAccountPage';
import { MyActiveAccountsPage } from './MyActiveAccounts';
import { PendingActivitiesPage } from './PendingActivitiesPage';

export const Pages: React.FC = () => {
  return (
    <Routes>
      <Route path='/pending' element={<PendingActivitiesPage />
      } />
      <Route path='/create-asset-account' element={<CreateAssetAccountPage />
      } />
      <Route path='/' element={<MyActiveAccountsPage />
      } />

      <Route
        path="*"
        element={
          <main style={{ padding: "1rem" }}>
            <p>There's nothing here!</p>
          </main>
        }
      />
    </Routes>
  )
}