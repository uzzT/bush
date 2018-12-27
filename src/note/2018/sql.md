# postgre sql

## shell

启动： psql -U postgres

\l : 列出所有数据库

\c dbname: 切换数据库

\dt: 列出所有表

\d tablename : 列出表结构

create table tableName


## 常量 字符串、位串、数值

1. 字符串常量

转义字符串 字符串前加字母E

一个转义Unicode字符常量以 U&开始（大/小写U后紧跟有&符号）紧跟着打开的单引号， 之间没有空格，例如U&'foo；

2. 位串常量

位串常量看起来很像在开引号前面有一个B(大写或小写)的普通字符串 (它们之间没有空白)，比如B'1001'。位串常量里可以用的字符只有0 和1

位串常量可以用十六进制表示法声明，方法是使用前缀X(大写或者小写)， 比如X'1FF'，其中的每个十六进制位等效于四个二进制位

3. 数值常量

## 操作符

## 特殊字符

## 注释

-- 这是标准的 SQL 注释 

/* 多行注释
 * 可以嵌套: /* 被嵌套的块注释 */
 */


## 值表达式

### 类型转换

### 标量子查询

一个标量子查询是一个放在圆括弧里只返回一行一列的普通SELECT 查询。该SELECT 将被执行，
而其返回值将在周围的值表达式中使用。 把一个返回超过一行或者超过一列的查询用做标量查询是错误的。

SELECT name, (SELECT max(pop) FROM cities WHERE cities.state = states.name) FROM states;

### 数组构造器

SELECT ARRAY[1,2,3+4];

### 行构造器

行构造器是一个从提供给它的成员字段数值中构造行值(也叫复合类型值)的表达式。 一个行构造器由关键字ROW、一个左圆括弧、零个或多个作为行字段值的表达式(用逗号分隔)、 一个右圆括弧组成

SELECT ROW(1,2.5,'this is a test');

### 表达式计算规则

SELECT true OR somefunc(); 

子表达式的计算顺序是未定义的。特别要指出的是， 一个操作符或者函数的输入并不一定是按照从左向右的顺序或者以某种特定的顺序进行计算的。
另外，如果一个表达式的结果可以通过只判断它的一部分就可以得到， 那么其它子表达式就可以完全不计算了

## 调用函数

### 位置表示  名称表示 函数表示

## 数据定义

### 表 

create table name ( f1: int, f2: type)

drop table name

### 缺省值 默认值 default 值

### 约束 值的数据

1. 非空约束 not null;

2. null 约束；

3. 并列多个约束

4. 唯一约束  unique

### 主键 唯一约束和非空约束的集合 primary key

表示一个或多个字段的组合可以用于唯一标识表中的数据行

### 外键

外键约束声明一个字段(或者一组字段)的数值必须匹配另外一个表中出现的数值。 我们把这个行为称为两个相关表之间的参照完整性

假设你有个产品表，我们可能使用了好几次：

CREATE TABLE products (
    product_no integer PRIMARY KEY,
    name text,
    price numeric
); // 被引用表

假设你有一个存储这些产品的订单的表。我们想保证订单表只包含实际存在的产品。 因此我们在订单表中定义一个外键约束引用产品表：

CREATE TABLE orders (
    order_id integer PRIMARY KEY,
    product_no integer REFERENCES products (product_no),
    quantity integer
); // 引用表

现在，我们不能创建任何其非空product_no记录没有在产品表中出现的订单。

一个表可以包含多于一个外键约束。这个特性用于实现表之间的多对多关系

限制删除 级联删除

  product_no integer REFERENCES products ON DELETE RESTRICT,
  order_id   integer REFERENCES orders   ON DELETE CASCADE,
  NO ACTION,

NO ACTION 允许约束检查推迟到事务的晚些时候，而RESTRICT不行。CASCADE 声明在删除一个被引用的行的时候，所有引用它的行也会被自动删除掉

