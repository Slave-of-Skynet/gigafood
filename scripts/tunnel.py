import subprocess
import re
import sys
import os

def run_tunnel():
    exe = os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))), 'cloudflared.exe')
    if not os.path.exists(exe):
        exe = 'cloudflared.exe'
    
    cmd = [exe, 'tunnel', '--url', 'http://127.0.0.1:5173']
    print(f"Starting tunnel: {' '.join(cmd)}")
    sys.stdout.flush()

    proc = subprocess.Popen(cmd, stdout=subprocess.PIPE, stderr=subprocess.STDOUT, text=True, encoding='utf-8')
    url_saved = False

    while True:
        line = proc.stdout.readline()
        if not line:
            break
        print(line, end='')
        sys.stdout.flush()

        if not url_saved:
            m = re.search(r'https://[a-zA-Z0-9-]+\.trycloudflare\.com', line)
            if m:
                url = m.group(0)
                url_file = os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))), 'public_url.txt')
                with open(url_file, 'w', encoding='utf-8') as f:
                    f.write(url + '\n')
                print(f"\n========================================\nPUBLIC URL: {url}\n========================================\n")
                sys.stdout.flush()
                url_saved = True

    proc.wait()

if __name__ == '__main__':
    run_tunnel()
