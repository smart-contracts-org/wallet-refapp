import { useFetch, useFetchByKey, useLedger, useParty } from '@daml/react';
import { Account, Asset } from '@daml.js/wallet-refapp';
import { useStreamQueries } from '@daml/react';
import { Choice, ContractId } from '@daml/types';
import { Accept_Transfer, AssetTransfer, Cancel_Transfer, Reject_Transfer } from '@daml.js/wallet-refapp/lib/Asset';
import { AssetHoldingAccount, AssetHoldingAccountProposal } from '@daml.js/wallet-refapp/lib/Account';
import { ActionType } from '../pages/PendingAssetInviteDetailsPage';
import { Archive } from '@daml.js/d14e08374fc7197d6a0de468c968ae8ba3aadbf9315476fd39071831f5923662/lib/DA/Internal/Template';

export const useGetAllAssetAccounts = () => {
  const myPartyId = useParty();
  const assetHoldingAccounts = useStreamQueries(Account.AssetHoldingAccount, () => [{owner: myPartyId}]);
  return assetHoldingAccounts
}

// used to get all of user's issued assets
export const useGetMyIssuedAssetAccounts = () => {
  const party = useParty();
  const assetHoldingAccounts = useStreamQueries(Account.AssetHoldingAccount, () => [{ assetType: { issuer: party } }]);
  return assetHoldingAccounts
}
interface UseGetMyOwnedAssetsByAssetType {
  issuer: string;
  owner: string;
  symbol: string;
  reference?: string;
  isFungible: boolean;
  isShareable?: boolean;
  isAirdroppable?: boolean;
}

// Get all Asset owned templates based on fields
export const useGetMyOwnedAssetsByAssetType = ({ issuer, symbol, isFungible, owner, reference }: UseGetMyOwnedAssetsByAssetType) => {
  const assetHoldingAccounts = useStreamQueries(Asset.Asset, () => [{ owner, assetType: { issuer, symbol, fungible: isFungible, reference } }]);
  return assetHoldingAccounts
}
export const useGetAssetHoldingAccount = ({ isAirdroppable, isShareable, issuer, symbol, isFungible, owner, reference }: UseGetMyOwnedAssetsByAssetType) => {
  const assetHoldingAccount = useStreamQueries(Account.AssetHoldingAccount, () => [{ airdroppable: isAirdroppable, reshareable: isShareable, owner, assetType: { issuer, symbol, fungible: isFungible, reference } }]);
  return assetHoldingAccount
}

interface GetSingleAssetSendRequest {
  recipient: string;
  symbol: string;
  isFungible: boolean;
  reference: string;
  amount: string;
  owner: string;
  issuer: string;
}

interface useGetAssetTransferByContractId {
  contractId: ContractId<AssetTransfer>;
}


export const useGetAssetTransferByContractId = (arg: useGetAssetTransferByContractId) => {
  const contract = useFetch(Asset.AssetTransfer, arg.contractId)
  return contract
}
export interface AssetType {
  issuer: string;
  symbol: string;
  fungible: boolean;
  reference: string;
}
export const useGetAssetAccountByKey = (assetType: AssetType) => {
  const myPartyId = useParty();
  const contract = useFetchByKey(Account.AssetHoldingAccount, () => ({_1: assetType, _2: myPartyId}), []);
  return contract
}

export const useGetAssetHoldingInviteByContractId = (arg: ContractId<AssetHoldingAccountProposal>) => {
  const contract = useFetch(Account.AssetHoldingAccountProposal, arg)
  return contract
}

export const useGetSingleAssetSendRequest = (args: GetSingleAssetSendRequest) => {
  console.log(args)
  const { recipient, symbol, isFungible, reference, amount, owner, issuer } = args;
  const singleAssetSendRequest = useStreamQueries(Asset.AssetTransfer, () => [{ recipient, asset: { amount, owner, assetType: { issuer, fungible: isFungible, symbol, reference } } }]);
  return singleAssetSendRequest
}
// TODO: rename to get all
export const useGetAssetSendRequests = (isInbound?: boolean) => {
  const myPartyId = useParty();
  const allAssetSendRequests = useStreamQueries(Asset.AssetTransfer, () => [{ recipient: isInbound ? myPartyId : undefined }]);
  return allAssetSendRequests
}

// Asset Invites
export const useGetAssetInviteRequests = (isInbound?: boolean) => {
  const myPartyId = useParty();
  const allAssetSendRequests = useStreamQueries(Account.AssetHoldingAccountProposal, () => [{ recipient: isInbound ? myPartyId : undefined }]);
  return allAssetSendRequests
}

export const useGetMyInboundAssetSendRequests = () => {
  const party = useParty();
  const allAssetSendRequests = useStreamQueries(Asset.AssetTransfer, () => [{ recipient: party }]);
  return allAssetSendRequests
}

//TODO;
export const useGetAssetSwapRequests = () => {
  const assetHoldingAccount = useStreamQueries(Asset.AssetTransfer);
  return assetHoldingAccount
}
export const useGetAssetAccountInvites = () => {
  const assetHoldingAccount = useStreamQueries(Account.AssetHoldingAccountCloseProposal);
  return assetHoldingAccount
}



