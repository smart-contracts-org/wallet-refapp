import React from 'react';
import { Routes, Route} from 'react-router';
import Credentials from '../Credentials';
import { CreateAssetAccountPage } from './CreateAssetAccountPage';
import { LoginPage } from './LoginPage';
import { MyActiveAccountsPage } from './MyActiveAccounts';
import { PendingActivitiesPage } from './PendingActivitiesPage';
import { SendPage } from './SendPage';

interface PagesProps {
  setCredentials: (credentials: Credentials) => void
}
export const Pages: React.FC<PagesProps> = ({setCredentials}) => {

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