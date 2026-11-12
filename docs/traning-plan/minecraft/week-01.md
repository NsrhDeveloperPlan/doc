---
title: 第 1 周：用 Java 制作史蒂夫属性面板与伤害计算器
description: Minecraft 模组开发第 1 周教程：配置 Java 环境，学习变量与条件判断，完成控制台伤害计算器和首次本地 Git 提交。
outline: [2, 3]
---

# 第 1 周：用 Java 制作史蒂夫属性面板与伤害计算器

这一周，我们从第一行 Java 代码开始。

玩过 Minecraft都知道，史蒂夫有生命值，武器能造成伤害，护甲可以减轻受到的伤害。

但如果让你自己写一个程序，计算史蒂夫受到攻击后还剩多少生命值，该怎么做？

这就是我们本周要完成的项目：

史蒂夫属性面板与伤害计算器。

程序启动后，会显示史蒂夫的基本属性，让你输入武器伤害和简化护甲值，再计算实际伤害、剩余生命值，最后判断史蒂夫是否存活。

例如，输入武器伤害 `8`、简化护甲值 `3`，程序应该显示：

```text
===== 史蒂夫属性面板 =====
名称：史蒂夫
初始生命值：20

请输入武器伤害：8
请输入简化护甲值：3

===== 伤害计算结果 =====
实际伤害：5.0
剩余生命值：15.0
史蒂夫仍然存活
```

这周我们只需要学习 Java 最基础的几个知识：变量、数据类型、输出、输入、基本运算和条件判断。

不要求提前学过编程，也不需要先学习前端或后端。

::: tip 本周项目说明
这是一个独立的 Java 控制台程序，不是 Minecraft 模组，代码不会在游戏中生效。

我们使用教学用的简化计算规则，不复现 Minecraft 真正的护甲、伤害、附魔或抗性公式。

模组开发路线前六周会通过类似的小程序学习 Java，第七周才正式建立“星辉工坊”模组工程。
:::

本周预计投入 5～7 小时，可以根据自己的基础调整。

## 一、开始前，需要准备什么

我们主要使用 Windows 和 IntelliJ IDEA 完成练习。

本周需要三个工具：

| 工具            | 它负责什么                |
| ------------- | -------------------- |
| JDK 25        | 提供编译、运行 Java 程序所需的工具 |
| IntelliJ IDEA | 编写代码、运行程序、查看错误       |
| Git           | 保存代码的历史版本，记录每周的学习成果  |

先弄清楚它们之间的区别。

### 1.1 JDK 和 IntelliJ IDEA 有什么不同

JDK（Java Development Kit） 是 Java 开发工具包。

我们写的 Java 源代码不能直接当成普通程序执行，需要经过编译，再由 Java 运行环境执行。

JDK 提供了完成这些工作所需要的工具。

IntelliJ IDEA 则是一款集成开发环境，简称 IDE。

它会把编写代码、运行程序、查看报错、管理项目等功能整合在一个软件里。

你可以这样理解：

- JDK 负责让 Java 代码能够被编译和运行。
- IntelliJ IDEA 帮助我们更方便地编写、运行和管理 Java 代码。

即使安装了 IntelliJ IDEA，也仍然需要为项目配置 JDK。IDEA 自身使用的运行环境，不等于当前项目已经拥有可用的 JDK。

本周使用 JDK 25。

JetBrains 已在官方资料中说明 IntelliJ IDEA 对 Java 25 的支持，并提供了通过 IDE 下载 JDK 25 的操作方式。

