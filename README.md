# Getting Started

Run ```npm run start```
# Build and Test

- Run ```npm run build``` for generate bundle
- Run ```docker build . -t jmirandr/dev-kt-provider-resolver-did-ev``` for generate docker image
- Run ```docker run -p 8080:8000 -e NODE_HOST=[YOUT_BLOCKCHAIN_NODE_RPC] -e ADDRESS_IM=[YOUR_SMARTCONTRACT_ADDRESS] -d jmirandr/dev-kt-provider-resolver-did-ev```for run container