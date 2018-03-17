DROP DATABASE IF EXISTS amenity;
CREATE DATABASE amenity;
\c amenity
CREATE TABLE amenity
(
  id SERIAL PRIMARY KEY,
  uniques boolean
);
CREATE TABLE _user
(
  amenityid INTEGER REFERENCES amenity,
  name text,
  thumbnail text,
  link text
);
CREATE TABLE shipDetail(
  amenityid INTEGER REFERENCES amenity,
  name text,
  dock text,
  capacity integer,
  boatRules text [3],
  heads SMALLINT,
  description text
);
CREATE TABLE bedrooms (
  amenityid INTEGER REFERENCES amenity,
  capacity SMALLINT,
  sleepingArrangement SMALLINT [3]
);
CREATE TABLE optionaltable
(
  amenityid INTEGER REFERENCES amenity,
  inflatables boolean,
  fishingGear boolean,
  scubaGear boolean,
  harpoons boolean,
  sharkCage boolean,
  medication boolean,
  wifi boolean,
  pool boolean
);
CREATE TABLE prioritytable
(
  amenityid INTEGER REFERENCES amenity,
  anchor boolean,
  engine boolean,
  lifeJacket boolean,
  twoWayRadio boolean,
  tv boolean,
  kitchen boolean,
  ac boolean,
  heating boolean
);

CREATE TABLE client (
  amenityid INTEGER REFERENCES amenity,
  name text
);