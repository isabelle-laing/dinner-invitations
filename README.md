# Sicilian Summer Evening

An editable GitHub Pages invitation with personalised guest links and RSVP responses saved to your own Google Sheet.

## What you can edit

- `index.html`: all visible wording, the menu, payment details, and Spotify link
- `styles.css`: colours, fonts, spacing, and the full visual design
- `script.js`: guest names and the Google Sheet connection
- `assets/sicilian-dinner-invite.png`: the invitation image

The playlist colours are near the top of `styles.css`:

```css
--playlist-green: #315f57;
--playlist-yellow: #fff0ad;
```

Change either hex code, save the file, and upload the changed file to GitHub.

## Part 1: Connect the RSVP form to Google Sheets

1. Create a blank Google Sheet. Give it any name you like.
2. In the Sheet, open **Extensions > Apps Script**.
3. Delete the example code in the editor.
4. Open `google-apps-script/Code.gs` from this folder and copy all of it into the Apps Script editor.
5. Save the script.
6. Select **Deploy > New deployment**.
7. Choose **Web app** as the deployment type.
8. Set **Execute as** to yourself.
9. Set access to **Anyone** so guests can submit without signing into Google.
10. Deploy and complete Google's authorization screen.
11. Copy the web app URL. It should end in `/exec`.
12. Open `script.js` and replace this line:

```js
const APPS_SCRIPT_URL = "PASTE_YOUR_GOOGLE_APPS_SCRIPT_URL_HERE";
```

with your copied URL:

```js
const APPS_SCRIPT_URL = "https://script.google.com/macros/s/YOUR_DEPLOYMENT_ID/exec";
```

The script creates an `RSVPs` tab automatically. If somebody submits again, their existing row is updated instead of duplicated.

Google's official web app guide: <https://developers.google.com/apps-script/guides/web>

## Part 2: Put the website on GitHub Pages

1. Create a new GitHub repository. A name such as `sicilian-summer-evening` works well.
2. Upload the **contents** of this folder to the root of the repository. `index.html` should be visible at the top level.
3. Commit the files.
4. Open the repository's **Settings**.
5. Select **Pages** in the sidebar.
6. Under **Build and deployment**, choose **Deploy from a branch**.
7. Select the `main` branch and the `/ (root)` folder, then save.
8. GitHub will show the published address after deployment finishes.

GitHub's official guide: <https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site>

## Personalised links

Add the guest code to the end of the published URL. For example:

```text
https://YOUR-USERNAME.github.io/sicilian-summer-evening/?invite=isabella
```

Your five guest codes are:

```text
?invite=isabella
?invite=matteo
?invite=darrell
?invite=melana
?invite=kaiden
```

## Test before sending

1. Open one personalised link in a private browser window.
2. Confirm the correct name appears.
3. Submit a test Yes RSVP.
4. Check that it appears in the `RSVPs` tab of your Google Sheet.
5. Submit again and confirm the same row updates.
6. Test a No RSVP too.

## A few useful notes

- GitHub Pages is public. Your payment email and phone number are visible in the page source.
- The personalised names are friendly customisation, not security. Someone can change the guest code in the URL.
- Spotify collaborative invite links expire after seven days. Generate a new collaborator link and replace the playlist URL in `index.html` if needed.
- If you change `Code.gs` after deploying it, create a new deployment version before testing the update.
