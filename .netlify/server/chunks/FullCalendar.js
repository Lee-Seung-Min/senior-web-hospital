import { c as create_ssr_component, b as add_attribute } from "./index3.js";
import { Calendar } from "@fullcalendar/core";
const FullCalendar = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let canBeInitiated;
  let { class: classes = null } = $$props;
  let { style = null } = $$props;
  let { options } = $$props;
  function getAPI() {
    return calendar;
  }
  let calendarEl;
  let calendar;
  function initCalendar() {
    calendar = new Calendar(calendarEl, options);
    calendar.render();
  }
  function updateCalendarOptions() {
    calendar.pauseRendering();
    calendar.resetOptions(options);
    calendar.resumeRendering();
  }
  if ($$props.class === void 0 && $$bindings.class && classes !== void 0)
    $$bindings.class(classes);
  if ($$props.style === void 0 && $$bindings.style && style !== void 0)
    $$bindings.style(style);
  if ($$props.options === void 0 && $$bindings.options && options !== void 0)
    $$bindings.options(options);
  if ($$props.getAPI === void 0 && $$bindings.getAPI && getAPI !== void 0)
    $$bindings.getAPI(getAPI);
  canBeInitiated = options && options.plugins && options.plugins.length && calendarEl && !calendar;
  {
    {
      if (calendar && options && options.plugins && options.plugins.length)
        updateCalendarOptions();
      if (canBeInitiated) {
        initCalendar();
      }
    }
  }
  return `<div${add_attribute("class", classes, 0)}${add_attribute("style", style, 0)}${add_attribute("this", calendarEl, 0)}></div>`;
});
export {
  FullCalendar as F
};
