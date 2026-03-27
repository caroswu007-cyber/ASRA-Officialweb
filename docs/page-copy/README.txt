Page copy workbooks (trilingual workflow)
============================================

Files in this folder:
- 01-首页.xlsx
- 02-组织介绍.xlsx
- 03-创始人故事.xlsx
- 04-视频目录-灵魂档案.xlsx
- 05-视频目录-灵体医学.xlsx
- 06-视频目录-万有元神.xlsx
- 07-我们的成就.xlsx

Columns:
- block_key: stable id — keep when sending edits back
- section_板块: rough screen location
- kind: heading / button / paragraph (hint only)
- english_源文: current English or source text on site
- 中文: Simplified Chinese (from zh layer where present)
- Latin_Latina: fill in for Latin
- notes: file/source hint

Regenerate workbooks from repo: npm run export:page-xlsx

Apply workbook text to the live site source of truth:
  npm run import:page-xlsx

This now generates:
  src/content/pageCopyDocs.generated.ts

The website reads this generated file at runtime for both English and Chinese page copy.
That means the page text follows these workbooks directly, instead of relying on older
static content files as the primary source.

Important — duplicate block_key:
  If the same block_key appears in more than one .xlsx, only the FIRST file (by name:
  01, 02, … 07) is used. Later rows are ignored.

Optional: dump all sheets to JSON for diff/review:
  npm run dump:page-copy
  → docs/page-copy-dump.json
