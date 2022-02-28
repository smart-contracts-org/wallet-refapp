import React from 'react';
import { Routes, Route} from 'react-router';
import {useLocation, useNavigate} from 'react-router-dom'
import { CreateAssetAccountPage } from './CreateAssetAccountPage';
import { MyActiveAccountsPage } from './MyActiveAccounts';
import { PendingActivitiesPage } from './PendingActivitiesPage';
import { SendPage } from './SendPage';

export const Pages: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  console.log(location)
  return (
    <Routes>
      <Route path='/pending' element={<PendingActivitiesPage />
      } />
      <Route path='/send' element={<SendPage />
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