# Responsive Portfolio — Y2K retro edition

**Student name:** Abdessamie Mezaache
**Module:** WAMD, TD-TP 1 (ENSTA, First Semester 2026)

## Project description

A responsive personal portfolio website for a cybersecurity engineering student, dressed in a nostalgic **Y2K retro-futuristic** theme: pale surfaces, a calm pastel palette (periwinkle blue, lilac, mint, blush — no harsh neons), sparkling star details, a fake OS window, and a little easter egg. A visitor can quickly find out who I am, what I can do, what I have built, my education and experience, and how to contact me. The layout adapts to desktop, tablet and smartphone screens.

## Technologies used

| Technology | Purpose |
|---|---|
| HTML5 | Semantic page structure (`header`, `nav`, `main`, `section`, `article`, `figure`, `footer`) |
| CSS3 | Styling, CSS variables, Flexbox, Grid, media queries, light and dark themes |
| JavaScript | DOM manipulation, event handling, form validation |
| Visual Studio Code | Code editor |
| Chrome / Firefox DevTools | Testing, debugging and responsive checks |

## Project structure

```
portfolio/
├── index.html       (all visuals are inline SVG / CSS — no image files needed)
├── css/
│   └── style.css
├── js/
│   └── script.js
├── screenshots/     (desktop light & dark, mobile menu, filters, form validation)
└── README.md
```

## Implemented features

- Five sections: Home, About, Skills, Projects, Contact (plus an education and experience timeline inside About)
- Y2K retro skin: twinkle stars in the hero, iridescent gradient headings and bars, sticky "skill map" bubbles
- Type `y2k` anywhere for a hidden sparkle shower (respects reduced-motion)
- Mobile-first responsive layout with breakpoints at 600px (tablet) and 900px (desktop)
- Hamburger menu on small screens (button click, closes on link click or Escape)
- Light and dark theme toggle, remembered between visits and following the system preference by default
- Interactive skill map in the hero section (click or keyboard select)
- Skill bars that animate when scrolled into view
- Language proficiency bars: Arabic (native), English, French
- Project filter by category (All, Web, Data, Network)
- Menu link highlighting for the section currently in view
- Contact form with client-side validation, inline error messages and a confirmation message on submit
- Y2K chrome: the About card and the contact form are styled as fake OS windows (title bars + dots), pixel-font badges and section tags
- Retro touch: "new!" blinking pill in the nav, fake visitor counter in the footer
- Pop-in entrance animation on hero content (spring easing, reduced-motion aware)
- Real links: GitHub, LinkedIn and email in the Contact section and on the portfolio card
- Accessibility: semantic HTML, skip link, visible keyboard focus, ARIA labels, reduced-motion support

## How to run

Open `index.html` in a browser, or use the Live Server extension in VS Code.

## Screenshots

See the `screenshots/` folder (desktop light & dark, mobile menu, project filters, form validation).

## Live demo (optional)

Enable GitHub Pages on the repository (Settings → Pages → deploy from `main`, root) and the
site will be served at: `https://mathelem.github.io/demoPortfolio/`
