// UTM ------------------------------------

$.urlParam = function (name) {
  let results = new RegExp("[?&]" + name + "=([^]*)").exec(
      window.location.href
  );
  if (results == null) {
    return null;
  } else {
    return results[1] || 0;
  }
};

let source;
let medium;
let campaign;
let term;
let content;
try {
  source = $.urlParam("utm_source").split("&")[0];
} catch (e) {}
try {
  medium = $.urlParam("utm_medium").split("&")[0];
} catch (e) {}
try {
  campaign = $.urlParam("utm_campaign").split("&")[0];
} catch (e) {}
try {
  term = $.urlParam("utm_term").split("&")[0];
} catch (e) {}
try {
  content = $.urlParam("utm_content").split("&")[0];
} catch (e) {}

if (source !== undefined && source !== "") {
  Cookies.set("utm_source", source, { expires: 31 * 3 });
}
if (medium !== undefined && medium !== "") {
  Cookies.set("utm_medium", medium, { expires: 31 * 3 });
}
if (campaign !== undefined && campaign !== "") {
  Cookies.set("utm_campaign", campaign, { expires: 31 * 3 });
}
if (term !== undefined && term !== "") {
  Cookies.set("utm_term", term, { expires: 31 * 3 });
}
if (content !== undefined && content !== "") {
  Cookies.set("utm_content", content, { expires: 31 * 3 });
}

// --------------------------------------
