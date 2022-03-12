import { useLedger, useParty } from '@daml/react';
import { Account, Asset } from '@daml.js/wallet-refapp';
import { Party } from '@daml/types';
import { useStreamQueries } from '@daml/react';

export const useGetAllAssetAccounts = () => {
  const assetHoldingAccounts = useStreamQueries(Account.AssetHoldingAccount);
  return assetHoldingAccounts
}
export const useGetMyIssuedAssetAccounts = () => {
  const party = useParty();
  const assetHoldingAccounts = useStreamQueries(Account.AssetHoldingAccount, () => [{assetType: {issuer: party}}]);
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