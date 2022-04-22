[![Daml logo](https://docs.daml.com/_static/images/DAML_Logo_Blue.svg)](https://www.daml.com)

[![Download](https://img.shields.io/github/release/digital-asset/daml.svg?label=Download)](https://docs.daml.com/getting-started/installation.html)
[![License](https://img.shields.io/badge/License-Apache%202.0-blue.svg)](https://github.com/digital-asset/daml/blob/main/LICENSE)

# Welcome to the Wallet Daml Reference App

![Screenshot 2022-04-05 at 9 25 55 AM](https://user-images.githubusercontent.com/97971317/161801302-4baba014-bbe6-4b2a-a0a5-90c3cfdeb7c5.png)

Wallet Daml Reference App is an open-source digital asset wallet powered by [Daml](https://www.digitalasset.com/developers) smart contracts and [Daml/React](https://docs.daml.com/app-dev/bindings-ts/) Javascript library, and deployed in [Daml Hub](https://www.digitalasset.com/products/daml-hub). This app provides developers with a working example of how to implement essential workflows related to digital assets (or tokens) such as asset issuance, airdrop, transfer and atomic swap. We assume the developer already has basic knowledge of Daml.

User workflows implemented in Wallet Daml Reference App include the following features 
- Creating an asset holding account
- Issuing assets (creating new quantities of an asset in an issuer party account)
- Airdropping assets (creating new quantities of an asset in a non-issuer party account)
- Inviting other users to create their asset holding accounts
- Sending assets to other users (asset ownership transfer)
- Swapping assets (atomic swap - simultaneous transfer of ownership of two assets between two parties)
The app is centered around the concepts of asset and asset holding account. To learn about these concepts and their implementation in this app see [Wallet Daml Reference App - concepts and their implementation](Concepts.md) article.

The frontend of the project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).
However, all Daml specific aspects of the UI client are written in plain TypeScript. The React framework can be easily replaced with any other UI framework.

# Prerequisites
- [Daml SDK](https://docs.daml.com/getting-started/installation.html)
- Java 11 or higher
- [Visual Studio Code](https://code.visualstudio.com)
- [Node.js](https://nodejs.org/en/)

# Building the project
From the root of the project
1. Run `make build`. This will generate the [.dar files](https://docs.daml.com/concepts/glossary.html#dar-file-dalf-file) which include `asset.dar`, `account.dar`, and the other dar files that need to be deployed to the backend [Daml ledger](https://docs.daml.com/concepts/glossary.html#daml-ledger).
2. From the root, run `make codegen` which executes the following script:
`daml codegen js  main/Asset/asset.dar main/User/user.dar main/Account/account.dar -o ui/daml.js`
This will generate a `daml.js` folder in the `/ui` directory with the JavaScript bindings. 
3. `cd ui` and run `npm install`

# Running the project Locally
From the project root folder, run 
```
daml sandbox --ledgerid wallet-refapp-sandbox main/Asset/asset.dar main/User/user.dar main/Account/account.dar
```
This will upload the dars into the sandbox and start the sandbox. Leave this terminal running.

In a separate terminal run 
```
daml json-api --ledger-host localhost --ledger-port 6865 --http-port 7575
```
Finally in the 3rd terminal cd to the `ui` directory and run `npm start` to start the UI.
This should open a browser window with a login screen.
If it doesn't, you can manually navigate your browser to http://localhost:3000.

# Configuring Triggers for deploypment to local Daml Sandbox
[Daml triggers](https://docs.daml.com/triggers/index.html) provide automation for certain interactions with the ledger. This project implements 4 triggers, which we need to start. These triggers implement a bot, which provides a party for a human user to swap assets with. When you login as a user to the app frontend for the first time, you automatically receive an invite to create an asset holding account for Example Token (ET). Once you accept the invite, you can request new quantities of the Example Token to be airdropped into your asset holding account. This request is automatically granted. Finally, after creating an asset holding account for a new asset type and after issuing a quantity of this asset into your own account, you can swap this asset for an amount of Example Token. All this functionality demonstrates the workflows implemented in the app without requiring another human user to interact (e.g. trade assets) with.

The file named `triggers.dar`, which contains the trigers, was created in step 1 of Running the Project Locally. Now we need to explicitly run each of the 4 triggers in this file. When the app is deployed in Daml Hub the triggers will be run under the authority of the ledger party named 'userAdmin'. When we run the project locally in Daml Sandbox, we will name this ledger party 'a' for brevity. This party is the issuer of Example Token.

## Running the triggers

Before running the triggers, login to the app frontend with username 'a'. Select 'Create' in the navigation pane on the left and create a new asset holding account with Symbol 'ET'. Leave the default values for other asset attributes (Reference, Resharable, Airdroppable and Fungible). Log out of the app frontend by clicking on the 'user' icon in the top right corner of the app window and selecting 'Logout'.
1. To start the sendAssetHoldingAccountInviteTrigger, run the following command from the `triggers` directory in yet another terminal.
```
daml trigger --dar triggers.dar \
             --trigger-name SendAssetHoldingAccountInviteTrigger:sendAssetHoldingAccountInviteTrigger \
             --ledger-host localhost \
             --ledger-port 6865 \
             --ledger-party "a"
```
This trigger sends an invitation to create an Asset Holding Account for Example Token to new users.

2. start the `AcceptAirdropRequestTrigger` trigger from trigger directory
```
daml trigger --dar .daml/dist/triggers-0.0.1.dar \
             --trigger-name AcceptAirdropRequestTrigger:acceptAirdropRequestTrigger \
             --ledger-host localhost \
             --ledger-port 6865 \
             --ledger-party "a"
```
This trigger allows 'userAdmin' party (the issuer of Example Token) to automatically accept airdrop requests for Example Token.

3. start the `AcceptAssetInviteTrigger` trigger from trigger directory
```
daml trigger --dar .daml/dist/triggers-0.0.1.dar \
             --trigger-name AcceptAssetInviteTrigger:acceptAssetInviteTrigger \
             --ledger-host localhost \
             --ledger-port 6865 \
             --ledger-party "a"
```
This trigger allows 'userAdmin' party (the issuer of Example Token) to automatically accept invites to create an Asset Holding Account for user's asset. This invite is created as part of a swap workflow when a user swaps his or her asset for an amount of Example Tokens with 'userAdmin' party.

4. start the `AcceptSwapTrigger` trigger from trigger directory
```
daml trigger --dar .daml/dist/triggers-0.0.1.dar \
             --trigger-name AcceptSwapTrigger:acceptSwapTrigger \
             --ledger-host localhost \
             --ledger-port 6865 \
             --ledger-party "a"
```
This trigger allows 'userAdmin' party (the issuer of Example Token) to automatically accept a swap proposal created by a user, where the user proposes to swap his or her asset for an amount of Example Tokens with 'userAdmin' party.

# Deploying the project to Daml Hub
First create a free [Daml Hub](https://www.digitalasset.com/products/daml-hub) account.  
To learn how to deploy Daml apps to Daml Hub see [Daml Hub Quickstart](https://hub.daml.com/docs/quickstart/)  
To deploy this project we need to upload to Daml Hub the following dar files created in "Building the project": asset.dar, account.dar, user.dar, triggers.dar.
In addition we need to create wallet-refapp.zip file by running `npm run zip` command from in the `ui` directory. This zip file contains the app UI and also needs to be uploaded to Daml Hub.

## Configure triggers for Daml Hub
[todo]
