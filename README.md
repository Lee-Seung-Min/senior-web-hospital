# Barodoctor Svelte Mobile

## 설치 및 실행

### 설치
```bash
npm ci
```

### 개발 서버 실행
```bash
npm run dev
```

브라우저에서 `https://localhost:5173` 으로 접속

ID: suser02
PW: qwert

## 프로젝트 구조

### 라우팅
- `src/routes/` 폴더 구조가 URL 경로에 매핑됩니다
- 예시: `src/routes/hello/world/+page.svelte` → `https://localhost:5173/hello/world`

### 새 페이지 추가
1. `src/routes/` 하위에 원하는 경로로 폴더 생성
2. `+page.svelte` 파일 생성
3. HTML 마크업 작성

> **중요:** 퍼블리싱 작업 시 기존 파일은 유지하고, 새로운 경로로 파일을 생성해주세요.
> 예: `src/routes/hello/world/+page.svelte` (기존) → `src/routes/hello/world2/+page.svelte` (신규)

```
<!-- src/routes/example/+page.svelte -->
<script>
  // 필요한 경우 스크립트 추가
  console.log('hello world');
</script>

<div>
  <h1>hello world</h1>
</div>
```
