# Interview Helper

An Electron-based desktop app that provides real-time AI-powered interview assistance. It transcribes your speech using Deepgram and generates technical interview answers using OpenAI's ChatGPT.

## Features
- **Real-time Speech Transcription:** Uses your microphone and Deepgram API to transcribe spoken questions.
- **AI Interview Assistant:** Sends transcribed questions to ChatGPT and displays human-like, technical answers.
- **Minimal UI:** Always-on-top, draggable, and transparent window for seamless interview practice.

## Example Usage
1. **Start the App:**
   - The app opens a transparent window.
   - Speak your interview question into your microphone.
   - The app transcribes your question and displays an AI-generated answer in the window.

2. **Sample Flow:**
   - You: "What is a closure in JavaScript?"
   - App: (Displays a detailed, human-like answer from ChatGPT)

## Setup

### Prerequisites
- [Node.js](https://nodejs.org/) (v18 or higher recommended)
- [npm](https://www.npmjs.com/)
- [Deepgram API Key](https://console.deepgram.com/signup)
- [OpenAI API Key](https://platform.openai.com/signup)

### Installation
```bash
# Clone the repository
$ git clone <repo-url>
$ cd interview-helper

# Install dependencies
$ npm install
```

### Environment Variables
Create a `.env` file in the project root with the following:
```
DEEPGRAM_API_KEY=your_deepgram_api_key
OPEN_API_KEY=your_openai_api_key
```

### Linux Audio Setup & Requirements

> **Note:** Microphone input works on **all operating systems** (Linux, Windows, macOS). However, capturing internal audio output ("what you hear") is currently only supported on **Linux**. Windows and macOS support for internal audio capture is not yet implemented.

#### Required Packages for Linux (Internal Audio Output)
To use your internal audio output ("what you hear") as the input on Linux, you need the following:

- **PulseAudio** (audio server)
- **pactl** (PulseAudio control tool)
- **parec** (PulseAudio recording tool)
- **(Optional) sox** (for audio playback/testing)

Install them with:

```bash
sudo apt install pulseaudio
sudo apt install sox libsox-fmt-all   # Optional, for testing
```

#### PipeWire Compatibility
Some modern Linux distros use PipeWire instead of PulseAudio. To ensure compatibility, install the PulseAudio compatibility layer:

```bash
sudo apt install pipewire-pulse
```

#### Common Gotchas
- `.monitor` devices (for capturing output audio) are only available if monitoring is enabled on your audio sink. You may need to enable this in your audio settings or with `pavucontrol`.
- Make sure PulseAudio is running: `pulseaudio --check` or `systemctl --user status pulseaudio`
- If you have issues, try restarting PulseAudio: `pulseaudio -k && pulseaudio --start`

#### Summary
Code will work on most Linux systems if:
- PulseAudio is installed and running
- `pactl` and `parec` are available
- A monitor device exists for the default audio output

<!-- If you want your app to be production-ready across Linux distros, consider:
- Detecting missing dependencies
- Providing setup instructions or automating installation
- Falling back to microphone if system audio fails -->

### Running the App (Development)
```bash
$ npm start
```

<!-- ## Building for Production
This app uses Electron and can be packaged for Windows, macOS, and Linux. You can use [electron-packager](https://github.com/electron/electron-packager) or [electron-builder](https://www.electron.build/) for cross-platform builds. -->

<!-- ### Example with electron-packager
1. Install globally (if not already):
   ```bash
   npm install -g electron-packager
   ```
2. Build for your OS:
   ```bash
   electron-packager . interview-helper --platform=win32   # Windows
   electron-packager . interview-helper --platform=darwin  # macOS
   electron-packager . interview-helper --platform=linux   # Linux
   ```
   Add `--arch=x64` or `--arch=arm64` as needed. -->

<!-- ### Example with electron-builder
1. Install as a dev dependency:
   ```bash
   npm install --save-dev electron-builder
   ```
2. Add build scripts to `package.json`:
   ```json
   "scripts": {
     "start": "electron .",
     "build": "electron-builder"
   }
   ```
3. Build:
   ```bash
   npm run build
   ``` -->

## Project Structure
- `index.js` - Main Electron process
- `transcribe.js` - Handles microphone and Deepgram transcription
- `chatgpt.js` - Handles ChatGPT API integration
- `renderer/` - UI files (HTML, JS)

## License
ISC

---
**Note:**
- This app requires a working microphone.
- API keys are required for both Deepgram and OpenAI.
- For best results, use Node.js v18+ and the latest npm. 