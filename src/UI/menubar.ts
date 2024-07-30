const menubar = document.createElement("div");
menubar.setAttribute("id", "menubar");
document.body.appendChild(menubar);

const file = document.createElement("div");
file.textContent = "File";
menubar.appendChild(file);

const edit = document.createElement("div");
edit.textContent = "Edit";
menubar.appendChild(edit);
