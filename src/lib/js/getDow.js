export function getDow() {
  let now = new Date();
  const week = ["일", "월", "화", "수", "목", "금", "토"];
  let dow = week[now.getDay()];
  return dow;
}
