BEGIN;

INSERT INTO "users" ("userName", "gender", "picture", "email", "password", "age", "hometown", "bio")
VALUES
  ('Alice', 'F', 'https://static.vecteezy.com/system/resources/previews/009/292/244/non_2x/default-avatar-icon-of-social-media-user-vector.jpg', '4o4oO1@example.com', 'password1', 25, 'New York', 'Hello, I am Alice!'),
  ('Bob', 'M', 'https://static.vecteezy.com/system/resources/previews/009/292/244/non_2x/default-avatar-icon-of-social-media-user-vector.jpg', '4o4oO2@example.com', 'password2', 30, 'Los Angeles', 'Hello, I am Bob!'),
  ('Charlie', 'M', 'https://static.vecteezy.com/system/resources/previews/009/292/244/non_2x/default-avatar-icon-of-social-media-user-vector.jpg', '4o4oO3@example.com', 'password3', 35, 'Chicago', 'Hello, I am Charlie!'),
  ('David', 'M', 'https://static.vecteezy.com/system/resources/previews/009/292/244/non_2x/default-avatar-icon-of-social-media-user-vector.jpg', '4o4oO4@example.com', 'password4', 40, 'Houston', 'Hello, I am David!'),
  ('Eve', 'F', 'https://static.vecteezy.com/system/resources/previews/009/292/244/non_2x/default-avatar-icon-of-social-media-user-vector.jpg', '4o4oO5@example.com', 'password5', 45, 'Philadelphia', 'Hello, I am Eve!'),
  ('Frank', 'M', 'https://static.vecteezy.com/system/resources/previews/009/292/244/non_2x/default-avatar-icon-of-social-media-user-vector.jpg', '4o4oO6@example.com', 'password6', 50, 'San Francisco', 'Hello, I am Frank!'),
  ('Grace', 'F', 'https://static.vecteezy.com/system/resources/previews/009/292/244/non_2x/default-avatar-icon-of-social-media-user-vector.jpg', '4o4oO7@example.com', 'password7', 55, 'Seattle', 'Hello, I am Grace!'),
  ('Henry', 'M', 'https://static.vecteezy.com/system/resources/previews/009/292/244/non_2x/default-avatar-icon-of-social-media-user-vector.jpg', '4o4oO8@example.com', 'password8', 60, 'Boston', 'Hello, I am Henry!'),
  ('Isabella', 'F', 'https://static.vecteezy.com/system/resources/previews/009/292/244/non_2x/default-avatar-icon-of-social-media-user-vector.jpg', '4o4oO9@example.com', 'password9', 65, 'Denver', 'Hello, I am Isabella!'),
  ('Jack', 'M', 'https://static.vecteezy.com/system/resources/previews/009/292/244/non_2x/default-avatar-icon-of-social-media-user-vector.jpg', '4o4oO10@example.com', 'password10', 70, 'Minneapolis', 'Hello, I am Jack!'),
  ('Marc', 'M', 'https://static.vecteezy.com/system/resources/previews/009/292/244/non_2x/default-avatar-icon-of-social-media-user-vector.jpg', '4o4oO11@example.com', 'password11', 37, 'Avignon', 'Bonjour, I am Marc and I love Burgers!')
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

COMMIT;