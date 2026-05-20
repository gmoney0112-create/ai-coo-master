#!/usr/bin/env bash
# =============================================================================
# new_client.sh — AI COO System
# Scaffolds a new client folder from the demo_client template.
#
# Usage:
#   bash Scripts/new_client.sh <client_name>
#
# Example:
#   bash Scripts/new_client.sh soul_prosperity
#
# What it does:
#   1. Validates the client name (snake_case, no spaces)
#   2. Checks that demo_client template exists
#   3. Copies Clients/demo_client/ -> Clients/<client_name>/
#   4. Replaces CLIENT_NAME=demo_client with CLIENT_NAME=<client_name> in env file
#   5. Prints a next-steps checklist
# =============================================================================

set -euo pipefail

# --- Colors ---
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# --- Helpers ---
info()    { echo -e "${BLUE}[INFO]${NC}  $1"; }
success() { echo -e "${GREEN}[OK]${NC}    $1"; }
warn()    { echo -e "${YELLOW}[WARN]${NC}  $1"; }
error()   { echo -e "${RED}[ERROR]${NC} $1"; exit 1; }

# --- Validate argument ---
if [ $# -eq 0 ]; then
  error "No client name provided.\n  Usage: bash Scripts/new_client.sh <client_name>\n  Example: bash Scripts/new_client.sh soul_prosperity"
fi

CLIENT_NAME="$1"

# Validate snake_case (lowercase letters, digits, underscores only)
if ! echo "$CLIENT_NAME" | grep -qE '^[a-z][a-z0-9_]*$'; then
  error "Client name must be snake_case (lowercase letters, digits, underscores only).\n  Bad:  'Soul Prosperity' or 'soul-prosperity'\n  Good: 'soul_prosperity'"
fi

# --- Paths ---
REPO_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/../" && pwd)"
TEMPLATE_DIR="$REPO_ROOT/Clients/demo_client"
CLIENT_DIR="$REPO_ROOT/Clients/$CLIENT_NAME"
ENV_FILE="$CLIENT_DIR/env/client.env"

info "Repo root:     $REPO_ROOT"
info "Template:      $CLIENTS_DIR/demo_client"
info "New client:    $CLIENT_DIR"
echo ""

# --- Check template exists ---
if [ ! -d "$TEMPLATE_DIR" ]; then
  error "Template not found at $TEMPLATE_DIR. Run this script from the repo root."
fi

# --- Check client doesn't already exist ---
if [ -d "$CLIENT_DIR" ]; then
  error "Client folder already exists: $CLIENT_DIR\n  To start fresh, remove it first: rm -rf $CLIENT_DIR"
fi

# --- Copy template ---
info "Copying demo_client template to Clients/$CLIENT_NAME ..."
cp -r "$TEMPLATE_DIR" "$CLIENT_DIR"
success "Folder created: Clients/$CLIENT_NAME"

# --- Update CLIENT_NAME in env file ---
if [ -f "$ENV_FILE" ]; then
  info "Updating CLIENT_NAME in env file ..."
  # Use sed to replace the placeholder value
  sed -i.bak "s/^CLIENT_NAME=demo_client$/CLIENT_NAME=$CLIENT_NAME/" "$ENV_FILE"
  rm -f "$ENV_FILE.bak"
  success "CLIENT_NAME set to '$CLIENT_NAME' in $ENV_FILE"
else
  warn "env/client.env not found — skipping CLIENT_NAME update."
fi

# --- Create notes subfolder files ---
info "Creating notes/ files ..."
NOTES_DIR="$CLIENT_DIR/notes"
mkdir -p "$NOTES_DIR"

cat > "$NOTES_DIR/kickoff.md" << EOF
# Kickoff Notes — $CLIENT_NAME

> Fill this in during or immediately after the onboarding call.

## Call Date

## Attendees

## Client's #1 Pain

## Current Stack

## Top 3 Automation Gaps
1.
2.
3.

## Agreed Next Steps

## Open Questions
EOF

cat > "$NOTES_DIR/custom_steps.md" << EOF
# Custom Steps — $CLIENT_NAME

> Log any steps taken for this client that differ from the standard Deployment Checklist.
> These notes feed back into the master checklist after Client 1.

## Non-Standard Steps

## Gotchas / Watch-Outs

## Improvements to Template
EOF

success "Notes files created in Clients/$CLIENT_NAME/notes/"

# --- Create workflows subfolders ---
info "Creating workflows/ subfolders ..."
mkdir -p "$CLIENT_DIR/workflows/ghl_exports"
mkdir -p "$CLIENT_DIR/workflows/n8n_exports"
touch "$CLIENT_DIR/workflows/ghl_exports/.gitkeep"
touch "$CLIENT_DIR/workflows/n8n_exports/.gitkeep"
success "Workflow export folders created."

# --- Done ---
echo ""
echo -e "${GREEN}============================================================${NC}"
echo -e "${GREEN}  Client '$CLIENT_NAME' scaffolded successfully.${NC}"
echo -e "${GREEN}============================================================${NC}"
echo ""
echo "Next steps:"
echo "  1. Open Clients/$CLIENT_NAME/env/client.env and fill in all values."
echo "  2. Open Clients/$CLIENT_NAME/README.md and update the client info table."
echo "  3. Duplicate the GHL 'AI COO Template' subaccount and rename to $CLIENT_NAME."
echo "  4. Import workflows from Workflows/GHL/ into the new GHL subaccount."
echo "  5. Run: node Scripts/validate_env.js Clients/$CLIENT_NAME/env/client.env"
echo "  6. Follow Docs/Deployment_Checklist.md for the full Week 1-4 process."
echo ""
