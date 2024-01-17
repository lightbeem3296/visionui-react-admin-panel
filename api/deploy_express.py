import os
import subprocess
import sys
import traceback
from pathlib import Path

CUR_DIR = Path(__file__).parent.absolute()
os.chdir(CUR_DIR)


def os_shell(cmdline: str) -> str:
    try:
        print(f"\> {cmdline}")
        if sys.platform == "win32":
            result = subprocess.run(
                args=f"cmd /c {cmdline}", stdout=subprocess.PIPE, stderr=subprocess.PIPE
            )
        else:
            result = subprocess.run(
                args=f"sh -c {cmdline}", stdout=subprocess.PIPE, stderr=subprocess.PIPE
            )
        print(result.stdout.decode(errors="ignore"))
    except:
        traceback.print_exc()


def main():
    try:
        os_shell("npm run build")
        with open("dist/start.bat", "w") as f:
            f.write("node index.js")
    except:
        traceback.print_exc()


if __name__ == "__main__":
    main()
