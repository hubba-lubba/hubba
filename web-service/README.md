# Frontend Developer Guide

## Description

The project is built with:

-   Vite React
-   TailwindCSS

## Table of Contents

-   [Installation](#installation)
-   [Usage](#usage)
    -   [Documentations](#documentations)
-   [Coding Standards](#coding-standards)
    -   [Prettier](#prettier)
    -   [Structure](#structure)
    -   [Tailwind](#tailwind)

## Installation

Clone the repository using your preferred method.

### ssh:

`git clone git@github.com:hubba-lubba/hubba.git`

Install packages:  
`npm i`

## Usage

Run the dev environment:  
`npm run dev`

Then visit the url printed in the terminal. Default is [http://localhost:5173/](http://localhost:5173/).

### Documentations

-   [React](https://react.dev/reference/react)
-   [Tailwind](https://tailwindcss.com/docs) [[Cheatsheet](https://nerdcave.com/tailwind-cheat-sheet)]
-   [Firebase](https://firebase.google.com/docs/auth)

## Coding Standards

### Prettier*

We use Prettier to keep our code pretty formatted consistently for seamless collaboration. Make sure this is done!

1.  In vscode, install the [Prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode) extension.
2.  Head to `File > Preferences > Settings`
3.  Search for "default formatter"
4.  Set your `Editor: Default Formatter` to `Prettier - Code formatter`
5.  Now, everytime you save with `Ctrl+s`, you should see your filthy code glow up~

### Structure

We'll be following the linked directory structures in our code. Please review them:

-   [React](https://github.com/alan2207/bulletproof-react/blob/master/docs/project-structure.md) [[Example](https://github.com/alan2207/bulletproof-react/tree/master/src)]

In short:

-   `@/components`: reusable components (buttons, form fields)
-   `@/features`: specific pages and features
    -   each feature will contain its own directory structure of components, api, routes, and types
-   `@/assets`: assets like pdfs and images
-   `@/config`: clientside secrets to be exported for use
-   `@/contexts`: react contexts
-   `@/lib`: clientside api functions
-   `@/pages`: a temporary folder for Home. Will be replaced by proper implementation of `@/features`.
-   `@/routes`: high-level page routing (aka middleware)
-   `@/types`: types for object data, like `user` or `organization`. Not for React Header types.
-   `@/utils`: for any custom javascript or react utilities

#### Paths

-   To modularize components and export the ones we need to be used globally, we have an `index.ts` in some directories.
    -   When creating new components or functions that may need to be used globally, please export them in `index.ts`.
    -   Don't include them in `index.ts` if they are only to be used in their local scope and nowhere else.
-   Scopes are primarily folder-based, then can be category based according to our implementation. So each `/features/*/routes/` is its own scope, while `/features/` and `/features/auth/` are also their own scopes.
-   Use the `@` symbol instead relative path to reference components far from current scope. The `@` symbol basically just replaces `/src`.
    -   For example, if I'm accessing a `Button` component from `@/features/components/SigninForm`, I'll use `import @/components/buttons` instead of `import ../../components/buttons`
-   Use relative path instead of `@` when dealing with components from current scope.
    -   For example, if I'm accessing `@/features/components/SignupForm` from `@/features/components/Layout`, I'll use `import ./SignupForm` instead of `import @/features/auth/components/SignupForm`.
        -   Failing to do this may also result in errors - in our example, SigninForm is locally scoped and not exported, so the compiler will whine about not being able t find `@/features/auth/components/SignupForm`.

### Tailwind

Our theme variables are specified in `tailwind.config.js`. Use those instead of hardcoding colors.

### Twitch and Youtube "Integration"

We didn't bother integrating Twitch and YouTube API for our MVP (costs and keys). Currently, we simply utilize Twitch embeds and a third-party YouTube thumbnail and title service called "Noembed." 
Please Integrate the Twitch and Youtube API for authorization, extended capabilities, and more features. Should prolly all be done in the backend though.

### Closing Notes From Your Previous Developers

Our primary goal was a fully functional website fulfilling the 'discovery' aspect of the business value proposition, with passable UI design. There will be shitty looking pages and some UI bugs (I think pfps can be non-circular rn) that I'll leave to our dear successors. Also, several TODOs can be found within the project code that should be addressed, as well as shitty repeated code that I couldn't bother to modularize due to time constraints, like the settings pages or api calls.
Please develop your own environment variables and api keys. For this app, we only use the Firebase API for Auth.
Here is an example `.env.local` file:
```
VITE_FIREBASE_CONFIG='{
    "apiKey": "your api key",
    "authDomain": "your auth domain",
    "projectId": "your project id",
    "storageBucket": "your storage bucket",
    "messagingSenderId": "some numbers",
    "appId": "some letters and numbers"
}'
```

That's it. Good luck.

