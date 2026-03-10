#!/usr/bin/env bash

set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
PARENT_DIR="$(cd "${ROOT_DIR}/.." && pwd)"
TOP_LEVEL="$(git -C "${ROOT_DIR}" rev-parse --show-toplevel 2>/dev/null || true)"

if [[ "${TOP_LEVEL}" != "${ROOT_DIR}" ]]; then
  echo "Globe is not a standalone git repository yet."
  echo "Current git top-level: ${TOP_LEVEL:-none}"
  echo
  echo "Recommended commands:"
  echo "  cd \"${ROOT_DIR}\""
  echo "  git init"
  echo "  git add ."
  echo "  git commit -m \"Initialize Globe planning and parallel dev scaffold\""
  echo "  git branch -M main"
  exit 1
fi

print_status() {
  local dir="$1"
  local label="$2"

  if ! git -C "${dir}" rev-parse --is-inside-work-tree >/dev/null 2>&1; then
    echo "== ${label} =="
    echo "not a git worktree: ${dir}"
    echo
    return
  fi

  echo "== ${label} =="
  echo "path: ${dir}"
  git -C "${dir}" branch --show-current
  git -C "${dir}" status --short --branch
  echo
}

echo "== worktree list =="
git -C "${ROOT_DIR}" worktree list 2>/dev/null || echo "Globe is not a standalone git repo yet."
echo

print_status "${ROOT_DIR}" "root"
print_status "${PARENT_DIR}/03_Globe-integration" "integration"
print_status "${PARENT_DIR}/03_Globe-api" "backend"
print_status "${PARENT_DIR}/03_Globe-web" "frontend"
