# turma.dev

Cada dev tem uma história - conte a sua para a turma

### Code Formatting

- There is an .editorconfig file to set what is expected as code formatting standards
- Prettier was installed here so you can use the scripts `npm run lint:check` and `npm run lint:fix` to solve formatting issues
- You can also use `npm run eslint` also

### Instalation

- run `nvm install` to get the npm version defined by `.nvmrc`
- run `nvm alias default lts/{version_name}` if you want to set that npm version as default

### Work with branchs

- Follow the pattern feat/TURMA-XXXXX to create branchs based on some issue that was opened
- Use the number of issue (#X...) at the end of feat/TURMA-XXXXX
- At the issue title, use the pattern [TURMA-XXXXX] <issue_title>

Example: (this #1 issue)[https://github.com/jemluz/turma.dev/issues/1] is linked with (feat/TURMA-00001 branch)[https://github.com/jemluz/turma.dev/tree/feat%2FTURMA-00001]
![alt text](image.png)
