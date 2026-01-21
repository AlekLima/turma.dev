# turma.dev

Cada dev tem uma história - conte a sua para a turma

## Instalation

- run `nvm install` to get the npm version defined by `.nvmrc`
- run `nvm alias default lts/{version_name}` if you want to set that npm version as default

# Patterns to follow

At this section we have some patterns defined.

### Code Formatting

- There is an .editorconfig file to set what is expected as code formatting standards
- Prettier was installed here so you can use the scripts `npm run lint:check` and `npm run lint:fix` to solve formatting issues
- You can also use `npm run eslint` also

### Working with issues + branchs

1. First create a issue
2. Set the issue title rightly, use the pattern `[TURMA-XXXXX] + issue_title`
3. Use the generated issue number (#X...) to fill the `XXXXX` part

   3.1 As example: if the issue is `#86` the code will be `TURMA-00086`

   3.2 As another: if is `#3` will be `TURMA-00003`

4. Follow the pattern `feat/TURMA-XXXXX` to create branchs based on the issue that was opened

### Issue + Branch Example

This [issue #1](https://github.com/jemluz/turma.dev/issues/1) is linked with [feat/TURMA-00001](https://github.com/jemluz/turma.dev/tree/feat%2FTURMA-00001) branch
<img width="1254" height="807" alt="image" src="https://github.com/user-attachments/assets/eb301820-9742-416d-8656-16cfc5f580fd" />
