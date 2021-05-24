# Short Diary

 200文字以内の日記を投稿するサイトです。

 日記の内容を短くすることで継続しやすくしています。

 スマホからもご利用いただけます。

## URL

<https://short-diary.com>

「ゲストとしてログイン」のボタンから、メールアドレスとパスワードを入力せずにログインできます。

## 使用技術

- CircleCi
- AWS
  - VPC
  - EC2(インスタンス内でDocker-composeを実行([使用ファイル](https://github.com/NakaiKazuki/Short-Diary/blob/main/docker-compose-prod.yml))
  - Route53s
  - Certificate Manager
  - S3
  - RDS(MySQL 8.0)
- Docker/Docker-compose
- MySQL 8.0
- Rails(API)
  - Ruby 3.0.1
  - Ruby on Rails 6.1.3
  - Puma
  - RSpec
- React
  - Node 14.17.0
  - TypeScript 4.2.4
  - React 17.0.2
  - React Testing Library
- Nginx 1.20.0

## CircleCi

- Githubへのpush時に、Rails Best Practices, Brakeman, Bundle Audit, Rubocop, RSpec, FrontendTest が実行。

## 主な機能

- Rails
  - ユーザー登録、ログイン機能(devise_token_auth)
  - 投稿機能
    - 画像投稿(ActiveStorage)
      - 本番環境ではS3に保存
  - ページネーション機能(pagy)
  - タグ機能(acts-as-taggable-on)
  - DoS攻撃対策(rack-attack)
    - 60回/1分 の接続で使用されたIPを制限

- React
  - デザイン
    - Material-UI
    - styled-components
  - Form
    - React Hook Form

## テスト

- Rails
  - RSpec
    - モデルテスト(model)
    - コントローラーテスト(request)
    - ブラウザテスト(system)

- React
  - React Testing Library

## ローカルで使用する場合(Dockerを利用して構築。)

Windows / Mac 両Docker動作確認済み。

リポジトリを手元にクローンしてください。

```zsh
#!/bin/zsh
git clone https://github.com/NakaiKazuki/Short-Diary.git
```

次にクローンしたリポジトリのディレクトリへ移動します。

```zsh
#!/bin/zsh
cd Short-Diary
```

その後下記のコマンドでdocker-imageを作成します。

```zsh
#!/bin/zsh
docker-compose build
```

dockerimage作成後コンテナを起動します。

```zsh
#!/bin/zsh
docker-compose up -d
```

node_modulesのインストール後、下記のコマンドを実行します。

```zsh
#!/bin/zsh
docker-compose run front yarn start
```

下記のコマンドでデータベースを作成します。

```zsh
#!/bin/zsh
docker-compose run api rails db:create db:migrate db:seed && rails db:migrate RAILS_ENV=test
```

以下 Test etc...

下記のコマンドでテスト+その他を実行できます。

```zsh
#!/bin/zsh
docker-compose run api zsh check.sh && docker-compose run front yarn test
```

## 制作者

- 中井 一樹
- Twitter : <https://twitter.com/k_kyube>

## ライセンス

Short Diaryは[MITライセンス](https://en.wikipedia.org/wiki/MIT_License)のもとで公開されています。詳細は [LICENSE.md](https://github.com/NakaiKazuki/Short-Diary/blob/master/LICENSE.md) をご覧ください。
