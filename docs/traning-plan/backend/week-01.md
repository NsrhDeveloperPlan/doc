---
title: "第 1 周：启动你的第一个后端服务"
description: "从零建立 blog-api 项目，使用 Go + Gin、Python + FastAPI 或 Java + Spring Boot 启动本地 HTTP 服务，完成健康检查、接口调试与首次 Git 提交。"
outline: [2, 3]
---

# 第 1 周：启动你的第一个后端服务

这一周，我们要让自己写的后端程序真正跑起来。

你可能已经用 Go、Python 或 Java 写过一些小程序：输入数据，执行代码，然后在终端看到结果。但后端服务有点不一样——它通常需要一直运行，等待浏览器或其他程序来请求数据。

我们先不做复杂的功能，只写一个能够回答“你还在正常运行吗？”的小接口。

**注意：下面三个技术栈任选一个即可。你只需要阅读并完成自己选择的分支，不必安装三套环境，也不需要把三个版本都写一遍。**

先阅读下方的公共环境检查，再跳到你选择的技术栈；完成分支后继续公共验证与 Git 提交：

- [Go + Gin](#go-gin)
- [Python + FastAPI](#python-fastapi)
- [Java + Spring Boot](#java-spring-boot)

如果你还没确定方向，可以先阅读 [后端开发学习路线](./index.md)。本教程默认你已经完成所选语言的基础准备，会写简单的函数、条件判断和集合操作。

## 一、本周目标与必要概念

### 1.1 我们到底要做什么

这半年，后端方向只维护一个核心项目：

**Blog API（博客后端接口服务）**。

以后我们会在这个项目里逐步添加文章读取、文章管理、数据库和身份验证等功能。

但第 1 周先把基础打好。

本周完成后，你应该拥有：

1. 一个独立的 `blog-api` 项目文件夹。
2. 一个能够在自己电脑上启动的 HTTP 服务。
3. 一个 `GET /health` 接口。
4. 一次使用浏览器和 Apifox 进行的实际请求验证。
5. 一份简短的 `CHANGELOG.md` 周志。
6. 一次通过 VS Code 完成的本地 Git 提交。

三个技术栈最终要实现完全相同的健康检查接口：

**请求地址：**

```text
http://127.0.0.1:8080/health
```

**请求方法：**

```http
GET
```

**预期 HTTP 状态码：**

```text
200 OK
```

**预期 JSON 响应：**

```json
{
  "status": "ok"
}
```

这里的 `status` 表示状态，`ok` 表示正常。

我们暂时不需要它检查数据库、网络或其他服务。只要程序正常运行，并且能够处理这个请求，就算完成了本周最重要的任务。

### 1.2 后端程序为什么要一直运行

先想象一个场景。

你打开浏览器，输入一个网址，浏览器向对应的服务器发送请求。服务器收到请求后，执行程序，再把结果返回给浏览器。

我们这周写的程序就是这个流程中的服务器。

不过，它目前不运行在云服务器上，而是运行在你自己的电脑上。

整个过程可以理解为：

```text
浏览器或 Apifox
      |
      | 发送 GET /health
      v
本机后端服务（127.0.0.1:8080）
      |
      | 执行 health 对应的处理代码
      v
返回 HTTP 200 和 JSON
      |
      v
浏览器或 Apifox 显示结果
```

**和普通命令行程序不同，后端服务启动后通常不会立刻退出。**

它会持续监听请求，所以启动成功后，终端可能一直停留在运行日志那里。

这不是卡住了。

只要服务还在运行，我们就可以反复请求它。如果你关闭了服务进程，浏览器自然也就无法继续请求它。

后面我们会亲自验证这一点。

### 1.3 先认识请求地址

拆开看看本周统一使用的地址：

```text
http://127.0.0.1:8080/health
```

| 部分 | 含义 |
| --- | --- |
| `http://` | 使用 HTTP 协议进行通信 |
| `127.0.0.1` | 回环地址，表示当前这台电脑 |
| `8080` | 端口号，用来区分本机上不同的网络服务 |
| `/health` | 请求路径，告诉服务我们想访问哪个接口 |

这里最容易搞混的是 IP 地址和端口。

**`127.0.0.1` 是自己的电脑，不是别人的服务器。**

例如，我们可以在同一台电脑上运行不同的服务：

```text
127.0.0.1:8080
127.0.0.1:3000
127.0.0.1:5000
```

它们使用同一个本机地址，但通过不同端口来区分。

同一个地址和端口的组合，通常不能同时被两个普通 HTTP 服务占用。

所以本周只启动你选择的那个技术栈，不要把三个服务一起启动在 `8080` 端口上。

另外，`127.0.0.1` 和 `0.0.0.0` 不能随意替换。本教程会让服务只监听本机回环地址，不要求其他电脑访问，也不需要把练习服务暴露到公网。

### 1.4 GET、HTTP 状态码和 JSON

第一次接触后端接口时，先弄懂三个东西就够了。

**第一，GET 是请求方法。**

HTTP 请求有不同的方法。`GET` 通常用于获取资源或数据。

本周的接口：

```http
GET /health
```

意思就是：向后端请求当前服务的健康状态。

我们还不需要提交文章，也不需要修改或删除数据，因此暂时只使用 GET。

**第二，HTTP 状态码表示请求的处理结果。**

这周重点认识两个：

| 状态码 | 含义 | 本周什么时候会遇到 |
| --- | --- | --- |
| `200 OK` | 请求被成功处理 | 正确访问 `/health` |
| `404 Not Found` | 服务器没有找到对应资源或路径 | 访问不存在的 `/not-found` |

注意，404 不代表服务器没启动。

相反，如果你收到了服务器返回的 HTTP 404，通常说明请求已经到达某个 HTTP 服务，只是没有找到对应的资源。

如果服务根本没有运行，常见表现是连接失败，而不是 HTTP 404。

**第三，JSON 是一种数据格式。**

后端经常需要返回结构化数据，JSON 就是最常见的格式之一。

例如：

```json
{
  "status": "ok"
}
```

这里的 `status` 是字段名，`ok` 是对应的字符串值。

JSON 还有其他数据类型，但这周只需要认识这个最简单的对象。

你可能发现，浏览器有时会把 JSON 显示成一行：

```json
{"status":"ok"}
```

这没有问题。JSON 中不影响含义的空格和缩进可以不同，我们关注的是字段和值是否正确。

## 二、公共环境检查

### 2.1 准备工具

正式动手前，确认电脑上已经具备以下工具：

| 工具 | 本周用途 |
| --- | --- |
| VS Code | 编辑代码、打开终端、完成 Git 提交 |
| Git | 记录项目版本 |
| Apifox | 发送 HTTP 请求并检查响应 |
| 所选语言环境 | 运行 Go、Python 或 Java 程序 |

其中，Java 分支可以使用 IntelliJ IDEA 编写和运行代码，但本周 Git 提交仍会以 VS Code 的图形界面为例。

软件官方下载入口可以查看 [软件资源](../software-resources.md)。

这周不用提前安装数据库、Redis、Docker 或其他后面才会用到的工具。

### 2.2 认识 VS Code 终端

打开 VS Code。

在顶部菜单中找到：

**终端 → 新建终端（Terminal → New Terminal）**

编辑器下方会出现一个可以输入命令的区域。

这就是终端。

终端可以用来执行程序、下载依赖、启动服务，而不只是显示报错。

你可能看到类似这样的内容：

```powershell
PS D:\study>
```

或者：

```bash
~/study $
```

具体显示取决于操作系统、终端类型和你所在的文件夹。

这里有个必须注意的概念：**当前工作目录**。

例如，当前终端位于：

```text
D:\study
```

执行：

```powershell
mkdir blog-api
```

就会在这个目录下创建：

```text
D:\study\blog-api
```

接着执行：

```powershell
cd blog-api
```

终端就进入了这个新文件夹。

你可以执行：

```powershell
pwd
```

查看当前所在目录。这个命令适用于 PowerShell 和常见的 Bash 终端。

后面每次执行命令，都要留意自己是否位于正确的项目目录。

如果你在错误的文件夹执行依赖安装、项目初始化或启动命令，就很容易遇到文件找不到等问题。

<u>当然创建文件也有更朴素的**右键新建一个**，本文档提供的是通过命令行创建文件。</u>

### 2.3 检查 Git

在 VS Code 终端中执行：

```bash
git --version
```

如果 Git 已经安装且可以正常使用，你会看到类似：

```text
git version x.y.z
```

这里的 `x.y.z` 代表实际安装的版本号，不要求和别人完全相同。

如果出现“找不到命令”一类错误，先确认是否已经安装 Git。

如果刚安装完，尝试关闭 VS Code，重新打开，再执行一次。

**本周使用 Git 不需要登录 GitHub。**

Git 是本地版本管理工具，GitHub 则是托管 Git 仓库的平台。即使没有 GitHub 账号，你也可以在自己的电脑上完成提交。

### 2.4 确定项目位置

这周要建立的是一个独立的后端练习项目。

不要把它创建到 VitePress 文档站的 `docs` 文件夹里，也不要修改培训网站的源代码。

例如，你可以在自己的学习目录下创建：

```text
study/
└── blog-api/
```

以后所有后端练习都继续在这个 `blog-api` 项目上迭代。

上面的 `mkdir`、`cd` 例子用于解释终端操作，实际创建项目按下面所选分支执行一次即可。如果已经创建了 `blog-api`，直接打开或进入它，不要反复创建同名子文件夹。

确定位置后，进入下面对应的技术栈分支。

---

## 三、Go + Gin 操作分支 {#go-gin}

如果你选择的是 Go，就完成这一节。Python 和 Java 分支可以直接跳过。

本分支使用 **Gin v1.11.0**。该版本的 `go.mod` 声明最低 Go 版本为 **1.23.0**，因此需要使用满足要求的 Go 工具链；不必为了教程专门降级到旧版本。

### 3.1 检查 Go 环境

打开 VS Code 终端：

```bash
go version
```

如果正确安装，会显示本机 Go 的实际版本和平台，例如包含：

```text
go version go1.xx.x ...
```

确认版本满足上面的最低要求。

如果命令不存在，检查 Go 是否安装、环境变量是否生效，以及终端是否在安装后重新打开。

### 3.2 创建项目文件夹

先进入你准备存放练习项目的目录，然后执行：

```bash
mkdir blog-api
```

进入项目：

```bash
cd blog-api
```

检查当前位置：

```bash
pwd
```

接下来，建议使用 VS Code 的“文件 → 打开文件夹”，直接打开刚创建的 `blog-api`。

之后的新建文件和终端命令，都以这个文件夹为起点。

### 3.3 初始化 Go module

在 `blog-api` 根目录执行：

```bash
go mod init example.com/blog-api
```

这条命令的作用是初始化 Go module。

module 可以简单理解为 Go 项目的依赖管理单位。

`example.com/blog-api` 是本地练习使用的示例模块路径，不代表我们真的注册了这个域名，也不需要现在发布代码。

执行后，项目里会出现：

```text
blog-api/
└── go.mod
```

打开 `go.mod` 看看。

里面会包含模块名称以及当前工具链写入的 Go 版本声明。

它不是普通的说明文档，而是 Go 用来管理项目模块信息和依赖版本的重要文件。

### 3.4 编写第一个接口

在 `blog-api` 根目录新建文件：

`main.go`

完整代码：

```go
package main

import (
	"log"
	"net/http"

	"github.com/gin-gonic/gin"
)

func main() {
	router := gin.New()

	router.GET("/health", func(c *gin.Context) {
		c.JSON(http.StatusOK, gin.H{
			"status": "ok",
		})
	})

	if err := router.Run("127.0.0.1:8080"); err != nil {
		log.Fatal(err)
	}
}
```

先别急着运行，我们看一下关键的几行。

```go
router := gin.New()
```

创建一个 Gin 路由引擎。

你可以把它理解为负责接收请求、查找对应处理函数的对象。

接着：

```go
router.GET("/health", func(c *gin.Context) {
```

表示注册一个路由：

当收到 `GET /health` 请求时，执行后面的函数。

函数里：

```go
c.JSON(http.StatusOK, gin.H{
	"status": "ok",
})
```

负责返回 JSON。

其中 `http.StatusOK` 对应 HTTP 200，`gin.H` 可以用来构造 JSON 对象的数据。

最后：

```go
router.Run("127.0.0.1:8080")
```

负责启动 HTTP 服务。

我们明确指定了回环地址和端口，避免使用框架的默认监听范围。

这里还处理了 `Run` 返回的错误。如果端口被占用等原因导致启动失败，程序会输出错误并退出，而不是假装运行成功。

本周只需要直接注册 `/health`。路由分组、中间件和请求体校验会随着后续功能逐步学习。

### 3.5 安装指定版本的 Gin

代码已经写好了，但项目还没有安装 Gin 依赖。

在 `blog-api` 根目录执行：

```bash
go get github.com/gin-gonic/gin@v1.11.0
```

这里的 `@v1.11.0` 指定了明确版本。

不要把版本号省略成不确定的最新版本。这样做能让同一届同学尽量使用一致的框架版本。

`go get` 会解析和获取所需的模块依赖，并更新项目的依赖记录。

随后执行：

```bash
go mod tidy
```

它会根据当前源码实际使用的包，整理 `go.mod`，补齐或清理相关依赖记录。

执行结束后，项目一般会包含：

```text
blog-api/
├── go.mod
├── go.sum
└── main.go
```

这里认识两个文件：

- `go.mod`：记录模块名称、Go 版本要求以及依赖模块和版本。
- `go.sum`：记录依赖模块的校验信息，用于验证下载内容的一致性。

**这两个文件都应该保留，并提交到 Git。**

它们不是下载缓存，不要因为 `go.sum` 内容比较长就删掉。

第一次获取 Gin 时可能需要下载多个依赖，耗时取决于网络环境。

### 3.6 启动 Go 服务

仍然在 `blog-api` 根目录执行：

```bash
go run .
```

这里的 `.` 表示当前目录。

Go 会根据当前项目的代码和依赖进行编译，然后运行程序。

注意区分前面的几个命令：

| 命令 | 作用 |
| --- | --- |
| `go mod init` | 初始化项目模块 |
| `go get` | 添加并获取指定版本的依赖 |
| `go mod tidy` | 整理模块依赖记录 |
| `go run .` | 编译并运行当前项目 |

它们不是一条神秘的启动命令，每一步都有自己的作用。

当终端没有显示启动失败，且服务仍在运行时，就可以继续访问接口。

Gin 可能会打印路由和监听信息，但具体日志格式会随版本及运行设置变化，不需要逐字对照。

**判断成功与否，最终以实际发出的 HTTP 请求为准。**

打开浏览器，访问：

```text
http://127.0.0.1:8080/health
```

正常情况下应返回：

```json
{"status":"ok"}
```

如果返回了这个结果，说明你的第一个 Go 后端接口已经可以响应请求了。

### 3.7 修改代码后怎样生效

本教程使用的 `go run .` 没有自动热重载功能。

如果修改了 `main.go`：

1. 保存文件。
2. 回到正在运行服务的终端。
3. 按 `Ctrl + C` 停止服务。
4. 再次执行 `go run .`。
5. 重新请求接口，观察结果。

只保存文件，并不代表正在运行的 Go 程序已经自动替换成新代码。

完成后，继续阅读后面的[公共验证部分](#common-verification)。

---

## 四、Python + FastAPI 操作分支 {#python-fastapi}

如果你选择的是 Python，就完成这一节。

本分支使用：

- Python 3.12
- FastAPI 0.123.10
- Uvicorn 0.38.0

这两个框架相关版本均已发布，PyPI 列出的 Python 支持范围包含 Python 3.12。

FastAPI 负责定义接口，Uvicorn 负责运行 ASGI 应用并提供 HTTP 服务。

### 4.1 检查 Python 环境

在 VS Code 终端中执行：

```bash
python --version
```

Windows 用户也可以检查：

```powershell
py --version
```

以及：

```powershell
py -3.12 --version
```

这里需要说明一下。

Windows 上可能同时出现 `python`、`py` 等不同入口。

`python` 通常直接调用当前环境中找到的 Python，而 `py` 在配备相应 Python 启动器或安装管理器的 Windows 环境中，可以按版本选择解释器。

不同安装方式不一定提供相同的命令。

如果你使用 `python` 可以正常运行 Python 3.12，就不必强求使用 `py`。

如果输入 `python` 后打开的是应用商店，或者报告找不到 Python，需要检查安装情况及命令路径，不能直接认为 Python 已经可用。

macOS 或 Linux 上也可能使用：

```bash
python3 --version
```

本教程要求先确认实际使用的是 Python 3.12，再继续建立虚拟环境。

### 4.2 创建项目文件夹

在准备好的学习目录中执行：

```bash
mkdir blog-api
cd blog-api
```

用 VS Code 打开这个 `blog-api` 文件夹。

后面的所有命令，除非特别说明，都在项目根目录执行。

### 4.3 创建虚拟环境

Python 项目有一个常见问题：

假设你同时写两个项目，项目 A 需要某个库的一个版本，项目 B 又需要另一个版本。

如果把依赖全部装在同一个全局 Python 环境里，就可能互相影响。

因此我们为 `blog-api` 创建独立虚拟环境。

在 Windows PowerShell 中，如果已经确认 `py -3.12` 可用，执行：

```powershell
py -3.12 -m venv .venv
```

如果你的 `python` 命令已经指向 Python 3.12，也可以使用：

```powershell
python -m venv .venv
```

二选一即可，不需要重复创建。

macOS 或 Linux 用户可以在确认命令存在后执行：

```bash
python3.12 -m venv .venv
```

完成后会出现一个新目录：

```text
blog-api/
└── .venv/
```

`.venv` 就是当前项目的独立 Python 环境。

它会包含自己的 Python 可执行文件和用于安装依赖的位置。

**注意：`.venv` 不应该提交到 Git。**

我们以后会用依赖清单重新安装需要的库，而不是把整个虚拟环境复制给别人。

### 4.4 不激活虚拟环境，直接使用它

网上有些教程会先让你执行虚拟环境激活脚本。

但 Windows PowerShell 可能因为执行策略限制而拒绝运行脚本。

对于本周练习，我们不需要为此修改系统执行策略。

直接使用虚拟环境内部的 Python 即可。

Windows PowerShell：

```powershell
.\.venv\Scripts\python.exe --version
```

macOS / Linux：

```bash
./.venv/bin/python --version
```

这两条命令分别适用于不同系统，只需执行自己的那一条。

如果显示 Python 3.12 的版本信息，就说明虚拟环境的解释器可以使用。

后面安装依赖、启动服务，都使用这个明确路径。

这样可以避免“依赖明明安装了，运行时却说找不到”的一类问题。

### 4.5 创建依赖清单

在项目根目录新建：

`requirements.txt`

写入：

```text
fastapi==0.123.10
uvicorn==0.38.0
```

这里的 `==` 表示指定确切版本。

`requirements.txt` 是 Python 项目中常见的依赖记录文件。

别人拿到你的源码后，可以根据它重新安装项目需要的主要依赖，而不用猜测当初用了什么框架版本。

这里固定的是直接依赖版本。FastAPI 和 Uvicorn 使用的间接依赖仍由安装工具解析，因此它并不等同于锁定所有依赖及其文件校验值的完整锁文件。

本周先掌握明确版本与依赖清单的基本用法。

### 4.6 安装 FastAPI 与 Uvicorn

Windows PowerShell：

```powershell
.\.venv\Scripts\python.exe -m pip install -r requirements.txt
```

macOS / Linux：

```bash
./.venv/bin/python -m pip install -r requirements.txt
```

解释一下：

- `python.exe` 或 `python`：使用虚拟环境的解释器。
- `-m pip`：通过当前解释器调用 pip。
- `install`：安装依赖。
- `-r requirements.txt`：从指定文件读取依赖列表。

这样安装的依赖会进入当前虚拟环境，而不是有意安装到系统全局环境。

首次安装可能需要一些时间。

安装结束后，可以检查依赖信息。

Windows：

```powershell
.\.venv\Scripts\python.exe -m pip show fastapi uvicorn
```

macOS / Linux：

```bash
./.venv/bin/python -m pip show fastapi uvicorn
```

观察输出的 `Version` 字段是否符合依赖文件中的版本要求。

### 4.7 编写第一个接口

在项目根目录新建：

`main.py`

完整代码：

```python
from fastapi import FastAPI

app = FastAPI()


@app.get("/health")
def health():
    return {"status": "ok"}
```

这几行代码就足够完成本周的接口。

先看：

```python
app = FastAPI()
```

它创建了一个 FastAPI 应用对象。

接着：

```python
@app.get("/health")
```

表示把下面的函数注册为 `GET /health` 的处理函数。

当客户端请求这个路径时，FastAPI 就会调用 `health()`。

最后：

```python
return {"status": "ok"}
```

返回一个 Python 字典。

FastAPI 会把它转换成 JSON 响应。

这里不需要自己手动拼接 JSON 字符串，也不需要返回一段 HTML。

### 4.8 启动 Python 服务

Windows PowerShell：

```powershell
.\.venv\Scripts\python.exe -m uvicorn main:app --host 127.0.0.1 --port 8080
```

macOS / Linux：

```bash
./.venv/bin/python -m uvicorn main:app --host 127.0.0.1 --port 8080
```

这条命令看起来比较长，但每部分都能解释。

| 部分 | 作用 |
| --- | --- |
| `-m uvicorn` | 使用当前 Python 运行 Uvicorn |
| `main:app` | 从 `main.py` 模块中寻找名为 `app` 的应用对象 |
| `--host 127.0.0.1` | 只监听本机回环地址 |
| `--port 8080` | 使用 8080 端口 |

尤其注意：

```text
main:app
```

冒号左边的 `main` 是模块名，对应当前目录里的 `main.py`。

冒号右边的 `app` 则是代码中创建的：

```python
app = FastAPI()
```

所以如果文件名或应用变量名写错，Uvicorn 就可能找不到应用。

本周先使用手动重启的方式，便于观察服务进程的启动与停止。熟悉流程后，可以在同一条命令末尾加上可选的 `--reload`，在本地开发时检测代码变化并重新加载；它不是生产环境部署配置。

启动过程中，终端应显示服务正在运行的信息。

然后在浏览器中访问：

```text
http://127.0.0.1:8080/health
```

预期返回：

```json
{"status":"ok"}
```

### 4.9 修改代码后怎样生效

按本教程的基础启动命令运行时，保存 `main.py` 后不会自动更新正在运行的服务。请按 `Ctrl + C` 停止程序，再执行同一条启动命令，然后重新请求 `/health`。

如果你主动加上了可选的 `--reload`，可以观察终端是否完成重新加载；若没有生效或进程异常退出，仍可退回手动重启来验证。本周不要求完成自动热重载配置，也不需要为此修改 PowerShell 执行策略。

完成后，继续阅读后面的[公共验证部分](#common-verification)。

---

## 五、Java + Spring Boot 操作分支 {#java-spring-boot}

如果你选择的是 Java，就完成这一节。

Java 分支会比前两个分支多一些文件，因为 Spring Boot 会帮我们生成项目结构和构建配置。

不用担心，这周不需要理解整个 Spring 框架。

我们只做一件事：**让 Spring Boot 接收 GET 请求并返回 JSON。**

本分支采用：

- JDK 21
- Spring Boot 4.0.9
- Maven
- Spring Web（Spring MVC）

Spring Boot 4.0.9 的官方系统要求支持 Java 17 及以上的相应兼容版本，JDK 21 位于其兼容范围内。

我们选择这组明确版本，不让大家随意选择 Spring Initializr 页面上的最新版、预览版或候选发布版。

### 5.1 检查 JDK

打开终端，执行：

```bash
java -version
```

再执行：

```bash
javac -version
```

前者查看 Java 运行环境，后者查看 Java 编译器。

需要确认：

1. 两条命令都可以正常执行。
2. 使用的是 JDK 21。
3. 没有出现一个命令使用 JDK 21、另一个命令指向其他版本的情况。

如果版本不一致，先检查 JDK 安装位置和环境变量。

本周不需要为了使用 Maven Wrapper 单独安装全局 Maven。

### 5.2 使用 Spring Initializr 创建项目

打开：

[Spring Initializr](https://start.spring.io/)

这是 Spring 官方提供的项目初始化工具。

它可以根据你的选择生成一个基本工程，省去从零编写 Maven 配置和项目目录的工作。

按照以下配置填写：

| 配置项 | 本周选择 |
| --- | --- |
| Project | Maven |
| Language | Java |
| Spring Boot | 4.0.9 |
| Group | `com.example` |
| Artifact | `blog-api` |
| Name | `blog-api` |
| Package name | `com.example.blogapi` |
| Packaging | Jar |
| Java | 21 |

在 Dependencies 中添加：

```text
Spring Web
```

不同版本的 Spring Initializr 可能使用略有差异的显示名称，例如 Spring Web MVC，关键是选择基于 Spring MVC 的 Web 功能，不选择 WebFlux。

对于 Spring Boot 4.0，官方 Web 文档使用的基础依赖为：

```text
spring-boot-starter-webmvc
```

生成后可以在 `pom.xml` 中确认这一点。

不需要添加数据库、Security、Redis 或其他依赖。

确认配置后，使用页面中的 **Generate（生成项目）** 功能，下载项目 ZIP 文件。

如果页面没有提供指定的 Spring Boot 4.0.9，不要随意选一个版本继续并认为它与教程完全一致。请先记录实际可选版本，交给工程协作者核对项目生成结果。

### 5.3 解压并打开项目

假设你的学习目录是：

```text
D:\study
```

把下载的 ZIP 解压到这里。

最后应当得到一个独立的：

```text
D:\study\blog-api
```

注意不要意外变成：

```text
D:\study\blog-api\blog-api
```

如果多套了一层目录，先找到真正包含 `pom.xml` 和 `mvnw.cmd` 的文件夹。

**那个文件夹才是 Spring Boot 项目的根目录。**

用 VS Code 或 IntelliJ IDEA 打开它。

如果使用 VS Code，后面的 Maven 命令也可以直接在 VS Code 集成终端执行。

### 5.4 认识生成的项目结构

按照上面的配置，主要目录结构应该类似：

```text
blog-api/
├── .mvn/
│   └── wrapper/
│       └── ...
├── src/
│   ├── main/
│   │   ├── java/
│   │   │   └── com/
│   │   │       └── example/
│   │   │           └── blogapi/
│   │   │               └── BlogApiApplication.java
│   │   └── resources/
│   │       └── application.properties
│   └── test/
│       └── ...
├── .gitignore
├── mvnw
├── mvnw.cmd
└── pom.xml
```

其中：

- `pom.xml`：Maven 的项目配置和依赖记录文件。
- `src/main/java`：存放 Java 主程序代码。
- `src/main/resources`：存放应用配置和其他资源。
- `src/test`：通常用于存放测试代码。
- `mvnw`、`mvnw.cmd`：Maven Wrapper 启动脚本。
- `.mvn/wrapper`：Wrapper 使用的相关配置和文件。

不同生成器版本可能还会附带其他文件，实际以生成结果为准。

先找到：

`src/main/java/com/example/blogapi/BlogApiApplication.java`

这就是程序入口。

Spring Initializr 已经帮我们创建了启动类。

它的核心结构应当类似：

```java
package com.example.blogapi;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class BlogApiApplication {

    public static void main(String[] args) {
        SpringApplication.run(BlogApiApplication.class, args);
    }
}
```

如果生成器已经创建了这份启动类，就直接保留，不需要重复创建第二份。

`main()` 是 Java 程序入口，`SpringApplication.run()` 负责启动 Spring Boot 应用。

### 5.5 创建 HealthController

接下来我们创建一个 Controller。

Controller 可以理解为专门接收和处理 HTTP 请求的类。

在：

```text
src/main/java/com/example/blogapi/
```

下面新建文件夹：

```text
controller
```

然后新建：

`src/main/java/com/example/blogapi/controller/HealthController.java`

完整代码：

```java
package com.example.blogapi.controller;

import java.util.Map;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class HealthController {

    @GetMapping("/health")
    public Map<String, String> health() {
        return Map.of("status", "ok");
    }
}
```

这里需要弄懂三个地方。

**第一，包名。**

```java
package com.example.blogapi.controller;
```

它与我们创建的目录对应：

```text
com/example/blogapi/controller/
```

Java 的包名和项目目录应当保持一致。

**第二，`@RestController`。**

```java
@RestController
```

它告诉 Spring：这个类负责处理 Web 请求，并把方法返回的数据写入 HTTP 响应。

**第三，`@GetMapping`。**

```java
@GetMapping("/health")
```

它表示：

收到 `GET /health` 请求时，调用下面的 `health()` 方法。

方法返回：

```java
Map.of("status", "ok")
```

这是一个 Java Map。

在当前 Spring Web 项目具备相应 JSON 转换依赖的情况下，框架会把这个 Map 转成 JSON 响应。

我们不需要自己手动拼接字符串形式的 JSON。

### 5.6 为什么 Controller 要放在这个位置

现在项目里有两个重要的 Java 文件：

```text
com/example/blogapi/
├── BlogApiApplication.java
└── controller/
    └── HealthController.java
```

注意它们的包名：

启动类：

```java
package com.example.blogapi;
```

Controller：

```java
package com.example.blogapi.controller;
```

`controller` 是 `com.example.blogapi` 的子包。

Spring Boot 的 `@SpringBootApplication` 会启用组件扫描，通常从启动类所在包开始，寻找其中及其子包中的组件。

因此 Spring 可以找到我们写的 `HealthController`。

如果你把 Controller 随意放到：

```text
com.other.controller
```

而没有额外配置扫描范围，它就可能不会被扫描到。

表现通常是：

程序可以启动，但访问 `/health` 返回 404。

所以初学阶段先保持这样的目录关系，不用急着研究复杂的包扫描配置。

### 5.7 配置监听地址和端口

Spring Boot 的默认配置不一定符合我们本周统一的监听要求。

在：

`src/main/resources/application.properties`

写入或修改为：

```properties
server.address=127.0.0.1
server.port=8080
```

如果文件中已有其他配置，保留必要内容，确保这两项没有互相冲突的重复定义。

`server.address` 指定服务监听的网络地址。

`server.port` 指定服务监听的端口。

这里必须明确写成 `127.0.0.1`，不能仅仅因为浏览器可以通过 `localhost` 访问，就认为服务器只监听本机。

完成后保存文件。

### 5.8 使用 Maven Wrapper 启动

Spring Initializr 通常会生成 Maven Wrapper。

它的作用是让项目可以根据 Wrapper 配置使用对应的 Maven 版本，而不是要求每位同学先手动配置全局 Maven。

确认项目根目录包含：

```text
mvnw
mvnw.cmd
```

以及相应的 `.mvn/wrapper` 文件。

然后打开终端，确保当前目录就是包含 `pom.xml` 的 `blog-api` 根目录。

Windows PowerShell 执行：

```powershell
.\mvnw.cmd spring-boot:run
```

macOS / Linux：

```bash
./mvnw spring-boot:run
```

macOS / Linux 上还需要确保 `mvnw` 文件具有执行权限。若提示没有执行权限，可在本项目目录运行 `chmod +x mvnw`，再重试；不要对整个磁盘或其他目录批量修改权限。

第一次运行时，Wrapper 可能需要下载 Maven，Maven 还需要获取 Spring Boot 项目的依赖。

因此第一次启动通常会比后续启动慢。

启动过程中会打印多行日志，包括框架初始化和内嵌 Web 服务器相关信息。

当程序完成启动、没有异常退出时，就可以尝试访问接口。

最终仍以实际请求结果作为成功标准。

打开浏览器：

```text
http://127.0.0.1:8080/health
```

预期返回：

```json
{"status":"ok"}
```

### 5.9 IntelliJ IDEA 的启动方式

如果你使用 IntelliJ IDEA，也可以在 IDE 中运行 Spring Boot 应用。

先打开 `blog-api` 项目，确认 IDE 使用的是 JDK 21，并等待 Maven 项目导入完成。

找到：

```text
BlogApiApplication.java
```

这个文件包含 `main()` 方法。

可以通过 IDE 提供的运行功能启动它。

**IDE 的运行按钮和 Maven Wrapper 命令是同一个项目的两种启动方式，不需要两种都做。**

不要在 Maven 已经占用 8080 端口时，又从 IDEA 启动第二个相同服务。

否则可能出现端口占用错误。

### 5.10 修改代码后怎样生效

本周没有添加 Spring Boot DevTools 等自动重启工具。

因此修改 Controller 后：

1. 保存代码。
2. 在运行终端按 `Ctrl + C` 停止程序。
3. 使用原来的 Maven Wrapper 命令重新启动。
4. 等待服务完成启动。
5. 再次请求 `/health`。

如果使用 IDEA 运行，则通过 IDEA 停止并重新运行该应用。

不要把保存 Java 文件理解成服务已经自动重新编译并更新。

另外，Maven 构建时可能产生 `target/` 目录。它属于生成的构建产物，不应该提交到 Git。

完成后，继续阅读公共验证部分。

---

## 六、公共验证：确认服务真的能工作 {#common-verification}

到这里，你应该已经使用 Go、Python 或 Java 中的一种技术栈启动了服务。

接下来所有人执行同一套验证流程。

先确保自己的服务仍在运行，并且不要关闭运行服务的那个终端。

### 6.1 用浏览器访问

打开浏览器地址栏，输入：

```text
http://127.0.0.1:8080/health
```

按回车。

预期看到的内容是：

```json
{"status":"ok"}
```

这说明浏览器发出的 GET 请求得到了预期 JSON 数据。

浏览器地址栏非常适合本周这种简单的 GET 验证。

但它不能替代所有接口调试操作。

以后需要发送不同 HTTP 方法、自定义请求头、请求体或身份凭证时，专门的接口调试工具会更方便。

因此我们还要使用 Apifox 做一次正式验证。

### 6.2 使用 Apifox 创建请求

打开 Apifox。

不同版本的界面布局和按钮名称可能略有区别，你只需要找到创建或新建 HTTP 请求的功能。

按照下面的顺序操作：

**第一步：创建一个 HTTP 请求。**

如果需要先创建项目，可以创建一个用于个人练习的项目，例如：

```text
Blog API
```

然后在项目里新建接口请求。

**第二步：设置请求方法。**

选择：

```http
GET
```

**第三步：填写完整请求地址。**

```text
http://127.0.0.1:8080/health
```

先不要自行添加 `/api/v1` 等路径前缀。

**第四步：确认请求内容。**

本次接口请求不需要：

- 请求体（Body）。
- Token。
- 用户名和密码。
- 登录操作。
- 自定义业务请求头。

这里“不需要登录”指我们写的 Blog API 没有登录要求，并不是承诺 Apifox 软件的所有功能都无需账号。若客户端自身提示登录，请区分工具账号与接口认证，不要往这个 `/health` 请求里添加账号密码。

**第五步：发送请求。**

找到负责执行或发送当前 HTTP 请求的功能，通常会显示为“发送”或“Send”。

发送后，查看响应区域。

如果使用网页版 Apifox，需确认当前请求通过能够访问本机服务的本地执行方式或客户端代理发送；不能假设云端请求环境可以直接访问你电脑上的 `127.0.0.1`。

### 6.3 检查 HTTP 200 和 JSON

这次请求必须同时满足：

**状态码：**

```http
200 OK
```

**响应类型：**

```text
application/json
```

响应头中的 Content-Type 可能还带有字符集等附加信息，关键是确认响应属于 JSON 类型。

**响应正文：**

```json
{
  "status": "ok"
}
```

请注意：

HTTP 200 和 JSON 内容正确，是两项独立的检查。

例如，假设某个接口返回：

```json
{
  "status": "error"
}
```

即使 HTTP 状态码仍然是 200，也不符合我们本周的接口约定。

反过来，如果响应内容看起来正确，但实际状态码不是 200，同样不能算通过验收。

### 6.4 验证不存在的路径

现在把 Apifox 中的请求地址改成：

```text
http://127.0.0.1:8080/not-found
```

请求方法仍然是：

```http
GET
```

发送请求。

这一次，我们期待看到：

```http
404 Not Found
```

原因很简单。

我们在示例代码里只手动注册了：

```text
/health
```

没有注册：

```text
/not-found
```

因此服务器应当告诉客户端：请求的路径不存在。

**不要要求三个框架的 404 响应正文完全相同。**

Gin、FastAPI 和 Spring Boot 默认的错误响应格式可能不同。

本次只检查 HTTP 状态码是否为 404，不需要自己设计统一错误 JSON。

如果你得到了 404，说明服务器仍然能够处理请求，只是没有找到对应路径。

这属于符合预期的验证结果。

### 6.5 停止服务，再请求一次

现在做一个很重要的小实验。

回到正在运行后端服务的终端。

按：

```text
Ctrl + C
```

停止进程。

如果使用 IDEA，就通过 IDE 的停止功能结束应用。

确认服务确实退出后，再回到 Apifox，请求：

```text
http://127.0.0.1:8080/health
```

这一次，预期请求无法成功连接到刚才的服务。

Apifox 可能显示连接拒绝、无法连接等错误，具体文案取决于客户端和系统环境。

它不应该是刚才那个服务正常返回的 HTTP 200。

如果仍能成功请求，先检查是否有另一个进程仍然监听 8080 端口。

然后重新执行你所选分支的启动命令：

| 技术栈 | 重新启动 |
| --- | --- |
| Go | `go run .` |
| Python | 使用前面对应系统的虚拟环境 Python + Uvicorn 启动命令 |
| Java | Windows 使用 `.\mvnw.cmd spring-boot:run`，macOS / Linux 使用 `./mvnw spring-boot:run` |

服务恢复运行后，再次请求 `/health`。

预期又能得到 HTTP 200 和正确的 JSON。

至此，你应该能区分三种常见情况：

| 情况 | 表现 | 通常应该检查什么 |
| --- | --- | --- |
| 连接不上服务 | 连接拒绝或连接失败，没有有效 HTTP 响应 | 进程、监听地址、端口 |
| HTTP 404 | 服务器返回 404 | 请求路径、路由是否注册 |
| HTTP 200 但内容错误 | 成功收到响应，但 JSON 不符合约定 | 处理函数、保存与重启情况 |

这三个问题以后会反复遇到。现在能分清楚，就已经解决了不少入门阶段的困惑。

## 七、常见问题与排查

遇到问题不要急着重新安装所有软件。

先看报错到底发生在哪一步：执行命令、下载依赖、启动服务，还是发送请求？

### 7.1 提示命令找不到

例如：

```text
go: command not found
```

或者系统提示无法识别 `git`、`python`、`java` 等命令。

先检查：

1. 对应软件是否真的安装完成。
2. 安装后有没有重新打开终端或 VS Code。
3. 当前系统是否能找到对应的可执行文件。
4. 是否选择了正确版本的语言环境。

尤其是 Java，需要分别检查 `java` 和 `javac`。

不要一看到命令找不到，就直接修改系统安全设置。

### 7.2 明明有文件，却说找不到

例如：

```text
go.mod file not found
```

或：

```text
Could not find or load main class
```

或：

```text
Could not import module "main"
```

先查看当前工作目录。

执行：

```bash
pwd
```

再查看当前目录的文件。

PowerShell 或 Bash 通常可以使用：

```bash
ls
```

确认是否真的位于 `blog-api` 根目录。

本教程的 Go 和 Python 启动命令，都要求在包含入口文件的项目根目录执行。

Java 的 Maven Wrapper 命令则要求在包含 `pom.xml`、`mvnw.cmd` 的目录执行。

尤其注意不要在 `blog-api` 的父目录，或者某个 `src` 子目录中误执行命令。

### 7.3 8080 端口已经被占用

常见错误可能包含：

```text
address already in use
```

或者：

```text
Port 8080 was already in use
```

这表示目标监听地址和端口无法被当前程序正常占用。

最常见的原因之一，是你之前已经启动过相同服务，但忘记停止。

先检查之前打开的 VS Code、PowerShell、终端窗口或 IDEA 运行窗口。

如果发现自己上一次启动的程序仍在运行，先正常停止它。

Windows 上可以使用：

```powershell
netstat -ano | findstr :8080
```

查看与 8080 端口相关的网络连接和进程 ID。

macOS / Linux 可以使用：

```bash
lsof -nP -iTCP:8080 -sTCP:LISTEN
```

重点是识别监听该端口的进程，而不是随意结束进程。

**不要因为看到某个 PID 就直接强制关闭它。**

如果你无法确认该进程是不是自己启动的程序，先保留现场并记录信息，再寻求帮助。

本周为了统一接口地址，仍然以 8080 端口作为验收要求。

### 7.4 启动后终端立即退出

正常的 HTTP 服务应当持续运行，等待请求。

如果启动命令刚执行完，程序就退出了，优先查看退出前的错误信息。

可能原因包括：

- 程序存在编译或语法错误。
- 依赖没有正确安装。
- 端口被占用。
- Python 没有找到对应应用。
- Java 项目启动时出现异常。

不要只看错误的最后一行。

对于 Java，尤其要查看异常堆栈里最早出现的关键错误原因。

如果启动进程已经退出，就不能假定服务仍然正常运行。

### 7.5 浏览器访问失败

先完整检查地址：

```text
http://127.0.0.1:8080/health
```

常见错误包括：

```text
https://127.0.0.1:8080/health
http://127.0.0.1:8000/health
http://127.0.0.1:8080/helath
```

这三个地址分别可能存在协议、端口和路径问题。

本周没有配置 HTTPS，请使用：

```text
http://
```

不要误写成：

```text
https://
```

如果地址确认正确，再检查服务进程是否还在运行。

### 7.6 依赖下载很慢或失败

Go、Python 和 Java 都需要从对应的依赖仓库下载文件。

第一次运行时，下载较慢并不一定代表程序代码有问题。

可以依次检查：

1. 网络连接是否正常。
2. 终端是否仍在下载，还是已经显示错误并退出。
3. 错误是超时、名称解析失败，还是依赖版本不存在。
4. 重试后是否仍然在相同位置失败。

不要一开始就全局替换软件源、关闭防火墙或修改系统安全策略。

先保留完整错误信息，确认具体原因。

如果涉及学校网络或网络代理限制，可向学长或工程协作者提供脱敏后的报错信息，由他们协助定位。

### 7.7 Python 依赖已经安装，但还是无法导入

如果出现：

```text
ModuleNotFoundError
```

尤其是与 FastAPI 或 Uvicorn 有关的错误，重点检查解释器。

你可能把依赖安装进了一个 Python 环境，却用另一个 Python 环境启动程序。

因此本教程始终使用：

Windows：

```powershell
.\.venv\Scripts\python.exe
```

macOS / Linux：

```bash
./.venv/bin/python
```

如果 VS Code 编辑器仍提示无法导入模块，也要检查它选择的 Python 解释器是否为项目中的 `.venv`。

编辑器的解释器选择和终端启动命令需要分别确认。

### 7.8 Java 服务启动了，但 /health 返回 404

如果端口正确、服务正常运行，却只有 `/health` 返回 404，可以重点检查：

1. Controller 文件是否真的保存。
2. `@RestController` 是否存在。
3. `@GetMapping("/health")` 是否正确。
4. `HealthController.java` 的 `package` 声明是否与目录一致。
5. Controller 是否位于启动类所在包的子包中。
6. 修改代码后是否重新启动过服务。

不要急着添加复杂的包扫描配置。

对于本周的最小项目，按照前面的目录结构就足够了。

### 7.9 卡住超过 30 分钟怎么办

如果已经认真排查了半小时，仍然没有解决问题，就先记录：

- 当前使用的技术栈和版本。
- 执行的具体命令。
- 当前工作目录。
- 完整的关键报错。
- 已经尝试过的解决方法。

然后再向学长、同学或 AI 助手求助。

只发一句“运行不了”通常很难定位问题。

涉及截图和日志时，记得检查是否包含用户名、个人路径、密码、Token 或其他不需要公开的信息。

## 八、写好本周 CHANGELOG

服务跑通后，先不要急着结束。

我们还要留下第一次项目迭代记录。

### 8.1 为什么要写 CHANGELOG

`CHANGELOG.md` 可以理解为项目的更新记录。

这半年我们不会每周重新创建一个项目，而是一直在同一个 `blog-api` 上增加功能。

因此最好从第 1 周就养成记录更新的习惯。

以后回头看，你可以清楚地知道每一周新增了什么、修改了什么。

本周不需要写长篇总结。

### 8.2 创建 CHANGELOG.md

在 `blog-api` 项目根目录新建：

`CHANGELOG.md`

示例内容：

```markdown
# 更新日志

## v0.1 - 2026-11-12

- 创建 blog-api 项目，完成基础环境配置。
- 实现 GET /health，返回 HTTP 200 和 JSON。
- 使用浏览器与 Apifox 验证接口，确认不存在的路径返回 404。
- 准备将本次代码与周志一起进行首次 Git 本地提交。
```

这里的日期只是示例。**请改成自己实际完成本周任务的日期。**

如果某个步骤还没有完成，也不要提前写成已经完成。

这份日志只记录真实做过的事情。

## 九、使用 VS Code 完成首次 Git 提交

现在我们要把本周的成果正式记录到 Git 中。

Git 可以记录项目文件在不同时间点的变化。

本周的提交相当于保存一个明确的版本：

**v0.1：最小健康检查服务。**

### 9.1 打开正确的项目文件夹

在 VS Code 中选择：

**文件 → 打开文件夹**

打开你自己的：

```text
blog-api
```

注意，不要打开培训文档站，也不要不小心打开它的上级目录。

这一步非常重要，因为 Git 仓库会在当前选中的文件夹中初始化。

你应该只管理自己这个后端练习项目。

### 9.2 初始化本地 Git 仓库

在 VS Code 左侧找到：

**源代码管理（Source Control）**

也可以使用快捷键：

```text
Ctrl + Shift + G
```

找到“初始化存储库”（Initialize Repository）功能。

点击后，VS Code 会在当前项目目录中初始化 Git 仓库。

本质上相当于执行：

```bash
git init
```

项目里会出现一个用于保存 Git 版本信息的隐藏目录 `.git`。

这一步只是在本地初始化。

**不需要登录 GitHub，也不会自动把代码上传到互联网。**

### 9.3 配置 Git 提交作者

每个 Git 提交都会记录作者信息。

如果你还没配置，可以打开 VS Code 集成终端。

确保已经完成上一步的仓库初始化，并且终端当前位于 `blog-api` 项目根目录。

执行：

```bash
git config user.name "你的姓名或昵称"
```

再执行：

```bash
git config user.email "你的邮箱"
```

把示例内容替换为你自己希望记录的作者信息。

这里使用的是当前仓库级别的配置。

也就是说，这些信息主要用于当前 `blog-api` 仓库，不需要为了完成本周任务修改所有 Git 项目的全局作者信息。

可以通过：

```bash
git config user.name
git config user.email
```

检查配置结果。

要记住：

**Git 作者姓名和邮箱不是 GitHub 登录账号，也不是登录密码。**

它们只是写入提交历史的作者标识。

如果将来公开仓库，提交作者信息可能随 Git 历史一起公开，因此请使用你愿意记录在项目中的邮箱。

### 9.4 检查哪些文件应该提交

回到 VS Code 左侧的源代码管理面板。

你应该能看到项目中新建或修改过的文件。

但不是所有文件都应该提交。

不同技术栈需要保留的文件不一样。

**Go 分支：**

通常需要提交：

```text
main.go
go.mod
go.sum
CHANGELOG.md
```

如果你创建了 `.gitignore`，也要提交。

Go 的依赖下载缓存通常不在项目文件夹内，不需要复制进仓库。

如果以后生成了可执行文件，也不应该把编译产物作为本周源码提交。

**Python 分支：**

通常需要提交：

```text
main.py
requirements.txt
.gitignore
CHANGELOG.md
```

不提交：

```text
.venv/
__pycache__/
*.pyc
```

在项目根目录新建：

`.gitignore`

内容：

```text
.venv/
__pycache__/
*.py[cod]
.env
*.log
```

`.gitignore` 用来告诉 Git 哪些文件或目录不需要跟踪。

这里最重要的是 `.venv/`。

不要为了“方便别人运行”，把整个虚拟环境加入仓库。

别人应该使用项目的依赖清单，在自己的电脑上创建虚拟环境并安装依赖。

**Java 分支：**

通常需要提交：

```text
pom.xml
mvnw
mvnw.cmd
.mvn/wrapper/
src/main/
src/test/          （如果生成器创建了测试代码）
.gitattributes     （如果生成器创建了此文件）
.gitignore
CHANGELOG.md
```

还应当保留生成项目中实际需要的 Wrapper 文件，包括可执行脚本和相应的配置或 JAR 文件（如果存在）。

不要提交：

```text
target/
```

Spring Initializr 通常会生成 `.gitignore`，先检查它是否包含：

```text
target/
```

如果没有，就补上。

如果项目中出现 `.env`、本地日志或含有密码的私人配置文件，也要确保它们没有进入提交范围。

本周的 `application.properties` 只包含监听地址、端口等公开配置，可以作为项目配置一起提交。

**无论使用哪个技术栈，都不要提交密码、密钥、Token 等秘密信息。**

本周根本不需要创建这些凭证。

### 9.5 逐项暂存文件

在 VS Code 源代码管理面板中，找到文件变更列表。

对于需要提交的文件，使用对应的“暂存更改”（Stage Changes）功能。

界面中通常会以 `+` 图标表示。

你可以逐个选择文件，检查后再暂存。

这里先认识两个概念：

- **暂存（Stage）**：选择哪些文件变化要进入下一次提交。
- **提交（Commit）**：将暂存的变化记录进 Git 历史。

暂存不是提交。

保存代码文件也不是提交。

建议第一次先逐项检查，确认无误后再暂存，不要直接把所有文件无差别加入。

如果发现某个文件不应该提交，可以使用“取消暂存”（Unstage）功能，把它从暂存区移走。

取消暂存通常不会删除你的工作文件。

但“放弃更改”（Discard Changes）可能会丢弃修改，不要把这两个功能混淆。

### 9.6 输入提交说明

确认需要提交的文件都已经暂存后，在源代码管理面板的提交说明输入框中填写：

```text
feat: initialize blog api health endpoint
```

这条说明的意思是：创建 Blog API 的健康检查接口。

不一定非要使用英文。你也可以写：

```text
完成 v0.1 最小健康检查服务
```

只要能够清楚说明本次提交做了什么即可。

然后使用普通的：

**提交（Commit）**

功能。

注意，这里只要求本地提交。

不要选择“提交并推送”“同步更改”或“发布到 GitHub”来代替普通提交。

它们涉及远程仓库操作，不属于本周任务。

### 9.7 查看第一次提交记录

提交完成后，在 VS Code 源代码管理界面中查看提交历史。

可以使用 Source Control Graph（源代码管理图表）等历史查看功能。

检查刚才输入的提交说明是否出现。

也可以在项目根目录的终端执行：

```bash
git log --oneline -1
```

正常情况下，会显示最近一次提交的简短哈希值和说明。

例如格式可能类似：

```text
a1b2c3d feat: initialize blog api health endpoint
```

这里的哈希值只是示意，实际结果由 Git 生成。

能够找到本次提交，才说明第一次本地提交已经完成。

如果出现 GPG 签名相关提示，先检查当前 Git 配置，不需要为了本周练习主动配置 GPG 签名。

本周不要求 Fork、PR、远程推送或 GitHub 仓库。

想了解更详细的图形操作，也可以参考同一培训站中的：

[VS Code 本地初始化与提交流程](../frontend/week-01.md#vscode-first-commit)

这里只是复用 Git 操作方法，不需要去完成前端博客的练习内容。

## 十、自主练习：给健康检查增加一个字段

前面的基本任务完成后，你已经拥有：

```json
{
  "status": "ok"
}
```

现在做一个很小的修改，看看自己是否真的理解了接口代码。

**练习要求：**

在原来的响应中增加一个 `service` 字段，用来表示当前服务的名称。

修改后的预期结果：

```json
{
  "status": "ok",
  "service": "blog-api"
}
```

这个修改不需要任何新知识。

### 10.1 Go 分支提示

找到：

`main.go`

修改 `c.JSON()` 中的数据：

```go
gin.H{
	"status":  "ok",
	"service": "blog-api",
}
```

保存后，停止旧服务，重新运行：

```bash
go run .
```

再用 Apifox 请求 `/health`。

### 10.2 Python 分支提示

找到：

`main.py`

修改返回值：

```python
return {
    "status": "ok",
    "service": "blog-api",
}
```

按基础命令运行时，保存后停止服务，再用同一条命令启动。如果自行启用了 `--reload`，则观察重新加载是否完成。

再重新发送请求。

### 10.3 Java 分支提示

找到：

`HealthController.java`

修改返回值：

```java
return Map.of(
    "status", "ok",
    "service", "blog-api"
);
```

保存后重新启动服务。

再使用 Apifox 请求。

### 10.4 怎么判断练习完成

预期 HTTP 状态码仍然是：

```http
200 OK
```

JSON 中应该同时包含：

```json
{
  "status": "ok",
  "service": "blog-api"
}
```

两个字段的显示顺序可以不同。

注意，本周的**基本验收标准**仍然是最初只包含 `status` 字段的响应。

这个新增 `service` 字段的任务属于基本验收之后的自主练习，不要把两套响应要求混在一起。

如果你已经完成了 v0.1 的首次 Git 提交，可以把这次自主修改单独作为第二次本地提交记录，也可以先保留修改结果等待检查。

## 十一、本周完成清单

最后根据实际操作情况检查。

### 基本必做

- [ ] 只选择了 Go、Python 或 Java 中的一个技术栈。
- [ ] 创建了独立的 `blog-api` 项目，未修改培训文档站。
- [ ] 确认所选语言环境可以正常使用。
- [ ] 完成了对应框架的依赖安装或项目生成。
- [ ] 能正确启动本机 HTTP 服务。
- [ ] 服务监听地址为 `127.0.0.1`，端口为 `8080`。
- [ ] 浏览器访问 `/health` 能看到 JSON。
- [ ] Apifox 请求 `/health` 返回 HTTP 200。
- [ ] 原始响应 JSON 包含且只包含 `"status": "ok"`。
- [ ] Apifox 请求 `/not-found` 返回 HTTP 404。
- [ ] 停止服务后请求失败，重新启动后请求恢复成功。
- [ ] 创建了 `CHANGELOG.md`，记录本周实际完成的工作。
- [ ] 检查了不应提交的依赖环境、缓存和构建产物。
- [ ] 使用 VS Code 源代码管理完成首次本地 Git 提交。
- [ ] 能在 Git 历史中找到自己的提交记录。

### 自主练习

- [ ] 给 `/health` 增加 `service` 字段。
- [ ] 修改后重新请求，确认状态码仍然是 200。
- [ ] JSON 同时包含 `status` 和 `service`，且值正确。

### 保留实际运行证据

请保存至少一张实际运行截图。

截图中尽量同时包含：

1. 完整请求地址。
2. HTTP 200 状态码。
3. 正确的 JSON 响应正文。

建议使用 Apifox 的请求和响应界面截图，因为它比普通浏览器地址栏更容易同时展示状态码和返回内容。

截图必须来自你自己的真实运行结果，不要使用别人的截图替代。

保存或分享前，检查是否包含个人账号、无关请求信息、私人路径、Token 等敏感信息。

截图可以先保存在自己的学习记录目录中，不要求作为源码文件提交到 Git。

::: details 本篇验证记录（2026 年 11 月 12 日）
本次从正文示例建立了三个独立的临时项目，在 Windows 上实际运行，没有修改文档站为业务服务。验证使用的环境如下：

| 分支 | 实测组合 | 结果 |
| --- | --- | --- |
| Go | Go 1.27.4、Gin 1.11.0 | 健康检查、404、回环监听、停止与重启、新增字段均通过 |
| Python | Python 3.12.10、FastAPI 0.123.10、Uvicorn 0.38.0 | 同上；采用正文的手动重启流程 |
| Java | JDK 21.0.8、Spring Boot 4.0.9、生成项目自带的 Maven Wrapper | 同上；生成器自带的应用测试也通过 |

三份临时练习项目均验证了本地首次 Git 提交及忽略目录，未将虚拟环境、构建产物提交到文档仓库。Go 的最低版本要求来自该版本 Gin 的 `go.mod`，不代表本次也测试了最低版本工具链。

接口结果通过真实本机 HTTP 请求核对；本轮没有逐步点击验证 Apifox、IntelliJ IDEA 和 VS Code 的完整图形操作，也没有验证 macOS / Linux。Python 的可选自动热重载不列为本轮通过项。Java 下载曾遇到本机既有镜像返回 502，实测时仅为该次运行指定官方 Maven 仓库，没有修改全局镜像配置。

这些是教程核验记录，不能替代你自己的练习、截图和完成清单。
:::

## 十二、官方资料与下一周预告

本教程涉及的主要版本和操作，可以通过以下官方资料核对：

- [Go Modules Reference](https://go.dev/ref/mod)：Go module、`go.mod`、`go.sum` 和依赖管理。
- [Gin v1.11.0 依赖声明](https://github.com/gin-gonic/gin/blob/v1.11.0/go.mod)：查看该版本的 Go 最低版本要求。
- [FastAPI 0.123.10](https://pypi.org/project/fastapi/0.123.10/) 与 [Uvicorn 0.38.0](https://pypi.org/project/uvicorn/0.38.0/)：确认版本和 Python 支持范围。
- [Spring Boot 4.0 系统要求](https://docs.spring.io/spring-boot/4.0/system-requirements.html)：确认 JDK 与 Spring Boot 的兼容范围。
- [Spring 官方 REST 服务入门](https://spring.io/guides/gs/rest-service/)：Spring Initializr、Controller 与 JSON 响应。
- [VS Code 官方 Git 入门](https://code.visualstudio.com/docs/sourcecontrol/quickstart)：本地初始化、暂存、提交和查看历史。

遇到工具版本变化时，先核对官方资料与本教程指定版本的差异，不要直接把网上找到的另一套版本配置混进当前工程。

到这里，第 1 周的核心任务就完成了。

现在的 `blog-api` 虽然只有一个健康检查接口，但它已经具备了后端开发最基本的流程：

**编写代码 → 启动服务 → 发送请求 → 检查响应 → 记录版本。**

第 2 周我们会继续在这个项目上添加文章只读接口：

```http
GET /posts
GET /posts/:slug
```

到时候会使用内存中的文章数据，学习路径参数、查询参数和更多 HTTP 状态码。

现在不用提前写这些接口，也不需要准备数据库。

先保证这一周的服务能稳定启动、请求能得到正确结果，并且代码已经完成第一次本地提交。
