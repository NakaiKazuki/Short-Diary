# Short Diary

 200文字以内の日記を投稿するサイトです。<br >
 一言二言の内容で日記を書くことで継続しやすくしています。 <br >
 スマホからもご利用いただけます。

# URL

<https://short-diary.com> <br >
画面中央やや左の「ゲストとしてログイン」のボタンから、メールアドレスとパスワードを入力せずにログインできます。
ゲストユーザーは登録情報の編集と削除のみを制限しています。

# 使用技術

- Docker/Docker-compose
- MySQL 8.0
- Nginx
- CircleCi
- AWS
  - VPC
  - EC2(インスタンス内でDocker-composeを実行([使用ファイル](https://github.com/NakaiKazuki/Short-Diary/blob/main/docker-compose-prod.yml))
  - Route53
  - Certificate Manager
  - S3
  - RDS(MySQL)
- Rails(API)
  - Ruby 3.0.0
  - Ruby on Rails 6.1.3
  - Puma
  - RSpec
- React
  - TypeScript 4.2.4
  - React 17.0.2
  - React Testing Library

# CircleCi

- Githubへのpush時に、Rails Best Practices, Brakeman, Bundle Audit, Rubocop, RSpec, FrontendTest が実行されます。

# 機能一覧

- ユーザー登録、ログイン機能(devise_token_auth)
- 投稿機能
  - 画像投稿(ActiveStorage)
    - 本番環境ではS3に保存
- ページネーション機能(pagy)
- DoS攻撃対策(rack-attack)
  - 60回/1分 の接続で使用されたIPを制限

# テスト

- Rails
  - RSpec
    - モデルテスト(model)
    - コントローラーテスト(request)
    - ブラウザテスト(system)

- React
  - React Testing Library

# ローカルで使用する場合(開発環境はDockerを利用して構築します。)

Windows Mac 両Docker共に動作確認済み。

リポジトリを手元にクローンしてください。

```
git clone https://github.com/NakaiKazuki/Short-Diary.git
```

次にクローンしたリポジトリのディレクトリへ移動します。

```
cd Short-Diary
```

その後下記のコマンドでdocker-imageを作成します。

```
docker-compose build
```

dockerimage作成後コンテナを起動します。

```
docker-compose up -d
```

下記のコマンドでデータベースを作成します。

```
docker-compose run api rails db:create db:migrate db:seed && rails db:migrate RAILS_ENV=test
```

node_modulesのインストールを確認し次第下記のコマンドを実行します。

```
docker-compose run front yarn start
```

# 制作者

- 中井一樹
- Twitter : <https://twitter.com/k_kyube>

# ライセンス

Short Diaryは[MITライセンス](https://en.wikipedia.org/wiki/MIT_License)のもとで公開されています。詳細は [LICENSE.md](https://github.com/NakaiKazuki/Short-Diary/blob/master/LICENSE.md) をご覧ください。
