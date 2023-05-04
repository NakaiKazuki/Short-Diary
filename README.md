# Short Diary

ちょっとした思いつきやメモなどを 200 文字以内の日記として記録するアプリケーションです。
日記帳などの紙に書く日記との差別化として、その日 YouTube で見た動画でよかったものを記録再生可能にすることで差別化をしています。
スマホ PC タブレットからご利用可能です。

![Short-Diary2 gif](https://user-images.githubusercontent.com/62586169/235717331-49a247cb-56fb-48e8-be07-090dc900a6f7.gif)

# こだわったポイント

- テキストでの表示だけじゃなくアイコンも使用することで直観的に理解できるようにしました。
  またメニューバーなどのアイコンや配置に関しても Twitter や YouTube などで設置されてる場所を参考に設置しました。
- ログイン後に表示されるページで基本的な動作(CRUD)を全て行えるようにしました。

## URL

<https://short-diary.com>

## 使い方

- メールアドレスを利用してユーザー登録をしてからのご利用または、
  「ゲストとしてログイン」のボタンからメールアドレスとパスワードを入力せずにログインできます。
- ログイン後最初に表示された画面から日記一覧の作成、表示、編集、削除、検索が行なえます。
  ヘッダー右上のユーザー欄からユーザー情報の編集、ヘッダー左のメニューバーアイコンから PhotoGallery を開けます。

## 使用技術

- React
  - Node 18.15.0
  - React 18.2.0
  - TypeScript 5.0.4
  - React Testing Library
  - ESLint
  - Prettier
- Rails
  - Ruby 3.2.2
  - Rails 7.0.4.3
  - Puma
  - RSpec
  - Rubocop
- AWS
  - VPC
  - EC2(インスタンス内で Docker を実行([使用ファイル](https://github.com/NakaiKazuki/Short-Diary/blob/main/docker-compose-prod.yml)))
  - Route53
  - Certificate Manager
  - S3
  - RDS(MySQL 8.0)
- Nginx 1.23
- Docker / Docker Compose
- MySQL 8.0
- Google Analytics
- Github Actions

## 機能その他

- React

  - デザイン
    - Material UI
    - Styled Components
  - アニメーション
    - Framer Motion
  - Form
    - React Hook Form
    - 画像投稿機能
  - Photo Gallery(日記に付随した画像一覧)
    - React Image Gallery
  - YouTube 動画再生
    - React Youtube
  - ログイン機能
    - Cookie 保存
  - ルーティング機能
    - React Router Dom
  - head 情報の変更
    - React Helmet Async
  - 状態管理
    - Recoil
  - 3D
    - React Tree Fiber

- Rails

  - ユーザー登録(メール認証)、ログイン機能(Devise Token Auth)
  - 日記投稿機能
    - 画像保存(ActiveStorage)
      - 本番環境では S3 に保存
  - ページネーション機能(Pagy)
  - タグ機能(Acts As Taggable On)
  - 検索機能(Ransack)

- Github Actions
  - Rails:
    - Rails Best Practices,
    - Brakeman,
    - Bundle Audit,
    - Rubocop,
    - RSpec
  - React:
    - JSLint,
    - Testing Library/Jest

## テスト

- React

  - React Testing Library

- Rails

  - RSpec
    - モデルテスト(models)
    - コントローラーテスト(requests)

## ER 図

![er](https://user-images.githubusercontent.com/62586169/232224839-068a80a8-bca5-464f-82b5-d2a607df8a5f.png)

## ローカルで使用する場合

###　 Docker を利用して構築。wsl2 を使用した Ubuntu 環境では動作確認済み

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
