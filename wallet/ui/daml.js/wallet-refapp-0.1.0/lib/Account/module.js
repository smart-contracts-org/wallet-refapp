"use strict";
/* eslint-disable-next-line no-unused-vars */
function __export(m) {
/* eslint-disable-next-line no-prototype-builtins */
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable-next-line no-unused-vars */
var jtv = require('@mojotech/json-type-validation');
/* eslint-disable-next-line no-unused-vars */
var damlTypes = require('@daml/types');
/* eslint-disable-next-line no-unused-vars */
var damlLedger = require('@daml/ledger');

var pkg40f452260bef3f29dede136108fc08a88d5a5250310281067087da6f0baddff7 = require('@daml.js/40f452260bef3f29dede136108fc08a88d5a5250310281067087da6f0baddff7');
var pkgd14e08374fc7197d6a0de468c968ae8ba3aadbf9315476fd39071831f5923662 = require('@daml.js/d14e08374fc7197d6a0de468c968ae8ba3aadbf9315476fd39071831f5923662');

var Asset = require('../Asset/module');
var Trade = require('../Trade/module');


exports.AssetHoldingAccountCloseProposal_Reject = {
  decoder: damlTypes.lazyMemo(function () { return jtv.object({}); }),
  encode: function (__typed__) {
  return {
  };
}
,
};



exports.AssetHoldingAccountCloseProposal_Accept = {
  decoder: damlTypes.lazyMemo(function () { return jtv.object({assetCids: damlTypes.List(damlTypes.ContractId(Asset.Asset)).decoder, }); }),
  encode: function (__typed__) {
  return {
    assetCids: damlTypes.List(damlTypes.ContractId(Asset.Asset)).encode(__typed__.assetCids),
  };
}
,
};



exports.AssetHoldingAccountCloseProposal = {
  templateId: '5294563cf71d3cd0a7dd41495be721be50fa9db4f8d8c00ac6cab92ded518a89:Account:AssetHoldingAccountCloseProposal',
  keyDecoder: damlTypes.lazyMemo(function () { return jtv.constant(undefined); }),
  keyEncode: function () { throw 'EncodeError'; },
  decoder: damlTypes.lazyMemo(function () { return jtv.object({account: exports.AssetHoldingAccount.decoder, }); }),
  encode: function (__typed__) {
  return {
    account: exports.AssetHoldingAccount.encode(__typed__.account),
  };
}
,
  AssetHoldingAccountCloseProposal_Accept: {
    template: function () { return exports.AssetHoldingAccountCloseProposal; },
    choiceName: 'AssetHoldingAccountCloseProposal_Accept',
    argumentDecoder: damlTypes.lazyMemo(function () { return exports.AssetHoldingAccountCloseProposal_Accept.decoder; }),
    argumentEncode: function (__typed__) { return exports.AssetHoldingAccountCloseProposal_Accept.encode(__typed__); },
    resultDecoder: damlTypes.lazyMemo(function () { return damlTypes.Unit.decoder; }),
    resultEncode: function (__typed__) { return damlTypes.Unit.encode(__typed__); },
  },
  Archive: {
    template: function () { return exports.AssetHoldingAccountCloseProposal; },
    choiceName: 'Archive',
    argumentDecoder: damlTypes.lazyMemo(function () { return pkgd14e08374fc7197d6a0de468c968ae8ba3aadbf9315476fd39071831f5923662.DA.Internal.Template.Archive.decoder; }),
    argumentEncode: function (__typed__) { return pkgd14e08374fc7197d6a0de468c968ae8ba3aadbf9315476fd39071831f5923662.DA.Internal.Template.Archive.encode(__typed__); },
    resultDecoder: damlTypes.lazyMemo(function () { return damlTypes.Unit.decoder; }),
    resultEncode: function (__typed__) { return damlTypes.Unit.encode(__typed__); },
  },
  AssetHoldingAccountCloseProposal_Reject: {
    template: function () { return exports.AssetHoldingAccountCloseProposal; },
    choiceName: 'AssetHoldingAccountCloseProposal_Reject',
    argumentDecoder: damlTypes.lazyMemo(function () { return exports.AssetHoldingAccountCloseProposal_Reject.decoder; }),
    argumentEncode: function (__typed__) { return exports.AssetHoldingAccountCloseProposal_Reject.encode(__typed__); },
    resultDecoder: damlTypes.lazyMemo(function () { return damlTypes.Unit.decoder; }),
    resultEncode: function (__typed__) { return damlTypes.Unit.encode(__typed__); },
  },
};


damlTypes.registerTemplate(exports.AssetHoldingAccountCloseProposal);



exports.AssetHoldingAccountProposal_Reject = {
  decoder: damlTypes.lazyMemo(function () { return jtv.object({}); }),
  encode: function (__typed__) {
  return {
  };
}
,
};



exports.AssetHoldingAccountProposal_Accept = {
  decoder: damlTypes.lazyMemo(function () { return jtv.object({}); }),
  encode: function (__typed__) {
  return {
  };
}
,
};



exports.AssetHoldingAccountProposal = {
  templateId: '5294563cf71d3cd0a7dd41495be721be50fa9db4f8d8c00ac6cab92ded518a89:Account:AssetHoldingAccountProposal',
  keyDecoder: damlTypes.lazyMemo(function () { return jtv.constant(undefined); }),
  keyEncode: function () { throw 'EncodeError'; },
  decoder: damlTypes.lazyMemo(function () { return jtv.object({account: exports.AssetHoldingAccount.decoder, recipient: damlTypes.Party.decoder, }); }),
  encode: function (__typed__) {
  return {
    account: exports.AssetHoldingAccount.encode(__typed__.account),
    recipient: damlTypes.Party.encode(__typed__.recipient),
  };
}
,
  Archive: {
    template: function () { return exports.AssetHoldingAccountProposal; },
    choiceName: 'Archive',
    argumentDecoder: damlTypes.lazyMemo(function () { return pkgd14e08374fc7197d6a0de468c968ae8ba3aadbf9315476fd39071831f5923662.DA.Internal.Template.Archive.decoder; }),
    argumentEncode: function (__typed__) { return pkgd14e08374fc7197d6a0de468c968ae8ba3aadbf9315476fd39071831f5923662.DA.Internal.Template.Archive.encode(__typed__); },
    resultDecoder: damlTypes.lazyMemo(function () { return damlTypes.Unit.decoder; }),
    resultEncode: function (__typed__) { return damlTypes.Unit.encode(__typed__); },
  },
  AssetHoldingAccountProposal_Accept: {
    template: function () { return exports.AssetHoldingAccountProposal; },
    choiceName: 'AssetHoldingAccountProposal_Accept',
    argumentDecoder: damlTypes.lazyMemo(function () { return exports.AssetHoldingAccountProposal_Accept.decoder; }),
    argumentEncode: function (__typed__) { return exports.AssetHoldingAccountProposal_Accept.encode(__typed__); },
    resultDecoder: damlTypes.lazyMemo(function () { return damlTypes.ContractId(exports.AssetHoldingAccount).decoder; }),
    resultEncode: function (__typed__) { return damlTypes.ContractId(exports.AssetHoldingAccount).encode(__typed__); },
  },
  AssetHoldingAccountProposal_Reject: {
    template: function () { return exports.AssetHoldingAccountProposal; },
    choiceName: 'AssetHoldingAccountProposal_Reject',
    argumentDecoder: damlTypes.lazyMemo(function () { return exports.AssetHoldingAccountProposal_Reject.decoder; }),
    argumentEncode: function (__typed__) { return exports.AssetHoldingAccountProposal_Reject.encode(__typed__); },
    resultDecoder: damlTypes.lazyMemo(function () { return damlTypes.Unit.decoder; }),
    resultEncode: function (__typed__) { return damlTypes.Unit.encode(__typed__); },
  },
};


damlTypes.registerTemplate(exports.AssetHoldingAccountProposal);



exports.Close_Account = {
  decoder: damlTypes.lazyMemo(function () { return jtv.object({}); }),
  encode: function (__typed__) {
  return {
  };
}
,
};



exports.Preapprove_Transfer_In = {
  decoder: damlTypes.lazyMemo(function () { return jtv.object({asset: Asset.Asset.decoder, }); }),
  encode: function (__typed__) {
  return {
    asset: Asset.Asset.encode(__typed__.asset),
  };
}
,
};



exports.Create_Trade = {
  decoder: damlTypes.lazyMemo(function () { return jtv.object({assetCids: damlTypes.List(damlTypes.ContractId(Asset.Asset)).decoder, offeredAssetAmount: damlTypes.Numeric(10).decoder, requestedAsset: Asset.Asset.decoder, }); }),
  encode: function (__typed__) {
  return {
    assetCids: damlTypes.List(damlTypes.ContractId(Asset.Asset)).encode(__typed__.assetCids),
    offeredAssetAmount: damlTypes.Numeric(10).encode(__typed__.offeredAssetAmount),
    requestedAsset: Asset.Asset.encode(__typed__.requestedAsset),
  };
}
,
};



exports.Deposit_Transfer_Into_Account = {
  decoder: damlTypes.lazyMemo(function () { return jtv.object({transferCid: damlTypes.ContractId(Asset.AssetTransfer).decoder, }); }),
  encode: function (__typed__) {
  return {
    transferCid: damlTypes.ContractId(Asset.AssetTransfer).encode(__typed__.transferCid),
  };
}
,
};



exports.Create_Transfers = {
  decoder: damlTypes.lazyMemo(function () { return jtv.object({assetCids: damlTypes.List(damlTypes.ContractId(Asset.Asset)).decoder, transfers: damlTypes.List(pkg40f452260bef3f29dede136108fc08a88d5a5250310281067087da6f0baddff7.DA.Types.Tuple2(damlTypes.Numeric(10), damlTypes.Party)).decoder, }); }),
  encode: function (__typed__) {
  return {
    assetCids: damlTypes.List(damlTypes.ContractId(Asset.Asset)).encode(__typed__.assetCids),
    transfers: damlTypes.List(pkg40f452260bef3f29dede136108fc08a88d5a5250310281067087da6f0baddff7.DA.Types.Tuple2(damlTypes.Numeric(10), damlTypes.Party)).encode(__typed__.transfers),
  };
}
,
};



exports.Merge_Split = {
  decoder: damlTypes.lazyMemo(function () { return jtv.object({assetCids: damlTypes.List(damlTypes.ContractId(Asset.Asset)).decoder, outputAmounts: damlTypes.List(damlTypes.Numeric(10)).decoder, }); }),
  encode: function (__typed__) {
  return {
    assetCids: damlTypes.List(damlTypes.ContractId(Asset.Asset)).encode(__typed__.assetCids),
    outputAmounts: damlTypes.List(damlTypes.Numeric(10)).encode(__typed__.outputAmounts),
  };
}
,
};



exports.Airdrop = {
  decoder: damlTypes.lazyMemo(function () { return jtv.object({amount: damlTypes.Numeric(10).decoder, }); }),
  encode: function (__typed__) {
  return {
    amount: damlTypes.Numeric(10).encode(__typed__.amount),
  };
}
,
};



exports.Invite_New_Asset_Holder = {
  decoder: damlTypes.lazyMemo(function () { return jtv.object({recipient: damlTypes.Party.decoder, }); }),
  encode: function (__typed__) {
  return {
    recipient: damlTypes.Party.encode(__typed__.recipient),
  };
}
,
};



exports.AssetHoldingAccount = {
  templateId: '5294563cf71d3cd0a7dd41495be721be50fa9db4f8d8c00ac6cab92ded518a89:Account:AssetHoldingAccount',
  keyDecoder: damlTypes.lazyMemo(function () { return damlTypes.lazyMemo(function () { return pkg40f452260bef3f29dede136108fc08a88d5a5250310281067087da6f0baddff7.DA.Types.Tuple2(Asset.AssetType, damlTypes.Party).decoder; }); }),
  keyEncode: function (__typed__) { return pkg40f452260bef3f29dede136108fc08a88d5a5250310281067087da6f0baddff7.DA.Types.Tuple2(Asset.AssetType, damlTypes.Party).encode(__typed__); },
  decoder: damlTypes.lazyMemo(function () { return jtv.object({assetType: Asset.AssetType.decoder, owner: damlTypes.Party.decoder, airdroppable: damlTypes.Bool.decoder, resharable: damlTypes.Bool.decoder, }); }),
  encode: function (__typed__) {
  return {
    assetType: Asset.AssetType.encode(__typed__.assetType),
    owner: damlTypes.Party.encode(__typed__.owner),
    airdroppable: damlTypes.Bool.encode(__typed__.airdroppable),
    resharable: damlTypes.Bool.encode(__typed__.resharable),
  };
}
,
  Close_Account: {
    template: function () { return exports.AssetHoldingAccount; },
    choiceName: 'Close_Account',
    argumentDecoder: damlTypes.lazyMemo(function () { return exports.Close_Account.decoder; }),
    argumentEncode: function (__typed__) { return exports.Close_Account.encode(__typed__); },
    resultDecoder: damlTypes.lazyMemo(function () { return damlTypes.ContractId(exports.AssetHoldingAccountCloseProposal).decoder; }),
    resultEncode: function (__typed__) { return damlTypes.ContractId(exports.AssetHoldingAccountCloseProposal).encode(__typed__); },
  },
  Preapprove_Transfer_In: {
    template: function () { return exports.AssetHoldingAccount; },
    choiceName: 'Preapprove_Transfer_In',
    argumentDecoder: damlTypes.lazyMemo(function () { return exports.Preapprove_Transfer_In.decoder; }),
    argumentEncode: function (__typed__) { return exports.Preapprove_Transfer_In.encode(__typed__); },
    resultDecoder: damlTypes.lazyMemo(function () { return damlTypes.ContractId(Trade.TransferPreApproval).decoder; }),
    resultEncode: function (__typed__) { return damlTypes.ContractId(Trade.TransferPreApproval).encode(__typed__); },
  },
  Create_Trade: {
    template: function () { return exports.AssetHoldingAccount; },
    choiceName: 'Create_Trade',
    argumentDecoder: damlTypes.lazyMemo(function () { return exports.Create_Trade.decoder; }),
    argumentEncode: function (__typed__) { return exports.Create_Trade.encode(__typed__); },
    resultDecoder: damlTypes.lazyMemo(function () { return damlTypes.ContractId(Trade.Trade).decoder; }),
    resultEncode: function (__typed__) { return damlTypes.ContractId(Trade.Trade).encode(__typed__); },
  },
  Deposit_Transfer_Into_Account: {
    template: function () { return exports.AssetHoldingAccount; },
    choiceName: 'Deposit_Transfer_Into_Account',
    argumentDecoder: damlTypes.lazyMemo(function () { return exports.Deposit_Transfer_Into_Account.decoder; }),
    argumentEncode: function (__typed__) { return exports.Deposit_Transfer_Into_Account.encode(__typed__); },
    resultDecoder: damlTypes.lazyMemo(function () { return damlTypes.ContractId(Asset.Asset).decoder; }),
    resultEncode: function (__typed__) { return damlTypes.ContractId(Asset.Asset).encode(__typed__); },
  },
  Create_Transfers: {
    template: function () { return exports.AssetHoldingAccount; },
    choiceName: 'Create_Transfers',
    argumentDecoder: damlTypes.lazyMemo(function () { return exports.Create_Transfers.decoder; }),
    argumentEncode: function (__typed__) { return exports.Create_Transfers.encode(__typed__); },
    resultDecoder: damlTypes.lazyMemo(function () { return damlTypes.Unit.decoder; }),
    resultEncode: function (__typed__) { return damlTypes.Unit.encode(__typed__); },
  },
  Merge_Split: {
    template: function () { return exports.AssetHoldingAccount; },
    choiceName: 'Merge_Split',
    argumentDecoder: damlTypes.lazyMemo(function () { return exports.Merge_Split.decoder; }),
    argumentEncode: function (__typed__) { return exports.Merge_Split.encode(__typed__); },
    resultDecoder: damlTypes.lazyMemo(function () { return damlTypes.List(damlTypes.ContractId(Asset.Asset)).decoder; }),
    resultEncode: function (__typed__) { return damlTypes.List(damlTypes.ContractId(Asset.Asset)).encode(__typed__); },
  },
  Airdrop: {
    template: function () { return exports.AssetHoldingAccount; },
    choiceName: 'Airdrop',
    argumentDecoder: damlTypes.lazyMemo(function () { return exports.Airdrop.decoder; }),
    argumentEncode: function (__typed__) { return exports.Airdrop.encode(__typed__); },
    resultDecoder: damlTypes.lazyMemo(function () { return damlTypes.ContractId(Asset.Asset).decoder; }),
    resultEncode: function (__typed__) { return damlTypes.ContractId(Asset.Asset).encode(__typed__); },
  },
  Invite_New_Asset_Holder: {
    template: function () { return exports.AssetHoldingAccount; },
    choiceName: 'Invite_New_Asset_Holder',
    argumentDecoder: damlTypes.lazyMemo(function () { return exports.Invite_New_Asset_Holder.decoder; }),
    argumentEncode: function (__typed__) { return exports.Invite_New_Asset_Holder.encode(__typed__); },
    resultDecoder: damlTypes.lazyMemo(function () { return damlTypes.ContractId(exports.AssetHoldingAccountProposal).decoder; }),
    resultEncode: function (__typed__) { return damlTypes.ContractId(exports.AssetHoldingAccountProposal).encode(__typed__); },
  },
  Archive: {
    template: function () { return exports.AssetHoldingAccount; },
    choiceName: 'Archive',
    argumentDecoder: damlTypes.lazyMemo(function () { return pkgd14e08374fc7197d6a0de468c968ae8ba3aadbf9315476fd39071831f5923662.DA.Internal.Template.Archive.decoder; }),
    argumentEncode: function (__typed__) { return pkgd14e08374fc7197d6a0de468c968ae8ba3aadbf9315476fd39071831f5923662.DA.Internal.Template.Archive.encode(__typed__); },
    resultDecoder: damlTypes.lazyMemo(function () { return damlTypes.Unit.decoder; }),
    resultEncode: function (__typed__) { return damlTypes.Unit.encode(__typed__); },
  },
};


damlTypes.registerTemplate(exports.AssetHoldingAccount);



exports.Accept_Airdrop = {
  decoder: damlTypes.lazyMemo(function () { return jtv.object({}); }),
  encode: function (__typed__) {
  return {
  };
}
,
};



exports.AirdropRequest = {
  templateId: '5294563cf71d3cd0a7dd41495be721be50fa9db4f8d8c00ac6cab92ded518a89:Account:AirdropRequest',
  keyDecoder: damlTypes.lazyMemo(function () { return jtv.constant(undefined); }),
  keyEncode: function () { throw 'EncodeError'; },
  decoder: damlTypes.lazyMemo(function () { return jtv.object({amount: damlTypes.Numeric(10).decoder, requester: damlTypes.Party.decoder, assetHoldingAccountIssuer: damlTypes.Party.decoder, assetHoldingAccountCid: damlTypes.ContractId(exports.AssetHoldingAccount).decoder, }); }),
  encode: function (__typed__) {
  return {
    amount: damlTypes.Numeric(10).encode(__typed__.amount),
    requester: damlTypes.Party.encode(__typed__.requester),
    assetHoldingAccountIssuer: damlTypes.Party.encode(__typed__.assetHoldingAccountIssuer),
    assetHoldingAccountCid: damlTypes.ContractId(exports.AssetHoldingAccount).encode(__typed__.assetHoldingAccountCid),
  };
}
,
  Accept_Airdrop: {
    template: function () { return exports.AirdropRequest; },
    choiceName: 'Accept_Airdrop',
    argumentDecoder: damlTypes.lazyMemo(function () { return exports.Accept_Airdrop.decoder; }),
    argumentEncode: function (__typed__) { return exports.Accept_Airdrop.encode(__typed__); },
    resultDecoder: damlTypes.lazyMemo(function () { return damlTypes.ContractId(Asset.Asset).decoder; }),
    resultEncode: function (__typed__) { return damlTypes.ContractId(Asset.Asset).encode(__typed__); },
  },
  Archive: {
    template: function () { return exports.AirdropRequest; },
    choiceName: 'Archive',
    argumentDecoder: damlTypes.lazyMemo(function () { return pkgd14e08374fc7197d6a0de468c968ae8ba3aadbf9315476fd39071831f5923662.DA.Internal.Template.Archive.decoder; }),
    argumentEncode: function (__typed__) { return pkgd14e08374fc7197d6a0de468c968ae8ba3aadbf9315476fd39071831f5923662.DA.Internal.Template.Archive.encode(__typed__); },
    resultDecoder: damlTypes.lazyMemo(function () { return damlTypes.Unit.decoder; }),
    resultEncode: function (__typed__) { return damlTypes.Unit.encode(__typed__); },
  },
};


damlTypes.registerTemplate(exports.AirdropRequest);



exports.Accept = {
  decoder: damlTypes.lazyMemo(function () { return jtv.object({assetHoldingAccount: damlTypes.ContractId(exports.AssetHoldingAccount).decoder, }); }),
  encode: function (__typed__) {
  return {
    assetHoldingAccount: damlTypes.ContractId(exports.AssetHoldingAccount).encode(__typed__.assetHoldingAccount),
  };
}
,
};



exports.AssetHoldingAccountRequest = {
  templateId: '5294563cf71d3cd0a7dd41495be721be50fa9db4f8d8c00ac6cab92ded518a89:Account:AssetHoldingAccountRequest',
  keyDecoder: damlTypes.lazyMemo(function () { return jtv.constant(undefined); }),
  keyEncode: function () { throw 'EncodeError'; },
  decoder: damlTypes.lazyMemo(function () { return jtv.object({recipient: damlTypes.Party.decoder, owner: damlTypes.Party.decoder, }); }),
  encode: function (__typed__) {
  return {
    recipient: damlTypes.Party.encode(__typed__.recipient),
    owner: damlTypes.Party.encode(__typed__.owner),
  };
}
,
  Accept: {
    template: function () { return exports.AssetHoldingAccountRequest; },
    choiceName: 'Accept',
    argumentDecoder: damlTypes.lazyMemo(function () { return exports.Accept.decoder; }),
    argumentEncode: function (__typed__) { return exports.Accept.encode(__typed__); },
    resultDecoder: damlTypes.lazyMemo(function () { return damlTypes.ContractId(exports.AssetHoldingAccountProposal).decoder; }),
    resultEncode: function (__typed__) { return damlTypes.ContractId(exports.AssetHoldingAccountProposal).encode(__typed__); },
  },
  Archive: {
    template: function () { return exports.AssetHoldingAccountRequest; },
    choiceName: 'Archive',
    argumentDecoder: damlTypes.lazyMemo(function () { return pkgd14e08374fc7197d6a0de468c968ae8ba3aadbf9315476fd39071831f5923662.DA.Internal.Template.Archive.decoder; }),
    argumentEncode: function (__typed__) { return pkgd14e08374fc7197d6a0de468c968ae8ba3aadbf9315476fd39071831f5923662.DA.Internal.Template.Archive.encode(__typed__); },
    resultDecoder: damlTypes.lazyMemo(function () { return damlTypes.Unit.decoder; }),
    resultEncode: function (__typed__) { return damlTypes.Unit.encode(__typed__); },
  },
};


damlTypes.registerTemplate(exports.AssetHoldingAccountRequest);

