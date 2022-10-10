const cmp_date = "full-date";
const cmp_clock = "day-clock";
const cmp_count = "day-count";
const cmp_since = "period-since";
const cmp_to = "period-to";
console.log(
  "%c Date Web Components: ",
  "background:green;color:yellow",
  cmp_date,
  cmp_clock,
  cmp_count,
  cmp_since,
  cmp_to
);
class DateComponentClass extends HTMLElement {
  connectedCallback() {
    this.style.display = "inline-block";
    this.locale = this.getAttribute("locale") || "nl-NL"; //"en-US";
    this.date = new Date(this.getAttribute("date") || Date.now());
    this.render();
  }
}
customElements.define(
  cmp_date,
  class extends DateComponentClass {
    render(
      options = {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      }
    ) {
      this.innerHTML = this.date.toLocaleDateString(this.locale, options);
    }
  }
);
customElements.define(
  cmp_clock,
  class extends DateComponentClass {
    render(seconds = false) {
      this.innerHTML = new Date()
        .toLocaleTimeString(
          this.locale,
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
            seconds ? 1 : (this.show = !this.show) ? 1 : 0
          }">:</span>`
        );
      if (!seconds) setTimeout(() => this.render(), 1000);
    }
  }
);
customElements.define(
  cmp_count,
  class extends DateComponentClass {
    render() {
      this.innerHTML = ~~(
        (new Date(this.getAttribute("to")).getTime() - this.date.getTime()) /
        (1000 * 3600 * 24)
      );
    }
  }
);
