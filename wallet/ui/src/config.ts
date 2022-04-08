// Copyright (c) 2021 Digital Asset (Switzerland) GmbH and/or its affiliates. All rights reserved.
// SPDX-License-Identifier: Apache-2.0

export enum DeploymentMode {
  DEV,
  PROD_DAML_HUB,
  PROD_OTHER,
}
export const deploymentMode: DeploymentMode =
  process.env.NODE_ENV === 'development'
  ? DeploymentMode.DEV
  // TODO: endsWith is also changed from legacy
  : window.location.hostname.endsWith('.daml.app')
  ? DeploymentMode.PROD_DAML_HUB
  : DeploymentMode.PROD_OTHER;

// Decide the ledger ID based on the deployment mode first,
// then an environment variable, falling back on the sandbox ledger ID.
export const ledgerId: string =
  deploymentMode === DeploymentMode.PROD_DAML_HUB
  ? window.location.hostname.split('.')[0]
  : process.env.REACT_APP_LEDGER_ID
  ?? 'wallet-refapp-sandbox';
export const httpBaseUrl =
deploymentMode === DeploymentMode.PROD_DAML_HUB
// TODO: Note that this is changed from legacy
  ? `https://${ledgerId}.daml.app/`
  : undefined;
