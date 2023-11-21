class CreateCredentials < ActiveRecord::Migration[7.1]
  def change
    create_table :credentials do |t|
      t.string :external_id
      t.string :public_key
      t.bigint :user_id
      t.string :nickname
      t.bigint :sign_count

      t.timestamps
    end
  end
end
