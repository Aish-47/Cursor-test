-- Sample baby names for testing
-- This script inserts popular baby names with their meanings and origins

INSERT INTO baby_names (name, gender, origin, meaning, popularity) VALUES
-- Popular Boy Names
('Liam', 'boy', 'Irish', 'Strong-willed warrior and protector', 95),
('Noah', 'boy', 'Hebrew', 'Rest, comfort, peace', 94),
('Oliver', 'boy', 'Latin', 'Olive tree, symbol of peace', 93),
('William', 'boy', 'Germanic', 'Resolute protector', 92),
('Elijah', 'boy', 'Hebrew', 'My God is Yahweh', 91),
('James', 'boy', 'Hebrew', 'Supplanter', 90),
('Benjamin', 'boy', 'Hebrew', 'Son of the right hand', 89),
('Lucas', 'boy', 'Latin', 'Light-giving', 88),
('Henry', 'boy', 'Germanic', 'Estate ruler', 87),
('Alexander', 'boy', 'Greek', 'Defender of mankind', 86),
('Mason', 'boy', 'French', 'Stone worker', 85),
('Michael', 'boy', 'Hebrew', 'Who is like God?', 84),
('Ethan', 'boy', 'Hebrew', 'Strong, firm', 83),
('Daniel', 'boy', 'Hebrew', 'God is my judge', 82),
('Jacob', 'boy', 'Hebrew', 'Supplanter', 81),
('Logan', 'boy', 'Scottish', 'Little hollow', 80),
('Jackson', 'boy', 'English', 'Son of Jack', 79),
('Levi', 'boy', 'Hebrew', 'Joined, attached', 78),
('Sebastian', 'boy', 'Greek', 'Venerable', 77),
('Mateo', 'boy', 'Spanish', 'Gift of God', 76),
('Jack', 'boy', 'English', 'God is gracious', 75),
('Owen', 'boy', 'Welsh', 'Noble warrior', 74),
('Theodore', 'boy', 'Greek', 'Gift of God', 73),
('Aiden', 'boy', 'Irish', 'Little fire', 72),
('Samuel', 'boy', 'Hebrew', 'Heard by God', 71),

-- Popular Girl Names
('Olivia', 'girl', 'Latin', 'Olive tree', 95),
('Emma', 'girl', 'Germanic', 'Universal', 94),
('Charlotte', 'girl', 'French', 'Free man', 93),
('Amelia', 'girl', 'Germanic', 'Work', 92),
('Ava', 'girl', 'Latin', 'Bird', 91),
('Sophia', 'girl', 'Greek', 'Wisdom', 90),
('Isabella', 'girl', 'Hebrew', 'God is my oath', 89),
('Mia', 'girl', 'Scandinavian', 'Mine or bitter', 88),
('Evelyn', 'girl', 'English', 'Wished for child', 87),
('Harper', 'girl', 'English', 'Harp player', 86),
('Luna', 'girl', 'Latin', 'Moon', 85),
('Camila', 'girl', 'Latin', 'Young ceremonial attendant', 84),
('Gianna', 'girl', 'Italian', 'God is gracious', 83),
('Elizabeth', 'girl', 'Hebrew', 'God is my oath', 82),
('Eleanor', 'girl', 'French', 'Bright, shining one', 81),
('Ella', 'girl', 'Germanic', 'All, completely', 80),
('Abigail', 'girl', 'Hebrew', 'My father is joyful', 79),
('Sofia', 'girl', 'Greek', 'Wisdom', 78),
('Avery', 'girl', 'English', 'Ruler of the elves', 77),
('Scarlett', 'girl', 'English', 'Red', 76),
('Emily', 'girl', 'Latin', 'Rival', 75),
('Aria', 'girl', 'Italian', 'Air, melody', 74),
('Penelope', 'girl', 'Greek', 'Weaver', 73),
('Chloe', 'girl', 'Greek', 'Blooming', 72),
('Layla', 'girl', 'Arabic', 'Night', 71),

-- Gender Neutral Names
('River', 'neutral', 'English', 'Stream of water', 70),
('Sage', 'neutral', 'Latin', 'Wise one', 69),
('Quinn', 'neutral', 'Irish', 'Descendant of Conn', 68),
('Rowan', 'neutral', 'Irish', 'Red-haired', 67),
('Taylor', 'neutral', 'English', 'Tailor', 66),
('Jordan', 'neutral', 'Hebrew', 'To flow down', 65),
('Cameron', 'neutral', 'Scottish', 'Crooked nose', 64),
('Avery', 'neutral', 'English', 'Ruler of the elves', 63),
('Riley', 'neutral', 'Irish', 'Courageous', 62),
('Peyton', 'neutral', 'English', 'Fighting mans estate', 61),
('Parker', 'neutral', 'English', 'Park keeper', 60),
('Blake', 'neutral', 'English', 'Dark or fair', 59),
('Hayden', 'neutral', 'English', 'Hedged valley', 58),
('Finley', 'neutral', 'Scottish', 'Fair warrior', 57),
('Alex', 'neutral', 'Greek', 'Defender of mankind', 56),