interface SendAsset {
  assetAccountCid: ContractId<Account.AssetHoldingAccount>;
  amount: any;
  recipient: any;
  assetCids: any
}

interface CancelAssetTransfer {
  assetTransferCid: ContractId<Asset.Cancel_Transfer>;
  amount: any;
  recipient: any;
  assetCids: any
}

export const useLedgerHooks = () => {
  const ledger = useLedger();
  const party = useParty();

  const sendAsset = async ({ assetAccountCid, amount, recipient, assetCids }: SendAsset) => {
    console.log(assetAccountCid, amount, recipient, assetCids)
    try {
      // TODO: update documentation
      // needing to use _1:, _2:, not obvious enough.
      // how to parse error messages? not user friendly
      const result = await ledger.exercise(Account.AssetHoldingAccount.Create_Transfers, assetAccountCid, {
        assetCids, transfers: [{ _1: amount, _2: recipient }]
      });

      return { isOk: true, payload: result }

    } catch (e) {
      return { isOk: false, payload: e }

    }
  }

  const inviteNewAssetHolder = async (recipient: string, assetAccountCid: ContractId<AssetHoldingAccount>) => {
    try {
      // TODO: update documentation
      // needing to use _1:, _2:, not obvious enough.
      // how to parse error messages? not user friendly
      const result = await ledger.exercise(Account.AssetHoldingAccount.Invite_New_Asset_Holder, assetAccountCid, {
        recipient
      });

      return { isOk: true, payload: result }

    } catch (e) {
      return { isOk: false, payload: e }

    }
  }


  const acceptAssetTransfer = async (accountHoldingCid: ContractId<Account.AssetHoldingAccount>, transferCid: ContractId<Asset.AssetTransfer>) => {
    try {
      console.log('assettansfer', accountHoldingCid)
      const result = await ledger.exercise(Account.AssetHoldingAccount.Deposit_Transfer_Into_Account, accountHoldingCid, { transferCid
      });

      return { isOk: true, payload: result }

    } catch (e) {
      return { isOk: false, payload: e }

    }
  }

  const exerciseAssetHolderInvite = async (assetHoldingAccountProposalCid: ContractId<Asset.Accept_Transfer | Asset.Cancel_Transfer | Asset.Reject_Transfer>, action: ActionType) => {
    interface Map  {
      accept:  Choice<Cancel_Transfer | Accept_Transfer | Reject_Transfer, {}, {}, undefined>,
      reject:  Choice<Cancel_Transfer | Accept_Transfer | Reject_Transfer, {}, {}, undefined>,
      cancel:  Choice<Account.AssetHoldingAccountProposal, {}, {}, undefined> & Choice<Account.AssetHoldingAccountProposal, Archive, {}, undefined>


      
    }
    const map: Map = {
      accept: Account.AssetHoldingAccountProposal.AssetHoldingAccountProposal_Accept,
      reject: Account.AssetHoldingAccountProposal.AssetHoldingAccountProposal_Reject,
      cancel: Account.AssetHoldingAccountProposal.Archive
    }

    try {
      // TODO: update documentation
      // needing to use _1:, _2:, not obvious enough.
      // how to parse error messages? not user friendly
      // TODO: Fix this type error
      const result = await ledger.exercise(map[action], assetHoldingAccountProposalCid, {
      });

      return { isOk: true, payload: result }

    } catch (e) {
      return { isOk: false, payload: e }

    }
  }


  const cancelAssetTransfer = async (assetTransferCid: ContractId<Asset.Cancel_Transfer>) => {
    try {
      const result = await ledger.exercise(Asset.AssetTransfer.Cancel_Transfer, assetTransferCid, {
      });

      return { isOk: true, payload: result }

    } catch (e) {
      return { isOk: false, payload: e }

    }
  }

  const issueAsset = async ({ amount, ticker, isFungible }: { amount: string, ticker: string, isFungible: boolean }) => {
    try {
      const asset = await ledger.create(Asset.Asset, {
        assetType: { issuer: party, symbol: ticker, fungible: isFungible, reference: '' },
        owner: party,
        amount
      })
      return { isOk: true, payload: asset }
    } catch (e) {
      return { isOk: false, payload: e }
    }
  }
  

  const createAssetAccount = async ({ ticker, isAirdroppable, isFungible, isShareable }: { ticker: string, isFungible: boolean; reference: string, isAirdroppable: boolean, isShareable: boolean }) => {
    try {
      const assetAccount = await ledger.create(Account.AssetHoldingAccount, {
        assetType: { issuer: party, symbol: ticker, fungible: isFungible, reference: '' },
        owner: party,
        airdroppable: isAirdroppable,
        resharable: isShareable
      })
      return { isOk: true, payload: assetAccount }
    } catch (e) {
      return { isOk: false, payload: e }
    }
  }

  return { exerciseAssetHolderInvite, inviteNewAssetHolder, acceptAssetTransfer, cancelAssetTransfer, sendAsset, createAssetAccount, issueAsset }

}