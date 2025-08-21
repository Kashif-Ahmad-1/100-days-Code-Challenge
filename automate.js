require("dotenv").config();
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// --- Configuration ---
const HISTORY_FILE = path.join(__dirname, 'question_history.json');
const WEBSITE_DIR = path.join(__dirname, 'website');
const PUBLIC_INTERVIEWS_DIR = path.join(WEBSITE_DIR, 'public', 'interviews');
const SRC_DIR = path.join(WEBSITE_DIR, 'src');
const MAX_RETRIES = 3;
const RETRY_DELAY = 5000; // 5 seconds

// --- Helper Functions ---

/**
 * Loads the history of previously generated questions.
 * @returns {string[]} An array of past questions.
 */
function loadHistory() {
    if (fs.existsSync(HISTORY_FILE)) {
        const rawData = fs.readFileSync(HISTORY_FILE, 'utf-8');
        if (rawData.trim() === '') {
            return [];
        }
        return JSON.parse(rawData);
    }
    return [];
}

/**
 * Extracts main questions from the interview content and saves them to the history file.
 * @param {string[]} history - The existing history (array of question strings).
 * @param {string} newInterviewContent - The new block of interview content in Markdown.
 */
function saveHistory(history, newInterviewContent) {
    const questionRegex = /\*\*Main Question\*\*:\s*(.*)/g;
    const matches = [...newInterviewContent.matchAll(questionRegex)];
    const newQuestions = matches.map(match => match[1].trim());
    const updatedHistory = history.concat(newQuestions);
    fs.writeFileSync(HISTORY_FILE, JSON.stringify(updatedHistory, null, 2));
}

/**
 * Generates the prompt for the Gemini API.
 * @param {number} day - The current day of the challenge.
 * @param {string[]} history - The history of past questions.
 * @returns {string} The complete prompt.
 */
function getPrompt(day, history) {
    const historyText = history.join('\n');
    return `
    Act as a senior interviewer conducting a JavaScript and Node.js technical interview for a '100 Days of Code' challenge. Today is Day ${day}.

    Your task is to generate 10 fresh and unique interview questions. Do NOT repeat any questions from the following list of previously asked questions:
    --- PREVIOUSLY ASKED ---
    ${historyText}
    --- END OF PREVIOUSLY ASKED ---

    The questions must cover these topics over the course of the 100 days: Core JavaScript (closures, prototypes, promises, async/await, ES6+), Advanced JavaScript (call/apply/bind, currying, design patterns), Core Node.js (event loop, streams, buffers), Advanced Node.js (clustering, worker threads), Frameworks (Express.js, Socket.IO), Security, and Best Practices.

    Structure the entire output in Markdown format.

    The difficulty must progress as follows:
    - Questions 1-4: Basic
    - Questions 5-7: Intermediate
    - Questions 8-10: Hard/Advanced

    For EACH of the 10 questions, you MUST provide the following in this exact order:
    1.  **Main Question**: The primary theory or coding question.
    2.  **Answer**: A clear, simple, step-by-step explanation.
    3.  **Follow-up Questions**: 2-3 relevant cross-questions.
    4.  **Follow-up Answers**: Clear and simple answers for each follow-up.
    5.  **Code Example(s)**: If relevant, provide up to 2 short, easy-to-understand code examples.

    Begin the session with a friendly tone, like a real interviewer. For example: 'Welcome to Day ${day} of your interview prep! Let's start with some fundamentals.' and then proceed with the questions.
  `;
}