参考：[JetBrains：Java 25 与 IntelliJ IDEA](https://blog.jetbrains.com/idea/2025/09/java-25-lts-and-intellij-idea/)

我们本周使用的代码都是基础 Java 语法，不使用 Java 25 的预览功能或简化源文件写法。

第六周准备进入模组开发前，会根据实际选择的 Minecraft 和加载器版本，重新确认所需 JDK。

现在不用同时安装多个 JDK。

### 1.2 安装 IntelliJ IDEA

打开 [IntelliJ IDEA 官方下载页面](https://www.jetbrains.com/idea/download/)。

选择适合自己 Windows 电脑的安装程序，下载后运行。

注：jetbrains家系列产品，与PyCharm同一系列，我们可以通过学校提供的教育邮箱来获取学生优惠（其实就是免费用一年），教育邮箱请你查看企业微信，大概格式例如：王艺积，wangyiji1@ctbu.edu.cn。（实在不明白可以去b站搜搜教程☝️）

### 1.3 通过 IDEA 准备 JDK 25

IntelliJ IDEA 支持在创建 Java 项目时下载或选择 JDK。

因此，我们优先在创建项目的过程中完成 JDK 配置，不必另外寻找多个安装包。

如果电脑里已经有 JDK 25，可以直接选择现有安装。

如果没有，等到下一节创建项目时，在 JDK 选项中使用 Download JDK（下载 JDK） 功能。

选择：

```text
Version: 25
```

发行商可以选择可用的 OpenJDK 发行版，例如 Oracle OpenJDK 或 Eclipse Temurin。

下载完成后，将它设置为当前项目的 JDK。

如果 IDEA 内下载失败，也可以从官方发行渠道手动获取：

- [Eclipse Temurin JDK](https://adoptium.net/temurin/releases/)
- [Oracle Java Downloads](https://www.oracle.com/java/technologies/downloads/)

手动安装后，回到 IDEA，通过添加本地 JDK 的功能选择安装目录。

注意选择的是 JDK 的根目录，不是随意选择一个 `java.exe` 文件。

本周只需要一套可用的 JDK 25。

### 1.4 安装 Git

Git 是版本管理工具。

假设你今天完成了伤害计算器，下周又改动了很多代码，结果程序无法运行。如果之前保存过 Git 提交，就能查看先前版本的代码。

因此我们从第一周开始使用 Git。

打开 [Git 官方下载页面](https://git-scm.com/downloads/)，选择 Windows 对应的安装程序。

按照安装向导完成安装即可。本周不需要配置复杂的远程仓库或分支策略。

安装后可以在 Windows 终端中执行：

```powershell
git --version
```

如果出现类似：

```powershell
git version x.y.z
```

说明系统能够找到 Git。这里的 `x.y.z` 是实际安装的版本号。

如果刚安装完却提示找不到命令，先重新打开终端或 IDEA。

Git 和 GitHub 并不是同一个东西。

Git 负责管理本地代码历史，GitHub 是提供远程 Git 仓库托管的网站。

这周只要求在自己的电脑上完成提交，不需要登录 GitHub。

其他软件下载入口也可以查看 [软件资源](../software-resources.md)。

## 二、创建第一个 Java 项目

工具准备好后，我们正式创建项目。

### 2.1 什么是项目

以后我们不会把所有代码随意放在桌面上。

通常会创建一个项目（Project），把相关源代码和配置文件放进同一个文件夹。

例如：

```text
SteveDamageCalculator/
└── src/
    └── Main.java
```

这里：

- `SteveDamageCalculator` 是项目文件夹。
- `src` 用来保存源代码。
- `Main.java` 是我们本周编写的 Java 源文件。

你可以把项目理解为一项编程练习的完整工作目录。

以后打开这个文件夹，就能继续编辑里面的代码。

### 2.2 使用 IDEA 创建项目

启动 IntelliJ IDEA。

如果进入的是欢迎界面，找到创建新项目的功能，通常显示为：

New Project（新建项目）

如果已经打开了其他项目，可以通过顶部的 File → New → Project 创建新项目。

接下来按照以下要求设置：

| 配置项                   | 本周填写                    |
| --------------------- | ----------------------- |
| Language（语言）          | Java                    |
| Name（项目名称）            | `SteveDamageCalculator` |
| Build system（构建方式）    | IntelliJ                |
| JDK                   | JDK 25                  |
| Create Git repository | 暂时不勾选                   |
| Add sample code       | 暂时不勾选                   |

本周使用 IntelliJ 自带的构建方式，不选择 Maven 或 Gradle。

Git 仓库也先不初始化，等代码完成后，我们再一起学习图形界面提交。

项目保存位置可以选择自己方便找到的学习文件夹。

确认后创建项目。

### 2.3 创建 Main.java

项目创建完成后，观察 IDEA 左侧的 Project（项目） 面板。

如果没有看到它，可以通过：

View → Tool Windows → Project

打开，也可以尝试快捷键 `Alt + 1`。

在项目中找到：

```text
src
```

这是存放源代码的文件夹。

右键点击 `src`，选择：

New → Java Class

输入：

```text
Main
```

选择普通的 Java 类（Class），不要选择 Java Compact File 等简化源文件类型。

创建后应当得到：

`src/Main.java`

文件中通常会出现类似内容：

```java
public class Main {
}
```

如果文件里已经存在其他示例代码，接下来可以按照教程替换。

这里有两个需要记住的地方。

第一，`Main.java` 是文件名。

第二，`public class Main` 是类的声明。

在本项目中，公共类名 `Main` 必须与文件名 `Main.java` 对应。

不要把文件命名成 `main.java`、`Steve.java`，却仍然声明 `public class Main`。

## 三、运行第一段 Java 代码

现在我们先让电脑输出一句话。

### 3.1 编写 Hello World

打开：

`src/Main.java`

将文件中的原有内容全部替换为：

```java
public class Main {

    public static void main(String[] args) {
        System.out.println("Hello World");
    }

}
```

先不要担心看不懂所有符号。

我们只需要认识三个地方。

`public class Main`

表示声明一个名为 `Main` 的类。

Java 通常使用类来组织代码。类的其他知识会在第三周进一步学习。

`public static void main(String[] args)`

这是传统 Java 程序的入口方法。

当我们运行这个程序时，Java 会从这里开始执行。

目前不用记住每个关键字的详细含义。先保证它的写法正确即可。

`System.out.println()`

这句代码负责输出文字。

例如：

```java
System.out.println("Hello World");
```

就会在运行结果中显示：

```text
Hello World
```

`println` 在输出结束后还会换行，因此下一次输出会从新的一行开始。

另外，代码中的：

```text
;
```

是英文分号。

Java 的大多数普通语句需要用它结束。

### 3.2 点击运行按钮

确认文件已经保存。

在 IDEA 的代码编辑区域，找到 `main` 方法旁边的绿色运行图标。

点击后，选择运行当前 `Main.main()` 的功能。

IDEA 会先编译代码，再启动程序。

如果没有编译错误，窗口下方会打开 Run（运行） 工具窗口。

其中应该显示类似：

```text
Hello World

Process finished with exit code 0
```

`Process finished with exit code 0` 表示这次进程正常结束。

实际显示的附加信息和语言可能不同。

如果看到了 `Hello World`，说明你的 Java 项目已经能够运行。

### 3.3 Run 窗口和 Terminal 有什么区别

IDEA 下方可能有多个工具窗口。

其中两个比较常见：

| 窗口           | 主要用途                      |
| ------------ | ------------------------- |
| Run（运行）      | 显示当前程序的输出，也能接收程序请求的键盘输入   |
| Terminal（终端） | 输入系统命令，例如 `git --version` |

它们都可能显示文字，但用途不同。

本周运行 Java 程序，主要使用 Run 窗口。

到后面使用 Git 命令时，我们才会用到 Terminal。

还要注意：编辑器中写代码的区域，不等于程序接收输入的区域。

这一区别在后面使用 `Scanner` 时非常重要。

## 四、用变量制作史蒂夫属性面板

现在让程序输出更有意思的内容。

我们准备为史蒂夫设置两个基础属性：

- 名称：史蒂夫
- 初始生命值：20

### 4.1 什么是变量

变量可以理解为程序中用来保存数据的名字。

例如：

```java
int health = 20;
```

这句代码表示：

创建一个名为 `health` 的变量，它的类型是 `int`，初始值是 `20`。

后面的代码可以使用这个变量。

例如：

```java
System.out.println(health);
```

就会输出：

```text
20
```

这样做有什么用？

假设以后想把初始生命值改成 `30`，只要修改变量的值，而不必把程序里所有出现生命值的位置都逐个修改。

### 4.2 认识三个数据类型

本周先认识 Java 中的三种数据类型。

| 类型       | 用途          | 示例      |
| -------- | ----------- | ------- |
| `int`    | 保存整数        | `20`    |
| `double` | 保存可以包含小数的数值 | `8.5`   |
| `String` | 保存文本        | `"史蒂夫"` |

例如：

```java
String name = "史蒂夫";
int health = 20;
double damage = 8.5;
```

注意，`String` 中的 `S` 是大写。

字符串要使用英文双引号包围，而数字通常不需要引号。

```java
int health = 20;
```

和：

```java
String health = "20";
```

保存的数据类型不同。

前者是数字，可以直接参与整数运算；后者是文本。

### 4.3 修改 Main.java

打开：

`src/Main.java`

把整个文件替换为：

```java
public class Main {

    public static void main(String[] args) {
        String name = "史蒂夫";
        int health = 20;

        System.out.println("===== 史蒂夫属性面板 =====");
        System.out.println("名称：" + name);
        System.out.println("初始生命值：" + health);
    }

}
```

这里新出现了一个写法：

```text
"名称：" + name
```

当 `+` 用于连接字符串时，可以把文字和变量值拼接起来。

例如：

```java
System.out.println("名称：" + name);
```

会把变量 `name` 中保存的“史蒂夫”放到输出文字后面。

### 4.4 重新运行

点击运行按钮，再运行 `Main.main()`。

预期显示：

```text
===== 史蒂夫属性面板 =====
名称：史蒂夫
初始生命值：20
```

试着把：

```java
int health = 20;
```

临时改为：

```java
int health = 30;
```

重新运行，观察输出。

确认变化后，再改回：

```java
int health = 20;
```

因为后面的伤害计算会统一使用初始生命值 `20`。

这里要记住：修改并保存源代码，不等于已经更新上一次运行的结果。

本周使用的是一次性运行的控制台程序，修改后需要重新运行。

## 五、让程序计算伤害

现在我们加入真正的计算逻辑。

先不让用户输入数字，直接使用固定数据，把计算规则理解清楚。

### 5.1 确定简化计算规则

假设：

```text
史蒂夫初始生命值：20
武器伤害：8
简化护甲值：3
```

我们采用下面的教学规则：

第一步：计算实际伤害。

```text
实际伤害 = 武器伤害 - 简化护甲值
```

即：

```text
8 - 3 = 5
```

如果算出来的伤害小于 `0`，就改为 `0`。

例如，武器伤害为 `3`，简化护甲值为 `8`：

```text
3 - 8 = -5
```

负数伤害在我们的简化模型中没有意义，所以实际伤害应该是 `0`。

第二步：计算剩余生命值。

```text
剩余生命值 = 初始生命值 - 实际伤害
```

即：

```text
20 - 5 = 15
```

如果剩余生命值小于 `0`，同样改为 `0`。

第三步：判断存活状态。

如果剩余生命值等于 `0`，输出：

```text
史蒂夫倒下了
```

否则输出：

```text
史蒂夫仍然存活
```

这里的“简化护甲值”只是我们为练习设置的伤害扣减数值，与 Minecraft 原版真实护甲机制不同。

### 5.2 认识基本运算符

Java 可以直接进行数学计算。

| 运算符 | 含义 | 示例        |
| --- | -- | --------- |
| `+` | 加法 | `3 + 2`   |
| `-` | 减法 | `8 - 3`   |
| `*` | 乘法 | `4 * 2`   |
| `/` | 除法 | `8.0 / 2` |

本周的伤害计算主要使用减法。

例如：

```java
double weaponDamage = 8;
double armor = 3;

double actualDamage = weaponDamage - armor;
```

这里会创建一个新变量 `actualDamage`，用来保存计算结果。

因为使用的是 `double` 类型，所以结果可能显示为 `5.0`。

`5` 和 `5.0` 在这个计算场景中代表相同的数值。

### 5.3 用 if 处理边界

如果实际伤害算出了负数，应该怎么办？

这时需要使用条件判断。

例如：

```java
if (actualDamage < 0) {
    actualDamage = 0;
}
```

可以理解为：

如果 `actualDamage` 小于 `0`，就把它改成 `0`。

这里：

- `if` 表示“如果”。
- `<` 表示“小于”。
- `{}` 包围条件成立时要执行的代码。

再看：

```java
if (remainingHealth == 0) {
    System.out.println(name + "倒下了");
} else {
    System.out.println(name + "仍然存活");
}
```

`else` 表示前面的条件不成立时执行另一段代码。

特别注意：

```text
=
```

用于赋值。

而：

```text
==
```

用于判断两个值是否相等。

所以：

```java
remainingHealth == 0
```

是在判断剩余生命值是否等于 `0`，不是把它修改为 `0`。

### 5.4 编写固定伤害版本

打开：

`src/Main.java`

把整个文件替换为：

```java
public class Main {

    public static void main(String[] args) {
        String name = "史蒂夫";
        int health = 20;

        double weaponDamage = 8;
        double armor = 3;

        System.out.println("===== 史蒂夫属性面板 =====");
        System.out.println("名称：" + name);
        System.out.println("初始生命值：" + health);

        double actualDamage = weaponDamage - armor;

        if (actualDamage < 0) {
            actualDamage = 0;
        }

        double remainingHealth = health - actualDamage;

        if (remainingHealth < 0) {
            remainingHealth = 0;
        }

        System.out.println();
        System.out.println("===== 伤害计算结果 =====");
        System.out.println("实际伤害：" + actualDamage);
        System.out.println("剩余生命值：" + remainingHealth);

        if (remainingHealth == 0) {
            System.out.println(name + "倒下了");
        } else {
            System.out.println(name + "仍然存活");
        }
    }

}
```

这份代码可以独立运行。

里面的计算过程与前面确定的规则一致。

### 5.5 运行并观察结果

重新运行 `Main.main()`。

预期输出：

```text
===== 史蒂夫属性面板 =====
名称：史蒂夫
初始生命值：20

===== 伤害计算结果 =====
实际伤害：5.0
剩余生命值：15.0
史蒂夫仍然存活
```

现在尝试把：

```java
double weaponDamage = 8;
double armor = 3;
```

修改成：

```java
double weaponDamage = 3;
double armor = 8;
```

重新运行。

预期实际伤害变成 `0.0`，剩余生命值仍是 `20.0`。

再试：

```java
double weaponDamage = 25;
double armor = 0;
```

这次剩余生命值应该是 `0.0`，程序显示史蒂夫倒下了。

试完后，暂时恢复为 `8` 和 `3`。

如果这几个结果都符合预期，说明你已经理解了本周最重要的运算和条件判断。

## 六、使用 Scanner 让用户输入伤害

目前程序里的伤害和护甲都是写死的。

每次想改变数值，都要修改源代码。

接下来，我们让程序运行时询问用户，由用户输入数字。

### 6.1 Scanner 是什么

Java 提供了一个叫做 `Scanner` 的工具，可以读取键盘输入。

先看一个简单例子：

```java
Scanner scanner = new Scanner(System.in);
```

这句代码创建了一个用来读取标准输入的 `Scanner` 对象。

这里的 `System.in` 可以先理解为程序接收键盘输入的入口。

再看：

```java
double weaponDamage = scanner.nextDouble();
```

它会读取用户输入的一个数值，并保存到 `weaponDamage` 变量中。

如果程序正在等待这行输入，你需要在运行窗口里输入数字，然后按回车。

### 6.2 导入 Scanner 和 Locale

打开：

`src/Main.java`

在文件最顶部、`public class Main` 前面，添加：

```java
import java.util.Scanner;
import java.util.Locale;
```

`import` 用于告诉 Java，我们准备使用哪些已经提供好的类。

这里的：

```text
Scanner
```

负责读取输入。

```text
Locale
```

用于指定数字解析等操作采用的地区规则。

为什么要设置地区规则？

因为不同地区可能使用不同的小数表示习惯。

我们统一要求输入：

```text
8.5
```

使用英文句点 `.` 表示小数点。

为了让输入示例在不同系统区域设置下尽量保持一致，创建 Scanner 后加入：

```java
scanner.useLocale(Locale.US);
```

它让 Scanner 按美国地区的数字格式规则解析输入。

本周只需要记住：输入小数统一使用英文句点，不要用中文句号。

### 6.3 把固定数值改成用户输入

回到上一节的固定伤害版本。

找到：

```java
double weaponDamage = 8;
double armor = 3;
```

删除这两行。

然后找到属性面板最后一行 `System.out.println("初始生命值：" + health);`，在它后面、`double actualDamage = weaponDamage - armor;` 前面，添加以下代码：

```java
Scanner scanner = new Scanner(System.in);
scanner.useLocale(Locale.US);

System.out.print("请输入武器伤害：");
double weaponDamage = scanner.nextDouble();

System.out.print("请输入简化护甲值：");
double armor = scanner.nextDouble();

scanner.close();
```

这里出现了一个新的输出方法：

```java
System.out.print()
```

它与 `println()` 的区别是：

- `print()` 输出后不主动换行。
- `println()` 输出后会换行。

所以：

```java
System.out.print("请输入武器伤害：");
```

可以让用户直接在提示文字后面输入数字。

`scanner.close()` 则表示输入已经读取完毕，关闭这个输入工具。

本周程序只读取一组数据，不需要再次打开输入。

### 6.4 增加负数检查

现在还有一个问题。

如果用户输入：

```text
-5
```

怎么办？

我们的模型规定，武器伤害和简化护甲值都不能是负数。

因此，程序读取数值后，应该先检查是否合法，再继续计算。

这里使用 `if` 和 `return`。

例如：

```java
if (weaponDamage < 0) {
    System.out.println("输入不合法：武器伤害不能小于 0。");
    scanner.close();
    return;
}
```

`return` 在这里表示提前结束 `main` 方法。

也就是说，发现输入不符合要求后，就不再执行后面的计算代码。

简化护甲值也需要做相同的判断。

为了避免改动位置出错，下一节会给出整理好的完整程序。

## 七、整理完整的伤害计算器

现在把前面学到的知识组合起来。

### 7.1 完整 Main.java

打开：

`src/Main.java`

把整个文件替换为以下代码。不要把它粘贴到旧代码后面，也不要保留第二个 `main` 方法。

```java
import java.util.Scanner;
import java.util.Locale;

public class Main {

    public static void main(String[] args) {
        String name = "史蒂夫";
        int health = 20;

        System.out.println("===== 史蒂夫属性面板 =====");
        System.out.println("名称：" + name);
        System.out.println("初始生命值：" + health);
        System.out.println();

        Scanner scanner = new Scanner(System.in);
        scanner.useLocale(Locale.US);

        System.out.print("请输入武器伤害：");
        double weaponDamage = scanner.nextDouble();

        if (weaponDamage < 0) {
            System.out.println("输入不合法：武器伤害不能小于 0。");
            scanner.close();
            return;
        }

        System.out.print("请输入简化护甲值：");
        double armor = scanner.nextDouble();

        if (armor < 0) {
            System.out.println("输入不合法：简化护甲值不能小于 0。");
            scanner.close();
            return;
        }

        scanner.close();

        double actualDamage = weaponDamage - armor;

        if (actualDamage < 0) {
            actualDamage = 0;
        }

        double remainingHealth = health - actualDamage;

        if (remainingHealth < 0) {
            remainingHealth = 0;
        }

        System.out.println();
        System.out.println("===== 伤害计算结果 =====");
        System.out.println("实际伤害：" + actualDamage);
        System.out.println("剩余生命值：" + remainingHealth);

        if (remainingHealth == 0) {
            System.out.println(name + "倒下了");
        } else {
            System.out.println(name + "仍然存活");
        }
    }

}
```

这就是本周需要完成的最终基础版本。

注意程序中的三个重要部分：

第一部分：初始化属性。

```java
String name = "史蒂夫";
int health = 20;
```

这里保存史蒂夫的名称和初始生命值。

第二部分：读取输入。

```java
double weaponDamage = scanner.nextDouble();
```

以及：

```java
double armor = scanner.nextDouble();
```

这两次输入由用户在运行时提供。

第三部分：计算并判断。

```java
double actualDamage = weaponDamage - armor;
```

计算实际伤害，然后通过 `if` 处理负数边界，最后判断生命值是否为零。

程序只处理一次攻击，输出结果后就会正常结束。

### 7.2 运行最终程序

点击 IDEA 中的运行按钮，重新运行 `Main.main()`。

程序首先显示：

```text
===== 史蒂夫属性面板 =====
名称：史蒂夫
初始生命值：20

请输入武器伤害：
```

这时程序并没有卡住。

它正在等待你输入武器伤害。

在下方 Run 窗口的控制台输入区域，输入：

```text
8
```

然后按回车。

程序接着会提示：

```text
请输入简化护甲值：
```

输入：

```text
3
```

再按回车。

完整交互应该类似：

```text
===== 史蒂夫属性面板 =====
名称：史蒂夫
初始生命值：20

请输入武器伤害：8
请输入简化护甲值：3

===== 伤害计算结果 =====
实际伤害：5.0
剩余生命值：15.0
史蒂夫仍然存活
```

如果能够得到这个结果，你已经完成了一个可以接收输入、计算并根据条件输出不同结果的 Java 程序。

### 7.3 本周输入范围

为了让大家先掌握基础编程，我们暂时只处理普通的、有限的非负数字。

例如：

```text
8
8.5
0
25
```

都属于本周应该尝试的输入。

负数会由程序明确拒绝。

但请不要输入：

```text
八
```

或者用中文句号写成：

```text
8。5
```

也不要将小数写成：

```text
8,5
```

程序没有把这些内容当成普通数字进行处理的完整机制。

直接按回车输入空内容时，程序可能继续等待有效输入；输入无法解析的文本时，`Scanner.nextDouble()` 可能抛出输入格式异常。

另外，`double` 本身还存在特殊浮点值和精度限制。本周没有实现对所有异常数值的完整校验，因此不要把这份程序理解为能够安全处理任意输入的正式游戏计算系统。

我们现在集中练习变量、运算和 `if-else`，后面掌握更多 Java 知识后，再逐步完善输入处理。

## 八、按测试案例逐个验收

程序写完还不够，我们需要确认它在不同输入下都符合规则。

这叫做测试。

不需要安装额外测试工具。直接多次运行程序、输入指定数字、检查结果即可。

### 8.1 四组基本测试

每次测试都重新运行 `Main.main()`，输入一组新的武器伤害和简化护甲值。

| 武器伤害  | 简化护甲值 | 预期实际伤害 | 预期剩余生命值 | 预期状态 |
| ----- | ----- | ------ | ------- | ---- |
| `8`   | `3`   | `5`    | `15`    | 存活   |
| `3`   | `8`   | `0`    | `20`    | 存活   |
| `25`  | `0`   | `25`   | `0`     | 倒下   |
| `8.5` | `2`   | `6.5`  | `13.5`  | 存活   |

输出中的 `5` 与 `5.0` 可以视为相同的数值结果。

但状态判断和实际计算值必须正确。

建议按表格从上往下逐个验证。

测试一：普通伤害

输入：

```text
8
3
```

预期：

```text
实际伤害：5.0
剩余生命值：15.0
史蒂夫仍然存活
```

测试二：护甲高于伤害

输入：

```text
3
8
```

预期：

```text
实际伤害：0.0
剩余生命值：20.0
史蒂夫仍然存活
```

这组测试重点检查：

```java
if (actualDamage < 0)
```

是否正确处理了负数伤害。

测试三：伤害超过生命值

输入：

```text
25
0
```

预期：

```text
实际伤害：25.0
剩余生命值：0.0
史蒂夫倒下了
```

注意，实际伤害仍然是 `25.0`。

我们只规定剩余生命值不能低于 `0`，没有要求把实际伤害限制为初始生命值。

测试四：小数伤害

输入：

```text
8.5
2
```

预期：

```text
实际伤害：6.5
剩余生命值：13.5
史蒂夫仍然存活
```

这一组检查 `double` 是否正确参与运算。

### 8.2 验证负数输入

重新运行程序。

在武器伤害处输入：

```text
-3
```

预期显示：

```text
输入不合法：武器伤害不能小于 0。
```

然后程序结束，不再继续计算。

再重新运行，输入：

```text
8
-2
```

预期显示：

```text
输入不合法：简化护甲值不能小于 0。
```

同样不应该继续输出伤害计算结果。

### 8.3 修改人物名称

这一次不修改计算规则。

打开：

`src/Main.java`

找到：

```java
String name = "史蒂夫";
```

临时改成：

```java
String name = "艾利克斯";
```

重新运行程序。

预期属性面板的名称会变成：

```text
名称：艾利克斯
```

最后的状态输出也应随之变化。

例如：

```text
艾利克斯仍然存活
```

或者：

```text
艾利克斯倒下了
```

这说明程序确实使用了 `name` 变量，而不是把人物名称写死在每一个输出语句中。

完成测试后，把名称恢复成：

```java
String name = "史蒂夫";
```

重新运行一次，确认原始项目仍然符合要求。

### 8.4 保存运行截图

本周至少保留一张真实运行截图。

建议截图包含：

- IDEA 中的程序运行结果。
- 输入的武器伤害和简化护甲值。
- 实际伤害。
- 剩余生命值。
- 存活状态。

至少保留一组基本测试通过的结果。

截图可以保存在自己的学习记录文件夹中，不要求放进 Java 源代码仓库。

保存或分享之前，检查是否包含不需要公开的账号、个人路径或其他信息。

## 九、编写第一份 CHANGELOG.md

接下来，我们为项目记录第一次更新。

### 9.1 CHANGELOG 是什么

`CHANGELOG.md` 是一个 Markdown 文本文件，用来记录项目的更新内容。

这半年我们会不断保存练习成果。

从第七周开始，还会持续迭代同一个“星辉工坊”模组。

因此现在就养成记录更新的习惯。

每周写两三句话即可，不需要写成长篇实验报告。

### 9.2 创建 CHANGELOG.md

在 IDEA 左侧 Project 面板中，找到最外层的项目文件夹：

```text
SteveDamageCalculator
```

右键点击项目根目录，选择新建普通文件的功能，通常是：

New → File

输入文件名：

```text
CHANGELOG.md
```

注意，它应该位于项目根目录，不要创建到 `src` 里面。

文件内容可以参考下面的示例。

文件：`CHANGELOG.md`

```text
# 更新日志

## 第 1 周 - YYYY-MM-DD

- 创建 Java 控制台项目，完成史蒂夫属性面板。
- 实现武器伤害、简化护甲值输入与生命值计算。
- 完成基本输入测试，验证负数提前结束和修改人物名称后的输出。
```

将 `YYYY-MM-DD` 替换为实际完成日期。

上面只是写法示例，尚未完成的事项不要提前记录为已经完成。

## 十、使用 Git 保存第一周成果

代码可以运行了，现在我们用 Git 保存项目的第一个版本。

这一节主要使用 IntelliJ IDEA 自带的图形界面，不要求安装 VS Code。

### 10.1 先分清源代码和构建产物

打开 IDEA 左侧的 Project 面板，你可能发现项目里不只有 `Main.java`。

例如：

```text
SteveDamageCalculator/
├── .idea/
├── out/
├── src/
│   └── Main.java
└── CHANGELOG.md
```

实际目录可能有所不同。

这里需要分清：

源代码是我们自己编写、以后还要继续修改的文件。

例如：

```text
src/Main.java
```

构建产物是工具根据源代码编译生成的内容。

例如：

```text
Main.class
```

Java 编译器可以根据 `.java` 源文件生成 `.class` 文件。

IDEA 使用内置构建方式时，编译输出通常放在 `out` 等构建目录下。

这些文件可以在重新编译时生成，所以不需要提交到 Git。

另外，`.idea` 通常包含本机 IDEA 的项目配置。本周我们采用最简便的个人练习方式，不提交这些本地配置。

### 10.2 创建 .gitignore

`.gitignore` 是 Git 的忽略规则文件。

它告诉 Git 哪些文件不应该进入版本管理。

在项目根目录创建：

`.gitignore`

如果 IDEA 已经生成了这个文件，就直接检查并修改已有文件，不要重复创建。

文件：`.gitignore`

```text
# IntelliJ IDEA 本地配置
.idea/
*.iml

# Java 编译输出
out/
*.class

# 系统生成文件
.DS_Store
Thumbs.db
```

这里的：

```text
out/
```

表示忽略名为 `out` 的目录及其内容。

而：

```text
*.class
```

表示忽略扩展名为 `.class` 的文件。

不要把：

```text
src/
```

加入忽略规则。

因为 `src` 里保存着我们真正需要提交的源代码。

本周应该保留的主要文件是：

```text
SteveDamageCalculator/
├── src/
│   └── Main.java
├── .gitignore
└── CHANGELOG.md
```

这是需要提交的简化结构，并不代表实际电脑上只有这三个文件。

### 10.3 在 IDEA 中启用 Git

确认已经安装 Git。

然后在 IntelliJ IDEA 中打开当前项目。

找到版本控制相关功能。

官方文档提供的一种路径是：

VCS → Enable Version Control Integration

选择：

```text
Git
```

并确认。

某些 IDEA 版本或界面布局可能将这项功能放在不同位置，也可以查找 Create Git Repository（创建 Git 仓库）。

如果 IDEA 询问是否将项目设置加入 Git，本周先跳过，不要选择强制添加已忽略的文件。

如果需要选择初始化目录，请选择整个：

```text
SteveDamageCalculator
```

项目根目录。

不要选择 `src` 子文件夹。

完成后，Git 会在项目根目录建立隐藏的 `.git` 目录，用来保存版本信息。

这一步相当于在项目根目录执行：

```powershell
git init
```

到这里还没有上传任何文件。

本地初始化不要求登录 GitHub，也不会自动创建 GitHub 仓库。

### 10.4 检查要提交的文件

在 IDEA 中打开 Commit（提交） 工具窗口。

可以通过：

View → Tool Windows → Commit

打开，也可以尝试快捷键：

```text
Alt + 0
```

你应该能看到项目中的未跟踪文件或本地变更。

检查是否包含：

```text
src/Main.java
CHANGELOG.md
.gitignore
```

不同版本的 IDEA，提交界面可能有两种工作方式。

方式一：变更列表（Changelists）

这是 IDEA 常见的提交模式。

通过文件旁边的勾选框，选择要纳入本次提交的文件。

提交时，IDEA 会把选中的变化加入 Git 并创建提交记录，不要求你先手动执行一次暂存。

方式二：Git 暂存区（Staging Area）

如果启用了 Git 暂存区，可以使用添加或暂存功能，把文件加入暂存区，然后提交已经暂存的变化。

两种方式都可以完成本周任务。

关键是：逐项检查需要纳入的文件，不要把所有文件无差别提交。

确认没有包含 `.idea`、`out`、`.class` 等本地配置或构建产物。

### 10.5 配置 Git 作者信息

首次提交时，Git 可能提示没有设置姓名和邮箱。

它们用于记录这次代码提交的作者。

不需要填写 GitHub 登录密码，也不要求公开自己的真实邮箱。

如果 IDEA 提供作者信息配置入口，可以按照提示设置。

另一种稳定的方法是在 IDEA 内置终端执行 Git 配置命令。

先确认已经完成 Git 仓库初始化。

通过：

View → Tool Windows → Terminal

打开终端。

终端应当位于 `SteveDamageCalculator` 项目根目录。

然后执行：

```powershell
git config --local user.name "你的昵称"
```

再执行：

```powershell
git config --local user.email "你用于提交的邮箱"
```

把引号里的内容替换成自己的作者标识。

邮箱可以使用愿意保留在提交记录中的地址，不必与 GitHub 登录邮箱一致，也不必公开真实常用邮箱。

这里使用的：

```text
--local
```

表示只配置当前 Git 仓库。

它不会修改其他 Git 项目的作者配置。

可以检查配置是否写入：

```powershell
git config --local user.name
git config --local user.email
```

如果提示当前目录不是 Git 仓库，先检查是否已经初始化 Git，以及终端是否位于正确目录。

### 10.6 完成第一次本地提交

回到 IDEA 的 Commit 工具窗口。

选择本周应提交的文件。

在提交说明输入框中填写：

```text
完成第1周史蒂夫伤害计算器
```

然后点击：

Commit（提交）

如果界面中同时提供：

```text
Commit and Push
```

不要选择它。

本周只做普通本地提交，不需要上传到远程仓库。

IDEA 可能会在提交前执行代码检查。如果出现问题，先阅读提示，确认它是实际代码错误还是其他检查建议。

提交完成后，本次文件变化就被记录到了本地 Git 历史中。

### 10.7 检查提交历史

在 IDEA 中打开 Git 工具窗口，找到提交历史或 Log 页面。

通常可以通过：

View → Tool Windows → Git

进入。

查看是否出现刚才填写的提交说明：

```text
完成第1周史蒂夫伤害计算器
```

如果能够看到这条提交记录，说明本地提交已经保存。

也可以在 IDEA 终端中执行：

```powershell
git log --oneline -1
```

它会显示最近一次提交。

输出格式可能类似：

```text
a1b2c3d 完成第1周史蒂夫伤害计算器
```

其中的提交哈希由 Git 自动生成，实际值与示例不同是正常的。

到这里，你已经完成了第一次本地 Git 提交。

以后每周修改代码，都可以继续通过相同方式保存新的版本。

## 十一、常见问题与排查

第一次写程序时，遇到报错很正常。

不要一看到错误就删除整个项目重新创建。先看提示发生在哪个位置，再确认具体原因。

### 11.1 运行按钮不可用

如果 `Main.java` 旁边没有运行按钮，或者 IDEA 提示没有可用的 JDK，先检查项目配置。

打开：

File → Project Structure

找到项目的 SDK 或 JDK 配置。

确认当前项目使用的是 JDK 25。

如果显示未配置 SDK，就选择已经安装的 JDK，或通过 IDEA 提供的下载功能安装。

还需要确认：

- `Main.java` 位于源代码目录。
- 文件中存在正确的 `main` 方法。
- 当前项目不是没有配置 Java 支持的空项目。

JDK 配好后，再尝试运行。

参考：[IntelliJ IDEA 官方 JDK 配置说明](https://www.jetbrains.com/help/idea/sdk.html)。

### 11.2 Main.java 和类名不一致

本周的文件应为：

```text
Main.java
```

其中的类声明是：

```java
public class Main {
```

注意大小写。

如果改了文件名，却没修改公共类名，就可能出现编译错误。

同样，传统入口方法应当写成：

```java
public static void main(String[] args) {
```

不要漏掉括号、花括号，或者随意改变方法名称的大小写。

本教程始终使用这套传统入口，不使用简化源文件或隐式类语法。

### 11.3 出现大量红色错误提示

首先检查代码中的标点符号。

Java 使用英文标点，例如：

```java
System.out.println("Hello World");
```

不要写成：

```java
System.out.println（“Hello World”）；
```

后者使用了中文全角括号、引号和分号，不能直接作为 Java 语法使用。

特别注意：

- `"`：英文双引号。
- `(` 和 `)`：英文圆括号。
- `{` 和 `}`：英文花括号。
- `;`：英文分号。

如果报错从某一行开始连续出现很多条，先检查那一行前后的括号与分号是否缺失。

### 11.4 程序显示提示后不动了

例如：

```text
请输入武器伤害：
```

然后一直没有新内容。

这通常不是程序卡住。

因为：

```java
scanner.nextDouble();
```

正在等待输入。

请在 IDEA 下方的 Run 控制台中输入数字，然后按回车。

没有完成输入前，程序不会继续执行后面的计算。

### 11.5 输入数字却没有反应

先检查自己是不是在正确的位置输入。

本教程使用普通 `Main.main()` 运行配置。

应该在 Run 工具窗口内进行交互。

如果你把数字输入到了：

- Java 代码编辑区。
- Terminal 终端。
- Git 提交说明输入框。

正在运行的程序都不会因此收到对应输入。

点击 Run 控制台中可以输入的位置，再输入数字并按回车。

### 11.6 输入中文后程序报错

如果输入：

```text
八
```

或者：

```text
8,5
```

可能出现类似：

```text
java.util.InputMismatchException
```

这是因为本程序使用：

```java
scanner.nextDouble();
```

按照指定的数字解析规则读取输入。

本周统一使用普通数字，以及英文句点表示的小数：

```text
8
8.5
25
```

如果遇到输入格式异常，先重新运行程序，使用符合要求的数字测试。

这不是要求你现在就实现完整的异常处理系统。

### 11.7 修改代码后，输出还是旧结果

先确认文件已经保存。

然后重新执行 `Main.main()`。

如果仍然没有变化，检查：

1. 修改的是不是当前项目里的 `src/Main.java`。
2. IDEA 当前运行的是不是 `Main`。
3. 是否错误地打开了另一个同名项目。
4. 是否重新启动了程序。

本周不使用自动热重载。

因此，只修改和保存代码，不能替代重新运行。

### 11.8 中文输出出现乱码

如果程序能运行，但中文显示为乱码，先检查源代码文件的编码。

建议源代码使用：

```text
UTF-8
```

可以在 IDEA 的文件编码设置中确认当前项目和文件的编码。

再检查 Run 控制台所使用的编码环境。

不同 Windows 系统、IDEA 版本和终端设置可能有所差异，不保证所有电脑默认设置完全一致。

不要在不清楚原因时直接修改系统全局编码设置。

先记录实际使用的编码配置和乱码表现，再根据具体情况排查。

### 11.9 IDEA 找不到 Git

如果 IDEA 的版本控制功能提示 Git 不存在，先在系统终端执行：

```powershell
git --version
```

如果这里也找不到 Git，先确认安装是否完成。

如果系统终端可以找到 Git，但 IDEA 无法使用，可以在 IDEA 设置中找到：

Version Control → Git

检查 Git 可执行文件的位置。

可以使用其中的测试功能确认配置是否有效。

安装 Git 后，必要时重新打开 IDEA，让它重新读取环境配置。

### 11.10 首次提交提示缺少作者

如果看到类似：

```text
Author identity unknown
```

说明 Git 还不知道该用什么姓名和邮箱记录提交。

先确认已经初始化当前项目的 Git 仓库。

然后在项目根目录执行：

```powershell
git config --local user.name "你的昵称"
git config --local user.email "你用于提交的邮箱"
```

配置完成后，再执行提交操作。

不需要为此登录 GitHub，也不需要配置 GPG 签名。

### 11.11 卡住半小时还解决不了怎么办

如果同一个问题已经排查了约 30 分钟，仍然没有结果，可以向学长、同学或 AI 助手求助。

提问时尽量提供：

1. 完整的关键报错信息，不要只截最后一句。
2. 当前使用的 JDK 版本。
3. 当前使用的 IntelliJ IDEA 版本。
4. 出问题的代码或具体操作。
5. 自己已经尝试过的解决方法。

可以同时说明问题发生在创建项目、编译、运行、输入还是 Git 提交阶段。

解决之后，建议记录一下原因，以后遇到相似问题会更容易处理。

## 十二、本周完成清单

请根据实际操作结果逐项检查。

### 环境与项目

- 已安装 IntelliJ IDEA，并能够正常打开。
- 已配置项目 JDK 25。
- 创建了普通 Java 项目 `SteveDamageCalculator`。
- 使用 IntelliJ 内置构建方式，没有引入 Maven 或 Gradle。
- 创建了 `src/Main.java`。
- 成功运行 Hello World。

### Java 基础与程序功能

- 理解 `int`、`double`、`String` 分别保存什么数据。
- 会使用 `System.out.println()` 输出内容。
- 会定义变量并参与基本运算。
- 会使用 `Scanner` 输入数字。
- 会使用 `if` 判断实际伤害是否小于零。
- 会使用 `if` 判断剩余生命值是否小于零。
- 会使用 `if-else` 判断角色是否存活。
- 完成了完整的史蒂夫属性面板与伤害计算器。

### 功能验收

- 输入 `8` 和 `3`，得到实际伤害 `5`、剩余生命值 `15`。
- 输入 `3` 和 `8`，得到实际伤害 `0`、剩余生命值 `20`。
- 输入 `25` 和 `0`，得到剩余生命值 `0`，显示角色倒下。
- 输入 `8.5` 和 `2`，得到实际伤害 `6.5`、剩余生命值 `13.5`。
- 输入负数时，程序给出提示并提前结束。
- 修改人物名称后，重新运行能看到对应变化。

### Git 与学习记录

- 创建了 `.gitignore`。
- 创建了 `CHANGELOG.md`，记录真实完成情况。
- 初始化了当前项目的本地 Git 仓库。
- 提交了源代码和必要的学习记录。
- 没有提交 `.idea`、`out` 或 `.class` 等本地配置和构建产物。
- 能在 IDEA 中查看第一次 Git 提交。
- 保留了至少一张真实运行截图。

完成以上必做任务，就达到本周的基本要求。

## 十三、选做：让属性面板更完整

如果还有时间，可以从下面两项中任选一项。

它们都只需要使用本周学过的变量、运算和 `if-else`。

### 选做一：根据剩余生命值输出额外提示

在最终程序中找到：

```java
if (remainingHealth == 0) {
    System.out.println(name + "倒下了");
} else {
    System.out.println(name + "仍然存活");
}
```

在这段代码的后面增加一个判断：

当剩余生命值大于 `10` 时，输出：

```text
状态良好
```

当剩余生命值大于 `0`、但不超过 `10` 时，输出：

```text
生命垂危
```

当剩余生命值为 `0` 时，不再输出这两项额外状态。

可以尝试通过嵌套 `if` 或分别使用多个条件完成，不需要学习新的数据结构。

### 选做二：增加一个人物属性

尝试增加：

```java
int level = 1;
```

并让属性面板显示：

```text
等级：1
```

然后把等级改成其他整数，重新运行并观察输出。

这里的等级只是用于练习变量，不参与本周的伤害公式。

不要为了增加等级而提前设计完整的经验值或升级系统。

## 十四、下周做什么

这一周，我们完成了一个能接收输入、计算数值并进行条件判断的 Java 控制台程序。

但目前的程序只处理一次攻击，执行结束后就退出。

如果想让程序处理更多重复操作，就需要进一步学习怎样让代码重复执行。

第 2 周，我们会接触：

- 循环。
- 数组。
- `List` 和 `Map` 集合。

然后制作一个控制台九格快捷栏背包，让程序能够添加、堆叠和检索物品。

现在不需要提前编写背包，也不用安装 Minecraft 模组加载器。

先保留好这一周的 `SteveDamageCalculator` 项目、Git 提交和运行截图。

后续任务安排可以随时查看 [Minecraft 模组开发学习路线](./index.md)。

::: details 本篇验证记录（2026 年 11 月 12 日）
在 Windows 上使用 Oracle JDK 25.0.5.0.3，从本文提取代码，以 `javac -encoding UTF-8` 编译并运行，已检查：

- Hello World、属性面板、固定伤害版和最终输入版四份完整程序。
- 四组基本测试的实际伤害、剩余生命值与存活状态。
- 两处负数输入提前结束，以及改名后名称和状态输出同步变化。
- 系统默认地区切换为德国时，`Locale.US` 仍能按英文句点读取 `8.5`。
- 中文和 `8,5` 输入会触发文中说明的 `InputMismatchException`，本版未增加完整输入校验。
- 在独立临时 Git 仓库中验证忽略规则、作者配置与首次本地提交，仅跟踪源代码、`.gitignore` 和周志，无远程仓库。

**上述结果是命令行编译、运行和 Git 验证，不等于已经逐项操作 IDEA 界面。** IDEA 下载 JDK、创建项目、Run 控制台交互及 Git 图形界面的说明已对照 JetBrains 官方文档；具体安装版本的按钮位置、中文菜单与编码显示仍需按实际界面检查。未进行 macOS 或 Linux 实测。
:::

## 官方参考资料

本教程的 JDK 25 与 IntelliJ IDEA 可用性、项目创建方式及 Git 图形界面操作，参考以下官方资料。资料核对日期：2026 年 11 月 12 日。

- [JetBrains：Java 25 LTS and IntelliJ IDEA](https://blog.jetbrains.com/idea/2025/09/java-25-lts-and-intellij-idea/)
- [IntelliJ IDEA：创建第一个 Java 应用](https://www.jetbrains.com/help/idea/creating-and-running-your-first-java-application.html)
- [IntelliJ IDEA：创建新项目](https://www.jetbrains.com/help/idea/new-project-wizard.html)
- [IntelliJ IDEA：统一发行版与免费功能](https://www.jetbrains.com/help/idea/intellij-idea-single-distribution.html)
- [IntelliJ IDEA：配置项目 JDK](https://www.jetbrains.com/help/idea/sdk.html)
- [IntelliJ IDEA：设置 Git 仓库](https://www.jetbrains.com/help/idea/set-up-a-git-repository.html)
- [IntelliJ IDEA：提交代码变更](https://www.jetbrains.com/help/idea/commit-and-push-changes.html)
- [Java 25：Scanner API](https://docs.oracle.com/en/java/javase/25/docs/api/java.base/java/util/Scanner.html)
- [Dev.java：Java 官方学习资料](https://dev.java/)
- [Git 官方教程：首次配置 Git](https://git-scm.com/book/en/v2/Getting-Started-First-Time-Git-Setup)
