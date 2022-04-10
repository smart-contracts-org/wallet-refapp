// Generated from Trade.daml
/* eslint-disable @typescript-eslint/camelcase */
/* eslint-disable @typescript-eslint/no-namespace */
/* eslint-disable @typescript-eslint/no-use-before-define */
import * as jtv from '@mojotech/json-type-validation';
import * as damlTypes from '@daml/types';
/* eslint-disable-next-line @typescript-eslint/no-unused-vars */
import * as damlLedger from '@daml/ledger';

import * as pkg40f452260bef3f29dede136108fc08a88d5a5250310281067087da6f0baddff7 from '@daml.js/40f452260bef3f29dede136108fc08a88d5a5250310281067087da6f0baddff7';
import * as pkgd14e08374fc7197d6a0de468c968ae8ba3aadbf9315476fd39071831f5923662 from '@daml.js/d14e08374fc7197d6a0de468c968ae8ba3aadbf9315476fd39071831f5923662';

import * as Asset from '../Asset/module';

export declare type Accept_Swap = {
};

export declare const Accept_Swap:
  damlTypes.Serializable<Accept_Swap> & {
  }
;


export declare type Reject_Swap = {
};

export declare const Reject_Swap:
  damlTypes.Serializable<Reject_Swap> & {
  }
;


export declare type Cancel_Swap = {
};

export declare const Cancel_Swap:
  damlTypes.Serializable<Cancel_Swap> & {
  }
;


export declare type AssetInSwap = {
  asset: Asset.Asset;
  receiver: damlTypes.Party;
};

export declare interface AssetInSwapInterface {
  Cancel_Swap: damlTypes.Choice<AssetInSwap, Cancel_Swap, damlTypes.ContractId<Asset.Asset>, undefined>;
  Reject_Swap: damlTypes.Choice<AssetInSwap, Reject_Swap, damlTypes.ContractId<Asset.Asset>, undefined>;
  Accept_Swap: damlTypes.Choice<AssetInSwap, Accept_Swap, damlTypes.ContractId<Asset.Asset>, undefined>;
  Archive: damlTypes.Choice<AssetInSwap, pkgd14e08374fc7197d6a0de468c968ae8ba3aadbf9315476fd39071831f5923662.DA.Internal.Template.Archive, {}, undefined>;
}
export declare const AssetInSwap:
  damlTypes.Template<AssetInSwap, undefined, '5294563cf71d3cd0a7dd41495be721be50fa9db4f8d8c00ac6cab92ded518a89:Trade:AssetInSwap'> & AssetInSwapInterface;

export declare namespace AssetInSwap {
  export type CreateEvent = damlLedger.CreateEvent<AssetInSwap, undefined, typeof AssetInSwap.templateId>
  export type ArchiveEvent = damlLedger.ArchiveEvent<AssetInSwap, typeof AssetInSwap.templateId>
  export type Event = damlLedger.Event<AssetInSwap, undefined, typeof AssetInSwap.templateId>
  export type QueryResult = damlLedger.QueryResult<AssetInSwap, undefined, typeof AssetInSwap.templateId>
}



export declare type TransferPreApproval_TransferAssetInSwap = {
  assetInSwapCid: damlTypes.ContractId<AssetInSwap>;
};

export declare const TransferPreApproval_TransferAssetInSwap:
  damlTypes.Serializable<TransferPreApproval_TransferAssetInSwap> & {
  }
;


export declare type TransferPreApproval_TransferAsset = {
  txAssetCid: damlTypes.ContractId<Asset.Asset>;
};

export declare const TransferPreApproval_TransferAsset:
  damlTypes.Serializable<TransferPreApproval_TransferAsset> & {
  }
;


export declare type TransferPreApproval_Reject = {
};

export declare const TransferPreApproval_Reject:
  damlTypes.Serializable<TransferPreApproval_Reject> & {
  }
;


export declare type TransferPreApproval_Cancel = {
};

export declare const TransferPreApproval_Cancel:
  damlTypes.Serializable<TransferPreApproval_Cancel> & {
  }
;


export declare type TransferPreApproval = {
  asset: Asset.Asset;
  newOwner: damlTypes.Party;
};

