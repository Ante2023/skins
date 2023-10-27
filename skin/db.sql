CREATE DATABASE videojuegos

CREATE TABLE users(
    id SERIAL PRIMARY KEY,
    email VARCHAR(100) UNIQUE  NOT NULL,
    password VARCHAR(100) NOT NULL
)

CREATE TABLE user_skin(
    id_user INT  NOT NULL ,
    id_skin INT  NOT NULL ,
    PRIMARY KEY(id_skin,id_user),
    CONSTRAINT uq_columas_compuestas UNIQUE (id_skin, id_user)
)

CREATE TABLE skins(
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(100) UNIQUE NOT NULL,
    tipo VARCHAR(100)  NOT NULL,
    precio DECIMAL(10,2) NOT NULL,
    color VARCHAR(100) DEFAULT 'transparente'
)



