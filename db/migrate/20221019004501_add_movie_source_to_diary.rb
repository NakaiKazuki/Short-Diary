class AddMovieSourceToDiary < ActiveRecord::Migration[6.1]
  def change
    add_column :diaries, :movie_source, :string
  end
end