/**
 * Calls the Gemini API to get the interview questions with retry logic.
 * @param {string} prompt - The prompt to send to the model.
 * @returns {Promise<string>} The generated text from the model or fallback content.
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

    for (let attempt = 1; attempt <= MAX_RETRIES; attempt++) {
        console.log(`Calling Gemini API (Attempt ${attempt}/${MAX_RETRIES})...`);
        try {
            const response = await fetch(apiUrl, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });

            if (!response.ok) {
                if (response.status === 503 && attempt < MAX_RETRIES) {
                    console.log(`503 error detected. Retrying in ${RETRY_DELAY / 1000} seconds...`);
                    await new Promise(resolve => setTimeout(resolve, RETRY_DELAY));
                    continue;
                }
                throw new Error(`API call failed with status: ${response.status}`);
            }

            const result = await response.json();
            if (result.candidates && result.candidates[0].content && result.candidates[0].content.parts) {
                return result.candidates[0].content.parts[0].text;
            } else {
                console.error("Unexpected API response structure:", JSON.stringify(result, null, 2));
                throw new Error("Failed to get content from API response.");
            }
        } catch (error) {
            if (attempt === MAX_RETRIES) {
                console.error("Max retries reached. Using fallback content.");
                return `# Fallback Content for Day ${day}\n\nAPI call failed after ${MAX_RETRIES} attempts. Please try again later or check your API key and network connection.`;
            }
        }
    }
}

/**
 * Creates the website folder structure and files.
 */
function createWebsiteFiles(day, interviewContent) {
    // Create website directories
    fs.mkdirSync(WEBSITE_DIR, { recursive: true });
    fs.mkdirSync(SRC_DIR, { recursive: true });
    fs.mkdirSync(PUBLIC_INTERVIEWS_DIR, { recursive: true });

    // Copy interview.md to public/interviews/Day-XX/
    const dayDir = `Day-${String(day).padStart(2, '0')}`;
    const publicDayDir = path.join(PUBLIC_INTERVIEWS_DIR, dayDir);
    fs.mkdirSync(publicDayDir, { recursive: true });
    fs.writeFileSync(path.join(publicDayDir, 'interview.md'), interviewContent);

    // Write index.html
    const indexHtml = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>100 Days of Code Interview Questions</title>
  <script src="https://cdn.jsdelivr.net/npm/react@18.2.0/umd/react.production.min.js"></script>
  <script src="https://cdn.jsdelivr.net/npm/react-dom@18.2.0/umd/react-dom.production.min.js"></script>
  <script src="https://cdn.jsdelivr.net/npm/react-markdown@8.0.7/lib/react-markdown.min.js"></script>
  <script src="https://cdn.jsdelivr.net/npm/@babel/standalone@7.18.9/babel.min.js"></script>
  <script src="https://cdn.tailwindcss.com"></script>
</head>
<body>
  <div id="root"></div>
  <script type="text/babel" src="src/index.jsx"></script>
</body>
</html>`;
    fs.writeFileSync(path.join(WEBSITE_DIR, 'index.html'), indexHtml);

    // Write src/index.jsx
    const indexJsx = `import React from 'react';
import ReactDOM from 'react-dom';
import App from './App.jsx';

ReactDOM.render(<App />, document.getElementById('root'));`;
    fs.writeFileSync(path.join(SRC_DIR, 'index.jsx'), indexJsx);

    // Write src/App.jsx
    const appJsx = `import React, { useState } from 'react';
import Sidebar from './Sidebar.jsx';
import Content from './Content.jsx';

function App() {
  const [selectedDay, setSelectedDay] = useState(null);

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar selectedDay={selectedDay} setSelectedDay={setSelectedDay} />
      <Content selectedDay={selectedDay} />
    </div>
  );
}

export default App;`;
    fs.writeFileSync(path.join(SRC_DIR, 'App.jsx'), appJsx);

    // Write src/Sidebar.jsx
    const sidebarJsx = `import React from 'react';

