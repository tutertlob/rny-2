# SOi MOi

SOi MOiは「rny-2 土壌水分センサー」の値からプランターの水やり時期をお知らせするアプリケーションです。

## Environments

- NodeJS >=10
- MongoDB

## Production

```
yarn install
yarn run build
yarn run start
```

## Development and Test

```
docker-compose up -d mongo
node test/test_data_setup.js
yarn dev
```
