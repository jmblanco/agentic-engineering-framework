<#
.SYNOPSIS
    Validates skills against AEF standards (YAML frontmatter, naming, structure, safety, and Mermaid diagrams).
.PARAMETER SkillPath
    Path to the SKILL.md file or skill directory to validate. If omitted, scans all skills in skills/.
#>

param(
    [string]$SkillPath
)

$ErrorActionPreference = "Stop"

function Test-SkillFile {
    param([string]$FilePath)

    $FileName = Split-Path $FilePath -Leaf
    if ($FileName -ne "SKILL.md") {
        Write-Warning "Skipping non-SKILL.md file: $FilePath"
        return $true
    }

    $ParentDir = Split-Path (Split-Path $FilePath -Parent) -Leaf
    $Content = Get-Content -Path $FilePath -Raw

    $FailedChecks = @()
    $WarnChecks = @()

    # 1. Frontmatter delimiter check
    if ($Content -notmatch "(?s)^---\s*\r?\n(.*?)\r?\n---\s*\r?\n(.*)$") {
        $FailedChecks += "Gate 1 [FAIL]: Missing valid YAML frontmatter delimiters (--- ... ---) at start of file."
        return $false
    }

    $Frontmatter = $Matches[1]
    $Body = $Matches[2]

    # 2. Name check
    if ($Frontmatter -match "name:\s*([^\r\n]+)") {
        $ExtractedName = $Matches[1].Trim().Trim('"').Trim("'")
        if ($ExtractedName -ne $ParentDir) {
            $FailedChecks += "Gate 1 [FAIL]: 'name: $ExtractedName' does not match directory name '$ParentDir'."
        }
        if ($ExtractedName -notmatch "^[a-z0-9]+(-[a-z0-9]+)*$") {
            $FailedChecks += "Gate 1 [FAIL]: Name '$ExtractedName' is not valid kebab-case."
        }
    } else {
        $FailedChecks += "Gate 1 [FAIL]: Frontmatter missing 'name' attribute."
    }

    # 3. Description check
    if ($Frontmatter -match "description:\s*([^\r\n]+)") {
        $Desc = $Matches[1].Trim()
        if ($Desc.Length -lt 25) {
            $WarnChecks += "Gate 1 [WARN]: Description is very short ($($Desc.Length) chars). Ensure it states clear triggers."
        }
    } else {
        $FailedChecks += "Gate 1 [FAIL]: Frontmatter missing 'description' attribute."
    }

    # 4. Heading and Workflow structure check
    if ($Body -notmatch "(?m)^#\s+[^\r\n]+") {
        $FailedChecks += "Gate 2 [FAIL]: Body missing markdown Title (# ...)."
    }

    if ($Body -notmatch "(?i)(workflow|step-by-step|phases|protocol|execution)") {
        $WarnChecks += "Gate 2 [WARN]: Body does not contain an explicit Workflow or Step-by-Step section."
    }

    # 5. Security & Safety checks
    if ($Body -match "(?i)(rm\s+-rf\s+\/|rmdir\s+\/s\s+\/q\s+C:\\|DROP\s+DATABASE)") {
        $FailedChecks += "Gate 4 [FAIL]: Dangerous unconstrained destructive commands detected."
    }

    if ($Body -match "(?i)(AIza[0-9A-Za-z-_]{35}|ghp_[0-9A-Za-z]{36})") {
        $FailedChecks += "Gate 4 [FAIL]: Potential hardcoded API token detected."
    }

    # 6. Mermaid check (prevent unsupported mindmap)
    if ($Body -match "```mermaid[\s\r\n]+mindmap") {
        $FailedChecks += "Gate 5 [FAIL]: Unsupported 'mindmap' syntax in Mermaid. Use 'graph TD' or 'flowchart' instead."
    }

    # Output report
    Write-Host "=================================================="
    Write-Host "Auditing Skill: $ParentDir ($FilePath)" -ForegroundColor Cyan
    Write-Host "=================================================="

    if ($FailedChecks.Count -eq 0 -and $WarnChecks.Count -eq 0) {
        Write-Host "Result: PASS (100% compliant with AEF standards)" -ForegroundColor Green
        return $true
    }

    foreach ($w in $WarnChecks) {
        Write-Host "  $w" -ForegroundColor Yellow
    }

    foreach ($f in $FailedChecks) {
        Write-Host "  $f" -ForegroundColor Red
    }

    if ($FailedChecks.Count -gt 0) {
        Write-Host "Result: FAIL ($($FailedChecks.Count) critical gates failed)" -ForegroundColor Red
        return $false
    } else {
        Write-Host "Result: PASS with Warnings ($($WarnChecks.Count) warnings)" -ForegroundColor Yellow
        return $true
    }
}

$RepoRoot = Split-Path $PSScriptRoot -Parent
$AllPassed = $true

if ($SkillPath) {
    if (Test-Path $SkillPath -PathType Container) {
        $Target = Join-Path $SkillPath "SKILL.md"
    } else {
        $Target = $SkillPath
    }
    if (-not (Test-Path $Target)) {
        Write-Error "Target file not found: $Target"
        exit 1
    }
    $Passed = Test-SkillFile -FilePath (Resolve-Path $Target).Path
    if (-not $Passed) { $AllPassed = $false }
} else {
    $SkillsDir = Join-Path $RepoRoot "skills"
    $SkillFiles = Get-ChildItem -Path $SkillsDir -Recurse -Filter "SKILL.md"
    Write-Host "Found $($SkillFiles.Count) skills to validate in '$SkillsDir'..." -ForegroundColor Magenta

    foreach ($file in $SkillFiles) {
        $Passed = Test-SkillFile -FilePath $file.FullName
        if (-not $Passed) { $AllPassed = $false }
        Write-Host ""
    }
}

if ($AllPassed) {
    Write-Host "All skills PASSED validation! Repository is healthy." -ForegroundColor Green
    exit 0
} else {
    Write-Host "Validation failed for one or more skills." -ForegroundColor Red
    exit 1
}