function Sidebar({ selectedDay, setSelectedDay }) {
  const totalDays = 100;
  const days = Array.from({ length: totalDays }, (_, i) => i + 1);

  return (
    <div className="w-64 bg-blue-800 text-white p-4 overflow-y-auto">
      <h1 className="text-2xl font-bold mb-4">100 Days of Code</h1>
      <ul>
        {days.map(day => (
          <li key={day} className="mb-2">
            <button
              onClick={() => setSelectedDay(day)}
              className={\`w-full text-left p-2 rounded hover:bg-blue-700 transition-colors \${
                selectedDay === day ? 'bg-blue-900' : ''
              }\`}
            >
              Day {day.toString().padStart(2, '0')}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Sidebar;`;
    fs.writeFileSync(path.join(SRC_DIR, 'Sidebar.jsx'), sidebarJsx);

    // Write src/Content.jsx
    const contentJsx = `import React, { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';

function Content({ selectedDay }) {
  const [content, setContent] = useState('');

  useEffect(() => {
    if (selectedDay) {
      fetch(\`/interviews/Day-\${selectedDay.toString().padStart(2, '0')}/interview.md\`)
        .then(response => {
          if (!response.ok) {
            throw new Error('File not found');
          }
          return response.text();
        })
        .then(text => setContent(text))
        .catch(error => {
          console.error('Error fetching content:', error);
          setContent('# Content not found');
        });
    } else {
      setContent('# Select a Day');
    }
  }, [selectedDay]);

  return (
    <div className="flex-1 p-8 overflow-y-auto">
      <h2 className="text-3xl font-bold mb-4 text-blue-800">
        {selectedDay ? \`Day \${selectedDay.toString().padStart(2, '0')}\` : 'Select a Day'}
      </h2>
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <ReactMarkdown
          className="prose max-w-none"
          components={{
            h1: ({ node, ...props }) => <h1 className="text-2xl font-bold mt-6 mb-4 text-blue-800" {...props} />,
            h2: ({ node, ...props }) => <h2 className="text-xl font-semibold mt-5 mb-3 text-blue-700" {...props} />,
            p: ({ node, ...props }) => <p className="mb-4 text-gray-700" {...props} />,
            code: ({ node, inline, className, children, ...props }) => {
              return !inline ? (
                <pre className="bg-gray-100 p-4 rounded-lg overflow-x-auto">
                  <code className={className} {...props}>
                    {children}
                  </code>
                </pre>
              ) : (
                <code className="bg-gray-100 px-1 rounded" {...props}>
                  {children}
                </code>
              );
            },
          }}
        >
          {content}
        </ReactMarkdown>
      </div>
    </div>
  );
}

export default Content;`;
    fs.writeFileSync(path.join(SRC_DIR, 'Content.jsx'), contentJsx); 

    // Write webserver.js
    const webserverJs = `const express = require('express');
const path = require('path');
const app = express();
const port = 3000;

app.use(express.static(path.join(__dirname)));
app.use('/interviews', express.static(path.join(__dirname, 'public', 'interviews')));

app.listen(port, () => {
  console.log(\`Website running at http://localhost:\${port}\`);
});`;
    fs.writeFileSync(path.join(WEBSITE_DIR, 'webserver.js'), webserverJs);
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
        let interviewContent;
        try {
            interviewContent = await getInterviewQuestions(prompt);
        } catch (error) {
            console.error("Failed to fetch interview questions:", error.message);
            interviewContent = `# Fallback Content for Day ${day}\n\nAPI call failed. Please try again later or check your API key and network connection.`;
        }

        // Create Day-XX folder and save interview.md
        fs.mkdirSync(dayDir, { recursive: true });
        fs.writeFileSync(path.join(dayDir, 'interview.md'), interviewContent);
        console.log(`Interview file created at ${dayDir}/interview.md`);

        // Create website files and copy interview.md
        createWebsiteFiles(day, interviewContent);
        console.log("Website files generated in 'website' directory.");

        saveHistory(history, interviewContent);
        console.log("Updated question history.");

        console.log("Pushing to GitHub...");
        execSync('git add .', { stdio: 'inherit' });
        execSync(`git commit -m "Day ${day}: Add interview questions and website files"`, { stdio: 'inherit' });
        execSync('git push', { stdio: 'inherit' });
        console.log(`Successfully pushed Day ${day} to GitHub!`);

    } catch (error) {
        console.error('An error occurred during the automation process:', error.message);
    }
}

main();