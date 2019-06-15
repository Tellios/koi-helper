DROP TABLE IF EXISTS "Disease";
CREATE TABLE "Disease" (
  "Id" INTEGER NOT NULL,
  "Name" TEXT NOT NULL,
  "Description" TEXT,
  "Medication" TEXT,
  "Photo" BLOB,
  PRIMARY KEY ("Id")
);
DROP TABLE IF EXISTS "Fish";
CREATE TABLE "Fish" (
  "Id" INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
  "Born" TEXT,
  "Sex" TEXT,
  "Country" TEXT,
  "Value" TEXT,
  "Breeder" TEXT,
  "Pond" INTEGER,
  "Variety" INTEGER,
  "Name" TEXT
);
DROP TABLE IF EXISTS "FishPhoto";
CREATE TABLE "FishPhoto" (
  "PhotoId" INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
  "FishId" INTEGER NOT NULL,
  "PhotoName" TEXT NOT NULL,
  "Photo" BLOB NOT NULL
);
DROP TABLE IF EXISTS "FishTreatment";
CREATE TABLE "FishTreatment" (
  "Id" INTEGER NOT NULL,
  "FishId" INTEGER NOT NULL,
  "Disease" TEXT NOT NULL,
  "Comment" TEXT,
  "Date" TEXT,
  "Finished" INTEGER NOT NULL,
  PRIMARY KEY ("Id")
);
DROP TABLE IF EXISTS "FishTreatmentComment";
CREATE TABLE "FishTreatmentComment" (
  "Id" INTEGER NOT NULL,
  "ObjectId" INTEGER NOT NULL,
  "Date" TEXT NOT NULL,
  "Comment" TEXT,
  "Category" TEXT NOT NULL,
  "OwnerId" TEXT NOT NULL,
  PRIMARY KEY ("Id" ASC)
);
DROP TABLE IF EXISTS "Measurement";
CREATE TABLE "Measurement" (
  "Id" INTEGER NOT NULL,
  "Fish" INTEGER NOT NULL,
  "Date" TEXT NOT NULL,
  "Length" INTEGER,
  "Weight" INTEGER,
  "Photo" BLOB,
  "Comment" TEXT,
  PRIMARY KEY ("Id" ASC)
);
DROP TABLE IF EXISTS "Pond";
CREATE TABLE "Pond" (
  "Id" INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
  "Name" TEXT NOT NULL,
  "Length" INTEGER,
  "Width" INTEGER,
  "Depth" INTEGER,
  "Liters" INTEGER
);
DROP TABLE IF EXISTS "PondPhoto";
CREATE TABLE "PondPhoto" (
  "PhotoId" INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
  "PondId" INTEGER NOT NULL,
  "PhotoName" TEXT NOT NULL,
  "Photo" BLOB NOT NULL
);
DROP TABLE IF EXISTS "PondTreatment";
CREATE TABLE "PondTreatment" (
  "Id" INTEGER NOT NULL,
  "PondId" INTEGER NOT NULL,
  "Disease" TEXT NOT NULL,
  "Comment" TEXT,
  "Date" TEXT,
  "Finished" INTEGER NOT NULL,
  PRIMARY KEY ("Id" ASC)
);
DROP TABLE IF EXISTS "PondTreatmentComment";
CREATE TABLE "PondTreatmentComment" (
  "Id" INTEGER NOT NULL,
  "ObjectId" INTEGER NOT NULL,
  "Date" TEXT NOT NULL,
  "Comment" TEXT,
  "Category" TEXT NOT NULL,
  "OwnerId" TEXT NOT NULL,
  PRIMARY KEY ("Id" ASC)
);
DROP TABLE IF EXISTS "Variety";
CREATE TABLE "Variety" (
  "Id" INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
  "Name" TEXT NOT NULL,
  "Description" TEXT,
  "Photo" BLOB
);