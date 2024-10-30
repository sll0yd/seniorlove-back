-- seeding_tables.sql --

-- BEGIN is used to start a new transaction --
BEGIN;

-- Below blocks are to seed tables in database with random data --
INSERT INTO "users" ("userName", "gender", "picture", "role", "email", "password", "age", "hometown", "bio")
VALUES
  ('Alice', 'F', 'https://static.vecteezy.com/system/resources/previews/009/292/244/non_2x/default-avatar-icon-of-social-media-user-vector.jpg', 'member', '4o4oO1@example.com', 'password1', 25, 'New York', 'Hello, I am Alice!'),
  ('Bob', 'M', 'https://static.vecteezy.com/system/resources/previews/009/292/244/non_2x/default-avatar-icon-of-social-media-user-vector.jpg', 'member', '4o4oO2@example.com', 'password2', 30, 'Los Angeles', 'Hello, I am Bob!'),
  ('Charlie', 'M', 'https://static.vecteezy.com/system/resources/previews/009/292/244/non_2x/default-avatar-icon-of-social-media-user-vector.jpg', 'member', '4o4oO3@example.com', 'password3', 35, 'Chicago', 'Hello, I am Charlie!'),
  ('David', 'M', 'https://static.vecteezy.com/system/resources/previews/009/292/244/non_2x/default-avatar-icon-of-social-media-user-vector.jpg', 'member', '4o4oO4@example.com', 'password4', 40, 'Houston', 'Hello, I am David!'),
  ('Eve', 'F', 'https://static.vecteezy.com/system/resources/previews/009/292/244/non_2x/default-avatar-icon-of-social-media-user-vector.jpg', 'member', '4o4oO5@example.com', 'password5', 45, 'Philadelphia', 'Hello, I am Eve!'),
  ('Frank', 'M', 'https://static.vecteezy.com/system/resources/previews/009/292/244/non_2x/default-avatar-icon-of-social-media-user-vector.jpg', 'member', '4o4oO6@example.com', 'password6', 50, 'San Francisco', 'Hello, I am Frank!'),
  ('Grace', 'F', 'https://static.vecteezy.com/system/resources/previews/009/292/244/non_2x/default-avatar-icon-of-social-media-user-vector.jpg', 'member', '4o4oO7@example.com', 'password7', 55, 'Seattle', 'Hello, I am Grace!'),
  ('Henry', 'M', 'https://static.vecteezy.com/system/resources/previews/009/292/244/non_2x/default-avatar-icon-of-social-media-user-vector.jpg', 'member', '4o4oO8@example.com', 'password8', 60, 'Boston', 'Hello, I am Henry!'),
  ('Isabella', 'F', 'https://static.vecteezy.com/system/resources/previews/009/292/244/non_2x/default-avatar-icon-of-social-media-user-vector.jpg', 'member', '4o4oO9@example.com', 'password9', 65, 'Denver', 'Hello, I am Isabella!'),
  ('Jack', 'M', 'https://static.vecteezy.com/system/resources/previews/009/292/244/non_2x/default-avatar-icon-of-social-media-user-vector.jpg', 'member', '4o4oO10@example.com', 'password10', 70, 'Minneapolis', 'Hello, I am Jack!'),
  ('Marc', 'M', 'https://static.vecteezy.com/system/resources/previews/009/292/244/non_2x/default-avatar-icon-of-social-media-user-vector.jpg', 'member', '4o4oO11@example.com', 'password11', 37, 'Avignon', 'Bonjour, I am Marc and I love Burgers!'),
  ('ASMAL', 'M', 'https://static.vecteezy.com/system/resources/previews/009/292/244/non_2x/default-avatar-icon-of-social-media-user-vector.jpg', 'admin', 'asmal@gmail.com', 'motdepasse12345', 134, 'Austin', 'Hey, we do love burger and fried chicken!')
  ;

INSERT INTO "event" ("title", "picture", "description", "date", "location", "creator_id")
VALUES 
  ('Danse chez michel', ' ', 'Venez dansez la samba avec michel', '29/10/2024', 'Marseille', 2),
  ('Atelier cuisine', ' ', 'Un moment de partage', '29/10/2024', 'Normandie', 1 ),
  ('Atelier dessin', ' ', 'Venez titiller le crayon et le feutre dans un moment convivial', '29/10/2024', 'Paname', 8),
  ('Soirée piscine', ' ', 'Venez gagner une médaille aux JO avec le M', '29/10/2024', 'Avignon', 11)
  ;

INSERT INTO "tag" ("name", "color")
VALUES
  ( 'Danse', 'bb5544'),
  ( 'Musique', 'bb5544'),
  ( 'Santé', '7766ee'),
  ( 'Bien-être', '3399ff'),
  ( 'Rencontre', 'ffbb33'),
  ( 'Jeux', 'ff4422'),
  ( 'Sortie', '77ddff'),
  ( 'Jardinage', '77cc55'),
  ( 'Sport', 'aa5599')
  ;

INSERT INTO "message" ("sender_id", "receiver_id", "content")
VALUES
  (1, 2, 'Hey, how are you?'),
  (2, 1, 'I am fine, thanks!'),
  (2, 1, 'What about you?'),
  (3, 5, 'Hello u'),
  (1, 9, 'I talked with him')
  ;

INSERT INTO "user_has_tag" ("user_id", "tag_id")
VALUES
  (1, 1),
  (1, 2),
  (2, 3),
  (2, 4),
  (3, 5),
  (3, 6),
  (4, 7),
  (4, 8),
  (4, 9)
  ;

INSERT INTO "event_has_tag" ("event_id", "tag_id")
VALUES
  (1, 1),
  (1, 2),
  (2, 3),
  (2, 4),
  (3, 5),
  (3, 6),
  (4, 7),
  (4, 8),
  (4, 9)
  ;

INSERT INTO "event_participants" ("user_id", "event_id")
VALUES
  (1, 1),
  (2, 2),
  (3, 3),
  (4, 4)
  ;

INSERT INTO "testimonies" ("content", "user_id")
VALUES
  ('Lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.', 1),
  ('Lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.', 2),
  ('Coucou michel ! Lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.', 3),
  ('Lorem bernard ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident.', 4)
  ;

INSERT INTO "sentences" ("content", "color")
VALUES
  ('Commencez dès aujourd’hui à rencontrer des personnes prêtes à partager de beaux moments et à construire une relation sincère.', 'fb7185'),
  ('Ne manquez pas cette occasion de rejoindre un événement convivial et de rencontrer des personnes prêtes à partager des moments authentiques !', 'fb7185'),
  ('Élargissez votre cercle et partez à la rencontre de nouvelles personnes prêtes à vivre des expériences enrichissantes !', '4EC5CA'),
  ('Créez dès aujourd’hui un événement convivial et faites la connaissance de personnes prêtes à partager des moments uniques et à tisser de nouveaux liens. ', '4EC5CA')
  ;
-- COMMIT is to end the transaction --
COMMIT;