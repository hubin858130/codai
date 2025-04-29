<div align="center"><sub> <a href="https://github.com/codai-agent/codai/blob/main/README.md" target="_blank">English</a> | <a href="https://github.com/codai-agent/codai/blob/main/README-zh.md" target="_blank">简体中文</a>
</sub></div>


<p align="center">
  <img src="https://github.com/user-attachments/assets/c683e28a-95d5-4252-93fe-c615f16e3cc5" width="60%" />
</p>
<div align="center">
<table>
<tbody>
<td align="center">
<a href="https://marketplace.visualstudio.com/items?itemName=beandao.codai-top" target="_blank"><strong>Download on VS Marketplace</strong></a>
</td>
</tbody>
</table>
</div>

**Hello!** Codai (/koʊˈdaɪ/) is an AI-powered programming tool. The name is derived from the words "Coding" and "AI." And the pronunciation /koʊˈdaɪ/ translates to “pocket” in Chinese, It can hold anything and everything, and it can also provide all kinds of assistance!

## Key Features of Codai

1. **All functionalities of Cline 3.12**, including code writing and editing, command-line operations, MCP usage, AI model configuration, and more.  
2. **Added internationalization support for the interface, including multiple languages**: English, 简体中文, 日本語, Русский, Français, العربية, 한국어, 繁體中文, Deutsch, Italiano, Bahasa Melayu, Español.  
3. **Added automatic code completion functionality**. You need to configure the model yourself, preferably one optimized for coding, to achieve outstanding results!  
4. **Optimized system prompts to reduce token consumption and minimize context length usage in large models**

## Getting Started

- You can directly search for the Codai-top plugin in the VSCode marketplace and install it .  

- Alternatively, download the plugin from the release section that matches your computer's operating system and chip, then install it in VSCode.  

- Notes for usage:  
  - If you know for sure that you don’t need MCP services, please disable all installed MCP services.  
  - If you only want to interact with the large model and don’t need the tool to read or write code files, switch to Plan mode.  
  - Compared to the original project:  
    - Currently, in Plan mode with MCP services disabled, upstream token usage is reduced by 1/3.  
    - If only MCP services are disabled, token usage in ACT mode can also be reduced by 1/5.  

### Model Configuration

- **For code writing models**, it is recommended to use the Claude series or Deepseek-v3 models. These have been tested and deliver excellent results. Other models with high Code test scores are also acceptable, but ensure the model supports tool use (note that Cline’s Tool use is not the same as OpenAI’s or other vendors' function calling protocols).  
- **For code completion models**, be sure to configure models optimized for coding, such as qwen2.5-coder-3B. The parameters don’t need to be too large, as speed is also a consideration.  

## The Vision of Codai

**I am a programmer**. Initially, I hoped AI could genuinely help our community by reducing our workload. This was my naive thought when I first encountered AI programming in early 2024—narrow-minded but very practical.  

**However**, I now believe AI programming is no longer just for programmers. It should be a tool for everyone. Everyone should use AI tools to solve problems in their daily lives and work, such as writing scripts for data analysis, scraping news of interest, or developing their own apps.  

**AI programming has entered the era of AI Programming+**. AI programming can be applied to anyone, any industry, any need, or any product. I firmly believe that large-scale software with fixed workflows will gradually disappear, replaced by AI programming that can address customized needs in real time.  

**Every adult should learn how to use AI programming to serve themselves**, just like driving a car!  

**I also think this tool should be introduced to every child**. Let them understand AI tools and the power of AI programming from an early age. This will help them quickly bring their brilliant ideas to life, improve their hands-on skills, boost their confidence, and develop their logical thinking. In this era of AI, it’s essential to broaden our horizons and actively embrace the skills that will shape our future. Imagine a world 10 years from now where AI tools are the primary creators of value, and our children are the owners or leaders of these tools. How wonderful!  

**I will continue to share how my own child (now 10 years old) uses Codai** to turn ideas into reality.  

## Future Directions for Codai

1. **Add codebase indexing** and introduce a local vector database. This will enable local code retrieval, enhance Codai’s ability to handle cross-file operations, and improve accuracy in writing business logic with context.  
2. **Leverage MCP to customize Agents**, transforming Codai from an AI programming tool into a versatile AI tool.  
3. **Establish connections between Codai, n8n, and comfyui**, turning Codai into an all-powerful AI terminal tool.  
4. Many more ideas are in the pipeline and will be added after validation.  

## Setting Up Your Own LLM Server for Codai

This is optional. You can directly use third-party large model services like openrouter, OpenAI, Anthropic, or Deepseek.com.  

### Option 1: Personal Computer  

You can install inference tools like Ollama or lmstudio to provide inference services. For example, installing qwen2.5-coder:32B is workable, though quantized performance may suffer.  
Codai can directly access the inference server.  

### Option 2: Professional GPU Server  

You can use vllm or sglang for inference, with a gateway layer like oneAPI or oneHub to control the large model services.  
Codai accesses the gateway to obtain services.  

## Contribution  

To contribute to the project,you need to comply with the [Contributor Covenant]((https://www.contributor-covenant.org/)).  

<details>
<summary>Local Development Instructions</summary>

1. Clone the repository:
        ```bash
        git clone https://github.com/cline/cline.git
        ```
2. Open the project in VSCode:
        ```bash
        code cline
        ```
3. Install the extension and necessary dependencies for webview-gui:
        ```bash
        npm run install:all
        ```
4. Press `F5` (or `Run` -> `Start Debugging`) to launch a new VSCode window with the extension loaded. (If you encounter issues during the build, you may need to install the [esbuild problem matchers extension](https://marketplace.visualstudio.com/items?itemName=connor4312.esbuild-problem-matchers).)

</details>

## Thanks

A huge thanks to the [Cline](https://github.com/cline/cline) project. It is the first AI programming tool to use the Agent to solve programming problems, and its concepts and technology are truly remarkable! Codai is forked from the Cline project.  
We also extend our gratitude to the [Continue](https://github.com/continuedev/continue) project. Its autocompletion feature is the best among all open-source AI programming projects! Codai's autocompletion is inherited from Continue.

## License  

[Apache 2.0 © 2025 CodAI](./LICENSE)
