# scss

## feature

```

1. 嵌套 （属性嵌套 class 嵌套 文件嵌套）

2. 父选择器 &

3. 占位符选择器 ？？

4. Sass 支持标准的 CSS 多行注释 /* */，以及单行注释 //，前者会 被完整输出到编译后的 CSS 文件中，而后者则不会

5. 变量声明 $width

6. scss 支持的数据类型

    数字，1, 2, 13, 10px
    字符串，有引号字符串与无引号字符串，"foo", 'bar', baz
    颜色，blue, #04a3f9, rgba(255,0,0,0.5)
    布尔型，true, false
    空值，null
    数组 (list)，用空格或逗号作分隔符，1.5em 1em 0 2em, Helvetica, Arial, sans-serif
    maps, 相当于 JavaScript 的 object，(key1: value1, key2: value2)

    定义 @mixin name() {}
    调用 @include name(seperate)

    !!! cannot use width: 100px / 2px ;  can use 100px + 2px
  
7. @import 语法

  @extend 可以用来继承类

  .name {color: red} 

  .nameExtend {
    @extend .name;
    font-size: 16px;
  }

8. 函数

  $grid-width: 40px;
  $gutter-width: 10px;

  @function grid-width($n) {
    @return $n * $grid-width + ($n - 1) * $gutter-width;
  }

  #sidebar { width: grid-width(5); }

9. 可设置编译成 css 的格式

```
