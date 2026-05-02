"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Log = Log;
async function Log(stack, level, pkg, message) {
    const token = process.env.ACCESS_TOKEN;
    if (!token) {
        return;
    }
    const payload = {
        stack,
        level,
        package: pkg,
        message
    };
    try {
        const response = await fetch('http://20.207.122.201/evaluation-service/logs', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(payload)
        });
        if (!response.ok) {
            // Intentionally not using console.log as per instructions
        }
    }
    catch (error) {
        // Intentionally not using console.log
    }
}
//# sourceMappingURL=index.js.map