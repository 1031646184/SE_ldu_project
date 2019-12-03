# -*- coding: utf-8 -*-
host = '127.0.0.1'
user = 'root'
passwd = ''
port = 3306
db = 'test2'
#CREATE DATABASE `se_database` DEFAULT CHARACTER SET utf8
tables = [
"""
create table user(
    id              varchar(36)  primary key,          
    name            varchar(64),    
    nick_name       varchar(64),
    stu_id          varchar(36)  unique key,
    phone           varchar(20),    
    birthday        date,
    gender          varchar(20),
    school_id       varchar(36),
    email           varchar(256),  
    created_at      datetime,
    update_at       datetime    
)""","""
create table user_task_Inf(
    id              varchar(36)  primary key,
    stu_id          varchar(36) unique key, 
    task            text       
);""","""
create table user_password(
    id              varchar(36)  primary key,
    stu_id          varchar(64),  
    password        varchar(64)

);""","""
create table ldu(
    id              varchar(36)  primary key,    
    name            varchar(64), 
    parent_id       varchar(36),
    child_ids       text ,
    created_at      datetime,
    update_at       datetime
);""","""
create table number(
    id              varchar(36)  primary key,
    tree_table      varchar(255),
    treeNode_id     varchar(36),
    user_id         varchar(36)
);""","""
create table task(
     id                     varchar(36)  primary key,          
     publisher_id           varchar(36),
     title                  varchar(255),
     description            text,
     start_time             datetime,
     end_time               datetime,
     attachments_id         varchar(36),
     submit_attachments     int,    
     status                 int,
     state                  int,
     created_at             datetime,
     update_at              datetime
);""","""
create table msg(
    id              varchar(36)  primary key,
    publisher_id    varchar(36),
    description     text,
    state           int, 
    created_at      datetime,
    update_at       datetime
);""","""
create table attchments(
    id              varchar(36)  primary key,
    format          varchar(36),
    name            varchar(255), 
    task_id         varchar(255), 
    committer       varchar(36),
    location        varchar(255),
    created_at      datetime,
    update_at       datetime
);""","""
create table school(
    id             varchar(36)  primary key,
    name           varchar(255), 
    user_id        varchar(36),              
    tree_table     varchar(255), 
    created_at     datetime,
    update_at      datetime
);
"""
]