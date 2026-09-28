# AA Research Publication

A responsive, single-page website for **AA Research Publication**, a manuscript and academic publication support service.

The site presents research-support services, publication packages, testimonials, frequently asked questions, and contact options for researchers seeking help with manuscript development and journal submission.

## Live Website

[Visit AA Research Publication](https://aaresearchpublication.com)

## Features

- Responsive landing-page layout
- Hero section with service positioning and calls to action
- Manuscript and publication-support service listings
- Four-step publication workflow
- Pricing cards for publication-related services
- Researcher testimonials carousel
- FAQ accordion section
- Free manuscript assessment contact form
- Floating WhatsApp contact widget
- Animated reveal and interaction effects
- SEO and social-sharing metadata
- Google Fonts, Font Awesome, Gumroad, and analytics integrations

## Services Presented

- Manuscript development
- Academic editing and proofreading
- Journal selection
- Methods and data support
- Submission preparation
- Reviewer-response and revision support
- Systematic review support

## Technology

- **HTML** — page structure and content
- **CSS** — responsive styling, layout, themes, and animations
- **JavaScript** — navigation, counters, carousel behavior, FAQ interactions, form behavior, and UI effects

## Project Structure

```text
.
├── index.html              # Main website page
├── index-old.html          # Previous version of the website
└── src/
    ├── animations.css      # Animation definitions
    ├── style.css           # Main site styles
    ├── script.js           # Client-side interactions
    └── images/             # Logos, hero artwork, favicon, and other assets
```

## Getting Started

This is a static website and does not require a build system or package manager.

### Run locally

1. Clone the repository:

   ```bash
   git clone https://github.com/arslan688/aa-research-publication.git
   cd aa-research-publication
   ```

2. Open `index.html` directly in a browser, or start a local web server:

   ```bash
   python -m http.server 8000
   ```

3. Visit [http://localhost:8000](http://localhost:8000).

Using a local server is recommended so that relative assets and browser behavior match a deployed website more closely.

## Customization

- Update page content and service information in `index.html`.
- Modify the visual design in `src/style.css`.
- Adjust animations in `src/animations.css`.
- Update interactive behavior in `src/script.js`.
- Replace images and branding assets in `src/images/`.
- Review external checkout, contact, analytics, and social integrations before deployment.

## Deployment

Because the project is a static HTML, CSS, and JavaScript website, it can be deployed to services such as:

- GitHub Pages
- Netlify
- Vercel
- Cloudflare Pages
- Any web server capable of serving static files

Set the deployment directory to the repository root and use `index.html` as the entry point.

## Notes

- Service pricing, testimonials, contact details, and external purchase links are maintained in the HTML.
- External publisher fees and article processing charges are separate from the service prices shown on the website.
- Journal acceptance and editorial decisions are controlled by the relevant journals and are not guaranteed by the service.

## License

No license has been specified for this repository. Contact the repository owner before reusing the website's code, content, branding, or assets.
