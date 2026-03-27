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

Regenerate from repo: npm run export:page-xlsx
