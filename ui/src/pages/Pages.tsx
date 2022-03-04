import React from 'react';
import { Routes, Route} from 'react-router';
import {useLocation} from 'react-router-dom'
import { CreateAssetAccountPage } from './CreateAssetAccountPage';
import { LoginPage } from './LoginPage';
import { MyActiveAccountsPage } from './MyActiveAccounts';
import { PendingActivitiesPage } from './PendingActivitiesPage';
import { SendPage } from './SendPage';

interface PagesProps {
  setCredentials: () => {}
}
export const Pages: React.FC<PagesProps> = ({setCredentials}) => {
  const location = useLocation();
  console.log(location)
  return (
    <Routes>
      <Route path='/pending' element={<PendingActivitiesPage />
      } />
      <Route path='/send' element={<SendPage />
      } />
      <Route path='/login' element={<LoginPage onLogin={setCredentials} />
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