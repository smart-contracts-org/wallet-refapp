import React from 'react';
import { Routes, Route, Navigate,} from 'react-router-dom';
import Credentials from '../Credentials';
import { AssetInvitePage } from './AssetInvitePage';
import { AssetProfilePage } from './AssetProfilePages';
import { CreateAssetAccountPage } from './CreateAssetAccountPage';
import { LoginPage } from './LoginPage';
import { MyActiveAccountsPage } from './MyActiveAccounts';
import { PendingActivitiesPage } from './PendingActivitiesPage';
import { SendPageWide } from './SendPageWide';
import { SwapPage } from './SwapPage';

interface PagesProps {
  setCredentials: (credentials: Credentials) => void
}
export const Pages: React.FC<PagesProps> = ({setCredentials}) => {

  return (
    <Routes>
      <Route path='/pending' element={<PendingActivitiesPage />
      } />
      <Route path='/send/:issuer/:ticker' element={<SendPageWide />
      } />
      <Route path='/swap/:issuer/:ticker' element={<SwapPage />
      } />
      <Route path='/invite/:issuer/:ticker' element={<AssetInvitePage />
      } />
      <Route path='/asset/:issuer/:ticker' element={<AssetProfilePage />
      } />
      <Route path='/login' element={<LoginPage onLogin={setCredentials} />
      } />
      <Route path='/create-asset-account' element={<CreateAssetAccountPage />
      } />
      <Route path='/' element={<MyActiveAccountsPage />
      } />
      <Route
        path="*"
        element={<Navigate replace to='/'/>}
      />
    </Routes>
  )
}