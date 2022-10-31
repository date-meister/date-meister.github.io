const cmp_date = "full-date";
const cmp_clock = "day-clock";
const cmp_count = "day-count";
const named = (s) => `<` + s + `>`;
// ================================================================
const fullDate = (
  date,
  locale,
  options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  }
) => date.toLocaleDateString(locale, options);
// ================================================================
const dayClock = (locale, seconds, scope) =>
  new Date()
    .toLocaleTimeString(
      locale,
      seconds
        ? {
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
          }
        : { timeStyle: "short" }
    )
    .split(":")
    .join(
      `<span style="opacity:${
        seconds ? 1 : (scope.show = !scope.show) ? 1 : 0
      }">:</span>`
    );
// ================================================================
const dayCount = (scope) =>
  ~~(
    (new Date(scope.getAttribute("to"))?.getTime() - scope.date?.getTime()) /
    (1000 * 3600 * 24)
  );
// ================================================================
console.log(
  "%c Date Web Components: ",
  "background:green;color:yellow",
  "\n",
  named(cmp_date),
  fullDate(new Date(), navigator.language),
  "\n",
  named(cmp_clock),
  dayClock(navigator.language, true),
  "\n",
  named(cmp_count),
  dayCount(document.body)
);
// ================================================================
class DateComponentClass extends HTMLElement {
  connectedCallback() {
    this.style.display = "inline-block";
    this.locale = this.getAttribute("locale") || navigator.language; //"nl-NL"; //"en-US";
    this.date = new Date(this.getAttribute("date") || Date.now());
    this.render();
  }
}
// ================================================================
customElements.define(
  cmp_date,
  class extends DateComponentClass {
    render() {
      this.innerHTML = fullDate(this.date, this.locale);
    }
  }
);
// ================================================================
customElements.define(
  cmp_clock,
  class extends DateComponentClass {
    render(seconds = false) {
      this.innerHTML = dayClock(this.locale, seconds, this);
      if (!seconds) setTimeout(() => this.render(), 1000);
    }
  }
);
// ================================================================
customElements.define(
  cmp_count,
  class extends DateComponentClass {
    render() {
      this.innerHTML = dayCount(this);
    }
  }
);
