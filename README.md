# CorpusIa

# Getting Started
```
npm i
npm start
```

# Build and deploy
```
npm run build
```
Then serve the content of the dist folder on the hosting provider of your choice. The project is actually built and deployed as github pages.

# Work with theme customization
`data-bs-theme="dark"` or ` data-bs-theme="light"` as attribute of the `<html>` element to switch between ark and light mode.

We use https://bootswatch.com/pulse/ as theme for https://getbootstrap.com/docs/5.3

To customize the theme through a web interface:
- goto https://bootstrap.build/
- select the pulse theme
- make your changes
- download `_variables.scss` and replace `src/scss/_bootswatch-pulse-variables.scss` with the downloaded `_variables.scss`
- download `_custom.scss` (which is actually downloaded as custom.sass but this is a mistake) and replace `src/scss/_bootswatch-pulse-styles.scss` with the downloaded `_custom.scss`

If you want more control on scss customization, you can use `src/scss/custom-variables.scss` and `src/scss/custom-styles.scss` to set your custom classes or any others css rules. Still pay attention that the order of the imports is important inside `src/scss/styles.scss`, and that the custom-variables.scss and custom-styles.scss override the bootswatch variables and styles.