[![Daml logo](https://docs.daml.com/_static/images/DAML_Logo_Blue.svg)](https://www.daml.com)

[![Download](https://img.shields.io/github/release/digital-asset/daml.svg?label=Download)](https://docs.daml.com/getting-started/installation.html)
[![License](https://img.shields.io/badge/License-Apache%202.0-blue.svg)](https://github.com/digital-asset/daml/blob/main/LICENSE)

# Welcome to the Wallet Ref App, created with Create Daml App

![Screenshot 2022-04-05 at 9 25 55 AM](https://user-images.githubusercontent.com/97971317/161801302-4baba014-bbe6-4b2a-a0a5-90c3cfdeb7c5.png)

an open-source digital asset wallet powered by Daml smart contracts and Daml/React Javascript library and deployed in Daml Hub. This app provides developers with a working example of how to implement essential workflows related to digital assets such as asset issuance, airdrop, transfer and atomic swaps. We assume the developer already has basic knowledge of Daml. You can view the full repo here

Current set of features include 
- Creating an asset holding account
- Issuing assets
- Inviting other users to become asset owners
- Sending assets (transfer ownership)
- Airdropping assets
- Swapping assets (atomic swap)


The whole project was bootstrapped with
[Create React App](https://github.com/facebook/create-react-app).
Regardless of these choices, all Daml specific aspects of the UI client are
written in plain TypeScript and the UI framework should hence be easily
replaceable.

# Purpose of the wallet Ref App
Provide a live Daml application that developers can learn from by viewing the Daml templates, and see how they interact with a frontend. 

# Running the Project Locally
From the root of the project
1. Run `make build`, this will generate the `.daml` files which include `Account-0.0.1.dar`, and the other dars which are needed for the js bindings.
2. From the root, run `make codegen` which runs the below script:

`daml codegen js  main/Asset/.daml/dist/Asset-0.0.1.dar main/User/.daml/dist/User-0.0.1.dar main/Account/.daml/dist/Account-0.0.1.dar -o ui/daml.js`

This will generate a `daml.js` in the `/ui` directory that has the JS bindings. 

3. `cd ui` and run `npm install`

4. From the root, run 
```
daml sandbox --ledgerid wallet-refapp-sandbox main/Asset/asset.dar main/User/user.dar main/Account/account.dar
```
This will upload the dars into the sandbox and start the sandbox. 

In another terminal, run 
```
daml json-api --ledger-host localhost --ledger-port 6865 --http-port 7575
```

Finally in the /ui directory, run 

`npm start` 

to start the ui.

(To Inspect if the dar has been uploaded)
`daml damlc inspect-dar .daml/dist/LocalDev-0.0.1.dar`

This should open a browser window with a login screen.
If it doesn't, you can manually point your browser to http://localhost:3000.

# Configuring Triggers for Local Development
There are 4 triggers we need to start. The purpose of the trigger is to automate ledger actions that otherwise would require human interaction. This is so that each user can have a bot to swap / send asset with, and users can receive a starting Example Token automatically. Read more about triggers [here](https://docs.daml.com/triggers/index.html).

In the above steps, we created a `triggers.dar` file which includes all triggers, however we still need to explicitly run each of them. 
All triggers will be run by `userAdmin` in Daml hub, but locally, we will just use a string `a` for simplicity sake.



## Running the triggers

1. Start the sendAssetHoldingAccountInviteTrigger, run the below from the trigger directory.
```
daml trigger --dar .daml/dist/triggers-0.0.1.dar \
             --trigger-name SendAssetHoldingAccountInviteTrigger:sendAssetHoldingAccountInviteTrigger \
             --ledger-host localhost \
             --ledger-port 6865 \
             --ledger-party "a"

```
The purpose of this trigger is to send an `ExampleToken` Asset Holding Account invitation for new users

2. start the `AcceptAirdropRequestTrigger` trigger from trigger directory
```
daml trigger --dar .daml/dist/triggers-0.0.1.dar \
             --trigger-name AcceptAirdropRequestTrigger:acceptAirdropRequestTrigger \
             --ledger-host localhost \
             --ledger-port 6865 \
             --ledger-party "a"

```
3. start the `AcceptAssetInviteTrigger` trigger from trigger directory
```
daml trigger --dar .daml/dist/triggers-0.0.1.dar \
             --trigger-name AcceptAssetInviteTrigger:acceptAssetInviteTrigger \
             --ledger-host localhost \
             --ledger-port 6865 \
             --ledger-party "a"

```
4. start the `AcceptSwapTrigger` trigger from trigger directory
```
daml trigger --dar .daml/dist/triggers-0.0.1.dar \
             --trigger-name AcceptSwapTrigger:acceptSwapTrigger \
             --ledger-host localhost \
             --ledger-port 6865 \
             --ledger-party "a"

```
# Deploying to Daml Hub

We will need to upload the below files to Daml hub.

1. Asset.dar
2. User.dar
3. Account.dar
4. Triggers.dar
5. wallet-refapp.zip (UI asset)

From the root of the project, 
1. `make build`, this will generate the `.daml` files which include `Account-0.0.1.dar`, and the other dars which is needed for the js bindings, as well as the dar files to upload onto daml hub (Asset.dar, User.dar, Account.dar, Triggers.dar)

If you have trouble executing the `.sh` file, do

```
chmod u+r+x filename.sh
```
https://askubuntu.com/questions/409025/permission-denied-when-running-sh-scripts

2. run `make codegen` which runs the below script:
`daml codegen js  main/Asset/.daml/dist/Asset-0.0.1.dar main/User/.daml/dist/User-0.0.1.dar main/Account/.daml/dist/Account-0.0.1.dar -o ui/daml.js`
This will generate a `daml.js` in the `/ui` directory that has the JS bindings. 

3. `cd ui` and run `npm install`, 
4. run `npm run zip`, this will generate `wallet-refapp-ui.zip` which you will upload to daml hub. 

## Configure triggers for Daml Hub
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



# Swap workflow (summarized user and data flow)
Sender workflow
1. Fetch sender's Asset Holding Account Contract
2. Exercise Create_Trade on this contract, with 3 arguments. 
   1) List of asset contracts of the offered asset. 
   2) the offered amount (how much the sender wants to send away)
   3) the requested asset (a record the includes the amount requested)

 Receiver workflow
 1. Fetch incoming Trade contracts
 2. Exercise the Settle_Trade choice with the list of requested assets (asset requested by sender)



# Helpful Daml Discussion Forum Links
- Starting two separate daml projects in one repo, [thread](https://discuss.daml.com/t/visual-studio-code-could-not-find-module-daml-script-when-multiple-daml-projects-open/4142)

- Importing templates into another module, [thread](https://discuss.daml.com/t/importing-templates-into-new-modules/1310)
- Importing choices from a template to another module [thread](https://discuss.daml.com/t/is-it-possible-to-import-a-specific-template-from-a-module/222)



