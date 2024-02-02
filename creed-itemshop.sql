CREATE TABLE [item_shop] (
	item_index int NOT NULL UNIQUE,
	item_name varchar(40),
	item_price int,
	item_class int,
	item_rarity int,
	item_type int,
	item_limit int,
	create_date datetime,
	modify_date datetime,
  CONSTRAINT [PK_ITEM_SHOP] PRIMARY KEY CLUSTERED
  (
  [item_index] ASC
  ) WITH (IGNORE_DUP_KEY = OFF)

)
GO

