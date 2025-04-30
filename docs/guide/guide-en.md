#### 1. Install the Plugin

- First, install [VS Code](https://code.visualstudio.com/) as it's required. Codai is a plugin for the VS Code editor.

- Installing the Codai plugin:
  - Install from VS Code extensions marketplace:
    - Open the VS Code extensions marketplace, search for "codai-top", then click "Install"
    
     <p>
        <image src="https://github.com/user-attachments/assets/64c08343-b2a8-4a16-9294-1cab68518715" width="60%"></image>
      </p>
    
  - Or manually install from [Github](https://github.com/codai-agent/codai/releases) Releases:
    - Download the codai-top-xxxx.vsix file
    - Open VS Code extensions marketplace, click the "..." menu in top right, select "Install from VSIX..."
    - Select the downloaded codai-top-xxxx.vsix file
    
      <p>
        <image src="https://github.com/user-attachments/assets/b752b0af-ec26-4257-b668-4932f3a20a97" width="60%"></image>
      </p>

#### 2. Configure the Chat Model

- When first opening Codai, you need to configure the AI model before accessing the main interface. Click "Use your own API key" to enter configuration. See [**AI Model Server Configuration Guide**](https://github.com/codai-agent/codai/blob/main/docs/guide/config-en.md) for details.

  <p>
    <image src="https://github.com/user-attachments/assets/bf60662f-e2a7-46ff-8754-8aedc09f8ff4" width="60%"></image>
  </p>

- In the plugin's main interface, click the settings button (top right) to configure model server connection:
  - Select model provider, enter corresponding API key, and choose model
  - For "OpenAI Compatible", you also need to enter server URL and manually input model ID
  
    <p>
      <image src="https://github.com/user-attachments/assets/73172d74-2751-4c42-9c0d-96ad8fa0f45c" width="60%"></image>
    </p>

#### 3. Configure Code AutoComplete Model

- In the plugin's main interface, click settings button (top right)
- Under "Autocomplete Settings":
  - Currently only supports OpenAI compatible protocol
  - Need to manually enter base URL, API key and model ID (see [AI Model Server Configuration Guide](https://github.com/codai-agent/codai/blob/main/docs/guide/config.md))

  <p>
    <image src="https://github.com/user-attachments/assets/22740180-5b59-40b6-8062-978b56a366d9" width="60%"></image>
  </p>

#### 4. Set Plugin Language

- In plugin's main interface, click settings button (top right)
- Under "Language Settings", select from 12 supported languages

  <p>
    <image src="https://github.com/user-attachments/assets/1cf26bb8-3b83-4dae-8a83-747842ed368d" width="60%"></image>
  </p>

#### 5. Set Plugin Display Position

- Default shows in VS Code left sidebar
- Click "Open in Editor" in Codai interface to open in editor area
- Right-click Codai icon and select "Move to" → "Secondary side bar" to move to right sidebar (requires VS Code restart)

  <p>
    <image src="https://github.com/user-attachments/assets/1d7b5dcb-ea1d-4175-b522-1d52b3a1770b" width="60%"></image>
  </p>

#### 6. Start Chat Coding

- Two modes: **Plan Mode** (discussing problems/solutions with AI) and **Act Mode** (executing code writing/modifications)
- Before coding, open a folder in VS Code via "File" → "Open" as working directory
- In Act Mode, enter prompt like: "Please use HTML5 to create a Tetris game. Requirements: Beautiful UI, complete functionality, single-player." Press enter to generate and save code.

  <p>
    <image src="https://github.com/user-attachments/assets/3c0a5ea4-e5d0-433d-914f-06942b774bf0" width="60%"></image>
  </p>

#### 7. Start Code AutoComplete

- In settings, enable "Autocomplete Settings" → "Enable Autocomplete"
- At code location, press enter once to activate, then it will follow cursor
- Gray text shows suggestions - press Tab to accept or ignore

  <p>
    <image src="https://github.com/user-attachments/assets/765c8365-1242-4951-9136-da0bc43bfe5b" width="60%"></image>
  </p>

#### 8. Edit Features

- Select code and right-click → "Add to Codai", or select terminal output → right-click → "Add to Codai"
- Selected code appears in chat - you can add requests like "Please optimize this code with these requirements..."

  <p>
    <image src="https://github.com/user-attachments/assets/d80429cc-f8d3-4b3d-a1b7-d66e21b8e828" width="60%"></image>
  </p>

- For code errors (wavy underline), use Quick Fix → "Fix to Codai" or "Add to Codai"

  <p>
    <image src="https://github.com/user-attachments/assets/5aecacce-ffe8-4d96-9e03-99a3db398516" width="60%"></image>
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
    <image src="https://github.com/user-attachments/assets/9e9cd526-c24b-460a-b2c9-acf9350d6a97" width="60%"></image>
  </p>

#### 11. Configure Ignore Files and Rule Files

- Create ".codaiignore" in workspace to specify ignored files
- Click "Manage Codai Rules" button (bottom menu) to manage:
  - Global rule files
  - Local project rule files
  - Create new rule files (e.g. flutter.md) with your coding rules

  <p>
    <image src="https://github.com/user-attachments/assets/7163ecf1-6db3-4e0d-b311-0babdd93fa83" width="60%"></image>
  </p>

#### 12. Using MCP

- Click "MCP Servers" (top menu) to access MCP interface:
  - Left: Marketplace (MCP services)
  - Middle: Configure remote MCP
  - Right: Configure local MCP
- After installing MCP service, edit JSON config file via "Configure MCP Servers"
- Disable unused MCP services to save tokens

<p>
  <image src="https://github.com/user-attachments/assets/d783819f-da56-4a67-8876-d41ca2ab7297" width="60%"></image>
</p>
