# AI Disclosure 

**Project:** Webify: Digital Marketing Studio for Micro-Enterprises
**Team:** Hexperts, BSIT 3C
**AI tool:** Claude Code desktop app (Anthropic). Model at the time of the latest entries: Claude Opus 5.5.
**Dates covered:** up to November 5, 2026

**Scope:** This file covers one Claude Code session only. The team must add any other AI use, including AI used on the manuscript or literature review.

## AI-assisted tasks

| # | Task | Affected section or files | Prompts |
|---|---|---|---|
| 1 | Built the frontend, including all five feature modules, accessibility modes and logo cut-outs | All of `index.html`, `css/`, `js/`, `assets/`, `tools/serve.ps1`, `README.md` | P1 |
| 2 | Packaged the project as an organized zip | Project folder, `webify.zip` | P2 |
| 3 | Replaced draft template pictures with full template designs and sample photos | `js/preview.js`, `js/photos.js`, `js/pages/templates.js`, `js/data.js`, `css/pages.css` | P3, P4 |
| 4 | Replaced the home page line with a step-by-step rocket animation | `js/pages/home.js`, `css/pages.css` | P5 |
| 5 | Removed the top accessibility bar | `js/app.js`, `css/base.css`, FAQ text | P6 |
| 6 | Made the preview server also answer on 127.0.0.1 | `tools/serve.ps1` | P7 |
| 7 | Explained the project structure and recommended a data approach | No files changed |  |
| 8 | Moved fixed content to JSON files and added a start file (later removed) | `data/*.json`, `js/data.js`, `js/photos.js`, `js/app.js`, `js/pages/check.js`, `index.html`, `tools/serve.ps1`, `README.md` |  |


## Exact prompts

Spelling is kept as typed.

- **P1:** "Act as a senior frontend developer, currently i'm building a projects you can refer on the information above and use that as guide for building,. I want you to create a funtional, with animation, effects design, but at the same time it is easy to use and navigate for the user especially if the user are elders and non techy. Use the information for tools and technologies to be used but for now focus only on the frontend part, set aside the database part. Use the first image as an inpo, and the second image the blue like for the branding and color pallete, and the third image is my actual logo"
  - *Sent with:* the project brief and three images. **Team to do: attach the original brief here, because this file does not reproduce it.**
- **P2:** "give me the actual organized folder"
- **P3:** "in this part in templates, instead of that draft images can you make or intgrate real templates and images" (with 2 screenshots)
- **P4:** "continue"
- **P5:** "this line here i want you to change it or add some animation or rocket to impasize that is the stsp by step process" (with 1 screenshot)
- **P6:** "remove this part on the website" (with 1 screenshot)
- **P7:** "the website is not running" (with 1 screenshot)

## Validation evidence

The AI tool ran these checks in a test browser during the session. **They are not an independent review, so the team should repeat the important ones.**

| Checked | Result |
|---|---|
| JSON files compared with the original `data.js` content | All 14 data groups matched exactly |
| Business Check answered through all 8 questions | Result saved |
| Template list, search and preview | 20 templates listed; searching "salon" returned 3; preview loaded |
| Add to cart and checkout | Item added; order saved under the user's designs |
| Creators and messaging | 8 creators listed; profile opened; message sent and simulated reply received |
| Consultation booking after the JSON change | Topic selection and adviser list checked; **booking not completed in this check** |
| Project dashboard, Help Center, Help panel | Pages loaded with the expected content |
| Saved data after page reload | Order, check result and messages were still there |
| Text size and Clearer colors in the Help Center | Both worked |
| Layout width | No sideways scrolling on the pages checked at 375px; templates also measured at their narrowest preview size |
| One JSON file removed on purpose | Error message appeared; site recovered after restoring the file |
| Photos made to fail on purpose | Template colors appeared in place of broken images |
| Footer email input | Text displays dark on white; invalid and valid emails handled correctly |
| Unzipped copy | Served its pages and JSON files on a separate local port |

