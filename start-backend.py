#!/usr/bin/env python3
"""
Health Assessment Backend Startup Script
This script starts all the Flask servers for the health assessment tools.
"""

import subprocess
import sys
import time
import os
from threading import Thread

def start_server(script_path, port, name):
    """Start a Flask server in a separate thread"""
    try:
        print(f"Starting {name} on port {port}...")
        subprocess.run([sys.executable, script_path], cwd=os.path.dirname(script_path))
    except Exception as e:
        print(f"Error starting {name}: {e}")

def main():
    # Get the directory of this script
    script_dir = os.path.dirname(os.path.abspath(__file__))
    python_dir = os.path.join(script_dir, "..", "python", "Health_Assessment", "Health_Assessment")
    
    # Server configurations
    servers = [
        {
            "script": os.path.join(python_dir, "app_phq9.py"),
            "port": 5001,
            "name": "PHQ-9 Depression Assessment"
        },
        {
            "script": os.path.join(python_dir, "app_gad7.py"),
            "port": 5002,
            "name": "GAD-7 Anxiety Assessment"
        },
        {
            "script": os.path.join(python_dir, "app_ghq.py"),
            "port": 5003,
            "name": "GHQ General Health Assessment"
        }
    ]
    
    print("Starting Health Assessment Backend Servers...")
    print("=" * 50)
    
    # Start each server in a separate thread
    threads = []
    for server in servers:
        if os.path.exists(server["script"]):
            thread = Thread(target=start_server, args=(server["script"], server["port"], server["name"]))
            thread.daemon = True
            thread.start()
            threads.append(thread)
        else:
            print(f"Warning: {server['script']} not found!")
    
    print("\nAll servers started!")
    print("Available endpoints:")
    print("- PHQ-9: http://127.0.0.1:5001")
    print("- GAD-7: http://127.0.0.1:5002") 
    print("- GHQ: http://127.0.0.1:5003")
    print("\nPress Ctrl+C to stop all servers")
    
    try:
        # Keep the main thread alive
        while True:
            time.sleep(1)
    except KeyboardInterrupt:
        print("\nShutting down servers...")
        sys.exit(0)

if __name__ == "__main__":
    main()
