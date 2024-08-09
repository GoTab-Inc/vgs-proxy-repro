# VGS Proxy Repro

This repository is a minimum viable reproduction of an issue with the VGS proxy.

The only requirements are

- Node 16
- npm >=8

Install Node 16 (any minor version) using either
- [Official Download Page](https://nodejs.org/en/download/package-manager/current)
- A node version manager such as [Volta](https://docs.volta.sh/reference/fetch)

Most installation methods will include `npm` as well.

## Steps

Clone this repo and inside the folder install the dependencies with:

```sh
npm install
```

Set the `PROXY_URI` environment variable to the desired proxy url, for example:

```sh
export PROXY_URI=https://<username>:<password>@<vault-id>.LIVE.verygoodproxy.com:8443
```

Alternatively you can modify the `PROXY_URI` constant within `index.js`.

To run the test using the proxy:

```sh
npm run proxied
```

To run the test without the proxy:

```sh
npm run unproxied
```

