# solv-v3-subgraph-tvl

## project:
    1.payabelDelegate

## Directory Structure
    - payableDelegateYaml
        - abis
            PayableConcrete.json
            PayableDelegate.json
        schema.graphql
        subgraph_eth_dev.yaml
        subgraph_eth_test.yaml
    - src 
        - mappings
           - payableDelegate
           utils.ts
    package.json
    tsconfig.json

## example:
    1.yarn issue-market-codegen //codegen
    2.yarn issue-market-deploy-dev //deploy