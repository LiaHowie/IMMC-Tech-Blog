#!/usr/bin/env node
import fs from "fs"
import path from "path"
import { execSync } from "child_process"
import matter from "gray-matter"

const CONTENT_DIR = "./content" // adjust to your markdown folder

function getGitLastCommitDate(filePath) {
    try {
        // Use ISO format to get full timestamp including time
        const output = execSync(`git log -1 --format="%aI" -- "${filePath}"`, { encoding: "utf8" }).trim()
        return output || null
    } catch {
        return null
    }
}


function processFile(filePath) {
    const content = fs.readFileSync(filePath, "utf8")
    const parsed = matter(content)

    // Skip if front-matter already has published
    if (parsed.data.published) return

        const gitDate = getGitLastCommitDate(filePath)
        if (!gitDate) return // fallback: leave empty if Git missing

            parsed.data.published = gitDate
            const newContent = matter.stringify(parsed.content, parsed.data)
            fs.writeFileSync(filePath, newContent, "utf8")
            console.log(`Set published date for ${filePath} to ${gitDate}`)
}

function walkDir(dir) {
    const entries = fs.readdirSync(dir, { withFileTypes: true })
    for (const entry of entries) {
        const fullPath = path.join(dir, entry.name)
        if (entry.isDirectory()) {
            walkDir(fullPath)
        } else if (entry.isFile() && fullPath.endsWith(".md")) {
            processFile(fullPath)
        }
    }
}

// Run
walkDir(CONTENT_DIR)
