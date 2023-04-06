# Short Diary

200 文字以内の日記を作成するためのアプリケーションです。

自分が日記を書くなら毎日の出来事を一言二言でかつ空き時間にどこでもかけるのが手軽で続きそうだなと考え作成しました。
作成後は画像の投稿や見た動画の記録などの～だったらいいなという機能を付け足していきました。

スマホからもご利用可能です。

![スクリーンショット (37)](https://user-images.githubusercontent.com/62586169/215309122-bbc88df6-0d25-40cb-81ef-e791f0bdfc4b.png)

![スクリーンショット (13)](https://user-images.githubusercontent.com/62586169/175801483-c92a036e-7f62-4ae4-948a-10d16c596156.png)

![スクリーンショット (11)](https://user-images.githubusercontent.com/62586169/175801478-e6f0fc35-45e3-4345-a420-755552a03af9.png)

![スクリーンショット (12)](https://user-images.githubusercontent.com/62586169/175801481-c7d2089c-7813-4023-bd34-40d88a52f4e7.png)

## URL

<https://short-diary.com>

「ゲストとしてログイン」のボタンから、メールアドレスとパスワードを入力せずにログインできます。

## 使用技術

- Github Actions
- AWS
  - VPC
  - EC2(インスタンス内で docker compose を実行([使用ファイル](https://github.com/NakaiKazuki/Short-Diary/blob/main/docker-compose-prod.yml))
  - Route53
  - Certificate Manager
  - S3
  - RDS(MySQL 8.0)
- Docker/Docker-compose
- MySQL 8.0
- Rails
  - Ruby 3.2
  - Rails 7.0
  - Puma
  - RSpec
  - Rubocop
- React
  - Node 18.13
  - TypeScript 4.9
  - React 18.1
  - React Testing Library
  - ESLint
  - Prettier
- Google Analytics
- Nginx 1.20

## Github Actions

下記が実行されます。

- Rails:
  - Rails Best Practices,
  - Brakeman,
  - Bundle Audit,
  - Rubocop,
  - RSpec
- React:
  - JSLint,
  - Testing Library

## 主な機能

- Rails

  - ユーザー登録(メール認証)、ログイン機能(devise_token_auth)
  - 日記投稿機能
    - 画像投稿(ActiveStorage)
      - 本番環境では S3 に保存
  - ページネーション機能(pagy)
  - タグ機能(acts-as-taggable-on)
  - 検索機能(ransack)

- React

  - デザイン
    - Material-UI
    - styled-components
  - アニメーション
    - framer-motion
  - Form
    - react-hook-form
    - 画像投稿機能
  - PhotoGallery(日記に付随した画像一覧の表示)
    - react-image-gallery
  - YouTube の動画埋め込み
    - react-youtube
  - ログイン機能
    - Cookie 保存
  - ルーティング機能
    - react-router-dom

## テスト

- Rails

  - RSpec
    - モデルテスト(models)
    - コントローラーテスト(requests)

- React
  - React Testing Library

## ローカルで使用する場合(Docker を利用して構築。wsl2 を使用した Ubuntu 環境では動作確認済み)

※ 以下の例のように「docker-compose」が v1 の場合はコマンドの「docker compose」を「docker-compose」に変更してください。

```zsh
v2: docker compose build
            ↓
v1: docker-compose build
```

リポジトリを手元にクローンしてください。

```zsh
git clone https://github.com/NakaiKazuki/Short-Diary.git
```

次にクローンしたリポジトリのディレクトリへ移動します。

```zsh
cd Short-Diary
```

docker-compose が v1 の場合はコマンドの docker compose を docker-compose に変更してください。

その後下記のコマンドでイメージを作成します。

```zsh
docker compose build
```

dockerimage 作成後コンテナを起動します。

```zsh
docker compose up -d
```

下記のコマンドで Rails のコンテナへ入ります。

```zsh
docker compose exec api zsh
```

コンテナ内で下記のコマンドを実行しデータベースを作成します。

```zsh
rails db:create db:migrate db:seed && rails db:migrate RAILS_ENV=test
```

データベースの作成が完了したら下記コマンドでコンテナ内から出ます。

```zsh
exit
```

node_modules のインストール完了後、React 側のコンテナへ入ります。

```zsh
docker compose exec front zsh
```

最後にコンテナ内にて、下記コマンドで React を実行します。

```zsh
yarn start
```

以下リンクでブラウザに表示

<http://localhost:3000/>

## 制作者

- 中井 一樹
- Twitter : <https://twitter.com/k_kyube>

## ライセンス

Short Diary は[MIT ライセンス](https://en.wikipedia.org/wiki/MIT_License)のもとで公開されています。詳細は [LICENSE.md](https://github.com/NakaiKazuki/Short-Diary/blob/master/LICENSE.md) をご覧ください。
