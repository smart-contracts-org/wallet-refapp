// Generated from Account.daml
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
import * as Trade from '../Trade/module';

export declare type AssetHoldingAccountCloseProposal_Reject = {
};

export declare const AssetHoldingAccountCloseProposal_Reject:
  damlTypes.Serializable<AssetHoldingAccountCloseProposal_Reject> & {
  }
;


export declare type AssetHoldingAccountCloseProposal_Accept = {
  assetCids: damlTypes.ContractId<Asset.Asset>[];
};

export declare const AssetHoldingAccountCloseProposal_Accept:
  damlTypes.Serializable<AssetHoldingAccountCloseProposal_Accept> & {
  }
;


export declare type AssetHoldingAccountCloseProposal = {
  account: AssetHoldingAccount;
};

export declare interface AssetHoldingAccountCloseProposalInterface {
  AssetHoldingAccountCloseProposal_Accept: damlTypes.Choice<AssetHoldingAccountCloseProposal, AssetHoldingAccountCloseProposal_Accept, {}, undefined>;
  Archive: damlTypes.Choice<AssetHoldingAccountCloseProposal, pkgd14e08374fc7197d6a0de468c968ae8ba3aadbf9315476fd39071831f5923662.DA.Internal.Template.Archive, {}, undefined>;
  AssetHoldingAccountCloseProposal_Reject: damlTypes.Choice<AssetHoldingAccountCloseProposal, AssetHoldingAccountCloseProposal_Reject, {}, undefined>;
}
export declare const AssetHoldingAccountCloseProposal:
  damlTypes.Template<AssetHoldingAccountCloseProposal, undefined, '9149c86559dd0db03b1e6ab41a1fb09962a53e54b412bb55e79843d1a1fdb096:Account:AssetHoldingAccountCloseProposal'> & AssetHoldingAccountCloseProposalInterface;

export declare namespace AssetHoldingAccountCloseProposal {
  export type CreateEvent = damlLedger.CreateEvent<AssetHoldingAccountCloseProposal, undefined, typeof AssetHoldingAccountCloseProposal.templateId>
  export type ArchiveEvent = damlLedger.ArchiveEvent<AssetHoldingAccountCloseProposal, typeof AssetHoldingAccountCloseProposal.templateId>
  export type Event = damlLedger.Event<AssetHoldingAccountCloseProposal, undefined, typeof AssetHoldingAccountCloseProposal.templateId>
  export type QueryResult = damlLedger.QueryResult<AssetHoldingAccountCloseProposal, undefined, typeof AssetHoldingAccountCloseProposal.templateId>
}



export declare type AssetHoldingAccountProposal_Reject = {
};

export declare const AssetHoldingAccountProposal_Reject:
  damlTypes.Serializable<AssetHoldingAccountProposal_Reject> & {
  }
;


export declare type AssetHoldingAccountProposal_Accept = {
};

export declare const AssetHoldingAccountProposal_Accept:
  damlTypes.Serializable<AssetHoldingAccountProposal_Accept> & {
  }
;


export declare type AssetHoldingAccountProposal = {
  account: AssetHoldingAccount;
  recipient: damlTypes.Party;
};

export declare interface AssetHoldingAccountProposalInterface {
  Archive: damlTypes.Choice<AssetHoldingAccountProposal, pkgd14e08374fc7197d6a0de468c968ae8ba3aadbf9315476fd39071831f5923662.DA.Internal.Template.Archive, {}, undefined>;
  AssetHoldingAccountProposal_Accept: damlTypes.Choice<AssetHoldingAccountProposal, AssetHoldingAccountProposal_Accept, damlTypes.ContractId<AssetHoldingAccount>, undefined>;
  AssetHoldingAccountProposal_Reject: damlTypes.Choice<AssetHoldingAccountProposal, AssetHoldingAccountProposal_Reject, {}, undefined>;
}
export declare const AssetHoldingAccountProposal:
  damlTypes.Template<AssetHoldingAccountProposal, undefined, '9149c86559dd0db03b1e6ab41a1fb09962a53e54b412bb55e79843d1a1fdb096:Account:AssetHoldingAccountProposal'> & AssetHoldingAccountProposalInterface;

