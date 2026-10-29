# A little forever — Shilpa & Aviral

A personal Karwa Chauth gift: five responsive pages, wedding photographs, a love letter with a hidden postscript, five promises, eight little love notes, and four romantic YouTube songs.

## Preview

No install or build is needed. From this directory:

```sh
python3 -m http.server 8000
```

Open http://localhost:8000. You can also open `index.html` directly; embedded YouTube videos work best over HTTP/HTTPS.

## Publish on GitHub Pages

1. Push these changes to your GitHub repository's `main` or `master` branch.
2. In the repository, open **Settings → Pages → Build and deployment → Source**, and choose **GitHub Actions**.
3. In **Actions**, run **Deploy our little forever**, or push another commit. Once the deployment succeeds, GitHub shows your site URL.

For `aviral-bhardwaj/happy-karwa-chaut`, the expected URL is https://aviral-bhardwaj.github.io/happy-karwa-chaut/ after a successful deployment. All links and assets are relative, so repository subpaths work. The workflow publishes only the website and optimized assets, excluding the original full-size photos and local QA files.

Alternatively, choose **Deploy from a branch**, select the branch and `/ (root)`, and disable the included Actions workflow to avoid duplicate deployments.

## Make it yours

- `index.html`: welcome and chapter links.
- `moments.html`: album. Add photos and matching `data-photo` buttons here; the viewer reads them automatically.
- `letter.html`: the letter and hidden P.S. The print layout lets you save the letter as a PDF through your browser.
- `promises.html`: promises and the first love note. Edit the eight rotating notes in `script.js`.
- `songs.html`: change song titles, credits, YouTube links, and matching `data-video` / `data-title` attributes. Keep the intro button consistent with your first song.
- `styles.css`: colours, type, layout, mobile styles, and reduced-motion support.
- `assets/photos/`: smaller display copies of the supplied photos. Originals remain untouched in `photos/`.

## Music sources

- [Do You Know — Diljit Dosanjh](https://www.youtube.com/watch?v=P-DhwN87JDY)

- [Raataan Lambiyan — Sony Music India](https://www.youtube.com/watch?v=gvyUuxdRdR4)
- [Kesariya — Sony Music India](https://www.youtube.com/watch?v=BddP6PYo2gs)
- [Tum Se Hi — T-Series](https://www.youtube.com/watch?v=mt9xg0mmt28) ([publisher listing](https://www.tseries.com/videos/tseries/PL9bw4S5ePsEElQF-B9PCiGIIRvE_-LFhM/mt9xg0mmt28))

The floating “Play our song” button starts **Do You Know** and loops it while visitors move between the five pages. Navigation preserves the same player, including browser Back/Forward. The visible YouTube controls can pause playback, and the × button stops it. Selecting another track stops background music to prevent overlapping audio. A full refresh or a new tab requires pressing play again; browsers may require another tap inside YouTube. The close preference lasts for the browser session.

Music loads only after a play button is pressed. Videos use YouTube's privacy-enhanced embed domain. Playback remains subject to YouTube availability, regional restrictions, and browser autoplay rules. Every track also has a direct YouTube link, and closing the player stops playback.

The site is static; it has no account system, analytics, or backend. Fonts are requested from Google Fonts, with local fallbacks. Core pages and direct song links work without JavaScript.
