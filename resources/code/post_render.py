import os
import shutil

# Get the Quarto profile from environment variables
profile = os.getenv("QUARTO_PROFILE")

if profile == "escuela":
    print(f"POST-SCRIPT: <escuela> profile active, removing escuela content...")

    dir_name = "escuela"
    current_dir = os.getcwd()
    target_path = os.path.join(current_dir, dir_name)

    if os.path.exists(target_path) and os.path.isdir(target_path):
        try:
            shutil.rmtree(target_path)
        except Exception as e:
            pass

    # Rename "__escuela" dir to "escuela"
    source_dir = "__escuela"
    dest_dir = "escuela"

    if os.path.exists(source_dir) and os.path.isdir(source_dir):
        try:
            os.rename(source_dir, dest_dir)
        except Exception as e:
            pass
