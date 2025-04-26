<div align="center"><sub> <a href="https://github.com/codai-agent/codai/blob/main/README.md" target="_blank">English</a> | <a href="https://github.com/codai-agent/codai/blob/main/README-zh.md" target="_blank">简体中文</a>
</sub></div>


<p align="center">
  <img src="../../assets/icons/web-codai-logo.png" width="100%" />
</p>


大家好，Codai（口袋）是一款AI编程的工具，这个名字取自Coding 和 AI 这两个单词。“口袋”，它既可以容纳万物，也可以提供一切帮助！

## Codai的主要功能

1. **Cline3.12版本的全部功能**  ，包括代码编写与编辑、命令行的操作、MCP的使用、AI模型的配置等
2. **添加界面的国际化，多语言的支持**：English、简体中文、日本語、Русский、Français、العربية、한국어、繁體中文、Deutsch、Italiano、Bahasa Melayu、Español  
3. **添加了自动代码补全的功能**，需要自己去配置模型，最好配置带有coder优化的模型，这样效果才出众  
4. **为了减少Token的消耗和减少大模型的上下文长度的消耗**  ，做了系统描述词的优化策略

## 开始使用

- 你可以直接在VScode 商店里搜索codai插件并安装使用（请稍等，正在实现中）

- 直接从release中下载跟你电脑操作系统和芯片匹配的插件，然后在VScode里面安装使用

- 使用中需要注意的事项：

  - 如果你明确知道你不需要使用MCP服务，请将所有安装的MCP服务关闭掉。  

  - 如果你只是想跟大模型进行交流，并不需要工具帮你读写代码文件，请切换到Plan模式进行。  

  - 跟原工程比较：  
    - 目前在Plan模式下，且关闭掉MCP服务，上行Tokens量将减少1/3。  
    - 如果只关闭MCP服务，在ACT模式下，也能节约1/5的Tokens量。


### 模型配置

- **代码编写的模型**，建议使用Claude系列模型，或者Deepsee-v3的模型，都测试过，有非常棒的效果，当前其它在Code测试中评分较高的也是可以的，但是需要注意模型一定要支持 tool use(当然cline中的Tool use并不是openai或者其他模型厂商定义的function calling协议)。  
- **代码补全的模型**，一定要配置带有coder优化的模型，比如qwen2.5-coder-3B，参数不需要很大，需要考虑到速度因素。

## Codai的愿景

**我是一名程序员**，最初我希望AI能真正帮助我们这个群体，减轻我们的劳动，当然这只是我2024年初刚接触AI编程时候的想法，非常的狭隘，但是非常实在。  

**然而**，现在我觉得AI编程不再仅仅属于程序员这个群体，它应该是每一个人的工具，每一个人都应该使用AI工具，用它来处理生活中、工作中的问题，比如需要写一个脚本来进行数据分析，需要抓取一些自己感兴趣的新闻，需要开发一款属于自己的APP等。

**AI编程已经来到了AI编程+的时代**，AI编程可以+任何人，+任何行业，+任何需求，+任何产品，我非常坚信那种大体量的有固定流程的软件都会慢慢消失，取而代之的是让AI编程来实时的去解决每一个不同的需求，或者叫定制化的需求。  

**每一位成年人都需要掌握如何使用AI编程来服务自己**，就跟驾驶汽车一样！  

**我还觉得这个工具应该及时普及给每一位小孩子**，让他们从小就了解AI工具，了解AI编程的效果，让他们聪明的脑袋迸发出各种神奇的想法能够快速得以实现，非常有利于帮助他们提高动手能力，增强自信，也能开发他们的逻辑思维能力。这是一个AI已经到来的时代，一定要打开眼界，积极去拥抱影响我们未来的技能。你可以想象一下，10年后，AI工具变成了主要的价值创造者，而我们的孩子们就是这些AI工具的拥有者或者是领导者，妙哉！  

**我也会持续去分享我自己的小孩（今年10岁）是如何去使用Codai工具的**，自己动手去实现自己的想法的。

## Codai的后续方向

1. **增加codebase indexing**,引入本地向量数据库。这样做的目的是：可以实现本地代码的检索，增强Codai处理跨文件的能力，也能更加准确的联系上下文写业务逻辑。  
2. **借助MCP来实现Agent的定制化**，让Codai从AI编程工具变成一款AI工具，不仅仅是编程。  
3. **打通Codai跟n8n和comfyui的连接通道**，让Codai变成无所不能的一个AI终端工具。  
4. 还有很多想法，等我验证之后会一一加上。

## 建立自己的大模型服务器来服务Codai

这不是必须的，你可以直接使用第三方的大模型服务器提供的服务，比如openrouter、openai、anthropic或者Deepseek.com等。

### 方案一：个人电脑

你可以安装Ollama或者lmstudio这些推理工具来提供推理服务，比如安装qwen2.5-coder:32B，勉强能用，量化后的性能还是有很大损失的。 
Codai直接去访问大模型推理服务器。

### 方案二：专业GPU服务器

你可以采用vllm或者sglang来实现推理，中间网关层可以使用oneAPI或者oneHub来进行大模型服务的控制。  
Codai去访问网关获取服务。

## 贡献

要为项目做出贡献，请遵守[开源公约](https://www.contributor-covenant.org/)。

<details>
<summary>本地开发说明</summary>

1. 克隆仓库 ：
        ```bash
        git clone https://github.com/cline/cline.git
        ```
2. 在 VSCode 中打开项目：
        ```bash
        code cline
        ```
3. 安装扩展和 webview-gui 的必要依赖：
        ```bash
        npm run install:all
        ```
4. 按 `F5`（或 `运行`->`开始调试`）启动以打开一个加载了扩展的新 VSCode 窗口。（如果你在构建项目时遇到问题，可能需要安装 [esbuild problem matchers 扩展](https://marketplace.visualstudio.com/items?itemName=connor4312.esbuild-problem-matchers)）

</details>

## 感谢

非常感谢[Cline](https://github.com/cline/cline)工程，AI编程工具中它是第一个使用Agent智能体来解决编程问题的，无论是理念还是技术都非常非常厉害！Codai是从Cline工程fork而来的。  
也非常感谢[Continue](https://github.com/continuedev/continue)工程，它的代码补全功能是所有开源的AI编程项目里面最出色，没有之一！Codai中的代码补全是从Continue继承来的。

## 许可证

[Apache 2.0 © 2025 CodAI](./LICENSE)