import React from 'react';
import { Routes, Route, Navigate,} from 'react-router-dom';
import Credentials from '../Credentials';
import { AssetInvitePage } from './AssetInvitePage';
import { AssetProfilePage } from './AssetProfilePage';
import { CreateAssetAccountPage } from './CreateAssetAccountPage';
import { IssueAirdropPage } from './IssueAirdropPage';
import { LoginPage } from './LoginPage';
import { MyActiveAccountsPage } from './MyActiveAccounts';
import { PendingActivitiesPage } from './PendingActivitiesPage';
import { PendingActivityDetailsPage } from './PendingActivityDetailsPage/PendingActivityDetailsPage';
import { SendPage} from './SendPage';
import { SwapPage } from './SwapPage';

interface PagesProps {
  setCredentials: (credentials: Credentials) => void
}
export const Pages: React.FC<PagesProps> = ({setCredentials}) => {
  return (
    <Routes>
      <Route path='/asset' element={<AssetProfilePage />
      } />
      <Route path='/pending/:direction' element={<PendingActivitiesPage />
      } />
      <Route path='/pending-activity' element={<PendingActivityDetailsPage />
      } />
      <Route path='/send/:issuer/:ticker' element={<SendPage />
      } />
      <Route path='/swap/:issuer/:ticker' element={<SwapPage />
      } />
      <Route path='/issue/:issuer/:ticker' element={<IssueAirdropPage />
      } />
      <Route path='/invite/:issuer/:ticker' element={<AssetInvitePage />
      } />
      
      <Route path='/login' element={<LoginPage onLogin={setCredentials} />
      } />
      <Route path='/create' element={<CreateAssetAccountPage />
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