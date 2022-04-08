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

var pkg97b883cd8a2b7f49f90d5d39c981cf6e110cf1f1c64427a28a6d58ec88c43657 = require('@daml.js/97b883cd8a2b7f49f90d5d39c981cf6e110cf1f1c64427a28a6d58ec88c43657');
var pkgd14e08374fc7197d6a0de468c968ae8ba3aadbf9315476fd39071831f5923662 = require('@daml.js/d14e08374fc7197d6a0de468c968ae8ba3aadbf9315476fd39071831f5923662');


exports.Accept_Transfer = {
  decoder: damlTypes.lazyMemo(function () { return jtv.object({}); }),
  encode: function (__typed__) {
  return {
  };
}
,
};



exports.Reject_Transfer = {
  decoder: damlTypes.lazyMemo(function () { return jtv.object({}); }),
  encode: function (__typed__) {
  return {
  };
}
,
};



exports.Cancel_Transfer = {
  decoder: damlTypes.lazyMemo(function () { return jtv.object({}); }),
  encode: function (__typed__) {
  return {
  };
}
,
};



exports.AssetTransfer = {
  templateId: '0ff683f651366364576eb4bb10823fdd10329a7575e95e82aaff366aaa8e7b63:Asset:AssetTransfer',
  keyDecoder: damlTypes.lazyMemo(function () { return jtv.constant(undefined); }),
  keyEncode: function () { throw 'EncodeError'; },
  decoder: damlTypes.lazyMemo(function () { return jtv.object({asset: exports.Asset.decoder, recipient: damlTypes.Party.decoder, sender: damlTypes.Party.decoder, }); }),
  encode: function (__typed__) {
  return {
    asset: exports.Asset.encode(__typed__.asset),
    recipient: damlTypes.Party.encode(__typed__.recipient),
    sender: damlTypes.Party.encode(__typed__.sender),
  };
}
,
  Cancel_Transfer: {
    template: function () { return exports.AssetTransfer; },
    choiceName: 'Cancel_Transfer',
    argumentDecoder: damlTypes.lazyMemo(function () { return exports.Cancel_Transfer.decoder; }),
    argumentEncode: function (__typed__) { return exports.Cancel_Transfer.encode(__typed__); },
    resultDecoder: damlTypes.lazyMemo(function () { return damlTypes.ContractId(exports.Asset).decoder; }),
    resultEncode: function (__typed__) { return damlTypes.ContractId(exports.Asset).encode(__typed__); },
  },
  Reject_Transfer: {
    template: function () { return exports.AssetTransfer; },
    choiceName: 'Reject_Transfer',
    argumentDecoder: damlTypes.lazyMemo(function () { return exports.Reject_Transfer.decoder; }),
    argumentEncode: function (__typed__) { return exports.Reject_Transfer.encode(__typed__); },
    resultDecoder: damlTypes.lazyMemo(function () { return damlTypes.ContractId(exports.Asset).decoder; }),
    resultEncode: function (__typed__) { return damlTypes.ContractId(exports.Asset).encode(__typed__); },
  },
  Accept_Transfer: {
    template: function () { return exports.AssetTransfer; },
    choiceName: 'Accept_Transfer',
    argumentDecoder: damlTypes.lazyMemo(function () { return exports.Accept_Transfer.decoder; }),
    argumentEncode: function (__typed__) { return exports.Accept_Transfer.encode(__typed__); },
    resultDecoder: damlTypes.lazyMemo(function () { return damlTypes.ContractId(exports.Asset).decoder; }),
    resultEncode: function (__typed__) { return damlTypes.ContractId(exports.Asset).encode(__typed__); },
  },
  Archive: {
    template: function () { return exports.AssetTransfer; },
    choiceName: 'Archive',
    argumentDecoder: damlTypes.lazyMemo(function () { return pkgd14e08374fc7197d6a0de468c968ae8ba3aadbf9315476fd39071831f5923662.DA.Internal.Template.Archive.decoder; }),
    argumentEncode: function (__typed__) { return pkgd14e08374fc7197d6a0de468c968ae8ba3aadbf9315476fd39071831f5923662.DA.Internal.Template.Archive.encode(__typed__); },
    resultDecoder: damlTypes.lazyMemo(function () { return damlTypes.Unit.decoder; }),
    resultEncode: function (__typed__) { return damlTypes.Unit.encode(__typed__); },
  },
};


damlTypes.registerTemplate(exports.AssetTransfer);



exports.Asset = {
  templateId: '0ff683f651366364576eb4bb10823fdd10329a7575e95e82aaff366aaa8e7b63:Asset:Asset',
  keyDecoder: damlTypes.lazyMemo(function () { return jtv.constant(undefined); }),
  keyEncode: function () { throw 'EncodeError'; },
  decoder: damlTypes.lazyMemo(function () { return jtv.object({assetType: exports.AssetType.decoder, owner: damlTypes.Party.decoder, amount: damlTypes.Numeric(10).decoder, observers: pkg97b883cd8a2b7f49f90d5d39c981cf6e110cf1f1c64427a28a6d58ec88c43657.DA.Set.Types.Set(damlTypes.Party).decoder, }); }),
  encode: function (__typed__) {
  return {
    assetType: exports.AssetType.encode(__typed__.assetType),
    owner: damlTypes.Party.encode(__typed__.owner),
    amount: damlTypes.Numeric(10).encode(__typed__.amount),
    observers: pkg97b883cd8a2b7f49f90d5d39c981cf6e110cf1f1c64427a28a6d58ec88c43657.DA.Set.Types.Set(damlTypes.Party).encode(__typed__.observers),
  };
}
,
  Archive: {
    template: function () { return exports.Asset; },
    choiceName: 'Archive',
    argumentDecoder: damlTypes.lazyMemo(function () { return pkgd14e08374fc7197d6a0de468c968ae8ba3aadbf9315476fd39071831f5923662.DA.Internal.Template.Archive.decoder; }),
    argumentEncode: function (__typed__) { return pkgd14e08374fc7197d6a0de468c968ae8ba3aadbf9315476fd39071831f5923662.DA.Internal.Template.Archive.encode(__typed__); },
    resultDecoder: damlTypes.lazyMemo(function () { return damlTypes.Unit.decoder; }),
    resultEncode: function (__typed__) { return damlTypes.Unit.encode(__typed__); },
  },
};


damlTypes.registerTemplate(exports.Asset);



exports.AssetType = {
  decoder: damlTypes.lazyMemo(function () { return jtv.object({issuer: damlTypes.Party.decoder, symbol: damlTypes.Text.decoder, fungible: damlTypes.Bool.decoder, reference: damlTypes.Optional(damlTypes.Text).decoder, }); }),
  encode: function (__typed__) {
  return {
    issuer: damlTypes.Party.encode(__typed__.issuer),
    symbol: damlTypes.Text.encode(__typed__.symbol),
    fungible: damlTypes.Bool.encode(__typed__.fungible),
    reference: damlTypes.Optional(damlTypes.Text).encode(__typed__.reference),
  };
}
,
};

