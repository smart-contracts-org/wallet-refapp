import React from 'react'; 

export type AssetAccount = {
  ticker: string;
  quantity: number;
  isFungible: boolean;
  isAirdroppable: boolean;
  isShareable: boolean;
  issuer: string; 
  owner: string;
}

export interface AssetAccounts {
  [key: string]: AssetAccount
}

export interface State {
  assetAccounts: AssetAccounts, 
}

export interface ContractContextProps {
  state: State;
  addNewAccounts: (AssetAccount: AssetAccount) => void;
}

export const ContractsContext = React.createContext<ContractContextProps>({} as ContractContextProps)


export const useContracts = (): ContractContextProps => {
  const initialState: State = {
    assetAccounts: {
    }
  }
  const [allContracts, setAllContracts] = React.useState<State>(initialState)
  
  React.useEffect(() => {
    setAllContracts(initialState)
  }, [])

  const addNewAccounts = (newAssetAccount: AssetAccount) => {
    const newState = {...allContracts, assetAccounts: {...allContracts.assetAccounts, [newAssetAccount.ticker]: newAssetAccount}}
    setAllContracts(newState)
  }

  return {
    state: allContracts, 
    addNewAccounts
  }
}


export const ContractsProvider: React.FC = props => {
  const contracts = useContracts();
  return (
    <ContractsContext.Provider value={contracts}>
      {props.children}
    </ContractsContext.Provider>
  );
};