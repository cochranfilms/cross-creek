#!/bin/zsh
# Local server to present the IDX demo
cd "$(dirname "$0")"
python3 -m http.server 8030 >/dev/null 2>&1 &
SERVER_PID=$!
sleep 1
open "http://localhost:8030/idx-demo.html"
wait $SERVER_PID


