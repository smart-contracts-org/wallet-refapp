type AssetAccount = {
  ticker: string;
  quantity: number;
  issuer: string;
  owner: string;
  isShareable: boolean;
  isFungible: boolean;
  isAirdroppable: boolean;
}

interface TempState {
  assetAccounts: AssetAccount[]
}

export const tempState: TempState = {
  assetAccounts: [
  ]
}