require("dotenv").config();
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// --- Configuration ---
const HISTORY_FILE = path.join(__dirname, 'question_history.json');

// --- Helper Functions ---

/**
 * Loads the history of previously generated questions.
 * @returns {string[]} An array of past questions.
 */
function loadHistory() {
    if (fs.existsSync(HISTORY_FILE)) {
        const rawData = fs.readFileSync(HISTORY_FILE, 'utf-8');
        // If the file is empty, return an empty array to avoid a JSON parsing error.
        if (rawData.trim() === '') {
            return [];
        }
        return JSON.parse(rawData);
    }
    return [];
}

/**
 * Saves the new questions to the history file.
 * @param {string[]} history - The existing history.
 * @param {string} newQuestions - The new block of questions to add.
 */
function saveHistory(history, newQuestions) {
    history.push(newQuestions);
    fs.writeFileSync(HISTORY_FILE, JSON.stringify(history, null, 2));
}

/**
 * Generates the prompt for the Gemini API.
 * @param {number} day - The current day of the challenge.
 * @param {string[]} history - The history of past questions.
 * @returns {string} The complete prompt.
 */
function getPrompt(day, history) {
    const historyText = history.join('\n\n---\n\n');
    return `
    Act as a senior interviewer conducting a JavaScript and Node.js technical interview for a '100 Days of Code' challenge. Today is Day ${day}.

    Your task is to generate 20 fresh and unique interview questions. Do NOT repeat any questions from the following list of previously asked questions:
    --- PREVIOUSLY ASKED ---
    ${historyText}
    --- END OF PREVIOUSLY ASKED ---

    The questions must cover these topics over the course of the 100 days: Core JavaScript (closures, prototypes, promises, async/await, ES6+), Advanced JavaScript (call/apply/bind, currying, design patterns), Core Node.js (event loop, streams, buffers), Advanced Node.js (clustering, worker threads), Frameworks (Express.js, Socket.IO), Security, and Best Practices.

    Structure the entire output in Markdown format.

    The difficulty must progress as follows:
    - Questions 1-7: Basic
    - Questions 8-14: Intermediate
    - Questions 15-20: Hard/Advanced

    For EACH of the 20 questions, you MUST provide the following in this exact order:
    1.  **Main Question**: The primary theory or coding question.
    2.  **Answer**: A clear, simple, step-by-step explanation.
    3.  **Follow-up Questions**: 2-3 relevant cross-questions.
    4.  **Follow-up Answers**: Clear and simple answers for each follow-up.
    5.  **Code Example(s)**: If relevant, provide up to 2 short, easy-to-understand code examples.

    Begin the session with a friendly tone, like a real interviewer. For example: 'Welcome to Day ${day} of your interview prep! Let's start with some fundamentals.' and then proceed with the questions.
  `;
}

/**
 * Calls the Gemini API to get the interview questions.
 * @param {string} prompt - The prompt to send to the model.
 * @returns {Promise<string>} The generated text from the model.
 */
async function getInterviewQuestions(prompt) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
        throw new Error("GEMINI_API_KEY is not set in your .env file.");
    }
    const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-05-20:generateContent?key=${apiKey}`;

    const payload = {
        contents: [{
            parts: [{ text: prompt }]
        }],
        generationConfig: {
            temperature: 0.7,
            maxOutputTokens: 8192,
        }
    };

    console.log("Calling Gemini API... This may take a moment.");

    try {
        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });

        if (!response.ok) {
            throw new Error(`API call failed with status: ${response.status}`);
        }

        const result = await response.json();
        if (result.candidates && result.candidates.length > 0 &&
            result.candidates[0].content && result.candidates[0].content.parts &&
            result.candidates[0].content.parts.length > 0) {
            return result.candidates[0].content.parts[0].text;
        } else {
            console.error("Unexpected API response structure:", JSON.stringify(result, null, 2));
            throw new Error("Failed to get content from API response.");
        }
    } catch (error) {
        console.error("Error calling Gemini API:", error);
        throw error;
    }
}


// --- Main Execution ---
async function main() {
    try {
        const day = fs.readdirSync('.').filter(file => file.startsWith('Day-')).length + 1;
        const dayDir = `Day-${String(day).padStart(2, '0')}`;

        if (day > 100) {
            console.log("Congratulations! You've completed the 100 Days of Code challenge!");
            return;
        }

        console.log(`Preparing interview for Day ${day}...`);

        const history = loadHistory();
        const prompt = getPrompt(day, history);
        const interviewContent = await getInterviewQuestions(prompt);

        fs.mkdirSync(dayDir);
        fs.writeFileSync(path.join(dayDir, 'interview.md'), interviewContent);
        console.log(`Interview file created at ${dayDir}/interview.md`);

        saveHistory(history, interviewContent);
        console.log("Updated question history.");

        console.log("Pushing to GitHub...");
        execSync('git add .');
        execSync(`git commit -m "Day ${day}: Add interview questions"`);
        execSync('git push');
        console.log(`Successfully pushed Day ${day} to GitHub!`);

    } catch (error) {
        console.error('An error occurred during the automation process:', error.message);
    }
}

main();