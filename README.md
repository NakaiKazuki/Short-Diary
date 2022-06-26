# Short Diary

 200文字以内の日記を作成するためのアプリケーションです。

 日記の内容を短くすることで継続しやすくしています。

 スマホからもご利用可能です。
![スクリーンショット (14)](https://user-images.githubusercontent.com/62586169/175801488-bfeabe49-ba55-4d74-a417-45c13b49e7e7.png)

![スクリーンショット (13)](https://user-images.githubusercontent.com/62586169/175801483-c92a036e-7f62-4ae4-948a-10d16c596156.png)

![スクリーンショット (11)](https://user-images.githubusercontent.com/62586169/175801478-e6f0fc35-45e3-4345-a420-755552a03af9.png)

![スクリーンショット (12)](https://user-images.githubusercontent.com/62586169/175801481-c7d2089c-7813-4023-bd34-40d88a52f4e7.png)

## URL

<https://short-diary.net>

「ゲストとしてログイン」のボタンから、メールアドレスとパスワードを入力せずにログインできます。

## 使用技術

- CircleCi
- AWS
  - VPC
  - EC2(インスタンス内でDocker-composeを実行([使用ファイル](https://github.com/NakaiKazuki/Short-Diary/blob/main/docker-compose-prod.yml))
  - Route53
  - Certificate Manager
  - S3
  - RDS(MySQL 8.0)
- Docker/Docker-compose
- MySQL 8.0
- Rails
  - Ruby 3.0
  - Rails 6.1
  - Puma
  - RSpec
- React
  - Node 16.13
  - TypeScript 4.6
  - React 18.0
  - React Testing Library
- Google Analytics
  - gtag.js
- Nginx 1.20

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
  - 検索機能(ransack)

- React
  - デザイン
    - Material-UI
    - styled-components
  - Form
    - React Hook Form
  - PhotoGallery
    - React Image Gallery

## テスト

- Rails
  - RSpec
    - モデルテスト(models)
    - コントローラーテスト(requests)

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

下記のコマンドでRailsのコンテナへ入ります。

```zsh
#!/bin/zsh
docker-compose exec api zsh
```

コンテナ内で下記のコマンドを実行しデータベースを作成します。

```zsh
#!/bin/zsh
rails db:create db:migrate db:seed && rails db:migrate RAILS_ENV=test
```

データベースの作成が完了したら下記コマンドでコンテナ内から出ます。

```zsh
#!/bin/zsh
exit
```

node_modulesのインストール完了後、React側のコンテナへ入ります。

```zsh
#!/bin/zsh
docker-compose exec front zsh
```

最後にコンテナ内にて、下記コマンドでReactを実行します。

```zsh
#!/bin/zsh
yarn start
```

以下リンクでブラウザに表示

<http://localhost:3000/>

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
