#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
SITE_DIR="$ROOT_DIR/site"
HOST="${HOST:-127.0.0.1}"
PORT="${PORT:-${1:-8000}}"

if ! command -v python3 >/dev/null 2>&1; then
	echo "python3 is required to run the local static server." >&2
	exit 1
fi

if python3 - "$HOST" "$PORT" <<'PY'
import socket
import sys

host, port = sys.argv[1], int(sys.argv[2])
with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as sock:
    sys.exit(0 if sock.connect_ex((host, port)) == 0 else 1)
PY
then
	echo "Veritas already appears to be running at http://$HOST:$PORT/."
	echo "Use Ctrl+C in the server terminal to stop it."
	exit 0
fi

cd "$SITE_DIR"

echo "Serving Veritas from $SITE_DIR"
echo "Open http://$HOST:$PORT/"
echo "Press Ctrl+C to stop."

exec python3 -m http.server "$PORT" --bind "$HOST"