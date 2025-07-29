create table users (
    id serial primary key,
    username varchar(100) not null unique,
    password varchar(255) not null,
    created_at timestamp default current_timestamp,
    updated_at timestamp default current_timestamp
);

create table roles (
    id serial primary key,
    name varchar(100) not null unique,
    description text,
    created_at timestamp default current_timestamp,
    updated_at timestamp default current_timestamp
);

create table menus (
    id serial primary key,
    name varchar(100) not null,
    url text,
    icon text,
    parent_id integer references menus(id) on delete set null,
    order_number integer default 1,
    created_at timestamp default current_timestamp,
    updated_at timestamp default current_timestamp
);

create table user_roles (
    user_id integer references users(id) on delete cascade,
    role_id integer references roles(id) on delete cascade,
    created_at timestamp default current_timestamp,
    updated_at timestamp default current_timestamp,
    primary key (user_id, role_id)
);

create table role_menus (
    role_id integer references roles(id) on delete cascade,
    menu_id integer references menus(id) on delete cascade,
    created_at timestamp default current_timestamp,
    updated_at timestamp default current_timestamp,
    primary key (role_id, menu_id)
);



create index idx_user_roles_user_id on user_roles(user_id);
create index idx_user_roles_role_id on user_roles(role_id);
create index idx_role_menus_role_id on role_menus(role_id);
create index idx_role_menus_menu_id on role_menus(menu_id);



create or replace function update_timestamp()
returns trigger as $$
begin
    new.updated_at = current_timestamp;
    return new;
end;
$$ language plpgsql;



create trigger update_users_timestamp
before update on users
for each row execute procedure update_timestamp();

create trigger update_roles_timestamp
before update on roles
for each row execute procedure update_timestamp();

create trigger update_menus_timestamp
before update on menus
for each row execute procedure update_timestamp();

create trigger update_user_roles_timestamp
before update on user_roles
for each row execute procedure update_timestamp();

create trigger update_role_menus_timestamp
before update on role_menus
for each row execute procedure update_timestamp();