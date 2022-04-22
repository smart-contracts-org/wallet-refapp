# Deletes all locally built files
cd main/Account && rm -f -r .daml && rm -f account.dar
cd ../Asset && rm -f -r .daml && rm -f asset.dar 
cd ../User && rm -f -r .daml && rm -f user.dar 
cd ../../triggers && rm -f -r .daml && rm -f triggers.dar 
cd ../ui && rm -f -r daml.js && rm -f -r node_modules && rm -rf build
