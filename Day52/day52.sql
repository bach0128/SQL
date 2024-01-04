-- tao bang courses
CREATE TABLE "courses" (
  "id" INT NOT NULL,
  "name" varchar(50) NOT NULL,
  "price" float,
  "detail" text,
  "teacher_id" INT NOT NULL,
  "active" INT DEFAULT 0,
  "created_at" timestamp,
  "updated_at" timestamp
);

ALTER TABLE "courses"
RENAME COLUMN "detail" TO "content";

ALTER TABLE "courses"
ALTER COLUMN "content" SET NOT NULL;

-- ALTER TABLE "courses"
-- ADD "description" text NULL;

-- tao bang teacher

CREATE TABLE "teacher" (
  "id" INT NOT NULL,
  "name" varchar(50) NOT NULL,
  "bio" text NULL,
  "created_at" timestamp,
  "updated_at" timestamp
);

INSERT INTO "teacher" (id, name, bio, created_at, updated_at)
VALUES (1, 'Hoang An', 'PHP, Beer, Node', NOW(), NOW()),
(2, 'Ngoc Son', 'PHP, JS, React', NOW(), NOW()),
(3, 'Cong Luc', 'JS, React, CSS', NOW(), NOW());

INSERT INTO courses (id, name, price, content, teacher_id, active, created_at)
VALUES 
	(1, 'HTML CSS ', 2000, 'content1', 1, 1, NOW()),
	(2, 'PHP', 1000, 'content2', 1, 1, NOW()),
	(3, 'SQL', 5000, 'content3', 1, 1, NOW()),
	(4, 'JAVARSCRIPT Base', 2500, 'content4', 2, 1, NOW()),
	(5, 'JAVARSCRIPT Senior', 3000, 'content5', 2, 1, NOW()),
	(6, 'NODEJS ', 3000, 'content6', 2, 1, NOW()),
	(7, 'React', 400, 'content7', 3, 1, NOW()),
	(8, 'Reat Native', 1000, 'content8', 3, 1, NOW()),
	(9, 'NEXT', 5000, 'content9', 3, 1, NOW());
	
	-- Sửa tên và giá từng khóa học thành tên mới và giá mới (Tên khóa học, giá khóa học các khóa học không được giống nhau)
UPDATE courses 
SET 
	name = 'HTML CSS Base', price= 1500, updated_at = NOW()
WHERE 
	id = 1;
	
-- Sửa lại bio của từng giảng viên (Bio từng giảng viên không được giống nhau)
UPDATE teacher 
SET 
	bio = 'B, I, O', updated_at = NOW()
WHERE 
	id = 1;

SELECT * from courses
SELECT * from teacher