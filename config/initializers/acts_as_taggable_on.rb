# frozen_string_literal: true

# 使い方 https://github.com/mbleigh/acts-as-taggable-on

# 特殊文字の問題を回避
# ActsAsTaggableOn.force_binary_collation = true

# タグ付けを削除した後に未使用のタグオブジェクトを削除する
ActsAsTaggableOn.remove_unused_tags = true

# 強制タグを小文字で保存
# ActsAsTaggableOn.force_lowercase = true

# タグをパラメータ化して保存する場合
# ActsAsTaggableOn.force_parameterize = true

# タグで大文字と小文字を区別し、作成にLIKEクエリを使用しないようにする場合
# ActsAsTaggableOn.strict_case_match = true

# MySqlで特殊文字をカバーする完全一致が必要な場合
# ActsAsTaggableOn.force_binary_collation = true

# テーブル名を指定する場合
# ActsAsTaggableOn.tags_table = 'aato_tags'
# ActsAsTaggableOn.taggings_table = 'aato_taggings'

# デフォルトの区切り文字を変更する場合（デフォルトは「,」)。([',', '|'])などの区切り文字の配列を渡すこともできる。
ActsAsTaggableOn.default_parser = ','
