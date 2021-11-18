# Personal Portfolio Website @ florianstrasser.com

## Tech Stack

-   [npm](https://www.npmjs.com/)
-   [Tailwind CSS](https://tailwindcss.com/)
-   [Webpack](https://webpack.js.org/)

## Getting Started

build dev bundle

```
npm run build:dev
```

build production bundle

```
npm run build
```

run dev server

```
npm run serve
```

serve production bundle

```
npm run build && npx serve dist
```

## Project Structure

```
root folder
├── dist/           <-- output folder
├── src/
│   ├── fonts/      <-- font files
│   ├── images/     <-- images to be optimized and exported
│   ├── js/         <-- javascript files
│   ├── scss/       <-- styles
│   ├── static/     <-- static files (copied directly to dist folder)
│   └── index.html  <-- index page
...
```
