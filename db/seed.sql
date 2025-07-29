insert into users (username, password) values
('anugrah', '$2b$10$8NCM8QS6LW/4nXGYpu5xW.5addiLvShGw.bBFW.HYDTC.TFRFZTLu'),
('rayhan', '$2b$10$eTMmbYxGdDeV5kR8oT5BEen312rq3cIh23suNZ13.Vur80Bu1kti6'),
('farel', '$2b$10$2zIt8iaTVIR2qTjMceDQx.SK0WBy51/XUlhcxsQuR7SfrFD0h5L42'),
('adit', '$2b$10$tGKs3n4MWEaLit3rBaVi..pgZqskKsAdINmfKpTQEbHE.Nx2/HAfC');

insert into roles (name) values
('karyawan'),
('hrd'),
('manajer'),
('admin');

insert into menus (name, parent_id, order_number) values
('beranda', NULL, 1),
('profil', NULL, 2),
    ('data pribadi', 2, 1),
    ('absensi', 2, 2),
    ('slip gaji', 2, 3),
('manajemen', NULL, 3),
    ('administrasi karyawan', 6, 1),
        ('data karyawan', 7, 1),
        ('manajemen kontrak', 7, 2),
    ('laporan & analitik', 6, 2),
        ('laporan keuangan', 10, 1),
        ('analitik bisnis', 10, 2),
('pengaturan sistem', NULL, 4),
    ('manajemen pengguna', 13, 1),
    ('manajemen role & akses', 13, 2);



insert into user_roles (user_id, role_id) values
(1, 1),
(2, 2),
(3, 3),
(4, 4);

insert into role_menus (role_id, menu_id) values
('1', '1'),
('1', '2'),
('1', '3'),
('1', '4'),
('1', '5'),

('2', '1'),
('2', '2'),
('2', '3'),
('2', '4'),
('2', '5'),
('2', '6'),
('2', '7'),
('2', '8'),
('2', '9'),

('3', '1'),
('3', '2'),
('3', '3'),
('3', '4'),
('3', '5'),
('3', '6'),
('3', '7'),
('3', '8'),
('3', '9'),
('3', '10'),
('3', '11'),
('3', '12'),

('4', '1'),
('4', '2'),
('4', '3'),
('4', '4'),
('4', '5'),
('4', '10'),
('4', '11'),
('4', '12');