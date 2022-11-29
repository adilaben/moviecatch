export default function getAge(date) {
  const diff = Date.now() - date.getTime();
  const age = new Date(diff);
  return Math.abs(age.getUTCFullYear() - 1970);
}
