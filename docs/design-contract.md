# A little forever — design contract

A personal, five-page Karwa Chauth gift from Aviral to Shilpa. Existing names and three local wedding photographs are the source of truth; no invented dates or relationship milestones.

Direction: intimate editorial scrapbook, warm ivory, wine ink, muted gold, large serif headlines and handwritten annotations. Their wedding portrait is the first-screen focal point. Primary action: read the letter. Secondary: browse memories and listen to songs.

Target viewports: 1440x900 and 390x844. All pages are real static HTML with relative links for GitHub project Pages, no runtime build dependency. Navigation, letter and song links work without JS. Native dialogs provide focus trapping and Escape dismissal; buttons have visible focus and minimum 44px targets. Reduced-motion preferences suppress decorative transitions.

States: local content renders immediately; images reserve dimensions. Photo viewer has a loading/error status. Songs load on explicit action in a titled YouTube privacy-enhanced iframe, with a persistent direct YouTube fallback for blocked embeds. No account, permission, user-data form, or empty collection is needed. Opening a letter postscript reveals confirmation; reason button cycles all eight messages. Missing external fonts fall back to local serif/sans-serif fonts.
