const politeAlert = document.querySelector("#sr-polite-warning");
const assertiveAlert = document.querySelector("#sr-assertive-warning");

export function alertSrPolitely(message: string) {
  politeAlert!.textContent = message;
}

export function alertSrAssertively(message: string) {
  assertiveAlert!.textContent = message;
}
