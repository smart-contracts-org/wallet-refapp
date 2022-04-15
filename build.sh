cd main/User
daml build
daml build -o user.dar
echo "User dar file built"

cd ../Asset
daml build
daml build -o asset.dar
echo "Asset dar file built"


# this needs to be last to build due to dependencies
cd ../Account
daml build
daml build -o account.dar
echo "Account dar file built"

cd ../../triggers
daml build
daml build -o triggers.dar
echo "Triggers dar file built"
echo "Dars building complete"




# cd ..


# cd ../../Test
# daml test