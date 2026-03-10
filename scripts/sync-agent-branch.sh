#!/usr/bin/env bash

set -euo pipefail

if [[ $# -ne 1 ]]; then
  echo "Usage: bash scripts/sync-agent-branch.sh <frontend|backend|integration>"
  exit 1
fi

TARGET="$1"
ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
PARENT_DIR="$(cd "${ROOT_DIR}/.." && pwd)"

case "${TARGET}" in
  frontend)
    WORKTREE_DIR="${PARENT_DIR}/03_Globe-web"
    BRANCH="codex/frontend-mvp"
    ;;
  backend)
    WORKTREE_DIR="${PARENT_DIR}/03_Globe-api"
    BRANCH="codex/backend-mvp"
    ;;
  integration)
    WORKTREE_DIR="${PARENT_DIR}/03_Globe-integration"
    BRANCH="codex/integration-mvp"
    ;;
  *)
    echo "Unknown target: ${TARGET}"
    echo "Expected one of: frontend, backend, integration"
    exit 1
    ;;
esac

TOP_LEVEL="$(git -C "${ROOT_DIR}" rev-parse --show-toplevel 2>/dev/null || true)"
if [[ "${TOP_LEVEL}" != "${ROOT_DIR}" ]]; then
  echo "Globe must be a standalone git repository before syncing agent branches."
  exit 1
fi

ROOT_BRANCH="$(git -C "${ROOT_DIR}" branch --show-current)"
if [[ "${ROOT_BRANCH}" != "main" ]]; then
  echo "Root repository must be on 'main' before running this script."
  echo "Current root branch: ${ROOT_BRANCH}"
  exit 1
fi

if [[ ! -d "${WORKTREE_DIR}" ]]; then
  echo "Missing worktree directory: ${WORKTREE_DIR}"
  echo "Run: bash scripts/setup-worktrees.sh"
  exit 1
fi

if git -C "${ROOT_DIR}" remote get-url origin >/dev/null 2>&1; then
  git -C "${ROOT_DIR}" pull --ff-only origin main
fi

CURRENT_WORKTREE_BRANCH="$(git -C "${WORKTREE_DIR}" branch --show-current)"
if [[ "${CURRENT_WORKTREE_BRANCH}" != "${BRANCH}" ]]; then
  echo "Unexpected branch in ${WORKTREE_DIR}: ${CURRENT_WORKTREE_BRANCH}"
  echo "Expected: ${BRANCH}"
  exit 1
fi

git -C "${WORKTREE_DIR}" merge main

echo "Synced ${BRANCH} with main."
