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


exports.Accept_Swap = {
  decoder: damlTypes.lazyMemo(function () { return jtv.object({}); }),
  encode: function (__typed__) {
  return {
  };
}
,
};



exports.Reject_Swap = {
  decoder: damlTypes.lazyMemo(function () { return jtv.object({}); }),
  encode: function (__typed__) {
  return {
  };
}
,
};



exports.Cancel_Swap = {
  decoder: damlTypes.lazyMemo(function () { return jtv.object({}); }),
  encode: function (__typed__) {
  return {
  };
}
,
};



exports.AssetInSwap = {
  templateId: '5294563cf71d3cd0a7dd41495be721be50fa9db4f8d8c00ac6cab92ded518a89:Trade:AssetInSwap',
  keyDecoder: damlTypes.lazyMemo(function () { return jtv.constant(undefined); }),
  keyEncode: function () { throw 'EncodeError'; },
  decoder: damlTypes.lazyMemo(function () { return jtv.object({asset: Asset.Asset.decoder, receiver: damlTypes.Party.decoder, }); }),
  encode: function (__typed__) {
  return {
    asset: Asset.Asset.encode(__typed__.asset),
    receiver: damlTypes.Party.encode(__typed__.receiver),
  };
}
,
  Cancel_Swap: {
    template: function () { return exports.AssetInSwap; },
    choiceName: 'Cancel_Swap',
    argumentDecoder: damlTypes.lazyMemo(function () { return exports.Cancel_Swap.decoder; }),
    argumentEncode: function (__typed__) { return exports.Cancel_Swap.encode(__typed__); },
    resultDecoder: damlTypes.lazyMemo(function () { return damlTypes.ContractId(Asset.Asset).decoder; }),
    resultEncode: function (__typed__) { return damlTypes.ContractId(Asset.Asset).encode(__typed__); },
  },
  Reject_Swap: {
    template: function () { return exports.AssetInSwap; },
    choiceName: 'Reject_Swap',
    argumentDecoder: damlTypes.lazyMemo(function () { return exports.Reject_Swap.decoder; }),
    argumentEncode: function (__typed__) { return exports.Reject_Swap.encode(__typed__); },
    resultDecoder: damlTypes.lazyMemo(function () { return damlTypes.ContractId(Asset.Asset).decoder; }),
    resultEncode: function (__typed__) { return damlTypes.ContractId(Asset.Asset).encode(__typed__); },
  },
  Accept_Swap: {
    template: function () { return exports.AssetInSwap; },
    choiceName: 'Accept_Swap',
    argumentDecoder: damlTypes.lazyMemo(function () { return exports.Accept_Swap.decoder; }),
    argumentEncode: function (__typed__) { return exports.Accept_Swap.encode(__typed__); },
    resultDecoder: damlTypes.lazyMemo(function () { return damlTypes.ContractId(Asset.Asset).decoder; }),
    resultEncode: function (__typed__) { return damlTypes.ContractId(Asset.Asset).encode(__typed__); },
  },
  Archive: {
    template: function () { return exports.AssetInSwap; },
    choiceName: 'Archive',
    argumentDecoder: damlTypes.lazyMemo(function () { return pkgd14e08374fc7197d6a0de468c968ae8ba3aadbf9315476fd39071831f5923662.DA.Internal.Template.Archive.decoder; }),
    argumentEncode: function (__typed__) { return pkgd14e08374fc7197d6a0de468c968ae8ba3aadbf9315476fd39071831f5923662.DA.Internal.Template.Archive.encode(__typed__); },
    resultDecoder: damlTypes.lazyMemo(function () { return damlTypes.Unit.decoder; }),
    resultEncode: function (__typed__) { return damlTypes.Unit.encode(__typed__); },
  },
};


damlTypes.registerTemplate(exports.AssetInSwap);



exports.TransferPreApproval_TransferAssetInSwap = {
  decoder: damlTypes.lazyMemo(function () { return jtv.object({assetInSwapCid: damlTypes.ContractId(exports.AssetInSwap).decoder, }); }),
  encode: function (__typed__) {
  return {
    assetInSwapCid: damlTypes.ContractId(exports.AssetInSwap).encode(__typed__.assetInSwapCid),
  };
}
,
};



exports.TransferPreApproval_TransferAsset = {
  decoder: damlTypes.lazyMemo(function () { return jtv.object({txAssetCid: damlTypes.ContractId(Asset.Asset).decoder, }); }),
  encode: function (__typed__) {
  return {
    txAssetCid: damlTypes.ContractId(Asset.Asset).encode(__typed__.txAssetCid),
  };
}
,
};



