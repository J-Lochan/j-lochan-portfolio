# Kasara Aditya — Portfolio

Editorial product-design portfolio for internship applications in Web Product Design, Product Design, and UX/UI.

Live site (after GitHub Pages is enabled):  
https://adityakasara.github.io/kasara-aditya-portfolio/

## Stack

HTML, CSS, and vanilla JavaScript. No framework. Designed for GitHub Pages.

## Local preview

```bash
cd kasara-aditya-portfolio
python3 -m http.server 8080
```

Open http://localhost:8080

## Structure

```
index.html
work/orbit.html
work/foodshare.html
css/style.css
css/case-study.css
css/responsive.css
js/main.js
assets/
resume/Kasara_Aditya_Resume.pdf
```

Paths are relative so the site works from a GitHub Pages project subdirectory.

## Replace later

Orbit and FoodShare screenshots live in `assets/orbit/` and `assets/foodshare/`. Case-study placeholders marked `[ADD …]` are intentional — research and usability numbers are not invented.

## Deploy

1. Push this repository to GitHub.
2. Settings → Pages → Deploy from branch `main` / root.
3. If the repo name is not `kasara-aditya-portfolio`, update the canonical URLs in each HTML `<head>`.
