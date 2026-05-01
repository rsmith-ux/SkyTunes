#!/usr/bin/env python3
"""
Wax & Weather — Local Launcher
Run this to start the app. It opens automatically in your browser.
"""
import http.server, socketserver, webbrowser, threading, os, sys

PORT = 8765
DIR  = os.path.dirname(os.path.abspath(__file__))

class Handler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *a, **kw):
        super().__init__(*a, directory=DIR, **kw)
    def log_message(self, *a):
        pass  # stay quiet

def open_browser():
    import time; time.sleep(0.4)
    webbrowser.open(f"http://localhost:{PORT}/vinyl-tracker.html")

print(f"  🎵  Wax & Weather is running at http://localhost:{PORT}/vinyl-tracker.html")
print(f"       Press Ctrl+C to stop.\n")
threading.Thread(target=open_browser, daemon=True).start()

with socketserver.TCPServer(("", PORT), Handler) as httpd:
    try:
        httpd.serve_forever()
    except KeyboardInterrupt:
        print("\n  Stopped.")
