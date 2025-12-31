#!/usr/bin/env bash

# dev.sh - Automate bun-based development server startup

set -e

# Color codes
BLUE="\033[1;34m"
GREEN="\033[1;32m"
YELLOW="\033[1;33m"
RED="\033[1;31m"
RESET="\033[0m"

info()    { echo -e "${BLUE}[INFO]${RESET} $1"; }
success() { echo -e "${GREEN}[SUCCESS]${RESET} $1"; }
warn()    { echo -e "${YELLOW}[WARN]${RESET} $1"; }
error()   { echo -e "${RED}[ERROR]${RESET} $1"; }

# Check node_modules
if [ ! -d node_modules ]; then
  info "node_modules not found. Installing dependencies with bun..."
  if bun install; then
    success "Dependencies installed."
  else
    error "bun install failed. Exiting."
    exit 1
  fi
else
  info "node_modules found. Skipping install."
fi

# Check .env
if [ -f .env.local ] && [ ! -f .env ]; then
  info ".env not found. Copying .env.local to .env..."
  if cp .env.local .env; then
    success ".env created from .env.local."
  else
    error "Failed to copy .env.local to .env. Exiting."
    exit 1
  fi
elif [ -f .env ]; then
  info ".env file exists."
else
  warn ".env.example not found. Skipping environment setup."
fi

# Start dev server
info "Starting development server with bun dev..."
if bun dev; then
  success "Development server started."
else
  error "Failed to start development server. Exiting."
  exit 1
fi
