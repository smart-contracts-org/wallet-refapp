import React from 'react';

import { Card, CardContent, Typography } from '@mui/material';
export const GettingStartedMessage: React.FC = () => {
  return (
    <>
      <Card sx={{ margin: 1 }}>
        <CardContent>
          <Typography color='primary' sx={{ fontWeight: 'bold' }} variant='h6'>
            Getting Started
            </Typography>
          <Typography>
            This guide will walk you through the following:
            </Typography>
          <br />
          <Typography>
            <b>1.</b> Requesting to be a DamlToken asset holder. <i>This will be necessary for the swap workflow later on.</i>
          </Typography>
          <Typography>
            <b>2.</b> Creating a new asset class via creating a new AssetHoldingAccount
           </Typography>
          <Typography>
            <b>3.</b>  Issuing quantities of that specific asset.
           </Typography>
          <Typography>
            <b>4.</b>  Inviting others to become asset holders (because without your invitation of becoming an asset holder, you will not be able to send or swap the newly created tokens)
           </Typography>
          <Typography>
            <b>5.</b>  Sending assets to other users.
           </Typography>
          <Typography>
            <b>6.</b>  Swapping your newly created asset with the Daml Token.
           </Typography>
        </CardContent>
      </Card>
      <Card sx={{ margin: 1 }}>
        <CardContent>
          <Typography color='primary' sx={{ fontWeight: 'bold' }} variant='h6'>
            1. Requesting Daml Token
            </Typography>
          <Typography>
            To receive DamlTokens via airdrop, you will need to tweet to <b>@DamlDriven</b> with your ledger ID and the hashtag #DamlTokenPlz.
          </Typography>
          <br />
          <Typography>
            Your ledger ID can be found on the top right corner by clicking on the avatar Icon.
          </Typography>
          <br />
          <Typography>
            Once you have tweeted this, wait a few minutes and check your "Pending Activities" in the left hand menu, and accept the Asset Holding Account invitation.
          </Typography>
          <br />
          <Typography>
            <i>Important: ensure the invitation is from ledger-party-68815041-ad16-4d9a-8177-9f9b20d8fb3f</i>
          </Typography>
          <br />
          <Typography>
            By accepting the invitation, you are opening a DamlToken AssetHoldingAccount, and giving permission to the issuer the right to airdrop (create the asset directly in your wallet) you the tokens.
          </Typography>
          <br />
          <Typography>
            While you wait for the DamlTokens to be airdropped to you, you can continue the steps below.
            </Typography>
        </CardContent>
      </Card>
      <Card sx={{ margin: 1 }}>
        <CardContent>
          <Typography color='primary' sx={{ fontWeight: 'bold' }} variant='h6'>
            2. Creating an AssetHoldingAccount
            </Typography>
          <Typography>
            Click "Create" on the left menu drawer.
            By creating an AssetHoldingAccount, you are acting as the issuer (as well as the owner) of this account.
            </Typography>
          <br />
          <Typography>
            As the issuer, you are able to define the token symbol (ticker / name), whether it is fungible, reshareable, or airdroppable.
          </Typography>
          <br/>
          <Typography>
            The purpose of the AssetHoldingAccount is to allow the owner to perform additional actions such as creating a swap, or transfering the associated asset to another user.
            </Typography>
          <br />
          <Typography>
          Once you’ve created an AssetHoldingAccount, you can mint the asset into your account. 
          </Typography>
          <br/>
          <Typography>
            After you have defined the characteristics, click "Create" to create this asset account.
            </Typography>
            <br/>
            <Typography>
              <i>Note, Assets and AssetHoldingAccounts are linked by common properties: issuer, symbol, resharable, airdroppable, fungible.</i>
            </Typography>
        </CardContent>
      </Card>
      <Card sx={{ margin: 1 }}>
        <CardContent>
          <Typography color='primary' sx={{ fontWeight: 'bold' }} variant='h6'>
            3. Issue / Airdrop Assets
            </Typography>
          <Typography>
            The brand new asset account will have a starting balance of 0.
            </Typography>
          <Typography>
            As an issuer, you can issue new amounts into your account. Click "Issue / Airdrop".
            </Typography>
          <br />
          <Typography>
            <b>Issue To Self</b> <br />means the assets will have the owner field set as your ledgerID. We are creating the assets directly in your wallet (you can choose to send or swap them later).
            </Typography>
          <br />
          <Typography>
            <b>Airdrop</b><br /> means you will be issuing assets directly in another users wallet. In order to airdrop assets, the recipient must first grant you permission to create the assets in their wallet. An assetHolding invitation (or in this case, an airdrop invitation) is required.
            </Typography>
          <br />
          <Typography>
            Specify an amount to issue, and click issue. You can always issue more later.
            </Typography>
        </CardContent>
      </Card>
      <Card sx={{ margin: 1 }}>
        <CardContent>
          <Typography color='primary' sx={{ fontWeight: 'bold' }} variant='h6'>
            4. Invite New Asset Owner
            </Typography>
          <Typography>
            Next, we want to send some of our newly issued assets to another user. However, before we can do this, the recipient will need to be invited as an asset holder.
            </Typography>
          <br />
          <Typography>
            An imperfect anology would be, I won't be able to send you Japanese Yen if you don't open up a Japanese Yen foreign currency account.
            </Typography>
          <br />
          <Typography>
            Go to “My Asset Accounts” in the lefthand side menu, click on the asset you want to share,  and click "Invite".
             </Typography>
          <br />
          <Typography>
            Specify the ledger ID, and click invite.
             </Typography>
          <br />

          <Typography>

            Once the user accepts your invitation, the AssetHoldingAccounts will be created.
             </Typography>
          <br />
          <Typography>
Note, if the account is resharable, any account owner can invite other users to create AssetHoldingAccounts for this asset. If the account is not resharable, only the issuer can invite other users to create AssetHoldingAccounts for this asset.
             </Typography>
          <br />
          <Typography>
            If later on, you decide that you don't want to share this asset account, you can go to "Pending Activities", "Outbound Requests" and cancel the invitation, provided that it is hasn't been accepted by the recipient yet.
             </Typography>

        </CardContent>
      </Card>
      <Card sx={{ margin: 1 }}>
        <CardContent>
          <Typography color='primary' sx={{ fontWeight: 'bold' }} variant='h6'>
            5. Send
            </Typography>
          <Typography>
            Assuming the recipient has accepted the AssetHolderAccount invitation, then you can send the user the asset.
          </Typography>
          <br />
          <Typography>
            For the asset that you want to send, click "send" and specify the party ID and amount
             </Typography>
          <br />
          <Typography>
            <i>important: you can send tokens to anyone, regardless of if they have the assetHoldingAccount. However in order for the recipient to receive the tokens, the user needs to have that asset account</i>
             </Typography>
          <br />
          <Typography>
            If you decide later on, and assuming the recipient has not accepted the send request, you can cancel it by going to "Pending activities" outbound, and click on the asset that you are sending, and click "Cancel".
             </Typography>
        </CardContent>
      </Card>
      <Card sx={{ margin: 1 }}>
        <CardContent>
          <Typography color='primary' sx={{ fontWeight: 'bold' }} variant='h6'>
            5. Swap
            </Typography>
          <Typography>
            Let's try and swap your newly issued asset with some DamlTokens. What you'll be creating here is a swap request. The assets are not swapped immediately, but rather a request to swap is created.
            </Typography>
          <br />
          <Typography>
            If the recipient agrees to your proposed swap, then will the atomic swap occur. If the recipient doesn't like the agreement, they can reject the swap request.
            </Typography>
          <br />
          <Typography>
            Navigate to the asset that you want to swap, and click "Swap"
            </Typography>
          <br />
          <Typography>
            Specify the user's ledger ID. For this example, we will the issuer of DamlToken,
            
            <br/>
            <br/>

            <i><b>ledger-party-68815041-ad16-4d9a-8177-9f9b20d8fb3f</b></i>
            <br/>
            <br/>

            specify the amount of your token that you want to swap out.
            </Typography>
          <br />
          <Typography>
            And specify the asset Type you want to receive, and the quantity.
            </Typography>
          <Typography>
            Perhaps you believe your asset is worth 1 DamlToken, or 100 DamlTokens.
            </Typography>
          <br />
          <Typography>
            If later you want to change the swap terms, you will need to cancel the swap proposal and create a new one with the new terms.
          </Typography>
        </CardContent>
      </Card>

    </>
  )
}