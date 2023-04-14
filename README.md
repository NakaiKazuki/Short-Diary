# Short Diary

200 文字以内の日記を作成するためのアプリケーションです。
またちょっとした思いつきや他の SNS と違い誰にも見られたくないメモなども記録できます。
ノートなどの紙に書く日記との差別化として、その日 YouTube で見た動画でよかったものをコメント付きで記録するといったことができます。
スマホ PC からもご利用可能です。

# 工夫したこと

自分が日記を書くなら毎日の出来事を一言二言でかつ空き時間にどこでもかけるのが手軽で便利そうだなと考え作成しました。
作成後は画像の投稿やその日見た動画を記録しておきたいなという自分が使ってみてあったらいいなという機能を付け足していきました。
また、できる限り余計なページを作らずにログイン後最初に開いたページで基本的なことは完結できるようにしました。

![スクリーンショット (37)](https://user-images.githubusercontent.com/62586169/215309122-bbc88df6-0d25-40cb-81ef-e791f0bdfc4b.png)

![スクリーンショット (13)](https://user-images.githubusercontent.com/62586169/175801483-c92a036e-7f62-4ae4-948a-10d16c596156.png)

![スクリーンショット (11)](https://user-images.githubusercontent.com/62586169/175801478-e6f0fc35-45e3-4345-a420-755552a03af9.png)

![スクリーンショット (12)](https://user-images.githubusercontent.com/62586169/175801481-c7d2089c-7813-4023-bd34-40d88a52f4e7.png)

## URL

<https://short-diary.com>

## 使い方

- メールアドレスを利用してユーザー登録をしてからのご利用または、
  「ゲストとしてログイン」のボタンからメールアドレスとパスワードを入力せずにログインできます。
- ログイン後最初に表示された画面から日記一覧の作成、表示、編集、削除、検索が行なえます。
  ヘッダー右上のユーザー欄からユーザー情報の編集、ヘッダー左のメニューバーアイコンから PhotoGallery を開けます。

## 今後追加したいもの

動画一覧の作成、PhotoGallery で画像付きの日記データだけを表示する。動画も同様に

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
- Nginx 1.20
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
