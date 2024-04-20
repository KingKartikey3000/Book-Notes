-- Creating both the Tables

CREATE TABLE book(
	id SERIAL PRIMARY KEY,
	bookName varchar(100),
	bookAuthor varchar(50)
	readYear varchar(5) 
);

INSERT INTO book(bookName, bookAuthor, readYear)
VALUES('Harry Potter and the Philosphers Stone', 'J.K. Rowling', '2023');

CREATE TABLE notes(
	id SERIAL PRIMARY KEY,
	bookName varchar(100),
	points TEXT,
	rating char(1)
);

INSERT INTO notes(bookName,points,rating)
VALUES('Harry Potter and the Philosophers Stone','sfsfrsgfewfersfgwvdfwfwdwdfwfwfewfswfefewfvewfwsfcwsf','5');


