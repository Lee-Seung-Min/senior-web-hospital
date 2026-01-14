import { c as create_ssr_component, f as createEventDispatcher, b as add_attribute, d as each, e as escape, a as subscribe, v as validate_component } from "./index3.js";
/* empty css                                         */import { w as writable } from "./index2.js";
function isLeapYear(year) {
  return year % 4 === 0 && year % 100 !== 0 || year % 400 === 0;
}
function getMonthLength(year, month) {
  const feb = isLeapYear(year) ? 29 : 28;
  const monthLengths = [31, feb, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  return monthLengths[month];
}
function toText(date, formatTokens) {
  let text = "";
  if (date) {
    for (const token of formatTokens) {
      if (typeof token === "string") {
        text += token;
      } else {
        text += token.toString(date);
      }
    }
  }
  return text;
}
function getMonthDays(year, month) {
  const monthLength = getMonthLength(year, month);
  const days = [];
  for (let i = 0; i < monthLength; i++) {
    days.push({
      year,
      month,
      number: i + 1
    });
  }
  return days;
}
function getCalendarDays(value, weekStartsOn) {
  const year = value.getFullYear();
  const month = value.getMonth();
  const firstWeekday = new Date(year, month, 1).getDay();
  let days = [];
  const daysBefore = (firstWeekday - weekStartsOn + 7) % 7;
  if (daysBefore > 0) {
    let lastMonth = month - 1;
    let lastMonthYear = year;
    if (lastMonth === -1) {
      lastMonth = 11;
      lastMonthYear = year - 1;
    }
    days = getMonthDays(lastMonthYear, lastMonth).slice(-daysBefore);
  }
  days = days.concat(getMonthDays(year, month));
  let nextMonth = month + 1;
  let nextMonthYear = year;
  if (nextMonth === 12) {
    nextMonth = 0;
    nextMonthYear = year + 1;
  }
  const daysAfter = 42 - days.length;
  days = days.concat(getMonthDays(nextMonthYear, nextMonth).slice(0, daysAfter));
  return days;
}
function getLocaleDefaults() {
  return {
    weekdays: ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"],
    months: [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December"
    ],
    weekStartsOn: 1
  };
}
function getInnerLocale(locale = {}) {
  const innerLocale = getLocaleDefaults();
  if (typeof locale.weekStartsOn === "number") {
    innerLocale.weekStartsOn = locale.weekStartsOn;
  }
  if (locale.months)
    innerLocale.months = locale.months;
  if (locale.weekdays)
    innerLocale.weekdays = locale.weekdays;
  return innerLocale;
}
const css$1 = {
  code: ".date-time-picker.svelte-w239uu.svelte-w239uu{display:inline-block;color:var(--date-picker-foreground, #000000);background:var(--date-picker-background, #ffffff);user-select:none;-webkit-user-select:none;padding:0.5rem;cursor:default;font-size:0.75rem;border:1px solid rgba(103, 113, 137, 0.3);border-radius:3px;box-shadow:0px 2px 6px rgba(0, 0, 0, 0.08), 0px 2px 6px rgba(0, 0, 0, 0.11);outline:none;transition:all 80ms cubic-bezier(0.4, 0, 0.2, 1)}.date-time-picker.svelte-w239uu.svelte-w239uu:focus{border-color:var(--date-picker-highlight-border, #0269f7);box-shadow:0px 0px 0px 2px var(--date-picker-highlight-shadow, rgba(2, 105, 247, 0.4))}.tab-container.svelte-w239uu.svelte-w239uu{outline:none}.top.svelte-w239uu.svelte-w239uu{display:flex;justify-content:center;align-items:center;padding-bottom:0.5rem}.dropdown.svelte-w239uu.svelte-w239uu{margin-left:0.25rem;margin-right:0.25rem;position:relative;display:flex}.dropdown.svelte-w239uu svg.svelte-w239uu{position:absolute;right:0px;top:0px;height:100%;width:8px;padding:0rem 0.5rem;pointer-events:none;box-sizing:content-box}.month.svelte-w239uu.svelte-w239uu{flex-grow:1}.year.svelte-w239uu.svelte-w239uu{flex-grow:1}svg.svelte-w239uu.svelte-w239uu{display:block;fill:var(--date-picker-foreground, #000000);opacity:0.75;outline:none}.page-button.svelte-w239uu.svelte-w239uu{background-color:transparent;width:1.5rem;height:1.5rem;flex-shrink:0;border-radius:5px;box-sizing:border-box;border:1px solid transparent;display:flex;align-items:center;justify-content:center}.page-button.svelte-w239uu.svelte-w239uu:hover{background-color:rgba(128, 128, 128, 0.08);border:1px solid rgba(128, 128, 128, 0.08)}.page-button.svelte-w239uu svg.svelte-w239uu{width:0.68rem;height:0.68rem}select.dummy-select.svelte-w239uu.svelte-w239uu{position:absolute;width:100%;pointer-events:none;outline:none;color:var(--date-picker-foreground, #000000);background-color:var(--date-picker-background, #ffffff);border-radius:3px}select.svelte-w239uu:focus+select.dummy-select.svelte-w239uu{border-color:var(--date-picker-highlight-border, #0269f7);box-shadow:0px 0px 0px 2px var(--date-picker-highlight-shadow, rgba(2, 105, 247, 0.4))}select.svelte-w239uu.svelte-w239uu:not(.dummy-select){opacity:0}select.svelte-w239uu.svelte-w239uu{font-size:inherit;font-family:inherit;-webkit-appearance:none;-moz-appearance:none;appearance:none;flex-grow:1;padding:0rem 0.35rem;height:1.5rem;padding-right:1.3rem;margin:0px;border:1px solid rgba(108, 120, 147, 0.3);outline:none;transition:all 80ms cubic-bezier(0.4, 0, 0.2, 1);background-image:none}.header.svelte-w239uu.svelte-w239uu{display:flex;font-weight:600;padding-bottom:2px}.header-cell.svelte-w239uu.svelte-w239uu{width:1.875rem;text-align:center;flex-grow:1}.week.svelte-w239uu.svelte-w239uu{display:flex}.cell.svelte-w239uu.svelte-w239uu{display:flex;align-items:center;justify-content:center;width:2rem;height:1.94rem;flex-grow:1;border-radius:5px;box-sizing:border-box;border:2px solid transparent}.cell.svelte-w239uu.svelte-w239uu:hover{border:1px solid rgba(128, 128, 128, 0.08)}.cell.today.svelte-w239uu.svelte-w239uu{font-weight:600;border:2px solid var(--date-picker-today-border, rgba(128, 128, 128, 0.3))}.cell.svelte-w239uu.svelte-w239uu:hover{background-color:rgba(128, 128, 128, 0.08)}.cell.disabled.svelte-w239uu.svelte-w239uu{visibility:hidden}.cell.disabled.svelte-w239uu.svelte-w239uu:hover{border:none;background-color:transparent}.cell.other-month.svelte-w239uu span.svelte-w239uu{opacity:0.4}.cell.selected.svelte-w239uu.svelte-w239uu{color:var(--date-picker-selected-color, inherit);background:var(--date-picker-selected-background, rgba(2, 105, 247, 0.2));border:2px solid var(--date-picker-highlight-border, #0269f7)}",
  map: null
};
function cloneDate(d) {
  return new Date(d.getTime());
}
function clamp(d, min2, max2) {
  if (d > max2) {
    return cloneDate(max2);
  } else if (d < min2) {
    return cloneDate(min2);
  } else {
    return cloneDate(d);
  }
}
function getYears(min2, max2) {
  let years2 = [];
  for (let i = min2.getFullYear(); i <= max2.getFullYear(); i++) {
    years2.push(i);
  }
  return years2;
}
function dayIsInRange(calendarDay, min2, max2) {
  const date = new Date(calendarDay.year, calendarDay.month, calendarDay.number);
  const minDate = new Date(min2.getFullYear(), min2.getMonth(), min2.getDate());
  const maxDate = new Date(max2.getFullYear(), max2.getMonth(), max2.getDate());
  return date >= minDate && date <= maxDate;
}
const DatePicker = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let iLocale;
  let browseYear;
  let browseMonth;
  let calendarDays;
  createEventDispatcher();
  let { value = null } = $$props;
  function setValue(d) {
    if (d.getTime() !== value?.getTime()) {
      browseDate = clamp(d, min, max);
      value = cloneDate(browseDate);
    }
  }
  const todayDate = /* @__PURE__ */ new Date();
  const defaultDate = /* @__PURE__ */ new Date();
  let { min = new Date(defaultDate.getFullYear() - 20, 0, 1) } = $$props;
  let { max = new Date(defaultDate.getFullYear(), 11, 31, 23, 59, 59, 999) } = $$props;
  let browseDate = value ? cloneDate(value) : cloneDate(clamp(defaultDate, min, max));
  let years = getYears(min, max);
  let { locale = {} } = $$props;
  let { browseWithoutSelecting = false } = $$props;
  if ($$props.value === void 0 && $$bindings.value && value !== void 0)
    $$bindings.value(value);
  if ($$props.min === void 0 && $$bindings.min && min !== void 0)
    $$bindings.min(min);
  if ($$props.max === void 0 && $$bindings.max && max !== void 0)
    $$bindings.max(max);
  if ($$props.locale === void 0 && $$bindings.locale && locale !== void 0)
    $$bindings.locale(locale);
  if ($$props.browseWithoutSelecting === void 0 && $$bindings.browseWithoutSelecting && browseWithoutSelecting !== void 0)
    $$bindings.browseWithoutSelecting(browseWithoutSelecting);
  $$result.css.add(css$1);
  {
    if (value && value > max) {
      setValue(max);
    } else if (value && value < min) {
      setValue(min);
    }
  }
  {
    if (browseDate.getTime() !== value?.getTime() && !browseWithoutSelecting) {
      browseDate = value ? cloneDate(value) : browseDate;
    }
  }
  years = getYears(min, max);
  iLocale = getInnerLocale(locale);
  browseYear = browseDate.getFullYear();
  browseMonth = browseDate.getMonth();
  calendarDays = getCalendarDays(browseDate, iLocale.weekStartsOn);
  return `

<div class="date-time-picker svelte-w239uu" tabindex="0"><div class="tab-container svelte-w239uu" tabindex="-1"><div class="top svelte-w239uu"><button type="button" class="page-button svelte-w239uu" tabindex="-1"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" class="svelte-w239uu"><path d="M5 3l3.057-3 11.943 12-11.943 12-3.057-3 9-9z" transform="rotate(180, 12, 12)"></path></svg></button>
      <div class="dropdown month svelte-w239uu"><select${add_attribute("value", browseMonth, 0)} class="svelte-w239uu">${each(iLocale.months, (monthName, i) => {
    return `<option ${new Date(browseYear, i, getMonthLength(browseYear, i), 23, 59, 59, 999) < min || new Date(browseYear, i) > max ? "disabled" : ""}${add_attribute("value", i, 0)}>${escape(monthName)}</option>`;
  })}</select>
        
        <select class="dummy-select svelte-w239uu" tabindex="-1">${each(iLocale.months, (monthName, i) => {
    return `<option${add_attribute("value", i, 0)} ${i === browseMonth ? "selected" : ""}>${escape(monthName)}</option>`;
  })}</select>
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" class="svelte-w239uu"><path d="M6 0l12 12-12 12z" transform="rotate(90, 12, 12)"></path></svg></div>
      <div class="dropdown year svelte-w239uu"><select${add_attribute("value", browseYear, 0)} class="svelte-w239uu">${each(years, (v) => {
    return `<option${add_attribute("value", v, 0)}>${escape(v)}</option>`;
  })}</select>
        
        <select class="dummy-select svelte-w239uu" tabindex="-1">${each(years, (v) => {
    return `<option${add_attribute("value", v, 0)} ${v === browseDate.getFullYear() ? "selected" : ""}>${escape(v)}</option>`;
  })}</select>
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" class="svelte-w239uu"><path d="M6 0l12 12-12 12z" transform="rotate(90, 12, 12)"></path></svg></div>
      <button type="button" class="page-button svelte-w239uu" tabindex="-1"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" class="svelte-w239uu"><path d="M5 3l3.057-3 11.943 12-11.943 12-3.057-3 9-9z"></path></svg></button></div>
    <div class="header svelte-w239uu">
      ${each(Array(7), (_, i) => {
    return `${i + iLocale.weekStartsOn < 7 ? `<div class="header-cell svelte-w239uu">${escape(iLocale.weekdays[iLocale.weekStartsOn + i])}</div>` : `<div class="header-cell svelte-w239uu">${escape(iLocale.weekdays[iLocale.weekStartsOn + i - 7])}</div>`}`;
  })}</div>
    
    ${each(Array(6), (_, weekIndex) => {
    return `<div class="week svelte-w239uu">${each(calendarDays.slice(weekIndex * 7, weekIndex * 7 + 7), (calendarDay) => {
      return `
          <div class="${[
        "cell svelte-w239uu",
        (!dayIsInRange(calendarDay, min, max) ? "disabled" : "") + " " + (value && calendarDay.year === value.getFullYear() && calendarDay.month === value.getMonth() && calendarDay.number === value.getDate() ? "selected" : "") + " " + (calendarDay.year === todayDate.getFullYear() && calendarDay.month === todayDate.getMonth() && calendarDay.number === todayDate.getDate() ? "today" : "") + " " + (calendarDay.month !== browseMonth ? "other-month" : "")
      ].join(" ").trim()}"><span class="svelte-w239uu">${escape(calendarDay.number)}</span>
          </div>`;
    })}
      </div>`;
  })}</div>
</div>`;
});
function parse(str, tokens, baseDate) {
  let missingPunctuation = "";
  let valid = true;
  baseDate = baseDate || new Date(2020, 0, 1, 0, 0, 0, 0);
  let year = baseDate.getFullYear();
  let month = baseDate.getMonth();
  let day = baseDate.getDate();
  let hours = baseDate.getHours();
  let minutes = baseDate.getMinutes();
  let seconds = baseDate.getSeconds();
  const ms = baseDate.getMilliseconds();
  function parseString(token) {
    for (let i = 0; i < token.length; i++) {
      if (str.startsWith(token[i])) {
        str = str.slice(1);
      } else {
        valid = false;
        if (str.length === 0)
          missingPunctuation = token.slice(i);
        return;
      }
    }
  }
  function parseUint(pattern, min, max) {
    const matches = str.match(pattern);
    if (matches?.[0]) {
      str = str.slice(matches[0].length);
      const n = parseInt(matches[0]);
      if (n > max || n < min) {
        valid = false;
        return null;
      } else {
        return n;
      }
    } else {
      valid = false;
      return null;
    }
  }
  function parseToken(token) {
    if (typeof token === "string") {
      parseString(token);
    } else if (token.id === "yy") {
      const value = parseUint(/^[0-9]{2}/, 0, 99);
      if (value !== null)
        year = 2e3 + value;
    } else if (token.id === "yyyy") {
      const value = parseUint(/^[0-9]{4}/, 0, 9999);
      if (value !== null)
        year = value;
    } else if (token.id === "MM") {
      const value = parseUint(/^[0-9]{2}/, 1, 12);
      if (value !== null)
        month = value - 1;
    } else if (token.id === "dd") {
      const value = parseUint(/^[0-9]{2}/, 1, 31);
      if (value !== null)
        day = value;
    } else if (token.id === "HH") {
      const value = parseUint(/^[0-9]{2}/, 0, 23);
      if (value !== null)
        hours = value;
    } else if (token.id === "mm") {
      const value = parseUint(/^[0-9]{2}/, 0, 59);
      if (value !== null)
        minutes = value;
    } else if (token.id === "ss") {
      const value = parseUint(/^[0-9]{2}/, 0, 59);
      if (value !== null)
        seconds = value;
    }
  }
  for (const token of tokens) {
    parseToken(token);
    if (!valid)
      break;
  }
  const monthLength = getMonthLength(year, month);
  if (day > monthLength) {
    valid = false;
  }
  return {
    date: valid ? new Date(year, month, day, hours, minutes, seconds, ms) : null,
    missingPunctuation
  };
}
function twoDigit(value) {
  return ("0" + value.toString()).slice(-2);
}
const ruleTokens = [
  {
    id: "yyyy",
    toString: (d) => d.getFullYear().toString()
  },
  {
    id: "yy",
    toString: (d) => d.getFullYear().toString().slice(-2)
  },
  {
    id: "MM",
    toString: (d) => twoDigit(d.getMonth() + 1)
  },
  {
    id: "dd",
    toString: (d) => twoDigit(d.getDate())
  },
  {
    id: "HH",
    toString: (d) => twoDigit(d.getHours())
  },
  {
    id: "mm",
    toString: (d) => twoDigit(d.getMinutes())
  },
  {
    id: "ss",
    toString: (d) => twoDigit(d.getSeconds())
  }
];
function parseRule(s) {
  for (const token of ruleTokens) {
    if (s.startsWith(token.id)) {
      return token;
    }
  }
}
function createFormat(s) {
  const tokens = [];
  while (s.length > 0) {
    const token = parseRule(s);
    if (token) {
      tokens.push(token);
      s = s.slice(token.id.length);
    } else if (typeof tokens[tokens.length - 1] === "string") {
      tokens[tokens.length - 1] += s[0];
      s = s.slice(1);
    } else {
      tokens.push(s[0]);
      s = s.slice(1);
    }
  }
  return tokens;
}
const css = {
  code: ".date-time-field.svelte-1bsxr9h{position:relative}input.svelte-1bsxr9h{color:var(--date-picker-foreground, #000000);background:var(--date-picker-background, #ffffff);min-width:0px;box-sizing:border-box;padding:4px 6px;margin:0px;border:1px solid rgba(103, 113, 137, 0.3);border-radius:3px;width:var(--date-input-width, 150px);outline:none;transition:all 80ms cubic-bezier(0.4, 0, 0.2, 1)}input.svelte-1bsxr9h:focus{border-color:var(--date-picker-highlight-border, #0269f7);box-shadow:0px 0px 0px 2px var(--date-picker-highlight-shadow, rgba(2, 105, 247, 0.4))}input.svelte-1bsxr9h:disabled{opacity:0.5}.invalid.svelte-1bsxr9h{border:1px solid rgba(249, 47, 114, 0.5);background-color:rgba(249, 47, 114, 0.1)}.invalid.svelte-1bsxr9h:focus{border-color:#f92f72;box-shadow:0px 0px 0px 2px rgba(249, 47, 114, 0.5)}.picker.svelte-1bsxr9h{display:none;position:absolute;margin-top:1px;z-index:10}.picker.visible.svelte-1bsxr9h{display:block}",
  map: null
};
const DateInput = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $store, $$unsubscribe_store;
  let $innerStore, $$unsubscribe_innerStore;
  createEventDispatcher();
  const defaultDate = /* @__PURE__ */ new Date();
  const innerStore = writable(null);
  $$unsubscribe_innerStore = subscribe(innerStore, (value2) => $innerStore = value2);
  const store = (() => {
    return {
      subscribe: innerStore.subscribe,
      set: (d) => {
        if (d === null) {
          innerStore.set(null);
          value = d;
        } else if (d.getTime() !== $innerStore?.getTime()) {
          innerStore.set(d);
          value = d;
        }
      }
    };
  })();
  $$unsubscribe_store = subscribe(store, (value2) => $store = value2);
  let { value = null } = $$props;
  let { min = new Date(defaultDate.getFullYear() - 20, 0, 1) } = $$props;
  let { max = new Date(defaultDate.getFullYear(), 11, 31, 23, 59, 59, 999) } = $$props;
  let { placeholder = "2020-12-31 23:00:00" } = $$props;
  let { valid = true } = $$props;
  let { disabled = false } = $$props;
  let { class: classes = "" } = $$props;
  let { format = "yyyy-MM-dd HH:mm:ss" } = $$props;
  let formatTokens = createFormat(format);
  let { locale = {} } = $$props;
  function valueUpdate(value2, formatTokens2) {
    text = toText(value2, formatTokens2);
  }
  let { text = toText($store, formatTokens) } = $$props;
  function textUpdate(text2, formatTokens2) {
    if (text2.length) {
      const result = parse(text2, formatTokens2, $store);
      if (result.date !== null) {
        valid = true;
        store.set(result.date);
      } else {
        valid = false;
      }
    } else {
      valid = true;
      if (value) {
        value = null;
        store.set(null);
      }
    }
  }
  let { visible = false } = $$props;
  let { closeOnSelection = false } = $$props;
  let { browseWithoutSelecting = false } = $$props;
  if ($$props.value === void 0 && $$bindings.value && value !== void 0)
    $$bindings.value(value);
  if ($$props.min === void 0 && $$bindings.min && min !== void 0)
    $$bindings.min(min);
  if ($$props.max === void 0 && $$bindings.max && max !== void 0)
    $$bindings.max(max);
  if ($$props.placeholder === void 0 && $$bindings.placeholder && placeholder !== void 0)
    $$bindings.placeholder(placeholder);
  if ($$props.valid === void 0 && $$bindings.valid && valid !== void 0)
    $$bindings.valid(valid);
  if ($$props.disabled === void 0 && $$bindings.disabled && disabled !== void 0)
    $$bindings.disabled(disabled);
  if ($$props.class === void 0 && $$bindings.class && classes !== void 0)
    $$bindings.class(classes);
  if ($$props.format === void 0 && $$bindings.format && format !== void 0)
    $$bindings.format(format);
  if ($$props.locale === void 0 && $$bindings.locale && locale !== void 0)
    $$bindings.locale(locale);
  if ($$props.text === void 0 && $$bindings.text && text !== void 0)
    $$bindings.text(text);
  if ($$props.visible === void 0 && $$bindings.visible && visible !== void 0)
    $$bindings.visible(visible);
  if ($$props.closeOnSelection === void 0 && $$bindings.closeOnSelection && closeOnSelection !== void 0)
    $$bindings.closeOnSelection(closeOnSelection);
  if ($$props.browseWithoutSelecting === void 0 && $$bindings.browseWithoutSelecting && browseWithoutSelecting !== void 0)
    $$bindings.browseWithoutSelecting(browseWithoutSelecting);
  $$result.css.add(css);
  let $$settled;
  let $$rendered;
  do {
    $$settled = true;
    {
      store.set(value);
    }
    formatTokens = createFormat(format);
    {
      valueUpdate($store, formatTokens);
    }
    {
      textUpdate(text, formatTokens);
    }
    $$rendered = `
<div class="${"date-time-field " + escape(classes, true) + " svelte-1bsxr9h"}"><input type="text"${add_attribute("value", text, 0)}${add_attribute("placeholder", placeholder, 0)} ${disabled ? "disabled" : ""} class="${["svelte-1bsxr9h", !valid ? "invalid" : ""].join(" ").trim()}">
  ${visible && !disabled ? `<div class="${["picker svelte-1bsxr9h", visible ? "visible" : ""].join(" ").trim()}">${validate_component(DatePicker, "DateTimePicker").$$render(
      $$result,
      {
        min,
        max,
        locale,
        browseWithoutSelecting,
        value: $store
      },
      {
        value: ($$value) => {
          $store = $$value;
          $$settled = false;
        }
      },
      {}
    )}</div>` : ``}
</div>`;
  } while (!$$settled);
  $$unsubscribe_store();
  $$unsubscribe_innerStore();
  return $$rendered;
});
export {
  DateInput as D
};
