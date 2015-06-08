# Schema Information

## users
column name     | data type | details
 ---------------|-----------|-------------------------
id              | integer   | not null, primary key
name            | string    | not null
email           | string    | not null, unique
location        | string    |
password_digest | string    | not null
session_token   | string    | not null, unique
image_url       | string    |


## businesses
column name | data type | details
------------|-----------|-------------------------
id          | integer   | not null, primary key
name        | string    | not null, unique
category    | string    | not null
location    | string    | not null
phone       | integer   |
url         | string    | unique
image_url   | string    |


## reviews
column name   | data type | details
--------------|-----------|-------------------------
  id          | integer   | not null, primary key
  rating      | integer   | not null
  content     | string    | not null
  price       | integer   |
  business_id | integer   | not null, foreign key (references businesses)


## reviewings
column name | data type | details
------------|-----------|-------------------------
  id        | integer   | not null, primary key
  review_id | integer   | not null, foreign key (references reviews)
  user_id   | integer   | not null, foreign key (references users)


## images
column name   | data type | details
--------------|-----------|-------------------------
  id          |  integer  | not null, primary key
  image_url   |  string   | not null
  business_id |  integer  | not null, foreign key (references businesses)
