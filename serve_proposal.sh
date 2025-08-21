#!/bin/zsh
# Simple local server to present the proposal in a browser
cd "$(dirname "$0")"
python3 -m http.server 8025 >/dev/null 2>&1 &
SERVER_PID=$!
sleep 1
open "http://localhost:8025/proposal_cross_creek.html"
wait $SERVER_PID


