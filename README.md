[![Daml logo](https://docs.daml.com/_static/images/DAML_Logo_Blue.svg)](https://www.daml.com)

[![Download](https://img.shields.io/github/release/digital-asset/daml.svg?label=Download)](https://docs.daml.com/getting-started/installation.html)
[![License](https://img.shields.io/badge/License-Apache%202.0-blue.svg)](https://github.com/digital-asset/daml/blob/main/LICENSE)

# Welcome to the Wallet Ref App, created with Create Daml App

![Screenshot 2022-04-05 at 9 25 55 AM](https://user-images.githubusercontent.com/97971317/161801302-4baba014-bbe6-4b2a-a0a5-90c3cfdeb7c5.png)


This repository contains a template to get started with developing full-stack
[Daml](https://daml.com/) applications. The demo application covers the following aspects:

1. [Daml](https://docs.daml.com/index.html) templates
2. A UI written in [TypeScript](https://www.typescriptlang.org/) and [React](https://reactjs.org/)

The UI is developed using [React](https://reactjs.org/),

The whole project was bootstrapped with
[Create React App](https://github.com/facebook/create-react-app).
Regardless of these choices, all Daml specific aspects of the UI client are
written in plain TypeScript and the UI framework should hence be easily
replaceable.


## Getting started (Setting up the dev environment)

Before you can run the application, you need to install the
[Node](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm) package manager for JavaScript.

There are two steps to build the project.
First, we need to generate TypeScript code bindings for the compiled Daml model.
At the root of the repository, run
```
daml build
daml codegen js .daml/dist/wallet-refapp-0.1.0.dar -o ui/daml.js
```
The latter command generates TypeScript packages in the `daml.js` directory.

Next, navigate to the `ui` directory and install the dependencies and build the app by running
```
cd ui
npm install
npm run-script build
```
The last step is not absolutely necessary but useful to check that the app compiles.

To start the application, there are again two steps.
In one terminal in the root directory, start a Daml ledger using
```
daml start
```
This must continue running to serve ledger requests.

Then in a second terminal window in the `ui` directory, start the UI server via
```
npm start
```
This should open a browser window with a login screen.
If it doesn't, you can manually point your browser to http://localhost:3000.


## How to Use the Wallet Refapp

Once you have the app running locally, you can log into the app by providing any user name, say `Alice`. For simplicity
of this app, there is no password or sign-up required. 

The below steps will walk you through how to create an asset, and send that asset to another user. 

1. Once logged in, you will land on the "My Asset Accounts" page. 
2. Click "Create" on the right hand side to get to the Asset Holding Account creationg page
3. Specify a ticker / symbol for the asset account. Specify if it should be fungible / shareable / airdroppable.
4. Click "Create" and this account will be created. Note that the balance will be 0. 
5. Click "Issue/Airdrop" assets, and you will be able to issue an amount for this asset. 
6. Before you can send the asset to someone, you need to invite the recipient to be an asset owner, so click "Invite" and specifiy the recipient Ledger ID. For simplicity you can just input `bob`. 
7. Logout by clicking on the avatar icon on the top right corner, and login with `bob`
8. Click "Pending Activities" on the right handside, and you should see an asset invite request, accept it. 
9. Logout of `bob` and log back in using "Alice"
10. Go to the asset that you wanted to send, and now you can click "send" and specify the recipient as `bob` and specify an amount to send. We are essentially creating a send request which needs to be accepted by `bob` in order for the ownership to transfer.
11. Login with `bob` and accept the transfer in "Pending Activities"

You have successfully transfered ownership of your asset to `bob`

# Contributing 
If you would like to make any changes, simply create a pull request and include the description and goal of your PR. 


# Deploying to Daml Hub

What we will need to upload to Daml hub

1. Asset.dar
2. User.dar
3. Account.dar
4. Triggers.dar
5. wallet-refapp.zip (UI asset)

From the root of the project, 
1. `make build`, this will generate the `.daml` files which include `Account-0.0.1.dar`, and the other dars which is needed for the js bindings, as well as the dar files to upload onto daml hub (Asset.dar, User.dar, Account.dar, Triggers.dar)

If you have trouble executing the .sh file, do

```
chmod u+r+x filename.sh
```
https://askubuntu.com/questions/409025/permission-denied-when-running-sh-scripts

2. run `make codegen` which runs the below script:
`daml codegen js  main/Asset/.daml/dist/asset-0.0.1.dar main/User/.daml/dist/user-0.0.1.dar main/Account/.daml/dist/account-0.0.1.dar main/LocalDev/.daml/dist/LocalDev-0.0.1.dar -o ui/daml.js`
This will generate a `daml.js` in the `/ui` directory that has the JS bindings. 
You will notice a `LocalDev-0.0.1.dar`, this is <b>not</b> used for DamlHub, but for running the sandbox ledger locally. 
3. `cd ui` and run `npm install`, 
4. run `npm run zip`, this will generate `wallet-refapp-ui.zip` which you will upload to daml hub. 

## Configure triggers for Daml Hub
[todo]


# Run the Project Locally
From the root of the project
1. Run `make build-dars`, this will generate the `.daml` files which include `Account-0.0.1.dar`, and the other dars which are needed for the js bindings.
2. run 
`daml codegen js  main/Asset/.daml/dist/asset-0.0.1.dar main/User/.daml/dist/user-0.0.1.dar main/Account/.daml/dist/account-0.0.1.dar main/LocalDev/.daml/dist/LocalDev-0.0.1.dar -o ui/daml.js`
This will generate a `daml.js` in the `/ui` directory that has the JS bindings. 
You will notice a `LocalDev-0.0.1.dar`, this is what we need to run sandbox ledger locally. 
3. `cd ui` and run `npm install`
5. We need to run `daml start` in the `/main/LocalDev` directory. If you are following along in the same terminal from step 4, then go back out `cd ../main/LocalDev` and run `daml start` to start the local sandbox ledger. 
6. In another terminal, go to the ui directory, and run `npm install` and `npm start` to start the UI. 

## Configuring triggers locally
[todo]

## Next steps

There are many directions in which this application can be extended.
Regardless of which direction you pick, the following files will be the most
interesting ones to familiarize yourself with:

- [`daml/User.daml`](daml/User.daml): the Daml model of the social network
- `daml.js/wallet-refapp-0.1.0/src/User.ts` (once you've generated it):
  a reflection of the types contained in the Daml model in TypeScript
- [`ui/src/components/MainView.tsx`](ui/src/components/MainView.tsx):
  a React component using the HTTP Ledger API and rendering the main features



# Everything Below Here is Work-In-Progress Notes
## swap workflow [Todo]
Workflow for sender: 
1. Get Sender Asset Holding Contract
 2. Exercise create_trade on asset holding contract, 
  2a. within this create_trade, the sender preApproves the receiving asset
 3. with the list of assets for that account
 with amount
 inbound asset details

 Receiver
 aobve creates trade contract
 1. grab Trade contract
 2. Grab asset account of what you need send
 call merge split, with all assets, with amount
 get account for what you want to receive
 call Preparove transfer_in, get from Trade

 1. exercise create_trade on asset account of proposer
 creates a Trade contract, belongs to reciever

2. grab all the asset contracts of the
 3. pass all assets to merge_split choice
 ouputs target amoutn for swap

 accont holding contract create pre-approve contract


# Welcome To the DA Wallet Ref App
an open-sourced, digital assets wallet powered by Daml smart contracts and deployed onto Daml hub.
The purpose of this app is to provide developers a working example of how to acheive common workflows with regards to digital assets. These include Airdrops, atomic swaps, transfer of ownership (sending tokens)

Current set of features include 
- Creating an asset holding account
- Minting assets
- Inviting other users to become potential asset owners
- Sending assets (transfer ownership)
- Airdropping assets
- Swapping assets (atomic swap)

# Account Model
The wallet uses UTXO (Unspent transaction ouput) where each `asset` template represents an amount you may hold.

There are key concepts and workflows of rights and obligations to acheive asset transfers and this app will guide you through the process. 

## 1. Getting Started
Click "Create" in the left hand menu to create your AssetHoldingAccount. 

## 2. Create AssetHoldingAccount
The AssetHoldingAccount is responsible for sending / swapping / choices. Click here to see the full Daml template. Since you, the issuer, is creating this template, all subsequent choices will have your authorization. 

## 3. Issue your assets
You can either select Issue to self or Airdrop. 

### Issue to self
Issue to self creates the assets directly in your wallet. In other words, the assets minted will have an ownership assigned to you, and hence it is only visible to you at this point in time. 
### Airdrop
Airdropping assets means the assets are created with the owner = recipient that you designate. Essentially the assets are being created directly in the recipients wallet. 

Before you can airdrop a token or send a token you will need to invite the recipient as a potential asset holder. 

# Invite new asset holder


# Sending Asset
In order to send an asset, the following conditions must be met: 
- sender has an AssetHoldingAccount
- sender has issued tokens (amount can't be zero)
- sender has invited a new user to be a new asset holder
- recipient has accepted this, and now also has the same assetHoldingAccount

1. sender exercises the create transfer choice with a list of all asset positions, the target amount to send, and the recipient ID. 


# My Active Accounts
The asset accounts are shown here. Think of it as a currency account. You will have an account for USD, CAD, or AUD. The AssetHoldingAccount templates are rendered, along with the amount of assets (amount is extracted from the Asset template). Each AssetHoldingAccount is associated with an asset. 

To get started, click "Create" in the left hand side menu. 

# Create Page
The AssetHoldingAccount template is created here. Once you create your account, you can mint it's associated assets. The purpose of the AssetHoldingAccount is also to allow the owner to perform additional actions such as creating a swap, transfering the associated asset. To see the full template, click here.  

# Asset
The asset template represents your tokenized asset.

# Send Page

# Swap Page

# swap request

# how the templates work together
First start by creating an AssetHoldingAccount, the purpose of this template is to define the assetType it wil be associated with. Similar to a bank account. 


# notes
Once created, you can issue

To get started, you can create your first AssetAccount template by going to "Create" 


# Project deps
starting two separate daml projects in one repo
https://discuss.daml.com/t/visual-studio-code-could-not-find-module-daml-script-when-multiple-daml-projects-open/4142

Importing templates into another module
https://discuss.daml.com/t/importing-templates-into-new-modules/1310

Import choices from a template to another module
https://discuss.daml.com/t/is-it-possible-to-import-a-specific-template-from-a-module/222

# Trigger
locally

1. from parent directory, `cd wallet` into the wallet directory

Creating the main Daml templates and business logic
2. run `daml build`, this will create the `.dist` file, with the `dependencies` directory
3. run `daml build -o wallet-refapp.dar` this will create the wallet-refapp.dar file. This is necessary because the `/trigers/daml.yaml` file requires this as a dependency
4. `cd ..` back out to parent directory, `cd triggers`, while in the triggers directory, run `daml build` to create the `.daml` file. 
When uploading triggers to Daml, even if there are multiple triggers in one daml project, running `daml build -o triggers.dar` will create one dar file, with the multiple triggers, which you can then manage in the daml hub console. 


5. go back to the triggers directory, and run `daml start`, this starts the ledger, you must do this before running the final command to start the trigger
6. run the command below, take note that the different version number will have a different command, eg `ledger-party` vs `ledger user`. 

```
daml trigger --dar .daml/dist/triggers-0.0.1.dar \
             --trigger-name Trigger:autoSendExampleAssetAccountProposal \
             --ledger-host localhost \
             --ledger-port 6865 \
             --ledger-party "a"
```


518032f41fd0175461b35ae0c9691e08b4aea55e62915f8360af2cc7a1f2ba6c, cc348d369011362a5190fe96dd1f0dfbc697fdfd10e382b9e9666f0da05961b7, 9de3ae0b7b4e753f7ce2a5dcaa8d49ab4b92c4d8a8fb9589b5f8c893fbea5bd1, 99a2705ed38c1c26cbb8fe7acf36bbf626668e167a33335de932599219e0a235, e22bce619ae24ca3b8e6519281cb5a33b64b3190cc763248b4c3f9ad5087a92c, d58cf9939847921b2aab78eaa7b427dc4c649d25e6bee3c749ace4c3f52f5c97, 6c2c0667393c5f92f1885163068cd31800d2264eb088eb6fc740e11241b2bf06, 8a7806365bbd98d88b4c13832ebfa305f6abaeaf32cfa2b7dd25c4fa489b79fb, 108aa371793a39379d09dd6f02b5613e8bf37ec9893a826747545df5318475f1, 86828b9843465f419db1ef8a8ee741d1eef645df02375ebf509cdc8c3ddd16cb, c1f1f00558799eec139fb4f4c76f95fb52fa1837a5dd29600baa1c8ed1bdccfd, 733e38d36a2759688a4b2c4cec69d48e7b55ecc8dedc8067b815926c917a182a, f20de1e4e37b92280264c08bf15eca0be0bc5babd7a7b5e574997f154c00cb78, 3f4deaf145a15cdcfa762c058005e2edb9baa75bb7f95a4f8f6f937378e86415, bfcd37bd6b84768e86e432f5f6c33e25d9e7724a9d42e33875ff74f6348e733f, 6839a6d3d430c569b2425e9391717b44ca324b88ba621d597778811b2d05031d, 36ca4e027e6f3c2c3445fcf20a373b754d01c793d712611c59b0513521160a48, cb0552debf219cc909f51cbb5c3b41e9981d39f8f645b1f35e2ef5be2e0b858a, 76bf0fd12bd945762a01f8fc5bbcdfa4d0ff20f8762af490f8f41d6237c6524f, d14e08374fc7197d6a0de468c968ae8ba3aadbf9315476fd39071831f5923662, 057eed1fd48c238491b8ea06b9b5bf85a5d4c9275dd3f6183e0e6b01730cc2ba, 38e6274601b21d7202bb995bc5ec147decda5a01b68d57dda422425038772af7, e491352788e56ca4603acc411ffe1a49fefd76ed8b163af86cf5ee5f4c38645b, 40f452260bef3f29dede136108fc08a88d5a5250310281067087da6f0baddff7, 97b883cd8a2b7f49f90d5d39c981cf6e110cf1f1c64427a28a6d58ec88c43657,