exports.TransferPreApproval_Reject = {
  decoder: damlTypes.lazyMemo(function () { return jtv.object({}); }),
  encode: function (__typed__) {
  return {
  };
}
,
};



exports.TransferPreApproval_Cancel = {
  decoder: damlTypes.lazyMemo(function () { return jtv.object({}); }),
  encode: function (__typed__) {
  return {
  };
}
,
};



exports.TransferPreApproval = {
  templateId: '5294563cf71d3cd0a7dd41495be721be50fa9db4f8d8c00ac6cab92ded518a89:Trade:TransferPreApproval',
  keyDecoder: damlTypes.lazyMemo(function () { return jtv.constant(undefined); }),
  keyEncode: function () { throw 'EncodeError'; },
  decoder: damlTypes.lazyMemo(function () { return jtv.object({asset: Asset.Asset.decoder, newOwner: damlTypes.Party.decoder, }); }),
  encode: function (__typed__) {
  return {
    asset: Asset.Asset.encode(__typed__.asset),
    newOwner: damlTypes.Party.encode(__typed__.newOwner),
  };
}
,
  TransferPreApproval_Cancel: {
    template: function () { return exports.TransferPreApproval; },
    choiceName: 'TransferPreApproval_Cancel',
    argumentDecoder: damlTypes.lazyMemo(function () { return exports.TransferPreApproval_Cancel.decoder; }),
    argumentEncode: function (__typed__) { return exports.TransferPreApproval_Cancel.encode(__typed__); },
    resultDecoder: damlTypes.lazyMemo(function () { return damlTypes.Unit.decoder; }),
    resultEncode: function (__typed__) { return damlTypes.Unit.encode(__typed__); },
  },
  TransferPreApproval_Reject: {
    template: function () { return exports.TransferPreApproval; },
    choiceName: 'TransferPreApproval_Reject',
    argumentDecoder: damlTypes.lazyMemo(function () { return exports.TransferPreApproval_Reject.decoder; }),
    argumentEncode: function (__typed__) { return exports.TransferPreApproval_Reject.encode(__typed__); },
    resultDecoder: damlTypes.lazyMemo(function () { return damlTypes.Unit.decoder; }),
    resultEncode: function (__typed__) { return damlTypes.Unit.encode(__typed__); },
  },
  TransferPreApproval_TransferAsset: {
    template: function () { return exports.TransferPreApproval; },
    choiceName: 'TransferPreApproval_TransferAsset',
    argumentDecoder: damlTypes.lazyMemo(function () { return exports.TransferPreApproval_TransferAsset.decoder; }),
    argumentEncode: function (__typed__) { return exports.TransferPreApproval_TransferAsset.encode(__typed__); },
    resultDecoder: damlTypes.lazyMemo(function () { return damlTypes.ContractId(Asset.Asset).decoder; }),
    resultEncode: function (__typed__) { return damlTypes.ContractId(Asset.Asset).encode(__typed__); },
  },
  TransferPreApproval_TransferAssetInSwap: {
    template: function () { return exports.TransferPreApproval; },
    choiceName: 'TransferPreApproval_TransferAssetInSwap',
    argumentDecoder: damlTypes.lazyMemo(function () { return exports.TransferPreApproval_TransferAssetInSwap.decoder; }),
    argumentEncode: function (__typed__) { return exports.TransferPreApproval_TransferAssetInSwap.encode(__typed__); },
    resultDecoder: damlTypes.lazyMemo(function () { return damlTypes.ContractId(Asset.Asset).decoder; }),
    resultEncode: function (__typed__) { return damlTypes.ContractId(Asset.Asset).encode(__typed__); },
  },
  Archive: {
    template: function () { return exports.TransferPreApproval; },
    choiceName: 'Archive',
    argumentDecoder: damlTypes.lazyMemo(function () { return pkgd14e08374fc7197d6a0de468c968ae8ba3aadbf9315476fd39071831f5923662.DA.Internal.Template.Archive.decoder; }),
    argumentEncode: function (__typed__) { return pkgd14e08374fc7197d6a0de468c968ae8ba3aadbf9315476fd39071831f5923662.DA.Internal.Template.Archive.encode(__typed__); },
    resultDecoder: damlTypes.lazyMemo(function () { return damlTypes.Unit.decoder; }),
    resultEncode: function (__typed__) { return damlTypes.Unit.encode(__typed__); },
  },
};


damlTypes.registerTemplate(exports.TransferPreApproval);