export declare namespace AssetHoldingAccountProposal {
  export type CreateEvent = damlLedger.CreateEvent<AssetHoldingAccountProposal, undefined, typeof AssetHoldingAccountProposal.templateId>
  export type ArchiveEvent = damlLedger.ArchiveEvent<AssetHoldingAccountProposal, typeof AssetHoldingAccountProposal.templateId>
  export type Event = damlLedger.Event<AssetHoldingAccountProposal, undefined, typeof AssetHoldingAccountProposal.templateId>
  export type QueryResult = damlLedger.QueryResult<AssetHoldingAccountProposal, undefined, typeof AssetHoldingAccountProposal.templateId>
}



export declare type Close_Account = {
};

export declare const Close_Account:
  damlTypes.Serializable<Close_Account> & {
  }
;


export declare type Preapprove_Transfer_In = {
  asset: Asset.Asset;
};

export declare const Preapprove_Transfer_In:
  damlTypes.Serializable<Preapprove_Transfer_In> & {
  }
;


export declare type Create_Trade = {
  assetCids: damlTypes.ContractId<Asset.Asset>[];
  offeredAssetAmount: damlTypes.Numeric;
  requestedAsset: Asset.Asset;
};

export declare const Create_Trade:
  damlTypes.Serializable<Create_Trade> & {
  }
;


export declare type Deposit_Transfer_Into_Account = {
  transferCid: damlTypes.ContractId<Asset.AssetTransfer>;
};

export declare const Deposit_Transfer_Into_Account:
  damlTypes.Serializable<Deposit_Transfer_Into_Account> & {
  }
;


export declare type Create_Transfers = {
  assetCids: damlTypes.ContractId<Asset.Asset>[];
  transfers: pkg40f452260bef3f29dede136108fc08a88d5a5250310281067087da6f0baddff7.DA.Types.Tuple2<damlTypes.Numeric, damlTypes.Party>[];
};

export declare const Create_Transfers:
  damlTypes.Serializable<Create_Transfers> & {
  }
;


export declare type Merge_Split = {
  assetCids: damlTypes.ContractId<Asset.Asset>[];
  outputAmounts: damlTypes.Numeric[];
};

export declare const Merge_Split:
  damlTypes.Serializable<Merge_Split> & {
  }
;


export declare type Airdrop = {
  amount: damlTypes.Numeric;
};

export declare const Airdrop:
  damlTypes.Serializable<Airdrop> & {
  }
;


export declare type Invite_New_Asset_Holder = {
  recipient: damlTypes.Party;
};

export declare const Invite_New_Asset_Holder:
  damlTypes.Serializable<Invite_New_Asset_Holder> & {
  }
;


export declare type AssetHoldingAccount = {
  assetType: Asset.AssetType;
  owner: damlTypes.Party;
  airdroppable: boolean;
  resharable: boolean;
};

