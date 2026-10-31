---
# 当前页面的标题、搜索描述与右侧目录层级。
title: 软件资源
description: 培训计划中的开发环境准备，汇总常用周边工具、开发软件及官方下载入口。
outline: [2, 4]
---

# 软件资源

## 资源准备（持续更新）

所有的软件资源我都准备了官网，你可以直接点击去下载。但是！推荐去搜索引擎去找（不建议用ai，虽然很方便）

你得知道很多垃圾网站钓鱼网站充斥搜索引擎的结果。所以你如果能够在一众垃圾中找到你想要的官网，那你是✊👊🤜

## 周边工具

### 远程协助

#### UU 远程

[UU 远程官网](https://uuyc.163.com/)

遇到问题时，请尽量准确描述问题，并在需要远程协助时打开 UU 远程，方便我帮你查看。

### 浏览器

请务必使用现代浏览器，请把国产的 `xx安全浏览器` 全部丢到垃圾桶里面，你不想你的工作环境充满了贷款和借钱吧。

#### Google Chrome

`chrome`[Google Chrome](https://www.google.com/intl/zh-CN/chrome/)

#### Microsoft Edge

`edge` [Microsoft Edge](https://explore.microsoft.com/zh-cn/edge/)

#### Firefox

`firefox` [Firefox](https://www.firefox.com/zh-CN/download/all/)

### Markdown 笔记

#### MarkText

免费版 `marktext` [marktext官网](https://marktext.me/)

#### Obsidian

核心功能免费，不影响正常使用 `Obsidian` [Obsidian](https://obsidian.md/)

#### Typora

付费版 `typora`  [Typora官网](https://typora.io/)

    由此衍生出来：需要去稍微了解以下 `markdown` 的语法。一般用他来写笔记/api文档等文本性内容，语法很简单，本文档就是采用markdown的语法格式写的。文本后缀为 `.md` 。同时你会在很多项目中看见 `README.md` 文件，为一个项目的自述文件，用以描述该仓库代码的使用方法，特性，介绍，开发者想说的话等。

    如果你有更好的软件请用你自己的即可。

### 流程图绘制

#### draw.io

`draw.io` [draw官网](https://app.diagrams.net/)

免费的流程图绘制，里面还有各厂商其他的图库可以方便你使用绘制。同时官网打开可以直接在线使用体验。我也推荐你在自己电脑上安装一份来使用。

### 网络访问工具

因为众所周知的原因，你用到的很多网站都是没办法正常使用的。那么这里代表我自己所使用到的。

#### 瓦特工具箱（Steam++）

`steam++`[瓦特工具箱（现名）官网](https://steampp.net/)

如名字，这个可以加速steam商店，和众多其他游戏终端。同时他神奇的提供里 github的加速功能，所以你可以尝试一下，可以解燃眉之急。

#### 其他网络访问工具

`科学工具`

这个类别我不方便放链接，为了防止被掐掉。请自行搜索或者询问我，

这个类别的工具大都只提供客户端能力，也就是你想使用完整的功能需要搭配一串神秘的链接用以启用完整的功能。而这个链接通常需要付费使用。_（要花钱的，并且通常免费的就是最贵的。）__

### 网站与网络检测

#### ITDOG

`itdog` [itdog官网](https://www.itdog.cn/)

该拨测网站用于：服务是否可访问/访问速度/端口是否开放。等作用

## 开发工具

> 这个类别工具特别多，请逐个了解使用。标记为`*`的即你可以自由选用你更擅长的，能够使用并且完成任务即可。

### 版本控制与签名

#### Git

`git` [git官网](https://git-scm.com/)

*那一天神（Linus Torvalds）说需要光，于是花了几天时间写了这个统治程序员开发的软件*

git是一个分布式版本控制软件，用它就可以很方便的保存不同版本的代码，可以让你的代码一次一次一版本一版本的迭代。并且如果出现问题或者bug，可以精确定位你的每一次提交，并且在任意一次代码开发进度上开发新内容，并且把新内容合并进去。同时利用全球做大程序员交流平台 `github` 就可以方便地团队协作组织不同的代码。**git为必须掌握的内容，不要看命令很多，实际上用起来就只有几条会经常用，其他的用到了再查就可以。**

或许你可以试着在你改论文的时候用用它。

#### Gpg4win

`gpgwin4` [gpg4win官网](https://www.gpg4win.org/)

这是一个加密软件，使用 opengpg 标准。你简单理解为：opengpg是一套加密标准，gpgwin4是实现它的面向windows 的软件。你可以使用非对称密钥（通常为rsa）加密信息从而达到交流的效果。~~聪明的小朋友就会问啦，主播主播这个能干吗呢？我也不知道能干嘛~~

那么在这里的用处，你可以将你的公钥上传到github，这样对你的git提交可以用你本地的私钥进行签名，github可以利用公钥验证你的签名，**确认你是你**![gpg加密](/image/github-verified.png "gpg加密")

> 以上两个软件涉及到利用命令行进行配置，请自行搜索b站查阅配置资料

### 编辑器与开发工具

终于来到了开发工具的部分，想必你已经期待已久了吧。不过在此之前，思考一下，现在是ai时代，我们还需要传统ide吗？尽管他们都已经内置了ai开发助手，或者面向ai进行优化。

#### Visual Studio Code（可选）

`vscode`[vscode官网](https://code.visualstudio.com/)

微软家的一力作。不写代码时你可以把它当作一个高级文本编辑器。写代码时，你可以装各种插件来扩展他的功能，你想写什么编程语言都可以。

我通常来拿他写前端三件套：`html` `css` `javascript`

不过另一家优秀的公司`jetbrains`也有竞品ide `webstorm`

#### WebStorm（可选）

`webstorm` [WebStorm: The JavaScript and TypeScript IDE, by JetBrains](https://www.jetbrains.com/webstorm/)

说什么来什么，和上面一样，前端开发ide。同时他是vscode的一个有力的竞品。你选择和是你自己的用即可。

目前他是面向 <u>非商业使用免费</u> 即你可以免费用与你的个人项目。

> 以下提到的所有 `jetbrans` 家的软件，都可以使用咱们的教育邮箱 `xxx@ctbu.edu.cn` 激活教育优惠，有效期一年，到期可续。教育优惠包含：该公司旗下 __所有软件__ 的全功能免费使用。
> 
> 一代人有一代人的免费鸡蛋。
> 
> [JetBrains: 软件开发者和团队的必备工具](https://www.jetbrains.com/zh-cn/)

#### GoLand

`goland` [GoLand by JetBrains: More than just a Go IDE](https://www.jetbrains.com/go/)

同上，jetbrains家的 `go` 语言ide。go开发推荐

#### PyCharm

`pycharm` [PyCharm: The only Python IDE you need](https://www.jetbrains.com/pycharm/)

同上，jetbrains家的 `python` 语言ide，python开发首选

#### Docker Desktop

`docker desktop` [docker windows桌面版官网](https://www.docker.com/)

*我发誓如果你去了解他，你就会爱上他的。当你某天深夜还在配置k8s集群，跑起来的那一刻绝对是无与伦比的*

纵然 container容器技术非常的不错，但是这一领域的代名词docker也凭借其未知原因而导致官网是不能正常用的。学习他，依然很有用，可以减轻你掉头发的速度。

容器顾名思义，会把你的代码和代码需要的运行环境一并打包成一个 `容器镜像` 通过这份镜像，你可以在任何安装了docker软件的电脑上直接运行他们。免去了每台服务器/电脑都需要重新安装一遍软件运行环境的痛苦。~~你也不想你的代码在你的电脑能跑的起来，在其他人的电脑上就跑不起来吧~~

#### Apifox（可选）

`apifox` [Apifox - API 文档、调试、Mock、测试一体化协作平台](https://apifox.com/)

国内厂商做的团队协作api集成测试开发软件，用作规范协议，测试api等功能，作为前后端分离开发的必备api测试软件。

打 `*` 是因为会有人听说过 `postman` 这个显然更权威。但是我英语不好，所以小红帽项目我们主要就用这个了。你自己学习或者做自己的项目，可以选择试试postman或者你发现的其他软件

#### Navicat

`navicat` [navicat官网](https://www.navicat.com.cn/)

这是一个很好用的图形化数据库管理软件。缺点是付费的，至于怎么破解那还是有请万能的b站吧。

### AI 编程与辅助工具

好的接下来我知道你想问什么，ai时代我们也需要有ai的好工具来使用一下。

以下为我自己使用ai工具后的推荐，你有更顺手的工具或者只是因为买了某个厂商的套餐而不的不用它家的产品那看你自己。

#### Codex（可选）

`codex` [ChatGPT](https://chatgpt.com/)

*tibo给我们带来了重置，我们还缺什么呢*

因为特殊原因，你下载他需要使用代理。codex目前作为我的首选推荐agent，值得你在你的项目中使用它。没有钱购买gpt套餐？没关系，下文有介绍替代方案。有钱但是没有渠道购买gpt套餐？没关系咨询群友即可。codex也是一款开源软件。

#### Claude Code（可选）

`claude code` [官网就不放了，你反正也注册不了]

经典不做人的a\公司，从百度出来后开始折磨中国人了。注册官方账号就算了吧，有一万种方法识别你是中国人，封号还不退款🤬🤬。不过他的工具还是很好用的。你值得尝试的命令行agent工具，接入其他家模型即可。下文会有接入方法。

#### OpenCode（可选）

`open code` [OpenCode | 开源 AI 编程代理](https://opencode.ai/zh)

如上，是和 `claude code` 对标的命令行agent工具。他也有自己的订阅套餐，这个你可以去了解一下，如果你感兴趣打算付款也可以咨询一下群友。

他的一大特点是使用开源协议。开源精神永存。

#### DeepSeek Harness（可选）

`deepseek harness` [DeepSeek Harness｜共探智能上限](https://www.deepseek.com/harness/)

*梁圣的恩情还不完✋😭🤚*

谁不想有一只大肥鱼在电脑上吃token呢？试试deepseekharness，他虽然现在不完美，但是会慢慢发展的。而且你可以尽你自己的想象力去开发他的用法，可以试着自己做一个插件。想要什么功能，让🐟去帮你做就可以了。同时他也是开源的，开源精神永存。

#### WorkBuddy（可选）

`work buddy` [workbuddy官网](https://www.workbuddy.cn/)

尽管也是一个sm企业，但是tx的workbuddy还挺好用的，可以让你方便快捷处理日常事务。并且如果你积极去领积分和白嫖活动，一个免费的ai助手就在这里了。

#### CC Switch

`cc switch` [CC Switch](https://ccswitch.io/zh/)

顾名思义，switch 切换。上述提到的：`codex` `claude code` `open code` 工具都存在官方模型和账号都是国外的情况（或者付费有难度或者对面的政策没把人当人）。你可以不使用他们官方提供的模型的情况下依然使用他们的优秀agent工具，你就需要使用ccswitch，你可以在上面配置，把你的api改成deepseek的。这样你的工具依然是那个工具，模型就可以随时切换使用。非常方便。

## 后记

目前写到这里累死我了。以上文本纯手打，如果有误请私信我修改。阿里嘎多。

如果你读到这里你就对要用的工具入门了。至于这些工具怎么下载，怎么安装，怎么配置环境，怎么使用。b站是个万能的地方，你可以在上面找到你所需要的任何东西。

<u>但是你依旧需要有筛选信息的能力，慢慢锻炼，这样就可以在海量垃圾信息中精准找到你所需要的有用的资源</u>

如果你还需要更多资源，更多信息，可以随时和我交流。或者你探索到新资源，也可以与我聊聊看，说不定我们会有共同的新发现！

`by LinFun_`
