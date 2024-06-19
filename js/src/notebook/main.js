/******************************************************************************
 *
 * Copyright (c) 2024, the jupyter_templates authors.
 *
 * This file is part of the jupyter_templates library, distributed under the terms of
 * the Apache License 2.0.  The full license can be found in the LICENSE file.
 *
 */

// eslint-disable-next-line import/no-amd, no-undef
define(["jquery"], ($) => {
  let body = null;
  let templates = null;
  let notebook_input;
  let container;
  let overlay;

  function load_overlay() {
    overlay = document.createElement("div");
    overlay.style.position = "fixed";
    overlay.style.display = "flex";
    overlay.style.flexDirection = "column";
    overlay.style.justifyContent = "center";
    overlay.style.backgroundColor = "rgba(0, 0, 0, 0.2)";
    overlay.style.top = "0";
    overlay.style.bottom = "0";
    overlay.style.left = "0";
    overlay.style.right = "0";
    overlay.style.margin = "auto";
    overlay.style.zIndex = "1000";

    container = document.createElement("div");
    container.style.position = "fixed";
    container.style.display = "flex";
    container.style.flexDirection = "column";
    container.style.flexGrow = "1";
    container.style.justifyContent = "center";
    container.style.backgroundColor = "#fff";
    container.style.top = "0";
    container.style.bottom = "0";
    container.style.left = "0";
    container.style.right = "0";
    container.style.height = "200px";
    container.style.width = "300px";
    container.style.margin = "auto";
    container.style.padding = "20px";
    container.style.border = "1px solid black";
    container.style.zIndex = "1001";
    container.style.filter = "drop-shadow(0 0 0.75rem black)";

    overlay.append(container);
    container.append(body);
    document.body.appendChild(overlay);
  }

  const setupTemplateSelectorUI = () => {
    const kernels = $("#notebook-kernels");
    const new_template = $("<li>").attr("href", "#").attr("role", "none").attr("id", "new-template");

    const new_template_link = $("<a>")
      .text("Template")
      .attr("role", "menuitem")
      .attr("tabindex", "-1")
      .attr("href", "#")
      .on("click", () => {
        load_overlay();
      });

    new_template.append(new_template_link);
    kernels.after(new_template);
  };

  function load_ipython_extension() {
    fetch("templates/names").then(async (res) => {
      if (res.ok) {
        // setup UI
        setupTemplateSelectorUI();

        const template_data = await res.json();
        templates = template_data.templates;
        body = document.createElement("div");
        body.style.display = "flex";
        body.style.flexDirection = "column";
        body.style.flexGrow = "1";
        body.style.justifyContent = "space-around";

        const title = document.createElement("h4");
        title.textContent = "Template";

        const label = document.createElement("label");
        label.textContent = "Template:";

        const package_input = document.createElement("select");
        notebook_input = document.createElement("select");

        Object.keys(templates).forEach((package_name) => {
          const package_option = document.createElement("option");
          package_option.label = package_name;
          package_option.text = package_name;
          package_option.value = package_name;
          package_input.appendChild(package_option);
        });

        const fill = (package_name) => {
          while (notebook_input.lastChild) {
            notebook_input.removeChild(notebook_input.lastChild);
          }

          templates[package_name].forEach((notebook) => {
            const notebook_option = document.createElement("option");
            notebook_option.label = notebook.name;
            notebook_option.text = notebook.name;
            notebook_option.value = notebook.name;
            notebook_input.appendChild(notebook_option);
          });
        };

        package_input.addEventListener("change", (event) => {
          const package_name = event.target.value;
          fill(package_name);
        });

        if (Object.keys(templates).length > 0) {
          fill(Object.keys(templates)[0]);
        }

        const ok = document.createElement("button");
        ok.textContent = "GO";
        ok.style.backgroundColor = "#2196f3";
        ok.style.color = "#fff";

        ok.onclick = async () => {
          document.body.removeChild(overlay);
          const res2 = await fetch(`templates/get?${new URLSearchParams({template: notebook_input.value})}`);
          const data = await res2.json();
          // first make new notebook
          const result1 = await fetch("api/contents", {
            method: "POST",
            body: JSON.stringify({type: "notebook"}),
          });
          const new_notebook_path = (await result1.json()).path;
          // then modify
          const result2 = await fetch(`api/contents/${new_notebook_path}`, {
            method: "PUT",
            body: JSON.stringify({content: JSON.parse(data.content), type: "notebook"}),
          });
          if (result2.ok) {
            window.open(`notebooks/${new_notebook_path}`);
          }
        };
        const cancel = document.createElement("button");
        cancel.textContent = "Cancel";
        cancel.style.backgroundColor = "#888";
        cancel.style.color = "#fff";
        cancel.style.marginRight = "10px";
        cancel.onclick = () => {
          document.body.removeChild(overlay);
        };

        const buttons = document.createElement("div");
        buttons.style.display = "flex";
        buttons.style.flexDirection = "row";
        buttons.style.justifyContent = "flex-end";

        buttons.appendChild(cancel);
        buttons.appendChild(ok);

        body.appendChild(title);
        body.appendChild(label);
        body.appendChild(package_input);
        body.appendChild(notebook_input);
        body.appendChild(buttons);
      }
    });
  }

  return {
    load_ipython_extension,
  };
});