export declare interface AssetHoldingAccountInterface {
  Close_Account: damlTypes.Choice<AssetHoldingAccount, Close_Account, damlTypes.ContractId<AssetHoldingAccountCloseProposal>, AssetHoldingAccount.Key>;
  Preapprove_Transfer_In: damlTypes.Choice<AssetHoldingAccount, Preapprove_Transfer_In, damlTypes.ContractId<Trade.TransferPreApproval>, AssetHoldingAccount.Key>;
  Create_Trade: damlTypes.Choice<AssetHoldingAccount, Create_Trade, damlTypes.ContractId<Trade.Trade>, AssetHoldingAccount.Key>;
  Deposit_Transfer_Into_Account: damlTypes.Choice<AssetHoldingAccount, Deposit_Transfer_Into_Account, damlTypes.ContractId<Asset.Asset>, AssetHoldingAccount.Key>;
  Create_Transfers: damlTypes.Choice<AssetHoldingAccount, Create_Transfers, {}, AssetHoldingAccount.Key>;
  Merge_Split: damlTypes.Choice<AssetHoldingAccount, Merge_Split, damlTypes.ContractId<Asset.Asset>[], AssetHoldingAccount.Key>;
  Airdrop: damlTypes.Choice<AssetHoldingAccount, Airdrop, damlTypes.ContractId<Asset.Asset>, AssetHoldingAccount.Key>;
  Invite_New_Asset_Holder: damlTypes.Choice<AssetHoldingAccount, Invite_New_Asset_Holder, damlTypes.ContractId<AssetHoldingAccountProposal>, AssetHoldingAccount.Key>;
  Archive: damlTypes.Choice<AssetHoldingAccount, pkgd14e08374fc7197d6a0de468c968ae8ba3aadbf9315476fd39071831f5923662.DA.Internal.Template.Archive, {}, AssetHoldingAccount.Key>;
}
export declare const AssetHoldingAccount:
  damlTypes.Template<AssetHoldingAccount, AssetHoldingAccount.Key, '9149c86559dd0db03b1e6ab41a1fb09962a53e54b412bb55e79843d1a1fdb096:Account:AssetHoldingAccount'> & AssetHoldingAccountInterface;

export declare namespace AssetHoldingAccount {
  export type Key = pkg40f452260bef3f29dede136108fc08a88d5a5250310281067087da6f0baddff7.DA.Types.Tuple2<Asset.AssetType, damlTypes.Party>
  export type CreateEvent = damlLedger.CreateEvent<AssetHoldingAccount, AssetHoldingAccount.Key, typeof AssetHoldingAccount.templateId>
  export type ArchiveEvent = damlLedger.ArchiveEvent<AssetHoldingAccount, typeof AssetHoldingAccount.templateId>
  export type Event = damlLedger.Event<AssetHoldingAccount, AssetHoldingAccount.Key, typeof AssetHoldingAccount.templateId>
  export type QueryResult = damlLedger.QueryResult<AssetHoldingAccount, AssetHoldingAccount.Key, typeof AssetHoldingAccount.templateId>
}



export declare type Accept = {
  assetHoldingAccount: damlTypes.ContractId<AssetHoldingAccount>;
};

export declare const Accept:
  damlTypes.Serializable<Accept> & {
  }
;


export declare type AssetHoldingAccountRequest = {
  recipient: damlTypes.Party;
  owner: damlTypes.Party;
};

export declare interface AssetHoldingAccountRequestInterface {
  Accept: damlTypes.Choice<AssetHoldingAccountRequest, Accept, damlTypes.ContractId<AssetHoldingAccountProposal>, undefined>;
  Archive: damlTypes.Choice<AssetHoldingAccountRequest, pkgd14e08374fc7197d6a0de468c968ae8ba3aadbf9315476fd39071831f5923662.DA.Internal.Template.Archive, {}, undefined>;
}
export declare const AssetHoldingAccountRequest:
  damlTypes.Template<AssetHoldingAccountRequest, undefined, '9149c86559dd0db03b1e6ab41a1fb09962a53e54b412bb55e79843d1a1fdb096:Account:AssetHoldingAccountRequest'> & AssetHoldingAccountRequestInterface;

export declare namespace AssetHoldingAccountRequest {
  export type CreateEvent = damlLedger.CreateEvent<AssetHoldingAccountRequest, undefined, typeof AssetHoldingAccountRequest.templateId>
  export type ArchiveEvent = damlLedger.ArchiveEvent<AssetHoldingAccountRequest, typeof AssetHoldingAccountRequest.templateId>
  export type Event = damlLedger.Event<AssetHoldingAccountRequest, undefined, typeof AssetHoldingAccountRequest.templateId>
  export type QueryResult = damlLedger.QueryResult<AssetHoldingAccountRequest, undefined, typeof AssetHoldingAccountRequest.templateId>
}


