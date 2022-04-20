import { useFetch, useFetchByKey, useLedger, useParty } from '@daml/react';
import { useStreamQueries } from '@daml/react';
import { Choice, ContractId } from '@daml/types';
import { ActionType } from '../pages/PendingAssetInviteDetailsPage';
import { makeDamlSet } from '../utils/common';
import { AssetHoldingAccount, AssetHoldingAccountProposal, AssetInSwap, Trade, TransferPreApproval, AssetHoldingAccountCloseProposal, AirdropRequest } from '@daml.js/account/lib/Account/';
import { AssetTransfer, Asset, Reject_Transfer, Accept_Transfer, Cancel_Transfer, AssetType} from '@daml.js/asset/lib/Asset/';
import { Archive } from '@asset.js/d14e08374fc7197d6a0de468c968ae8ba3aadbf9315476fd39071831f5923662/lib/DA/Internal/Template';

export const useGetAllAssetHoldingAccounts = () => {
  const myPartyId = useParty();
  const res = useStreamQueries(AssetHoldingAccount, () => [{ owner: myPartyId }]);
  return res
}

interface UseGetMyIssuedAssetAccounts {
  symbol: string;
  reference: string;
  fungible: boolean;
}
export const useGetMyIssuedAssetAccounts = (args: UseGetMyIssuedAssetAccounts) => {
  const party = useParty();
  const { fungible, reference, symbol } = args;
  return useStreamQueries(AssetHoldingAccount, () => [{ assetType: { issuer: party, fungible, reference, symbol } }]);

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

export const useGetMyOwnedAssetsByAssetType = (args: UseGetMyOwnedAssetsByAssetType) => {
  const { issuer, symbol, isFungible, owner, reference } = args  
  const res = useStreamQueries(Asset, () => [{ owner, assetType: { issuer, symbol, fungible: isFungible, reference } }]);
  return res
}

export const useGetAssetHoldingAccount = ({ isAirdroppable, isShareable, issuer, symbol, isFungible, owner, reference }: UseGetMyOwnedAssetsByAssetType) => {
  const assetHoldingAccount = useStreamQueries(AssetHoldingAccount, () => [{ airdroppable: isAirdroppable, reshareable: isShareable, owner, assetType: { issuer, symbol, fungible: isFungible, reference } }]);
  return assetHoldingAccount
}

interface useGetAssetTransferByContractIdArgs {
  contractId: ContractId<AssetTransfer>;
}

export const useGetAssetTransferByContractId = (arg: useGetAssetTransferByContractIdArgs) => {
  const contract = useFetch(AssetTransfer, arg.contractId)
  return contract
}

export const useGetAssetContractByContractId = (contractId: ContractId<Asset>) => {
  const contract = useFetch(Asset, contractId)
  return contract
}
export const useGetAssetInSwapContractByContractId = (contractId: ContractId<AssetInSwap>) => {
  const contract = useFetch(AssetInSwap, contractId)
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

export const useGetMyAssetAccountByKey = (assetType: AssetType) => {
  const myPartyId = useParty();
  const contract = useFetchByKey(AssetHoldingAccount, () => ({ _1: assetType, _2: myPartyId }), []);
  return contract
}

export const useGetAssetHoldingInviteByContractId = (arg: ContractId<AssetHoldingAccountProposal>) => {
  const contract = useFetch(AssetHoldingAccountProposal, arg)
  return contract
}

export const useGetAssetTransfers = (isInbound?: boolean) => {
  const myPartyId = useParty();
  const res = useStreamQueries(AssetTransfer, () => [{ recipient: isInbound ? myPartyId : undefined, asset: {owner: isInbound ? undefined : myPartyId} }]);
  console.log('res', res)
  return res
}
export const useGetAssetSwapRequests = (isInbound?: boolean) => {
  const myPartyId = useParty();
  const trades = useStreamQueries(Trade, () => [{ receiver: isInbound ? myPartyId : undefined, proposer: isInbound ? undefined : myPartyId }]);
  return trades
}

// Asset Invites
export const useGetAssetInviteRequests = (isInbound?: boolean) => {
  const myPartyId = useParty();
  const allAssetSendRequests = useStreamQueries(AssetHoldingAccountProposal, () => [{ recipient: isInbound ? myPartyId : undefined }]);
  return allAssetSendRequests
}
// Used to get all propsals for an assetType
export const useGetAccountInvitesByAssetType = (args: Omit<AssetType, "issuer">) => {
  const myPartyId = useParty();

  const { reference, symbol, fungible } = args;
  const AccountInvites = useStreamQueries(AssetHoldingAccountProposal, () => [{ account: { assetType: { issuer: myPartyId, symbol, reference, fungible } } }]);
  return AccountInvites
}

export const useGetMyInboundAssetSendRequests = () => {
  const party = useParty();
  const allAssetSendRequests = useStreamQueries(AssetTransfer, () => [{ recipient: party }]);
  return allAssetSendRequests
}

export const useGetAssetAccountInvites = () => {
  const assetHoldingAccount = useStreamQueries(AssetHoldingAccountCloseProposal);
  return assetHoldingAccount
}

interface SendAsset {
  assetAccountCid: ContractId<AssetHoldingAccount>;
  amount: any;
  recipient: any;
  assetCids: any
}


export const useLedgerHooks = () => {
  const ledger = useLedger();
  const party = useParty();

  const sendAsset = async ({ assetAccountCid, amount, recipient, assetCids }: SendAsset) => {
    try {
      // TODO: suggest react/daml documentation improvement.
      // needing to use _1:, _2:, not obvious enough.
      // how to parse error messages? not user friendly
      const result = await ledger.exercise(AssetHoldingAccount.Create_Transfers, assetAccountCid, {
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
    outAssetCids: ContractId<Asset>[];
    inAmount: string;
    inIssuer: string;
    inSymbol: string;
    inFungible: boolean;
    inReference: string;
  }
  const proposeSwap = async (args: ProposeSwap) => {
    const { inOwner, outSymbol, outFungible, outIssuer, outReference, outAmount, outAssetCids, inAmount, inIssuer, inSymbol, inFungible, inReference } = args;
    try {

      const result = await ledger.exerciseByKey(AssetHoldingAccount.Create_Trade, { _1: { issuer: outIssuer, symbol: outSymbol, reference: outReference, fungible: outFungible }, _2: party }, {
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
    assetCids: ContractId<Asset>[];
    outputAmount: string;
  }
  const exerciseMergeSplit = async (args: ExerciseMergeSplit) => {
    const { assetCids, outputAmount, outSymbol, outFungible, outIssuer, outReference } = args;
    try {
      // TODO: update documentation
      // needing to use _1:, _2:, not obvious enough.
      // how to parse error messages? not user friendly
      const result = await ledger.exerciseByKey(AssetHoldingAccount.Merge_Split, { _1: { issuer: outIssuer, symbol: outSymbol, reference: outReference, fungible: outFungible }, _2: party }, {
        assetCids: assetCids, outputAmounts: [outputAmount],
      })

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
    const { issuer, owner, fungible, reference, symbol, amount } = args;
    try {
      // TODO: update documentation
      // needing to use _1:, _2:, not obvious enough.
      // how to parse error messages? not user friendly
      const result = await ledger.exerciseByKey(AssetHoldingAccount.Preapprove_Transfer_In, { _1: { issuer, symbol, reference, fungible }, _2: party }, {
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
      const result = await ledger.exerciseByKey(AssetHoldingAccount.Airdrop, { _1: { issuer, symbol, reference, fungible }, _2: owner }, { amount })
      // const result = await ledger.exercise(AssetHoldingAccount.Invite_New_Asset_Holder, assetAccountCid, {
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
      const result = await ledger.exerciseByKey(AssetHoldingAccount.Invite_New_Asset_Holder, { _1: { issuer, symbol, reference, fungible }, _2: owner }, { recipient })
      // const result = await ledger.exercise(AssetHoldingAccount.Invite_New_Asset_Holder, assetAccountCid, {
      //   recipient
      // });

      return { isOk: true, payload: result }

    } catch (e) {
      return { isOk: false, payload: e }

    }
  }


  const acceptAssetTransfer = async (accountHoldingCid: ContractId<AssetHoldingAccount>, transferCid: ContractId<AssetTransfer>) => {
    try {
      const result = await ledger.exercise(AssetHoldingAccount.Deposit_Transfer_Into_Account, accountHoldingCid, {
        transferCid
      });

      return { isOk: true, payload: result }

    } catch (e) {
      return { isOk: false, payload: e }

    }
  }

  const exerciseAssetHolderInvite = async (assetHoldingAccountProposalCid: ContractId<Accept_Transfer | Cancel_Transfer | Reject_Transfer>, action: ActionType) => {
    interface Map {
      accept: Choice<Cancel_Transfer | Accept_Transfer | Reject_Transfer, {}, {}, undefined>,
      reject: Choice<Cancel_Transfer | Accept_Transfer | Reject_Transfer, {}, {}, undefined>,
      cancel: Choice<AssetHoldingAccountProposal, {}, {}, undefined> & Choice<AssetHoldingAccountProposal, Archive, {}, undefined>



    }
    const map: Map = {
      accept: AssetHoldingAccountProposal.AssetHoldingAccountProposal_Accept,
      reject: AssetHoldingAccountProposal.AssetHoldingAccountProposal_Reject,
      cancel: AssetHoldingAccountProposal.Archive
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
    cancel: Choice<AssetTransfer, Cancel_Transfer, ContractId<Asset>, undefined>,
    reject: Choice<AssetTransfer, Reject_Transfer, ContractId<Asset>, undefined>
  }

  const assetTransferChoices: AssetTransferChoies = {
    cancel: AssetTransfer.Cancel_Transfer,
    reject: AssetTransfer.Reject_Transfer
  }

  const exerciseAssetTransferChoice = async (assetTransferCid: ContractId<AssetTransfer>, action: 'cancel' | 'reject') => {
    try {
      const result = await ledger.exercise(assetTransferChoices[action], assetTransferCid, {
      });

      return { isOk: true, payload: result }

    } catch (e) {
      return { isOk: false, payload: e }

    }
  }


  const exerciseTradeSettle = async (tradeCid: ContractId<Trade>, requestedAssetCids: ContractId<Asset>[]) => {
    try {
      const result = await ledger.exercise(Trade.Trade_Settle, tradeCid, {
        requestedAssetCids
      });

      return { isOk: true, payload: result }

    } catch (e) {
      return { isOk: false, payload: e }

    }
  }
  const exerciseTradeCancel = async (tradeCid: ContractId<Trade>) => {
    try {
      const result = await ledger.exercise(Trade.Trade_Cancel, tradeCid, {
      });

      return { isOk: true, payload: result }

    } catch (e) {
      return { isOk: false, payload: e }
    }
  }
  const exerciseTradeReject = async (tradeCid: ContractId<Trade>) => {
    try {
      const result = await ledger.exercise(Trade.Trade_Reject, tradeCid, {
      });

      return { isOk: true, payload: result }

    } catch (e) {
      return { isOk: false, payload: e }
    }
  }

  const cancelAssetTransfer = async (assetTransferCid: ContractId<AssetTransfer>) => {
    try {
      const result = await ledger.exercise(AssetTransfer.Cancel_Transfer, assetTransferCid, {
      });

      return { isOk: true, payload: result }

    } catch (e) {
      return { isOk: false, payload: e }

    }
  }

  const issueAsset = async ({ amount, ticker, isFungible, reference }: {reference: string, amount: string, ticker: string, isFungible: boolean }) => {
    try {
      const asset = await ledger.create(Asset, {
        assetType: { issuer: party, symbol: ticker, fungible: isFungible, reference },
        owner: party,
        amount,
        observers: makeDamlSet<string>([party])
      })
      return { isOk: true, payload: asset }
    } catch (e) {
      return { isOk: false, payload: e }
    }
  }

  const createAirdropRequest = async ({ amount, requester, assetHoldingAccountIssuer, assetHoldingAccountCid }: {requester: string, amount: string, assetHoldingAccountIssuer: string, assetHoldingAccountCid: ContractId<AssetHoldingAccount> }) => {
    try {
      const asset = await ledger.create(AirdropRequest, {
        requester: party,
        amount,
        assetHoldingAccountIssuer, 
        assetHoldingAccountCid
      })
      return { isOk: true, payload: asset }
    } catch (e) {
      return { isOk: false, payload: e }
    }
  }


  const createAssetAccount = async ({ ticker, isAirdroppable, isFungible, isShareable, reference }: { ticker: string, isFungible: boolean; reference: string, isAirdroppable: boolean, isShareable: boolean }) => {
    try {
      const assetAccount = await ledger.create(AssetHoldingAccount, {
        assetType: { issuer: party, symbol: ticker, fungible: isFungible, reference },
        owner: party,
        airdroppable: isAirdroppable,
        resharable: isShareable
      })
      return { isOk: true, payload: assetAccount }
    } catch (e) {
      return { isOk: false, payload: e }
    }
  }

  return {createAirdropRequest, exercisePreApprove, exerciseTradeReject, exerciseTradeCancel, exerciseTradeSettle, exerciseMergeSplit, proposeSwap, exerciseAirdrop, exerciseAssetTransferChoice, exerciseAssetHolderInvite, inviteNewAssetHolder, acceptAssetTransfer, cancelAssetTransfer, sendAsset, createAssetAccount, issueAsset }

}