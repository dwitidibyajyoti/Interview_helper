// audioDevice.js
const { execSync } = require('child_process');
const os = require('os');

function getMonitorDevice() {
    const platform = os.platform();

    if (platform === 'linux') {
        try {
            const output = execSync('pactl list short sources', { encoding: 'utf8' });
            const lines = output.split('\n');
            const monitorLine = lines.find(line => line.includes('.monitor'));
            if (!monitorLine) {
                console.error('⚠️ No monitor devices found in source list.');
                return null;
            }
            const deviceName = monitorLine.split('\t')[1];
            return deviceName || null;
        } catch (err) {
            console.error('🔍 Monitor device detection failed (Linux):', err.message);
            return null;
        }
    }

    if (platform === 'win32') {
        console.warn('⚠️ System audio capture is not supported out-of-the-box on Windows. Consider VB-Audio Cable or loopback driver.');
        return null;
    }

    if (platform === 'darwin') {
        console.warn('⚠️ System audio capture is not supported out-of-the-box on macOS. Consider using BlackHole or Soundflower.');
        return null;
    }

    console.error('❌ Unsupported platform:', platform);
    return null;
}

function getDefaultMicDevice() {
    return 'default'; // You can enhance this later to detect actual mic if needed
}

module.exports = {
    getMonitorDevice,
    getDefaultMicDevice
};