exports.Trade_Settle = {
  decoder: damlTypes.lazyMemo(function () { return jtv.object({requestedAssetCid: damlTypes.ContractId(Asset.Asset).decoder, offeredTxPreApprovalCid: damlTypes.ContractId(exports.TransferPreApproval).decoder, }); }),
  encode: function (__typed__) {
  return {
    requestedAssetCid: damlTypes.ContractId(Asset.Asset).encode(__typed__.requestedAssetCid),
    offeredTxPreApprovalCid: damlTypes.ContractId(exports.TransferPreApproval).encode(__typed__.offeredTxPreApprovalCid),
  };
}
,
};



exports.Trade_Reject = {
  decoder: damlTypes.lazyMemo(function () { return jtv.object({}); }),
  encode: function (__typed__) {
  return {
  };
}
,
};



exports.Trade_Cancel = {
  decoder: damlTypes.lazyMemo(function () { return jtv.object({}); }),
  encode: function (__typed__) {
  return {
  };
}
,
};



exports.Trade = {
  templateId: '5294563cf71d3cd0a7dd41495be721be50fa9db4f8d8c00ac6cab92ded518a89:Trade:Trade',
  keyDecoder: damlTypes.lazyMemo(function () { return jtv.constant(undefined); }),
  keyEncode: function () { throw 'EncodeError'; },
  decoder: damlTypes.lazyMemo(function () { return jtv.object({proposer: damlTypes.Party.decoder, receiver: damlTypes.Party.decoder, offeredAssetCid: damlTypes.ContractId(exports.AssetInSwap).decoder, requestedAssetsTxPreApprovalCid: damlTypes.ContractId(exports.TransferPreApproval).decoder, }); }),
  encode: function (__typed__) {
  return {
    proposer: damlTypes.Party.encode(__typed__.proposer),
    receiver: damlTypes.Party.encode(__typed__.receiver),
    offeredAssetCid: damlTypes.ContractId(exports.AssetInSwap).encode(__typed__.offeredAssetCid),
    requestedAssetsTxPreApprovalCid: damlTypes.ContractId(exports.TransferPreApproval).encode(__typed__.requestedAssetsTxPreApprovalCid),
  };
}
,
  Trade_Cancel: {
    template: function () { return exports.Trade; },
    choiceName: 'Trade_Cancel',
    argumentDecoder: damlTypes.lazyMemo(function () { return exports.Trade_Cancel.decoder; }),
    argumentEncode: function (__typed__) { return exports.Trade_Cancel.encode(__typed__); },
    resultDecoder: damlTypes.lazyMemo(function () { return damlTypes.Unit.decoder; }),
    resultEncode: function (__typed__) { return damlTypes.Unit.encode(__typed__); },
  },
  Trade_Reject: {
    template: function () { return exports.Trade; },
    choiceName: 'Trade_Reject',
    argumentDecoder: damlTypes.lazyMemo(function () { return exports.Trade_Reject.decoder; }),
    argumentEncode: function (__typed__) { return exports.Trade_Reject.encode(__typed__); },
    resultDecoder: damlTypes.lazyMemo(function () { return damlTypes.Unit.decoder; }),
    resultEncode: function (__typed__) { return damlTypes.Unit.encode(__typed__); },
  },
  Trade_Settle: {
    template: function () { return exports.Trade; },
    choiceName: 'Trade_Settle',
    argumentDecoder: damlTypes.lazyMemo(function () { return exports.Trade_Settle.decoder; }),
    argumentEncode: function (__typed__) { return exports.Trade_Settle.encode(__typed__); },
    resultDecoder: damlTypes.lazyMemo(function () { return pkg40f452260bef3f29dede136108fc08a88d5a5250310281067087da6f0baddff7.DA.Types.Tuple2(damlTypes.ContractId(Asset.Asset), damlTypes.ContractId(Asset.Asset)).decoder; }),
    resultEncode: function (__typed__) { return pkg40f452260bef3f29dede136108fc08a88d5a5250310281067087da6f0baddff7.DA.Types.Tuple2(damlTypes.ContractId(Asset.Asset), damlTypes.ContractId(Asset.Asset)).encode(__typed__); },
  },
  Archive: {
    template: function () { return exports.Trade; },
    choiceName: 'Archive',
    argumentDecoder: damlTypes.lazyMemo(function () { return pkgd14e08374fc7197d6a0de468c968ae8ba3aadbf9315476fd39071831f5923662.DA.Internal.Template.Archive.decoder; }),
    argumentEncode: function (__typed__) { return pkgd14e08374fc7197d6a0de468c968ae8ba3aadbf9315476fd39071831f5923662.DA.Internal.Template.Archive.encode(__typed__); },
    resultDecoder: damlTypes.lazyMemo(function () { return damlTypes.Unit.decoder; }),
    resultEncode: function (__typed__) { return damlTypes.Unit.encode(__typed__); },
  },
};


damlTypes.registerTemplate(exports.Trade);

