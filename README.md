# きゅうばん
友達の投稿を見ることに重点をおいた掲示板サービスです．

## Frameworks & Libraries
- 全体
  - Docker / Docker Compose
  - Nginx
- フロントエンド
  - Next.js
- バックエンド
  - Flask (Python)
  - SQLite3

## Deployng

### Development
初めて起動する場合，まず以下を実行する．

```sh
docker compose build
docker compose run web yarn install
```

起動するためには，以下を実行する．

```sh
docker compose up
```

開発サーバはフロントエンドが [localhost:3000](http://localhost:3000)，バックエンドが [localhost:3000](http://localhost:5000) で起動する．

### Production
#### 1. `.env` ファイルの更新
1. `cp .env.template .env`
2. `.env.template` に従って，実際の環境変数をセットしていく．

#### 2. Docker のビルド
```sh
docker-compose --profile prod build
```

#### 3. 環境の初期化
```sh
docker-copmose run api flask db upgrade
```

#### 4. 起動
```sh
docker-compose --profile prod up
```

本番サーバは `80` 番ポートに開く．