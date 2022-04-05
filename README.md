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


## Deploying to Daml Hub

Deploying `wallet-refapp` to the hosted Daml platform
[Daml Hub](https://hub.daml.com/) is quite simple. Log into your Daml Hub
account, create a new ledger and upload your Daml models and your UI.

To upload the Daml models, compile them into a DAR by executing
```
daml build -o wallet-refapp.dar
```
at the root of your repository. Afterwards, open to the Daml Hub website, select
the ledger you want to deploy to, go to the "Daml" selection and upload the
DAR `wallet-refapp.dar` you have just created.

To upload the UI, create a ZIP file containing all your UI assets by executing
```
daml build
daml codegen js .daml/dist/wallet-refapp-0.1.0.dar -o ui/daml.js
(cd ui && npm install && npm run-script build && zip -r ../wallet-refapp-ui.zip build)
```
at the root of the repository. Afterwards, select the "UI Assets" tab of your
chosen ledger on the Daml Hub website, upload the ZIP file
(`wallet-refapp-ui.zip`) you have just created and publish it.

To see your deployed instance of `wallet-refapp` in action, follow the
"Visit site" link at the top right corner of your "UI Assets" page.


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


