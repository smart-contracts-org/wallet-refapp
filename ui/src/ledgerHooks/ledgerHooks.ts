import { useLedger, useParty } from '@daml/react';
import { Account, Asset } from '@daml.js/wallet-refapp';
import { useStreamQueries } from '@daml/react';

export const useGetAllAssetAccounts = () => {
  const assetHoldingAccounts = useStreamQueries(Account.AssetHoldingAccount);
  return assetHoldingAccounts
}

// used to get all of user's issued assets
export const useGetMyIssuedAssetAccounts = () => {
  const party = useParty();
  const assetHoldingAccounts = useStreamQueries(Account.AssetHoldingAccount, () => [{assetType: {issuer: party}}]);
  return assetHoldingAccounts
}
interface UseGetMyOwnedAssetsByAssetType {
  issuer: string;
  owner: string;
  symbol: string;
  isFungible: boolean;
  reference?: string;
}

// Get all Asset owned templates based on fields
export const useGetMyOwnedAssetsByAssetType = ({issuer, symbol, isFungible, owner, reference}: UseGetMyOwnedAssetsByAssetType) => {
  const assetHoldingAccounts = useStreamQueries(Asset.Asset, () => [{owner, assetType: {issuer, symbol, fungible: isFungible, reference}}]);
  return assetHoldingAccounts
}
export const useGetAssetAccountByAssetType = ({issuer, symbol, isFungible, owner, reference}: UseGetMyOwnedAssetsByAssetType) => {
  const assetHoldingAccounts = useStreamQueries(Account.AssetHoldingAccount, () => [{owner, assetType: {issuer, symbol, fungible: isFungible, reference}}]);
  return assetHoldingAccounts
}

export const useLedgerHooks = () => {
  const ledger = useLedger();
  const party = useParty();

  const issueAsset = async ({amount, ticker, isFungible }: { amount: string, ticker: string, isFungible: boolean}) => {
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

  return { createAssetAccount, issueAsset }

}