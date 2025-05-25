DROP TABLE IF EXISTS Photos;
DROP TABLE IF EXISTS Users;


CREATE TABLE IF NOT EXISTS Users (
  userId      CHAR(36) PRIMARY KEY,         -- 내부용 UUID
  kakaoId     VARCHAR(255) UNIQUE NOT NULL, -- 외부 로그인 ID
  nickname    VARCHAR(100) NOT NULL,
  faceType    VARCHAR(100),
  sex         BOOLEAN,
  repPhotoId  CHAR(36),
  created_at  TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);