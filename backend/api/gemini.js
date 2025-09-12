import { GoogleGenAI } from "@google/genai";
// import { repo, repoContent } from "../mock/repo.js";
import dotenv from "dotenv"
dotenv.config()


const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API });

export const main = async (repo, repoContent) => {
    const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: `You are an AI assistant that generates professional README.md files for GitHub repositories.

Here is the repository metadata (in JSON Format):
${JSON.stringify(repo)}

Here is the repository content (file structure, main files, and key code snippets) (In JSON Format):
${JSON.stringify(repoContent)}

Task:
IMPORTANT:
- Use the provided repo metadata and content as the primary source of truth.
- Do not generate generic boilerplate unrelated to this repository.
- If certain sections are missing, generate professional placeholders but make it clear they are suggestions.
- Make references only to the actual files, technologies, and structure in the provided repoContent.

Generate a complete and polished README.md for this repository. 
The README should be well-structured, concise, and formatted in Markdown. 
Include the following sections (fill with best possible content from the data, and 
if missing, generate helpful professional placeholders):

1. Project Title
2. Description (what the project does, its purpose)
3. Features (main highlights / key functionalities)
4. Installation Guide (step-by-step instructions)
5. Usage (examples or commands)
6. Tech Stack (languages, frameworks, libraries detected)
7. Project Structure (based on repoContent)
8. Contributing Guidelines (if missing, suggest one)
9. License Information (if missing, suggest adding one)
10. Badges (stars, forks, license, etc.)
11. Future Enhancements or TODOs (if applicable)

Formatting Requirements:
- Use proper Markdown headings.
- Use bullet points for features and tech stack.
- Keep tone professional but friendly.
- Ensure clean formatting (no broken links or raw HTML).
- If information is missing in repo data, intelligently generate placeholders instead of leaving sections empty.
 
    `,
    });
    // console.log(response.text)
    return response.text
}

