#### 1. Install the Plugin

- First, install [VS Code](https://code.visualstudio.com/) as it's required. Codai is a plugin for the VS Code editor.

- Installing the Codai plugin:
  - Install from VS Code extensions marketplace:
    - Open the VS Code extensions marketplace, search for "codai-top", then click "Install"
    
      <p>
        <image src="./1.png" width="60%"></image>
      </p>
    
  - Or manually install from [Github](https://github.com/codai-agent/codai/releases) Releases:
    - Download the codai-top-xxxx.vsix file
    - Open VS Code extensions marketplace, click the "..." menu in top right, select "Install from VSIX..."
    - Select the downloaded codai-top-xxxx.vsix file
    
      <p>
        <image src="./2.png" width="60%"></image>
      </p>

#### 2. Configure the Chat Model

- When first opening Codai, you need to configure the AI model before accessing the main interface. Click "Use your own API key" to enter configuration. See [**AI Model Server Configuration Guide**](https://github.com/codai-agent/codai/blob/main/docs/guide/config-en.md) for details.

  <p>
    <image src="./3.png" width="60%"></image>
  </p>

- In the plugin's main interface, click the settings button (top right) to configure model server connection:
  - Select model provider, enter corresponding API key, and choose model
  - For "OpenAI Compatible", you also need to enter server URL and manually input model ID
  
    <p>
      <image src="./4.png" width="60%"></image>
    </p>

#### 3. Configure Code AutoComplete Model

- In the plugin's main interface, click settings button (top right)
- Under "Autocomplete Settings":
  - Currently only supports OpenAI compatible protocol
  - Need to manually enter base URL, API key and model ID (see [AI Model Server Configuration Guide](./config.md))

  <p>
    <image src="./5.png" width="60%"></image>
  </p>

#### 4. Set Plugin Language

- In plugin's main interface, click settings button (top right)
- Under "Language Settings", select from 12 supported languages

  <p>
    <image src="./6.png" width="60%"></image>
  </p>

#### 5. Set Plugin Display Position

- Default shows in VS Code left sidebar
- Click "Open in Editor" in Codai interface to open in editor area
- Right-click Codai icon and select "Move to" → "Secondary side bar" to move to right sidebar (requires VS Code restart)

  <p>
    <image src="./7.png" width="60%"></image>
  </p>

#### 6. Start Chat Coding

- Two modes: **Plan Mode** (discussing problems/solutions with AI) and **Act Mode** (executing code writing/modifications)
- Before coding, open a folder in VS Code via "File" → "Open" as working directory
- In Act Mode, enter prompt like: "Please use HTML5 to create a Tetris game. Requirements: Beautiful UI, complete functionality, single-player." Press enter to generate and save code.

  <p>
    <image src="./8.png" width="60%"></image>
  </p>

#### 7. Start Code AutoComplete

- In settings, enable "Autocomplete Settings" → "Enable Autocomplete"
- At code location, press enter once to activate, then it will follow cursor
- Gray text shows suggestions - press Tab to accept or ignore

  <p>
    <image src="./9.png" width="60%"></image>
  </p>

#### 8. Edit Features

- Select code and right-click → "Add to Codai", or select terminal output → right-click → "Add to Codai"
- Selected code appears in chat - you can add requests like "Please optimize this code with these requirements..."

  <p>
    <image src="./10.png" width="60%"></image>
  </p>

- For code errors (wavy underline), use Quick Fix → "Fix to Codai" or "Add to Codai"

  <p>
    <image src="./12.png" width="60%"></image>
  </p>

#### 9. Using Codai with Other Editors

- If using IDEA, Android Studio, Visual Studio, Xcode etc:
  1) Open your workspace in your usual editor
  2) Open same workspace in VS Code
  3) Use Codai in VS Code for AI programming while using your preferred editor to compile/run
  4) Paste any issues back to Codai for fixes

#### 10. Set Auto-Approval

- Codai uses Agent mechanism requiring approval for file operations/commands
- Enable auto-approval for operations like "Read files", "Write files", "Execute commands" etc
- Recommended to enable "Read files" auto-approval

  <p>
    <image src="./13.png" width="60%"></image>
  </p>

#### 11. Configure Ignore Files and Rule Files

- Create ".codaiignore" in workspace to specify ignored files
- Click "Manage Codai Rules" button (bottom menu) to manage:
  - Global rule files
  - Local project rule files
  - Create new rule files (e.g. flutter.md) with your coding rules

  <p>
    <image src="./14.png" width="60%"></image>
  </p>

#### 12. Using MCP

- Click "MCP Servers" (top menu) to access MCP interface:
  - Left: Marketplace (MCP services)
  - Middle: Configure remote MCP
  - Right: Configure local MCP
- After installing MCP service, edit JSON config file via "Configure MCP Servers"
- Disable unused MCP services to save tokens

<p>
  <image src="./15.png" width="60%"></image>
</p>
