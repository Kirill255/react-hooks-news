This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

# react-hooks-news

## Firebase

### Functions

1. `npx firebase-tools login`

2. `npx firebase-tools init functions`

- Select a default Firebase project for this directory: _select your project_

- What language would you like to use to write Cloud Functions? _JavaScript_

- Do you want to use ESLint to catch probable bugs and enforce style? _No_

- Do you want to install dependencies with npm now? _Yes_

3. After creating function `npx firebase-tools deploy --only functions`

### Deploy

1. `npm run build`

2. `npx firebase-tools init hosting`

- What do you want to use as your public directory? _build_

- Configure as a single-page app (rewrite all urls to /index.html)? _y_

- File build/index.html already exists. Overwrite? _N_

3. `npx firebase-tools deploy`
