# 2021f-group-9
2021年秋学期中澤研講義のグループワーク製作物 (グループ9)

掲示板サービス

## 実行の仕方
Docker を使うやりかたと，使わないやり方がある， kino-ma は Docker を使っている．

### Docker を使う場合
コンテナ環境である Docker を使うと，パソコンに NodeJS 等の開発用ソフトウェアをインストールすることなく開発が行える．
また， Docker の機能の一つである `docker compose` というものを使って，環境の管理が楽になっている．
([Docker の詳細について](https://knowledge.sakura.ad.jp/13265/))
([docker compose の詳細について](https://knowledge.sakura.ad.jp/16862/))

基本的には以下で紹介するコマンド群を使うだけで済むはずだが，困った場合は kino-ma に聞いてください．
**コマンドは，基本的に全てこのリポジトリのディレクトリの中で以下のコマンドを実行してください．**

#### Docker のインストール
Mac で Docker コンテナを動かすためには， Docker Desktop をインストールする必要があります．

[インストール手順](https://sukkiri.jp/technologies/virtualizers/docker/docker-mac_install.html)

#### web
Next.js の公式 (?) Dockerfile をコピペした． docker compose 上では `web` という名前になっている．

初めて起動する場合，まず以下を実行する．

```sh
docker compose build
docker compose run web yarn build
```

起動するためには，以下を実行する．

```sh
docker compose up
```

起動が成功すると， [localhost:3000](http://localhost:3000) で Web ページが表示されるはずである．

### Docker を使わない場合

#### Node.js / yarn をインストールする
[この Qiita 記事](https://qiita.com/suisui654/items/1b89446e03991c7c2c3d) を読んでください．

#### web
kino-ma は実際に実行していないので，動かなかったら教えてください．

```sh
yarn build
yarn start
```

起動が成功すると， [localhost:3000](http://localhost:3000) で Web ページが表示されるはず．