#!/usr/bin/env bash

set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
PARENT_DIR="$(cd "${ROOT_DIR}/.." && pwd)"

ensure_standalone_repo() {
  local top_level
  top_level="$(git -C "${ROOT_DIR}" rev-parse --show-toplevel 2>/dev/null || true)"

  if [[ "${top_level}" != "${ROOT_DIR}" ]]; then
    cat <<EOF
Globe is not a standalone git repository yet.

Recommended commands:
  cd "${ROOT_DIR}"
  git init
  git add .
  git commit -m "Initialize Globe planning and parallel dev scaffold"
  git branch -M main

Current git top-level: ${top_level:-none}
EOF
    exit 1
  fi
}

create_worktree() {
  local dir="$1"
  local branch="$2"

  if [[ -d "${dir}" ]]; then
    echo "[skip] worktree directory already exists: ${dir}"
    return
  fi

  if git -C "${ROOT_DIR}" show-ref --verify --quiet "refs/heads/${branch}"; then
    git -C "${ROOT_DIR}" worktree add "${dir}" "${branch}"
  else
    git -C "${ROOT_DIR}" worktree add "${dir}" -b "${branch}" main
  fi
}

ensure_standalone_repo

create_worktree "${PARENT_DIR}/03_Globe-web" "codex/frontend-mvp"
create_worktree "${PARENT_DIR}/03_Globe-api" "codex/backend-mvp"
create_worktree "${PARENT_DIR}/03_Globe-integration" "codex/integration-mvp"

echo
echo "Created worktrees:"
git -C "${ROOT_DIR}" worktree list
