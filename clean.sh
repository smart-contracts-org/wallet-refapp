# Deletes all locally built files
cd main/Account && rm -r .daml && rm account.dar
cd ../Asset && rm -r .daml && rm asset.dar 
cd ../User && rm -r .daml && rm user.dar 
cd ../../ui && rm -r node_modules && rm -r daml.js
