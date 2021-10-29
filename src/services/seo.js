class Seo {
  constructor() {
    this.formData = new FormData();
    this.init();
  }

  init = () => {
    this.formData.append("action", "get_by_field");
    this.formData.append("token", "123");
    this.formData.append("value", `${window.location.pathname}`);
    this.head = document.querySelector("head");
    this.getApi();
  };

  getApi = async () => {
    let res = await fetch("https://api.tehnikum.school/seo_page_info.php", {
      method: "POST",
      body: this.formData,
    });
    res = await res.json();
    console.log(res);
    if (res.row !== void 0) {
      this.setSeoData(res.row);
    }
  };

  setSeoData = (data) => {
    if (data.title) {
      this.renderTitle(data.title);
    }
    if (data.meta_description) {
      this.renderMeta(data.meta_description, "description");
    }
    if (data.meta_keywords) {
      this.renderMeta(data.meta_keywords, "keywords");
    }
    if (data.og_type) {
      this.renderOg(data.og_type, "og:type");
    }
    if (data.og_site_name) {
      this.renderOg(data.og_site_name, "og:site_name");
    }
    if (data.og_title) {
      this.renderOg(data.og_title, "og:title");
    }
    if (data.og_description) {
      this.renderOg(data.og_description, "og:description");
    }
    if (data.og_url) {
      this.renderOg(data.og_url, "og:url");
    }
    if (data.og_locale) {
      this.renderOg(data.og_locale, "og:locale");
    }
    if (data.og_image) {
      this.renderOg(data.og_image, "og:image");
    }
    if (data.og_image_width) {
      this.renderOg(data.og_image_width, "og:image:width");
    }
    if (data.og_image_height) {
      this.renderOg(data.og_image_height, "og:image:height");
    }
  };

  renderTitle = (data) => {
    if (document.querySelector("head>title") !== null) {
      document.querySelector("head>title").remove();
    }
    const title = document.createElement("title");
    title.innerHTML = data;
    this.head.appendChild(title);
  };

  renderMeta = (data, name) => {
    if (document.querySelector(`head>meta[name='${name}']`) !== null) {
      document.querySelector(`head>meta[name='${name}']`).remove();
    }
    const meta = document.createElement("meta");
    meta.name = `${name}`;
    meta.content = data;
    this.head.appendChild(meta);
  };

  renderOg = (data, name) => {
    if (document.querySelector(`head>meta[property='${name}']`) !== null) {
      document.querySelector(`head>meta[property='${name}']`).remove();
    }
    const meta = document.createElement("meta");
    meta.setAttribute("property", `${name}`);
    meta.content = data;
    this.head.appendChild(meta);
  };
}

new Seo();
