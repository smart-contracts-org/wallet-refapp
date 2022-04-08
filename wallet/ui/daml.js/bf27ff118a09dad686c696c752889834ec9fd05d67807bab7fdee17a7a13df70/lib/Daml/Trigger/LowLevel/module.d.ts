// Generated from Daml/Trigger/LowLevel.daml
/* eslint-disable @typescript-eslint/camelcase */
/* eslint-disable @typescript-eslint/no-namespace */
/* eslint-disable @typescript-eslint/no-use-before-define */
import * as jtv from '@mojotech/json-type-validation';
import * as damlTypes from '@daml/types';
/* eslint-disable-next-line @typescript-eslint/no-unused-vars */
import * as damlLedger from '@daml/ledger';

export declare type CompletionStatus =
  |  { tag: 'Failed'; value: CompletionStatus.Failed }
  |  { tag: 'Succeeded'; value: CompletionStatus.Succeeded }
;

export declare const CompletionStatus:
  damlTypes.Serializable<CompletionStatus> & {
  Failed: damlTypes.Serializable<CompletionStatus.Failed>;
  Succeeded: damlTypes.Serializable<CompletionStatus.Succeeded>;
  }
;


export namespace CompletionStatus {
  type Failed = {
    status: damlTypes.Int;
    message: string;
  };
} //namespace CompletionStatus


export namespace CompletionStatus {
  type Succeeded = {
    transactionId: TransactionId;
  };
} //namespace CompletionStatus


export declare type Completion = {
  commandId: CommandId;
  status: CompletionStatus;
};

export declare const Completion:
  damlTypes.Serializable<Completion> & {
  }
;


export declare type CommandId = {
  unpack: string;
};

export declare const CommandId:
  damlTypes.Serializable<CommandId> & {
  }
;


export declare type EventId = {
  unpack: string;
};

export declare const EventId:
  damlTypes.Serializable<EventId> & {
  }
;


export declare type TransactionId = {
  unpack: string;
};

export declare const TransactionId:
  damlTypes.Serializable<TransactionId> & {
  }
;

