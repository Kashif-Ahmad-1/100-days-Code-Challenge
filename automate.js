const express = require('express');
const fs = require('fs').promises;
const path = require('path');
const { execSync } = require('child_process');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;
const HISTORY_FILE = path.join(__dirname, 'question_history.json');

// Helper Functions
async function loadHistory() {
    if (await fs.access(HISTORY_FILE).then(() => true).catch(() => false)) {
        const rawData = await fs.readFile(HISTORY_FILE, 'utf-8');
        return rawData.trim() === '' ? [] : JSON.parse(rawData);
    }
    return [];
}

async function saveHistory(history, newInterviewContent) {
    const questionRegex = /\*\*Main Question\*\*:\s*([\s\S]*?)(?=\n\*\*Answer\*\*|$)/g;
    const matches = [...newInterviewContent.matchAll(questionRegex)];
    const newQuestions = matches.map(match => match[1].trim());
    const updatedHistory = history.concat(newQuestions);
    await fs.writeFile(HISTORY_FILE, JSON.stringify(updatedHistory, null, 2));
}

async function getInterviewQuestions(day, history) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) throw new Error("GEMINI_API_KEY is not set in your .env file.");
    const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-05-20:generateContent?key=${apiKey}`;

    const historyText = history.join('\n');
    const prompt = `
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
    1. **Main Question**: The primary theory or coding question.
    2. **Answer**: A clear, simple, step-by-step explanation.
    3. **Follow-up Questions**: 2-3 relevant cross-questions.
    4. **Follow-up Answers**: Clear and simple answers for each follow-up.
    5. **Code Example(s)**: If relevant, provide up to 2 short, easy-to-understand code examples.
    Begin the session with a friendly tone, like a real interviewer. For example: 'Welcome to Day ${day} of your interview prep! Let's start with some fundamentals.' and then proceed with the questions.
    `;

    console.log("Calling Gemini API...");
    const response = await fetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            contents: [{ parts: [{ text: prompt }] }],
            generationConfig: { temperature: 0.7, maxOutputTokens: 8192 }
        })
    });

    if (!response.ok) throw new Error(`API call failed with status: ${response.status}`);
    const result = await response.json();
    if (result.candidates?.[0]?.content?.parts?.[0]?.text) {
        return result.candidates[0].content.parts[0].text;
    }
    throw new Error("Failed to get content from API response.");
}

async function parseMarkdown(filePath) {
    const content = await fs.readFile(filePath, 'utf-8');
    const questionBlocks = content.split(/(?=### Question \d+)/).filter(block => block.trim().startsWith('### Question'));
    return questionBlocks.map(block => {
        const mainQuestionMatch = block.match(/\*\*Main Question\*\*:\s*([\s\S]*?)(?=\n\*\*Answer\*\*|\n###|$)/s);
        const mainQuestion = mainQuestionMatch?.[1]?.trim().replace(/\n/g, ' ') || 'Question not found';
        
        const answerMatch = block.match(/\*\*Answer\*\*:\s*([\s\S]*?)(?=\n\*\*Follow-up Questions\*\*|\n###|$)/s);
        const answer = answerMatch?.[1]?.trim().replace(/\n/g, '<br>') || 'Answer not found';
        
        const followUpsMatch = block.match(/\*\*Follow-up Questions\*\*:\s*([\s\S]*?)(?=\n\*\*Follow-up Answers\*\*|\n###|$)/s);
        const followUps = followUpsMatch?.[1]?.trim().split('\n- ').filter(q => q.trim()).map(q => q.trim()) || [];
        
        const followUpAnswersMatch = block.match(/\*\*Follow-up Answers\*\*:\s*([\s\S]*?)(?=\n\*\*Code Example\(s\)\*\*|\n###|$)/s);
        const followUpAnswers = followUpAnswersMatch?.[1]?.trim().split('\n- ').filter(a => a.trim()).map(a => a.trim().replace(/\n/g, '<br>')) || [];
        
        const codeExamplesMatch = block.match(/\*\*Code Example\(s\)\*\*:\s*```[\s\S]*?```/g) || [];
        const codeExamples = codeExamplesMatch.map(code => 
            code.replace(/\*\*Code Example\(s\)\*\*:\s*```[\s\S]*?\n([\s\S]*?)```/, '$1').trim()
        );

        return { mainQuestion, answer, followUps, followUpAnswers, codeExamples };
    });
}

function sanitizeHTML(str) {
    return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#39;');
}

async function generateWebpage() {
    const days = (await fs.readdir(__dirname)).filter(dir => dir.startsWith('Day-')).sort();
    const allQuestions = [];
    for (const day of days) {
        const filePath = path.join(__dirname, day, 'interview.md');
        if (await fs.access(filePath).then(() => true).catch(() => false)) {
            const questions = await parseMarkdown(filePath);
            allQuestions.push({ day, questions });
        }
    }

    const htmlContent = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>100 Days of Code Interview Questions</title>
    <script src="https://cdn.tailwindcss.com"></script>
</head>
<body class="bg-gray-100 font-sans">
    <div class="container mx-auto p-4 max-w-5xl">
        <h1 class="text-3xl font-bold text-center mb-8 text-gray-800">100 Days of Code: JavaScript & Node.js Interview Questions</h1>
        <div class="flex flex-wrap gap-2 mb-8 justify-center">
            ${days.map(day => `<button onclick="loadDay('${day}')" class="px-3 py-1 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition text-sm">${day}</button>`).join('')}
        </div>
        <div id="questions" class="space-y-4"></div>
    </div>
    <script>
        const questionsData = ${JSON.stringify(allQuestions, (key, value) => {
            if (typeof value === 'string') return sanitizeHTML(value);
            return value;
        })};
        
        function loadDay(day) {
            const dayData = questionsData.find(d => d.day === day);
            constWhere questionsDiv = document.getElementById('questions');
            questionsDiv.innerHTML = \`<h2 class="text-2xl font-semibold mb-4 text-gray-700">\${day}</h2>\`;
            dayData.questions.forEach((q, index) => {
                const questionHtml = \`
                    <div class="bg-white p-6 rounded-lg shadow-md mb-4">
                        <h3 class="text-xl font-medium mb-3 text-gray-800">Question \${index + 1}: \${q.mainQuestion}</h3>
                        <p class="mb-3 text-gray-600"><strong>Answer:</strong> \${q.answer}</p>
                        <button onclick="toggleDetails(this)" class="text-blue-600 hover:underline mb-2">Toggle Follow-up Details</button>
                        <div class="details hidden">
                            <p class="mb-2 text-gray-600"><strong>Follow-up Questions:</strong></p>
                            <ul class="list-disc pl-5 mb-3 text-gray-600">\${q.followUps.map(fq => \`<li>\${fq}</li>\`).join('')}</ul>
                            <p class="mb-2 text-gray-600"><strong>Follow-up Answers:</strong></p>
                            <ul class="list-disc pl-5 mb-3 text-gray-600">\${q.followUpAnswers.map(fa => \`<li>\${fa}</li>\`).join('')}</ul>
                            \${q.codeExamples.length ? \`
                                <p class="mb-2 text-gray-600"><strong>Code Example(s):</strong></p>
                                <pre class="bg-gray-800 text-white p-4 rounded-lg overflow-x-auto text-sm">\${q.codeExamples.map(ex => ex.replace(/\\n/g, '<br>')).join('<br><br>')}</pre>
                            \` : ''}
                        </div>
                    </div>
                \`;
                questionsDiv.innerHTML += questionHtml;
            });
        }

        function toggleDetails(button) {
            const details = button.nextElementSibling;
            details.classList.toggle('hidden');
            button.textContent = details.classList.contains('hidden') ? 'Show Follow-up Details' : 'Hide Follow-up Details';
        }

        // Load the first day by default
        if (questionsData.length > 0) loadDay(questionsData[0].day);
    </script>
</body>
</html>
    `;

    await fs.mkdir(path.join(__dirname, 'public'), { recursive: true });
    await fs.writeFile(path.join(__dirname, 'public', 'index.html'), htmlContent);
}

// Main Execution
async function main() {
    try {
        const day = (await fs.readdir(__dirname)).filter(file => file.startsWith('Day-')).length + 1;
        const dayDir = `Day-${String(day).padStart(2, '0')}`;

        if (day > 100) {
            console.log("Congratulations! You've completed the 100 Days of Code challenge!");
            return;
        }

        console.log(`Preparing interview for Day ${day}...`);
        const history = await loadHistory();
        const interviewContent = await getInterviewQuestions(day, history);

        await fs.mkdir(dayDir, { recursive: true });
        await fs.writeFile(path.join(dayDir, 'interview.md'), interviewContent);
        console.log(`Interview file created at ${dayDir}/interview.md`);

        await saveHistory(history, interviewContent);
        console.log("Updated question history.");

        console.log("Generating webpage...");
        await generateWebpage();
        console.log("Webpage generated at public/index.html");

        console.log("Pushing to GitHub...");
        execSync('git add .');
        execSync(`git commit -m "Day ${day}: Add interview questions and update webpage"`);
        execSync('git push');
        console.log(`Successfully pushed Day ${day} to GitHub!`);

        app.use(express.static(path.join(__dirname, 'public')));
        app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
    } catch (error) {
        console.error('An error occurred:', error.message);
    }
}

main();