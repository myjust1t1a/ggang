# 휴대폰 엿보기 페이지

본문의 **[[휴대폰]]** 링크를 누르면 등장인물의 휴대폰 홈 화면이 열리고,
전화 · 검색 · 메시지 · 카카오톡 · 메모 · 번역 · 사진 앱을 열어볼 수 있습니다.

## 내용 바꾸기
`data.js` 파일만 고치면 됩니다. (본문, 통화 기록, 검색어, 대화, 메모, 번역, 사진 전부)
- 사진/프로필: `img` 폴더에 이미지를 올리고 `data.js`에 `"img/파일명.jpg"`로 적기
- 휴대폰 바로 열리는 주소: `https://아이디.github.io/저장소이름/#phone`

## GitHub Pages로 올리기
1. github.com 에서 **New repository** → 이름 입력(예: `phone`) → Public → Create
2. **Add file → Upload files** 에서 이 폴더 안의 파일 전부(`index.html`, `style.css`, `app.js`, `data.js`, `img` 폴더)를 끌어다 놓고 **Commit**
3. **Settings → Pages** → Branch를 `main` / `(root)` 로 두고 **Save**
4. 1~2분 뒤 `https://아이디.github.io/phone/` 주소로 접속
