#!/usr/bin/env node

/**
 * Deterministic validator for AEF Skills (Node.js implementation).
 * Zero external dependencies. Works on Linux, macOS, and Windows.
 *
 * Usage:
 *   node scripts/validate-skills.mjs
 *   node scripts/validate-skills.mjs skills/sdd-spec/SKILL.md
 *   node scripts/validate-skills.mjs skills/sdd-spec
 */

import { readdirSync, readFileSync, statSync } from 'node:fs';
import { join, resolve, basename, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const REPO_ROOT = resolve(__dirname, '..');

// ANSI Color helper
const colors = {
  reset: '\x1b[0m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  cyan: '\x1b[36m',
  magenta: '\x1b[35m',
  bold: '\x1b[1m'
};

function testSkillFile(filePath) {
  const fileName = basename(filePath);
  if (fileName !== 'SKILL.md') {
    return true;
  }

  const parentDir = basename(dirname(filePath));
  const content = readFileSync(filePath, 'utf-8');

  const failedChecks = [];
  const warnChecks = [];

  // 1. Frontmatter delimiter check
  const frontmatterMatch = content.match(/^---\s*[\r\n]+([\s\S]*?)[\r\n]+---\s*[\r\n]+([\s\S]*)$/);
  if (!frontmatterMatch) {
    failedChecks.push('Gate 1 [FAIL]: Missing valid YAML frontmatter delimiters (--- ... ---) at start of file.');
    printReport(parentDir, filePath, failedChecks, warnChecks);
    return false;
  }

  const frontmatter = frontmatterMatch[1];
  const body = frontmatterMatch[2];

  // 2. Name check
  const nameMatch = frontmatter.match(/name:\s*([^\r\n]+)/);
  if (nameMatch) {
    const extractedName = nameMatch[1].trim().replace(/^['"]|['"]$/g, '');
    if (extractedName !== parentDir) {
      failedChecks.push(`Gate 1 [FAIL]: 'name: ${extractedName}' does not match directory name '${parentDir}'.`);
    }
    if (!/^[a-z0-9]+(-[a-z0-9]+)*$/.test(extractedName)) {
      failedChecks.push(`Gate 1 [FAIL]: Name '${extractedName}' is not valid kebab-case.`);
    }
  } else {
    failedChecks.push("Gate 1 [FAIL]: Frontmatter missing 'name' attribute.");
  }

  // 3. Description check
  const descMatch = frontmatter.match(/description:\s*([^\r\n]+)/);
  if (descMatch) {
    const desc = descMatch[1].trim();
    if (desc.length < 25) {
      warnChecks.push(`Gate 1 [WARN]: Description is very short (${desc.length} chars). Ensure it states clear triggers.`);
    }
  } else {
    failedChecks.push("Gate 1 [FAIL]: Frontmatter missing 'description' attribute.");
  }

  // 4. Heading and Workflow structure check
  if (!/(?:^|\n)#\s+[^\r\n]+/.test(body)) {
    failedChecks.push('Gate 2 [FAIL]: Body missing markdown Title (# ...).');
  }

  if (!/(workflow|step-by-step|phases|protocol|execution)/i.test(body)) {
    warnChecks.push('Gate 2 [WARN]: Body does not contain an explicit Workflow or Step-by-Step section.');
  }

  // 5. Security & Safety checks
  if (/(?:rm\s+-rf\s+\/|rmdir\s+\/s\s+\/q\s+C:\\|DROP\s+DATABASE)/i.test(body)) {
    failedChecks.push('Gate 4 [FAIL]: Dangerous unconstrained destructive commands detected.');
  }

  if (/(?:AIza[0-9A-Za-z-_]{35}|ghp_[0-9A-Za-z]{36})/.test(body)) {
    failedChecks.push('Gate 4 [FAIL]: Potential hardcoded API token detected.');
  }

  // 6. Mermaid check (prevent unsupported mindmap)
  if (/```mermaid[\s\r\n]+mindmap/i.test(body)) {
    failedChecks.push("Gate 5 [FAIL]: Unsupported 'mindmap' syntax in Mermaid. Use 'graph TD' or 'flowchart' instead.");
  }

  return printReport(parentDir, filePath, failedChecks, warnChecks);
}

function printReport(skillName, filePath, failedChecks, warnChecks) {
  console.log('='.repeat(52));
  console.log(`${colors.cyan}Auditing Skill: ${colors.bold}${skillName}${colors.reset} (${filePath})`);
  console.log('='.repeat(52));

  if (failedChecks.length === 0 && warnChecks.length === 0) {
    console.log(`${colors.green}Result: PASS (100% compliant with AEF standards)${colors.reset}\n`);
    return true;
  }

  for (const w of warnChecks) {
    console.log(`  ${colors.yellow}${w}${colors.reset}`);
  }

  for (const f of failedChecks) {
    console.log(`  ${colors.red}${f}${colors.reset}`);
  }

  if (failedChecks.length > 0) {
    console.log(`${colors.red}Result: FAIL (${failedChecks.length} critical gates failed)${colors.reset}\n`);
    return false;
  } else {
    console.log(`${colors.yellow}Result: PASS with Warnings (${warnChecks.length} warnings)${colors.reset}\n`);
    return true;
  }
}

function collectSkills(dir, results = []) {
  const items = readdirSync(dir);
  for (const item of items) {
    const fullPath = join(dir, item);
    const stat = statSync(fullPath);
    if (stat.isDirectory()) {
      collectSkills(fullPath, results);
    } else if (item === 'SKILL.md') {
      results.push(fullPath);
    }
  }
  return results;
}

// Main execution
const targetArg = process.argv[2];
let allPassed = true;

if (targetArg) {
  const resolvedTarget = resolve(process.cwd(), targetArg);
  let filePath = resolvedTarget;
  if (statSync(resolvedTarget).isDirectory()) {
    filePath = join(resolvedTarget, 'SKILL.md');
  }

  allPassed = testSkillFile(filePath);
} else {
  const skillsDir = join(REPO_ROOT, 'skills');
  const skillFiles = collectSkills(skillsDir);

  console.log(`${colors.magenta}Found ${skillFiles.length} skills to validate in '${skillsDir}'...${colors.reset}\n`);

  for (const file of skillFiles) {
    const passed = testSkillFile(file);
    if (!passed) allPassed = false;
  }
}

if (allPassed) {
  console.log(`${colors.green}${colors.bold}All skills PASSED validation! Repository is healthy.${colors.reset}`);
  process.exit(0);
} else {
  console.log(`${colors.red}${colors.bold}Validation failed for one or more skills.${colors.reset}`);
  process.exit(1);
}