限制和级联删除是两种最常见的选项。RESTRICT禁止删除被引用的行。 NO ACTION的意思是如果在检查约束的时候还存在任何引用行，则抛出错误； 如果你不声明任何东西，那么它就是缺省的行为。这两个选择的实际区别是：NO ACTION 允许约束检查推迟到事务的晚些时候，而RESTRICT不行。CASCADE 声明在删除一个被引用的行的时候，所有引用它的行也会被自动删除掉。在外键字段上的动作还有两个选项： SET NULL和SET DEFAULT，它们导致在被引用行删除的时候， 将引用它们的字段分别设置为 NULL 和缺省值。请注意这些选项并不能让你逃脱被观察和约束的境地。 比如，如果一个动作声明SET DEFAULT，但是缺省值并不能满足外键约束， 那么该动作就会失败。

排他约束保证如果任何两行被在声明的字段里比较或者用声明的操作表达， 至少有一个操作比较会返回错误或空值。句法是：

CREATE TABLE circles (
    c circle,
    EXCLUDE USING gist (c WITH &&)
);

## 系统字段

## 修改表

增加字段 ALTER TABLE products ADD COLUMN description text;

删除字段 ALTER TABLE products DROP COLUMN description;

增加约束 

ALTER TABLE products ADD CHECK (name <> '');
ALTER TABLE products ADD CONSTRAINT some_name UNIQUE (product_no);
ALTER TABLE products ADD FOREIGN KEY (product_group_id) REFERENCES product_groups;

删除约束 

ALTER TABLE products DROP CONSTRAINT some_name;
ALTER TABLE products ALTER COLUMN product_no DROP NOT NULL;

改变缺省值 

ALTER TABLE products ALTER COLUMN price SET DEFAULT 7.77;
ALTER TABLE products ALTER COLUMN price DROP DEFAULT;

修改数据类型 ALTER TABLE products ALTER COLUMN price TYPE numeric(10,2);

重命名字段 ALTER TABLE products RENAME COLUMN product_no TO product_number;

重命名表 ALTER TABLE products RENAME TO items;

## 权限

grant  命令来赋予权限 GRANT UPDATE ON accounts TO joe;

revoke 命令来撤销权限 REVOKE ALL ON accounts FROM PUBLIC;

最初，只有对象所有者(或者超级用户)可以赋予或者撤销对象的权限。但是， 我们可以赋予一个"with grant option"权限，
这样就允许接受权限的人将该权限转授他人。 如果授权选项后来被撤销，那么所有那些从这个接受者接受了权限的用户(直接或间级)都将失去该权限。

## 模式

create schema schemaname  

## 表继承

CREATE TABLE cities (
    name            text,
    population      float,
    altitude        int
); 

CREATE TABLE capitals (
    state           char(2)
) INHERITS (cities)；

SELECT name, altitude
    FROM ONLY cities
    WHERE altitude > 500;

你也可以在表名后面写一个*显式指定包括所有后代表：

SELECT name, altitude
    FROM cities*
    WHERE altitude > 500;

请注意表访问权限是如何处理的。访问父表会自动访问在子表中的数据，而不需要更多的访问权限检查。 这保留了父表中数据的表现。然而，直接访问子表不会自动允许访问父表，要访问父表需要更进一步的权限被授予。

## 分区 ？？

分区的意思是把逻辑上的一个大表分割成物理上的几块。分区可以提供若干好处：

某些类型的查询性能可以得到极大提升。 特别是表中访问率较高的行位于一个单独分区或少数几个分区上的情况下。 分区可以减少索引体积从而可以将高使用率部分的索引存放在内存中。 如果索引不能全部放在内存中，那么在索引上的读和写都会产生更多的磁盘访问。

当查询或更新一个分区的大部分记录时， 连续扫描那个分区而不是使用索引离散的访问整个表可以获得巨大的性能提升。

如果需要大量加载或者删除的记录位于单独的分区上， 那么可以通过直接读取或删除那个分区以获得巨大的性能提升， 因为ALTER TABLE NO INHERIT和DROP TABLE 比操作大量的数据要快的多。这些命令同时还可以避免由于大量DELETE 导致的VACUUM超载。

很少用的数据可以移动到便宜一些的慢速存储介质上。

## 外部数据

从外部服务器获取的数据源
