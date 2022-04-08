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


exports.CompletionStatus = {
  decoder: damlTypes.lazyMemo(function () { return jtv.oneOf(jtv.object({tag: jtv.constant('Failed'), value: exports.CompletionStatus.Failed.decoder, }), jtv.object({tag: jtv.constant('Succeeded'), value: exports.CompletionStatus.Succeeded.decoder, })); }),
  encode: function (__typed__) {
  switch(__typed__.tag) {
    case 'Failed': return {tag: __typed__.tag, value: exports.CompletionStatus.Failed.encode(__typed__.value)};
    case 'Succeeded': return {tag: __typed__.tag, value: exports.CompletionStatus.Succeeded.encode(__typed__.value)};
    default: throw 'unrecognized type tag: ' + __typed__.tag + ' while serializing a value of type CompletionStatus';
  }
}
,
  Failed:({
    decoder: damlTypes.lazyMemo(function () { return jtv.object({status: damlTypes.Int.decoder, message: damlTypes.Text.decoder, }); }),
    encode: function (__typed__) {
  return {
    status: damlTypes.Int.encode(__typed__.status),
    message: damlTypes.Text.encode(__typed__.message),
  };
}
,
  }),
  Succeeded:({
    decoder: damlTypes.lazyMemo(function () { return jtv.object({transactionId: exports.TransactionId.decoder, }); }),
    encode: function (__typed__) {
  return {
    transactionId: exports.TransactionId.encode(__typed__.transactionId),
  };
}
,
  }),
};







exports.Completion = {
  decoder: damlTypes.lazyMemo(function () { return jtv.object({commandId: exports.CommandId.decoder, status: exports.CompletionStatus.decoder, }); }),
  encode: function (__typed__) {
  return {
    commandId: exports.CommandId.encode(__typed__.commandId),
    status: exports.CompletionStatus.encode(__typed__.status),
  };
}
,
};



exports.CommandId = {
  decoder: damlTypes.lazyMemo(function () { return jtv.object({unpack: damlTypes.Text.decoder, }); }),
  encode: function (__typed__) {
  return {
    unpack: damlTypes.Text.encode(__typed__.unpack),
  };
}
,
};



exports.EventId = {
  decoder: damlTypes.lazyMemo(function () { return jtv.object({unpack: damlTypes.Text.decoder, }); }),
  encode: function (__typed__) {
  return {
    unpack: damlTypes.Text.encode(__typed__.unpack),
  };
}
,
};



exports.TransactionId = {
  decoder: damlTypes.lazyMemo(function () { return jtv.object({unpack: damlTypes.Text.decoder, }); }),
  encode: function (__typed__) {
  return {
    unpack: damlTypes.Text.encode(__typed__.unpack),
  };
}
,
};

