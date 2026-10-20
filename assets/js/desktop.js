(function () {
  "use strict";

  const postsData = JSON.parse(document.getElementById("posts-data").textContent);

  const windowsLayer = document.getElementById("windows-layer");
  const taskbarItems = document.getElementById("taskbar-items");
  const startMenu = document.getElementById("start-menu");
  const startButton = document.getElementById("start-button");

  let zCounter = 10;
  let explorerWindow = null;
  let cascadeOffset = 0;
  const openNotepads = new Map();

  function bringToFront(win) {
    zCounter += 1;
    win.style.zIndex = zCounter;
    document.querySelectorAll(".window .title-bar").forEach((tb) => tb.classList.add("inactive"));
    win.querySelector(".title-bar").classList.remove("inactive");
  }

  function makeDraggable(win) {
    const titleBar = win.querySelector(".title-bar");
    let dragging = false;
    let startX = 0;
    let startY = 0;
    let originX = 0;
    let originY = 0;

    titleBar.addEventListener("mousedown", (e) => {
      if (win.classList.contains("maximized")) return;
      if (e.target.closest(".title-bar-controls")) return;
      dragging = true;
      startX = e.clientX;
      startY = e.clientY;
      const rect = win.getBoundingClientRect();
      originX = rect.left;
      originY = rect.top;
      bringToFront(win);
      e.preventDefault();
    });

    titleBar.addEventListener("dblclick", (e) => {
      if (e.target.closest(".title-bar-controls")) return;
      toggleMaximize(win);
    });

    window.addEventListener("mousemove", (e) => {
      if (!dragging) return;
      const dx = e.clientX - startX;
      const dy = e.clientY - startY;
      win.style.left = `${Math.max(0, originX + dx)}px`;
      win.style.top = `${Math.max(0, originY + dy)}px`;
    });

    window.addEventListener("mouseup", () => {
      dragging = false;
    });
  }

  function toggleMaximize(win, maximizeBtn) {
    const btn = maximizeBtn || win.querySelector('[aria-label="Maximize"], [aria-label="Restore"]');
    if (win.classList.contains("maximized")) {
      win.classList.remove("maximized");
      win.style.left = win.dataset.restoreLeft;
      win.style.top = win.dataset.restoreTop;
      win.style.width = win.dataset.restoreWidth;
      if (btn) btn.setAttribute("aria-label", "Maximize");
    } else {
      win.dataset.restoreLeft = win.style.left;
      win.dataset.restoreTop = win.style.top;
      win.dataset.restoreWidth = win.style.width;
      win.classList.add("maximized");
      if (btn) btn.setAttribute("aria-label", "Restore");
    }
    bringToFront(win);
  }

  function minimizeWindow(win) {
    win.classList.add("minimized");
  }

  function addTaskbarItem(id, label, win) {
    const btn = document.createElement("button");
    btn.className = "taskbar-item";
    btn.textContent = label;
    btn.dataset.winId = id;
    btn.addEventListener("click", () => {
      if (win.classList.contains("minimized")) {
        win.classList.remove("minimized");
        bringToFront(win);
      } else if (parseInt(win.style.zIndex || "0", 10) === zCounter) {
        minimizeWindow(win);
      } else {
        bringToFront(win);
      }
    });
    taskbarItems.appendChild(btn);
  }

  function removeTaskbarItem(id) {
    const btn = taskbarItems.querySelector(`[data-win-id="${id}"]`);
    if (btn) btn.remove();
  }

  function closeWindow(win, id, cleanup) {
    win.remove();
    removeTaskbarItem(id);
    if (cleanup) cleanup();
  }

  function createWindowShell(className, titleText) {
    const win = document.createElement("div");
    win.className = `window ${className}`;
    cascadeOffset = (cascadeOffset + 24) % 200;
    win.style.left = `${60 + cascadeOffset}px`;
    win.style.top = `${60 + cascadeOffset}px`;

    const titleBar = document.createElement("div");
    titleBar.className = "title-bar";

    const titleTextEl = document.createElement("div");
    titleTextEl.className = "title-bar-text";
    titleTextEl.textContent = titleText;

    const controls = document.createElement("div");
    controls.className = "title-bar-controls";
    const minimizeBtn = document.createElement("button");
    minimizeBtn.setAttribute("aria-label", "Minimize");
    minimizeBtn.addEventListener("click", () => minimizeWindow(win));
    const maximizeBtn = document.createElement("button");
    maximizeBtn.setAttribute("aria-label", "Maximize");
    maximizeBtn.addEventListener("click", () => toggleMaximize(win, maximizeBtn));
    const closeBtn = document.createElement("button");
    closeBtn.setAttribute("aria-label", "Close");
    controls.appendChild(minimizeBtn);
    controls.appendChild(maximizeBtn);
    controls.appendChild(closeBtn);

    titleBar.appendChild(titleTextEl);
    titleBar.appendChild(controls);
    win.appendChild(titleBar);

    windowsLayer.appendChild(win);
    makeDraggable(win);
    win.addEventListener("mousedown", () => bringToFront(win));
    bringToFront(win);

    return { win, closeBtn };
  }

  window.openExplorer = function openExplorer() {
    if (explorerWindow) {
      bringToFront(explorerWindow);
      return;
    }

    const { win, closeBtn } = createWindowShell("explorer-window", "My Posts");

    const menuBar = document.createElement("div");
    menuBar.className = "menu-bar";
    menuBar.textContent = "File  Edit  View  Favorites  Help";

    const toolbar = document.createElement("div");
    toolbar.className = "toolbar";
    toolbar.innerHTML =
      '<div class="toolbar-buttons">' +
      "<button disabled>\u2B05</button>" +
      "<button disabled>\u27A1</button>" +
      "<button disabled>\u2B06 Up</button>" +
      "</div>" +
      '<div class="address-bar">' +
      "<span>Address</span>" +
      '<span class="address-value"><span class="address-glyph">\u{1F4C1}</span><span class="address-text">My Posts</span></span>' +
      "</div>";
    const addressText = toolbar.querySelector(".address-text");

    const body = document.createElement("div");
    body.className = "window-body explorer-body";

    const tree = document.createElement("ul");
    tree.className = "tree-view explorer-tree";
    tree.innerHTML = '<li><a href="#">\u{1F4C1} My Posts</a><ul></ul></li>';
    const yearList = tree.querySelector("ul");
    const rootLink = tree.querySelector(":scope > li > a");

    const table = document.createElement("table");
    table.className = "interactive file-table";
    table.innerHTML = "<thead><tr><th>Name</th><th>Date modified</th><th>Type</th></tr></thead><tbody></tbody>";
    const tbody = table.querySelector("tbody");

    const statusBar = document.createElement("div");
    statusBar.className = "status-bar";
    statusBar.innerHTML = '<p class="status-bar-field"></p><p class="status-bar-field">My Posts</p>';
    const statusCount = statusBar.querySelector(".status-bar-field");

    function renderRows(year) {
      tbody.innerHTML = "";
      const filtered = year === "all" ? postsData : postsData.filter((p) => p.url.split("/")[1] === year);
      filtered.forEach((post) => {
        const row = document.createElement("tr");
        row.innerHTML =
          '<td><span class="cell-name"><span>\u{1F4C4}</span><span class="cell-title"></span></span></td>' +
          "<td></td><td>Text Document</td>";
        row.querySelector(".cell-title").textContent = post.title;
        row.cells[1].textContent = post.date;
        row.addEventListener("click", () => {
          tbody.querySelectorAll("tr").forEach((r) => r.classList.remove("highlighted"));
          row.classList.add("highlighted");
        });
        row.addEventListener("dblclick", () => openNotepad(post));
        tbody.appendChild(row);
      });
      statusCount.textContent = `${filtered.length} object(s)`;
    }

    function selectYear(year, label, li) {
      tree.querySelectorAll("li").forEach((item) => item.classList.remove("tree-selected"));
      li.classList.add("tree-selected");
      addressText.textContent = label;
      renderRows(year);
    }

    const years = Array.from(new Set(postsData.map((p) => p.url.split("/")[1]))).sort((a, b) => b - a);

    const allLi = document.createElement("li");
    allLi.innerHTML = '<a href="#">\u{1F5C2}\uFE0F All Posts</a>';
    allLi.addEventListener("click", (e) => {
      e.preventDefault();
      selectYear("all", "My Posts", allLi);
    });
    yearList.appendChild(allLi);

    years.forEach((year) => {
      const li = document.createElement("li");
      li.innerHTML = `<a href="#">\u{1F4C1} ${year}</a>`;
      li.addEventListener("click", (e) => {
        e.preventDefault();
        selectYear(year, `My Posts\\${year}`, li);
      });
      yearList.appendChild(li);
    });

    rootLink.addEventListener("click", (e) => {
      e.preventDefault();
      selectYear("all", "My Posts", allLi);
    });

    selectYear("all", "My Posts", allLi);

    const listPane = document.createElement("div");
    listPane.className = "explorer-list-pane scrollable";
    listPane.appendChild(table);

    body.appendChild(tree);
    body.appendChild(listPane);

    win.appendChild(menuBar);
    win.appendChild(toolbar);
    win.appendChild(body);
    win.appendChild(statusBar);

    addTaskbarItem("explorer", "\u{1F4C1} My Posts", win);

    closeBtn.addEventListener("click", () => {
      closeWindow(win, "explorer", () => {
        explorerWindow = null;
      });
    });

    explorerWindow = win;
  };

  function openNotepad(post) {
    const winId = `post-${post.id}`;
    if (openNotepads.has(winId)) {
      bringToFront(openNotepads.get(winId));
      return;
    }

    const { win, closeBtn } = createWindowShell("notepad-window", `${post.title}.txt - Notepad`);

    const menubar = document.createElement("div");
    menubar.className = "menu-bar";
    menubar.textContent = "File  Edit  Search  Help";

    const body = document.createElement("div");
    body.className = "window-body notepad-body";
    body.innerHTML = post.content;

    win.appendChild(menubar);
    win.appendChild(body);

    addTaskbarItem(winId, `\u{1F4DD} ${post.title}`, win);
    openNotepads.set(winId, win);

    closeBtn.addEventListener("click", () => {
      closeWindow(win, winId, () => openNotepads.delete(winId));
    });
  }

  window.closeStartMenu = function closeStartMenu() {
    startMenu.hidden = true;
  };

  document.getElementById("icon-posts").addEventListener("dblclick", openExplorer);
  document.getElementById("start-menu-posts").addEventListener("click", () => {
    openExplorer();
    closeStartMenu();
  });

  startButton.addEventListener("click", (e) => {
    e.stopPropagation();
    startMenu.hidden = !startMenu.hidden;
  });

  document.addEventListener("click", (e) => {
    if (!startMenu.hidden && !startMenu.contains(e.target) && e.target !== startButton) {
      startMenu.hidden = true;
    }
  });

  function updateClock() {
    const now = new Date();
    document.getElementById("taskbar-clock").textContent = now.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
  }
  updateClock();
  setInterval(updateClock, 30000);

  // auto-open so content is reachable even without double-click (e.g. touch devices)
  openExplorer();
})();
