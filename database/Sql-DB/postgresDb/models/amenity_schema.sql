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
CREATE TABLE shipdetail
(
  amenityid INTEGER REFERENCES amenity,
  name text,
  dock text,
  capacity integer,
  boatrules text
  [3],
  heads SMALLINT,
  description text
);
  CREATE TABLE bedrooms
  (
    amenityid INTEGER REFERENCES amenity,
    capacity SMALLINT,
    sleepingarrangement SMALLINT
    [3]
);
    CREATE TABLE optionaltable
    (
      amenityid INTEGER REFERENCES amenity,
      inflatables boolean,
      fishinggear boolean,
      scubagear boolean,
      harpoons boolean,
      sharkcage boolean,
      medication boolean,
      wifi boolean,
      pool boolean
    );
    CREATE TABLE prioritytable
    (
      amenityid INTEGER REFERENCES amenity,
      anchor boolean,
      engine boolean,
      lifejacket boolean,
      twowayradio boolean,
      tv boolean,
      kitchen boolean,
      ac boolean,
      heating boolean
    );
    CREATE TABLE client
    (
      amenityid INTEGER REFERENCES amenity,
      name text
    );