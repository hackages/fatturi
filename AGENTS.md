<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

<!-- BEGIN:campaign-drive -->
# Campaign media → Google Drive (mandatory)

Whenever you create or regenerate files under `public/campaign/` (reels, carousels, cards, audio), you **must** publish them to Drive with `DRIVE_FOLDER_ID` before finishing:

```bash
node scripts/drive/publish-day.mjs --day=jNN --send
```

Upload both `VO + musique` and `VO seule` reel variants. See `.cursor/rules/campaign-drive-publish.mdc`.
<!-- END:campaign-drive -->
