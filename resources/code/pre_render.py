import os
import shutil

# Get the Quarto profile from environment variables
profile = os.getenv("QUARTO_PROFILE")

if profile == "escuela":
    print(f"PRE_SCRIPT: <escuela> profile active, generating escuela content...")

    # Define source and destination directories
    source_dir = "facultad"
    dest_dir = "escuela"

    # If "escuela" directory exists, rename it to "__escuela"
    if os.path.exists(dest_dir):
        os.rename(dest_dir, f"__{dest_dir}")

    # Copy the "facultad" directory to "escuela"
    if os.path.exists(dest_dir):
        shutil.rmtree(dest_dir)  # Remove existing "escuela" directory if it exists
    shutil.copytree(source_dir, dest_dir)

    # Copy the "facultad" directory inside _freeze
    freeze_dir = "_freeze"
    freeze_dest_dir = os.path.join(freeze_dir, dest_dir)
    if os.path.exists(freeze_dest_dir):
        shutil.rmtree(freeze_dest_dir)  # Remove existing "escuela" directory if it exists
    shutil.copytree(dest_dir, freeze_dest_dir)

    # Modify "index.qmd" in the new "escuela" directory
    index_file = os.path.join(dest_dir, "facultad.qmd")
    if os.path.exists(index_file):
        with open(index_file, "r", encoding="utf-8") as file:
            content = file.read()
        content = content.replace("Facultad", "Escuela")
        with open(index_file, "w", encoding="utf-8") as file:
            file.write(content)

    # Modify "facultad.qmd" for "escuela.qmd"
    if os.path.exists(index_file):
        os.rename(index_file, os.path.join(dest_dir, "escuela.qmd"))

    # Modify .qmd files in "escuela/material"
    material_dir = os.path.join(dest_dir, "material")
    if os.path.exists(material_dir):
        for file_name in os.listdir(material_dir):
            if file_name.endswith(".qmd"):
                file_path = os.path.join(material_dir, file_name)
                with open(file_path, "r", encoding="utf-8") as file:
                    file_content = file.readlines()

                inside_tag = False
                new_content = []

                for line in file_content:
                    if "<__facultad_content__>" in line:
                        inside_tag = True
                        continue  # Skip the line with the opening tag
                    if "</__facultad_content__>" in line:
                        inside_tag = False
                        continue  # Skip the line with the closing tag
                    if not inside_tag:
                        new_content.append(line)

                new_content = "".join(new_content).replace("`[Advanced]`", "")

                with open(file_path, "w", encoding="utf-8") as file:
                    file.write(new_content)

    #
