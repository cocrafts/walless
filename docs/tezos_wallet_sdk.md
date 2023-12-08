# Tezos wallet SDK

Tezos network uses [tzip10](https://gitlab.com/tezos/tzip/-/blob/master/proposals/tzip-10/tzip-10.md) standard for communication between `dApp` and `wallet`. The standard defined both communication channel as well as request structure and error handling when communicating.

[Beacon SDK](https://github.com/airgap-it/beacon-sdk) is an implementation of Tzip10, but it just supports well for dApp at the time. We use Beacon SDK for the dApp example have a look of encryption layer (known as transport layer).

You need to read the tzip10 standard carefully to understand how the transport layer work.

Signing mechanism: [https://tezostaquito.io/docs/signing/](https://tezostaquito.io/docs/signing/)
