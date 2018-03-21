/* 
  Condense from 6 tables with 1 to many relation
  to 1 to 1 to 1 relation
 */
DROP DATABASE IF EXISTS amenities;
CREATE DATABASE amenities;
\c amenities
CREATE TABLE ship
(
  id serial PRIMARY KEY,
  uniques boolean
);
CREATE TABLE users
(
  --  one user can have many ships for rent
  shipid INTEGER REFERENCES ship (id) on update CASCADE on delete CASCADE,
  name text,
  thumbnail text,
  link text
);
CREATE TABLE shipdetail
(
  -- one to one with ship table
  ownerid INTEGER REFERENCES ship (id) on update CASCADE on DELETE CASCADE,
  name text,
  dock text,
  capacity INTEGER,
  boatrules text
  [3],
  heads SMALLINT,
  description text,
  bedroomcapacity smallint,
  bedroomsleepingarrangement smallint [3],
  anchorpriority boolean,
  enginepriority boolean,
  lifejacketpriority boolean,
  twowayradiopriority boolean,
  soundsystempriority boolean,
  tvpriority boolean,
  kitchpriority boolean,
  acpriority boolean,
  heatingpriority boolean,
  inflatablesoptional boolean,
  fishinggearoptional boolean,
  scubagearoptional boolean,
  harpoonsoptional boolean,
  sharkcageoptional boolean,
  medicationoptional boolean,
  wifioptional boolean,
  pooloptional boolean
)