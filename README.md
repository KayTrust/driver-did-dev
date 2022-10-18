# Getting Started

Run ```npm run start```
# Build and Test

- Run ```npm run build``` for generate bundle
- Run ```docker build . -t driver-did-ev``` for generate docker image
- Run ```docker run -p 8080:8000 -e NODE_HOST=[YOUR_BLOCKCHAIN_NODE_RPC] -e ADDRESS_IM=[YOUR_SMARTCONTRACT_ADDRESS] -d driver-did-ev```for run container


|Key   | Description  | Default | Notes
|---|---|---|---
| NODE_HOST | RPC node url | (mandatory)
| ADDRESS_IM | Address of the Identity Manager contract | (mandatory)
| HEADERS | Additional HTTP headers for JSON-RPC calls to node, such as authentication | No headers
| FIND_EVENTS | Use Ethereum events as a source for getting the authorized keys. | ```true```  |
| KEYS | Use an explicit list of keys as a source for getting the authorized keys. E.g.: ```['0x2FD3a895C728652FFe586b0B9e07B47edfC6e3FD']``` | ```[]```
| BASE_BLOCKS | Minimun value for ```fromBlock```. | ```30000000``` | Only used when `findEvents` is `true`. 
| LAST_BLOCKS | Last blocks to be taken from ```toBlock```. | ```0``` | Only used when `findEvents` is `true`.
| BUFFER_SIZE | Size of the slices in the event searching. Use greater values to search more efficiently, use lower values to avoid possible timeout problems. |```100000``` | Only used when `findEvents` is `true`.
| START_BLOCK_MARGIN | Web3JS or Besu seem to have a bug where filtering events sometimes ignores events emitted in the early blocks. This setting can be used to work around the issue by starting the filtering on an earlier block number. | ```100000``` | Only used when `findEvents` is `true`.