export declare interface TransferPreApprovalInterface {
  TransferPreApproval_Cancel: damlTypes.Choice<TransferPreApproval, TransferPreApproval_Cancel, {}, undefined>;
  TransferPreApproval_Reject: damlTypes.Choice<TransferPreApproval, TransferPreApproval_Reject, {}, undefined>;
  TransferPreApproval_TransferAsset: damlTypes.Choice<TransferPreApproval, TransferPreApproval_TransferAsset, damlTypes.ContractId<Asset.Asset>, undefined>;
  TransferPreApproval_TransferAssetInSwap: damlTypes.Choice<TransferPreApproval, TransferPreApproval_TransferAssetInSwap, damlTypes.ContractId<Asset.Asset>, undefined>;
  Archive: damlTypes.Choice<TransferPreApproval, pkgd14e08374fc7197d6a0de468c968ae8ba3aadbf9315476fd39071831f5923662.DA.Internal.Template.Archive, {}, undefined>;
}
export declare const TransferPreApproval:
  damlTypes.Template<TransferPreApproval, undefined, '5294563cf71d3cd0a7dd41495be721be50fa9db4f8d8c00ac6cab92ded518a89:Trade:TransferPreApproval'> & TransferPreApprovalInterface;

export declare namespace TransferPreApproval {
  export type CreateEvent = damlLedger.CreateEvent<TransferPreApproval, undefined, typeof TransferPreApproval.templateId>
  export type ArchiveEvent = damlLedger.ArchiveEvent<TransferPreApproval, typeof TransferPreApproval.templateId>
  export type Event = damlLedger.Event<TransferPreApproval, undefined, typeof TransferPreApproval.templateId>
  export type QueryResult = damlLedger.QueryResult<TransferPreApproval, undefined, typeof TransferPreApproval.templateId>
}



export declare type Trade_Settle = {
  requestedAssetCid: damlTypes.ContractId<Asset.Asset>;
  offeredTxPreApprovalCid: damlTypes.ContractId<TransferPreApproval>;
};

export declare const Trade_Settle:
  damlTypes.Serializable<Trade_Settle> & {
  }
;


export declare type Trade_Reject = {
};

export declare const Trade_Reject:
  damlTypes.Serializable<Trade_Reject> & {
  }
;


export declare type Trade_Cancel = {
};

export declare const Trade_Cancel:
  damlTypes.Serializable<Trade_Cancel> & {
  }
;


export declare type Trade = {
  proposer: damlTypes.Party;
  receiver: damlTypes.Party;
  offeredAssetCid: damlTypes.ContractId<AssetInSwap>;
  requestedAssetsTxPreApprovalCid: damlTypes.ContractId<TransferPreApproval>;
};

export declare interface TradeInterface {
  Trade_Cancel: damlTypes.Choice<Trade, Trade_Cancel, {}, undefined>;
  Trade_Reject: damlTypes.Choice<Trade, Trade_Reject, {}, undefined>;
  Trade_Settle: damlTypes.Choice<Trade, Trade_Settle, pkg40f452260bef3f29dede136108fc08a88d5a5250310281067087da6f0baddff7.DA.Types.Tuple2<damlTypes.ContractId<Asset.Asset>, damlTypes.ContractId<Asset.Asset>>, undefined>;
  Archive: damlTypes.Choice<Trade, pkgd14e08374fc7197d6a0de468c968ae8ba3aadbf9315476fd39071831f5923662.DA.Internal.Template.Archive, {}, undefined>;
}
export declare const Trade:
  damlTypes.Template<Trade, undefined, '5294563cf71d3cd0a7dd41495be721be50fa9db4f8d8c00ac6cab92ded518a89:Trade:Trade'> & TradeInterface;

export declare namespace Trade {
  export type CreateEvent = damlLedger.CreateEvent<Trade, undefined, typeof Trade.templateId>
  export type ArchiveEvent = damlLedger.ArchiveEvent<Trade, typeof Trade.templateId>
  export type Event = damlLedger.Event<Trade, undefined, typeof Trade.templateId>
  export type QueryResult = damlLedger.QueryResult<Trade, undefined, typeof Trade.templateId>
}


