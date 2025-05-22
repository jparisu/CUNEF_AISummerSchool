
# CONTRIBUTING

## Github contribution

In order to contribute with this [project](https://github.com/jparisu/CUNEF_AISummerSchool) you need to follow the next steps:

1. Clone the repository `git clone https://github.com/jparisu/CUNEF_AISummerSchool.git`
2. Create a new branch `git checkout -b <branch_name>`
3. Once uploaded the branch, create a Pull Request to Github
4. Wait till all checks passed and someone review your code
5. Merge into main


## Project idea

This project is meant to upload slide sessions and notebooks or material referring the 2025 AI Summer School at CUNEF Universidad.


## Structure

The project uses a Quarto environment to generate the documentation in a Github [web page](https://jparisu.github.io/CUNEF_AISummerSchool/).

- In directory `templates` there are all the images, backgrounds, css and configurations for the web page. ⚠️ **do not modify this folder unless you know what you are doing.** ⚠️
- In directory `sessions` each day and/or author can upload their slides and notebooks.
- The quarto result is created in `_build`.
- Relevant files:
    - CUNEF no background logo: `templates/images/cunef.png`
    - CUNEF square logo: `templates/images/logo.jpg`


## Add material

1. Create your own space in `sessions` as a day or author.
2. Each session should have its own index and then the material required (check `sessions/day2`).
3. In order to generate revealjs slides, can use `templates/slides_metadata.yml` as a configuration (check `sessions/day2/jparisu_fundamentals.qmd`)
4. Add your session to `_quarto.yml` index.
