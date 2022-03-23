import { useFetch, useFetchByKey, useLedger, useParty } from '@daml/react';
import { Account, Asset } from '@daml.js/wallet-refapp';
import { useStreamQueries } from '@daml/react';
import { Choice, ContractId } from '@daml/types';
import { Accept_Transfer, AssetTransfer, Cancel_Transfer, Reject_Transfer } from '@daml.js/wallet-refapp/lib/Asset';
import { AssetHoldingAccountProposal } from '@daml.js/wallet-refapp/lib/Account';
import { ActionType } from '../pages/PendingAssetInviteDetailsPage';
import { Archive } from '@daml.js/d14e08374fc7197d6a0de468c968ae8ba3aadbf9315476fd39071831f5923662/lib/DA/Internal/Template';
import { makeDamlSet } from '../utils/common';
import { Trade, TransferPreApproval } from '@daml.js/wallet-refapp/lib/Trade/module';

export const useGetAllAssetAccounts = () => {
  const myPartyId = useParty();
  const assetHoldingAccounts = useStreamQueries(Account.AssetHoldingAccount, () => [{ owner: myPartyId }]);
  return assetHoldingAccounts
}

// used to get all of user's issued assets
interface UseGetMyIssuedAssetAccounts {
  symbol: string;
  reference: string;
  fungible: boolean;
}
export const useGetMyIssuedAssetAccounts = (args: UseGetMyIssuedAssetAccounts) => {
  const party = useParty();
  const { fungible, reference, symbol } = args;
  return useStreamQueries(Account.AssetHoldingAccount, () => [{ assetType: { issuer: party, fungible, reference, symbol } }]);

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
  console.log('USE GET MY OWNED ASSETS BY ASSET')
  console.log('args from ledgerr hook', issuer, owner, isFungible, symbol)
  const assetContracts = useStreamQueries(Asset.Asset, () => [{ owner, assetType: { issuer, symbol, fungible: isFungible, reference } }]);
  console.log('asset contrcts', assetContracts)
  return assetContracts
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

interface useGetAssetTransferByContractIdArgs {
  contractId: ContractId<AssetTransfer>;
}


export const useGetAssetTransferByContractId = (arg: useGetAssetTransferByContractIdArgs) => {
  const contract = useFetch(Asset.AssetTransfer, arg.contractId)
  return contract
}
export const useGetAssetContractByContractId = (contractId: ContractId<Asset.Asset>) => {
  const contract = useFetch(Asset.Asset, contractId)
  return contract
}
export const useGetTradeContractByCid = (tradeContractId: ContractId<Trade>) => {
  const contract = useFetch(Trade, tradeContractId)
  return contract
}
export const useGetTransferPreapprovalContractByContractId = (contractId: ContractId<TransferPreApproval>) => {
  const contract = useFetch(TransferPreApproval, contractId)
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
  const contract = useFetchByKey(Account.AssetHoldingAccount, () => ({ _1: assetType, _2: myPartyId }), []);
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
export const useGetAssetSwapRequests = (isInbound ? : boolean) => {
  const myPartyId = useParty();
  const trades = useStreamQueries(Trade, () => [{ receiver: isInbound ? myPartyId : undefined, proposer: isInbound? undefined : myPartyId } ]);
  return trades
}

// Asset Invites
export const useGetAssetInviteRequests = (isInbound?: boolean) => {
  const myPartyId = useParty();
  const allAssetSendRequests = useStreamQueries(Account.AssetHoldingAccountProposal, () => [{ recipient: isInbound ? myPartyId : undefined }]);
  return allAssetSendRequests
}
// Used to get all propsals for an assetType


export const useGetAccountInvitesByAssetType = (args: Omit<AssetType, "issuer">) => {
  const myPartyId = useParty();

  const { reference, symbol, fungible } = args;
  const AccountInvites = useStreamQueries(Account.AssetHoldingAccountProposal, () => [{ account: { assetType: { issuer: myPartyId, symbol, reference, fungible } } }]);
  return AccountInvites
}

export const useGetMyInboundAssetSendRequests = () => {
  const party = useParty();
  const allAssetSendRequests = useStreamQueries(Asset.AssetTransfer, () => [{ recipient: party }]);
  return allAssetSendRequests
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


  interface InviteNewAssetHolder {
    assetType: {
      issuer: string,
      symbol: string,
      reference: string,
      fungible: boolean
    },
    owner: string,
    recipient: string
  }
  interface ExerciseAirdrop {
    assetType: {
      issuer: string,
      symbol: string,
      reference: string,
      fungible: boolean
    },
    amount: string,
    owner: string,
  }

  interface ProposeSwap {
    outAmount: string;
    // Out AssetType, used to grab assetAccountHolding by key
    outSymbol: string;
    outFungible: boolean;
    outReference: string;
    outIssuer: string;
    inOwner: string;
    outAssetCids: ContractId<Asset.Asset>[];
    inAmount: string;
    inIssuer: string;
    inSymbol: string;
    inFungible: boolean;
    inReference: string;
  }
  const proposeSwap = async (args: ProposeSwap) => {
    const { inOwner, outSymbol, outFungible, outIssuer, outReference, outAmount, outAssetCids, inAmount, inIssuer, inSymbol, inFungible, inReference } = args;
    try {
      
      const result = await ledger.exerciseByKey(Account.AssetHoldingAccount.Create_Trade, { _1: { issuer: outIssuer, symbol: outSymbol, reference: outReference, fungible: outFungible }, _2: party }, {
        // offered Cids
        assetCids: outAssetCids, 
        offeredAssetAmount: outAmount, 
        requestedAsset: {
          assetType: {
            issuer: inIssuer,
            fungible: inFungible,
            reference: inReference,
            symbol: inSymbol,
          },
          owner: inOwner,
          amount: inAmount,
          observers: makeDamlSet<string>([])


        }

      })

      // const result = await ledger.exercise(Account.AssetHoldingAccount.Invite_New_Asset_Holder, assetAccountCid, {
      //   recipient
      // });

      return { isOk: true, payload: result }

    } catch (e) {
      return { isOk: false, payload: e }

    }
  }
  interface ExerciseMergeSplit {
    outSymbol: string;
    outFungible: boolean;
    outReference: string;
    outIssuer: string;
    assetCids: ContractId<Asset.Asset>[];
    outputAmount: string;
  }
  const exerciseMergeSplit = async (args: ExerciseMergeSplit) => {
    const { assetCids, outputAmount, outSymbol, outFungible, outIssuer, outReference } = args;
    try {
      // TODO: update documentation
      // needing to use _1:, _2:, not obvious enough.
      // how to parse error messages? not user friendly
      const result = await ledger.exerciseByKey(Account.AssetHoldingAccount.Merge_Split, { _1: { issuer: outIssuer, symbol: outSymbol, reference: outReference, fungible: outFungible }, _2: party }, {
        assetCids: assetCids, outputAmounts: [outputAmount], 
      })
      
      // const result = await ledger.exercise(Account.AssetHoldingAccount.Invite_New_Asset_Holder, assetAccountCid, {
      //   recipient
      // });

      return { isOk: true, payload: result }

    } catch (e) {
      return { isOk: false, payload: e }

    }
  }
  interface ExercisePreapprove {
    issuer: string;
    fungible: boolean;
    reference: string;
    symbol: string;
    amount: string;
    owner: string;
    
  }
  const exercisePreApprove = async (args: ExercisePreapprove) => {
    const {issuer,owner,fungible, reference, symbol, amount } = args;
    try {
      // TODO: update documentation
      // needing to use _1:, _2:, not obvious enough.
      // how to parse error messages? not user friendly
      const result = await ledger.exerciseByKey(Account.AssetHoldingAccount.Preapprove_Transfer_In, { _1: { issuer, symbol, reference, fungible }, _2: party }, {
        asset: {
          assetType: {
            issuer, 
            symbol, 
            fungible, 
            reference
          },
          owner,
          amount,
          observers: makeDamlSet<string>([])
        }
      })
      
      // const result = await ledger.exercise(Account.AssetHoldingAccount.Invite_New_Asset_Holder, assetAccountCid, {
      //   recipient
      // });

      return { isOk: true, payload: result }

    } catch (e) {
      return { isOk: false, payload: e }

    }
  }

  const exerciseAirdrop = async (args: ExerciseAirdrop) => {
    const { assetType, amount, owner } = args;
    const { issuer, symbol, reference, fungible } = assetType;
    try {
      // TODO: update documentation
      // needing to use _1:, _2:, not obvious enough.
      // how to parse error messages? not user friendly
      const result = await ledger.exerciseByKey(Account.AssetHoldingAccount.Airdrop, { _1: { issuer, symbol, reference, fungible }, _2: owner }, { amount })
      // const result = await ledger.exercise(Account.AssetHoldingAccount.Invite_New_Asset_Holder, assetAccountCid, {
      //   recipient
      // });

      return { isOk: true, payload: result }

    } catch (e) {
      return { isOk: false, payload: e }

    }
  }
  const inviteNewAssetHolder = async (args: InviteNewAssetHolder) => {
    const { assetType, owner, recipient } = args;
    const { issuer, symbol, reference, fungible } = assetType;
    try {
      // TODO: update documentation
      // needing to use _1:, _2:, not obvious enough.
      // how to parse error messages? not user friendly
      const result = await ledger.exerciseByKey(Account.AssetHoldingAccount.Invite_New_Asset_Holder, { _1: { issuer, symbol, reference, fungible }, _2: owner }, { recipient })
      // const result = await ledger.exercise(Account.AssetHoldingAccount.Invite_New_Asset_Holder, assetAccountCid, {
      //   recipient
      // });

      return { isOk: true, payload: result }

    } catch (e) {
      return { isOk: false, payload: e }

    }
  }


  const acceptAssetTransfer = async (accountHoldingCid: ContractId<Account.AssetHoldingAccount>, transferCid: ContractId<Asset.AssetTransfer>) => {
    try {
      const result = await ledger.exercise(Account.AssetHoldingAccount.Deposit_Transfer_Into_Account, accountHoldingCid, {
        transferCid
      });

      return { isOk: true, payload: result }

    } catch (e) {
      return { isOk: false, payload: e }

    }
  }

  const exerciseAssetHolderInvite = async (assetHoldingAccountProposalCid: ContractId<Asset.Accept_Transfer | Asset.Cancel_Transfer | Asset.Reject_Transfer>, action: ActionType) => {
    interface Map {
      accept: Choice<Cancel_Transfer | Accept_Transfer | Reject_Transfer, {}, {}, undefined>,
      reject: Choice<Cancel_Transfer | Accept_Transfer | Reject_Transfer, {}, {}, undefined>,
      cancel: Choice<Account.AssetHoldingAccountProposal, {}, {}, undefined> & Choice<Account.AssetHoldingAccountProposal, Archive, {}, undefined>



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
  interface AssetTransferChoies {
    cancel: Choice<Asset.AssetTransfer, Asset.Cancel_Transfer, ContractId<Asset.Asset>, undefined>,
    reject: Choice<Asset.AssetTransfer, Asset.Reject_Transfer, ContractId<Asset.Asset>, undefined>
  }

  const assetTransferChoices: AssetTransferChoies = {
    cancel: Asset.AssetTransfer.Cancel_Transfer,
    reject: Asset.AssetTransfer.Reject_Transfer
  }

  const exerciseAssetTransferChoice = async (assetTransferCid: ContractId<Asset.AssetTransfer>, action: 'cancel' | 'reject') => {
    try {
      const result = await ledger.exercise(assetTransferChoices[action], assetTransferCid, {
      });

      return { isOk: true, payload: result }

    } catch (e) {
      return { isOk: false, payload: e }

    }
  }

  
  const exerciseTradeSettle = async (tradeCid: ContractId<Trade>, requestedAsset: ContractId<Asset.Asset>, offeredTxPreApproval: ContractId<TransferPreApproval> ) => {
    try {
      const result = await ledger.exercise(Trade.Trade_Settle, tradeCid, {
        requestedAsset,
        offeredTxPreApproval
      });

      return { isOk: true, payload: result }

    } catch (e) {
      return { isOk: false, payload: e }

    }
  }
  const exerciseTradeCancel = async (tradeCid: ContractId<Trade> ) => {
    try {
      const result = await ledger.exercise(Trade.Trade_Cancel, tradeCid, {
      });

      return { isOk: true, payload: result }

    } catch (e) {
      return { isOk: false, payload: e }
    }
  }
  const exerciseTradeReject = async (tradeCid: ContractId<Trade> ) => {
    try {
      const result = await ledger.exercise(Trade.Trade_Reject, tradeCid, {
      });

      return { isOk: true, payload: result }

    } catch (e) {
      return { isOk: false, payload: e }
    }
  }

  const cancelAssetTransfer = async (assetTransferCid: ContractId<Asset.AssetTransfer>) => {
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
        amount,
        observers: makeDamlSet<string>([party])
      })
      return { isOk: true, payload: asset }
    } catch (e) {
      console.log(e)
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

  return {exercisePreApprove, exerciseTradeReject, exerciseTradeCancel, exerciseTradeSettle, exerciseMergeSplit, proposeSwap, exerciseAirdrop, exerciseAssetTransferChoice, exerciseAssetHolderInvite, inviteNewAssetHolder, acceptAssetTransfer, cancelAssetTransfer, sendAsset, createAssetAccount, issueAsset }

}