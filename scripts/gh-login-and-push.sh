#!/usr/bin/env bash
set -euo pipefail

log() { echo "[setup] $*"; }

# Defaults
USE_TOKEN=0
REMOTE_URL="https://github.com/NexusDevelopments/nexushub-webproxy.git"

# Args: --use-token (prefer PAT via stdin), --remote <url>
while [[ $# -gt 0 ]]; do
  case "$1" in
    --use-token)
      USE_TOKEN=1; shift ;;
    --remote)
      REMOTE_URL="${2}"; shift 2 ;;
    *)
      log "Unknown arg: $1"; shift ;;
  esac
done

# Ensure GitHub CLI
if ! command -v gh >/dev/null 2>&1; then
  log "GitHub CLI ('gh') not found. Install gh and re-run."
  exit 1
fi

# Authenticate
if [[ "$USE_TOKEN" -eq 1 ]]; then
  log "Authenticating with token via stdin..."
  TOKEN="${GITHUB_TOKEN:-}"
  if [[ -z "$TOKEN" ]]; then
    read -r -s -p "Enter PAT (input hidden): " TOKEN; echo
  fi
  echo "$TOKEN" | gh auth login --hostname github.com --with-token
else
  log "Clearing GITHUB_TOKEN and using browser/device login..."
  unset GITHUB_TOKEN || true
  # Force web/device flow to avoid hostname prompt issues
  if ! gh auth login --hostname github.com --git-protocol https --web; then
    log "Web login failed; falling back to token stdin."
    TOKEN="${GITHUB_TOKEN:-}"
    if [[ -z "$TOKEN" ]]; then
      read -r -s -p "Enter PAT (input hidden): " TOKEN; echo
    fi
    echo "$TOKEN" | gh auth login --hostname github.com --with-token
  fi
fi

# Configure git to use gh credentials
log "Setting up git credential helper via gh..."
gh auth setup-git || true

# Ensure we are in a git repository
if ! git rev-parse --is-inside-work-tree >/dev/null 2>&1; then
  log "Initializing git repository..."
  git init
fi

# Remote setup
if ! git remote | grep -q '^origin$'; then
  log "Adding origin remote: $REMOTE_URL"
  git remote add origin "$REMOTE_URL"
else
  log "Origin exists: $(git remote get-url origin)"
fi

# Branch setup
log "Setting branch to main"
git branch -M main || true

# Install husky hooks
log "Installing dependencies & husky hooks..."
npm install
npm run prepare || true

# Stage and commit changes if any
log "Staging changes..."
git add -A
if ! git diff --cached --quiet; then
  git commit -m "chore(setup): auth + auto-push hook"
else
  log "No changes to commit."
fi

# Push current branch
CUR_BRANCH="$(git branch --show-current || echo main)"
log "Pushing '$CUR_BRANCH' to origin..."
git push -u origin "$CUR_BRANCH"

log "Done. Future commits will auto-push via Husky."