-- Additional Unique Names
('Atlas', 'boy', 'Greek', 'To bear', 55),
('Phoenix', 'neutral', 'Greek', 'Rising bird', 54),
('Kai', 'neutral', 'Hawaiian', 'Ocean', 53),
('Zara', 'girl', 'Arabic', 'Blooming flower', 52),
('Ezra', 'boy', 'Hebrew', 'Helper', 51),
('Nova', 'girl', 'Latin', 'New', 50),
('Asher', 'boy', 'Hebrew', 'Happy', 49),
('Iris', 'girl', 'Greek', 'Rainbow', 48),
('Felix', 'boy', 'Latin', 'Happy, fortunate', 47),
('Violet', 'girl', 'Latin', 'Purple flower', 46),
('Silas', 'boy', 'Latin', 'Forest', 45),
('Hazel', 'girl', 'English', 'Hazelnut tree', 44),
('Leo', 'boy', 'Latin', 'Lion', 43),
('Ruby', 'girl', 'Latin', 'Red gemstone', 42),
('Finn', 'boy', 'Irish', 'Fair', 41),
('Ivy', 'girl', 'English', 'Ivy plant', 40),
('Miles', 'boy', 'Latin', 'Soldier', 39),
('Willow', 'girl', 'English', 'Willow tree', 38),
('Jasper', 'boy', 'Persian', 'Bringer of treasure', 37),
('Rose', 'girl', 'Latin', 'Rose flower', 36),
('Oscar', 'boy', 'Irish', 'Divine spear', 35),
('Grace', 'girl', 'Latin', 'Gods favor', 34),
('Theo', 'boy', 'Greek', 'Gift of God', 33),
('Lily', 'girl', 'Latin', 'Lily flower', 32),
('Milo', 'boy', 'Germanic', 'Mild, peaceful', 31),
('Zoe', 'girl', 'Greek', 'Life', 30),

-- International Names
('Akira', 'neutral', 'Japanese', 'Bright, clear', 29),
('Aria', 'girl', 'Persian', 'Noble', 28),
('Bodhi', 'boy', 'Sanskrit', 'Awakening', 27),
('Cora', 'girl', 'Greek', 'Maiden', 26),
('Diego', 'boy', 'Spanish', 'Supplanter', 25),
('Elena', 'girl', 'Spanish', 'Bright light', 24),
('Francesco', 'boy', 'Italian', 'Free man', 23),
('Gabriela', 'girl', 'Hebrew', 'God is my strength', 22),
('Hugo', 'boy', 'Germanic', 'Mind, intellect', 21),
('Isadora', 'girl', 'Greek', 'Gift of Isis', 20),
('Joaquin', 'boy', 'Hebrew', 'God will judge', 19),
('Kaia', 'girl', 'Greek', 'Earth', 18),
('Lorenzo', 'boy', 'Latin', 'From Laurentum', 17),
('Mila', 'girl', 'Slavic', 'Gracious', 16),
('Nico', 'boy', 'Greek', 'Victory of the people', 15),
('Ophelia', 'girl', 'Greek', 'Help', 14),
('Pablo', 'boy', 'Spanish', 'Small', 13),
('Quincy', 'neutral', 'French', 'Estate of the fifth son', 12),
('Rafael', 'boy', 'Hebrew', 'God heals', 11),
('Stella', 'girl', 'Latin', 'Star', 10);

-- Add some additional unique and modern names
INSERT INTO baby_names (name, gender, origin, meaning, popularity) VALUES
('Atticus', 'boy', 'Greek', 'From Attica', 45),
('Beatrice', 'girl', 'Latin', 'She who brings happiness', 44),
('Caleb', 'boy', 'Hebrew', 'Faithful, devoted', 43),
('Delilah', 'girl', 'Hebrew', 'Delicate', 42),
('Emmett', 'boy', 'Germanic', 'Universal', 41),
('Freya', 'girl', 'Norse', 'Lady, goddess of love', 40),
('Griffin', 'boy', 'Welsh', 'Strong lord', 39),
('Holland', 'neutral', 'Dutch', 'Woodland', 38),
('Ivan', 'boy', 'Russian', 'God is gracious', 37),
('Juniper', 'girl', 'Latin', 'Juniper tree', 36),
('Knox', 'boy', 'Scottish', 'Round hill', 35),
('Lydia', 'girl', 'Greek', 'From Lydia', 34),
('Magnus', 'boy', 'Latin', 'Great', 33),
('Nora', 'girl', 'Irish', 'Honor', 32),
('Orion', 'boy', 'Greek', 'Rising in the sky', 31),
('Poppy', 'girl', 'Latin', 'Red flower', 30);