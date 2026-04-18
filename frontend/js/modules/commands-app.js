/**
 * Página de comandos por categoría (API backend).
 * Requiere: body[data-category], #commands-list, #add-command-form, #command-text, #command-desc, #search-input
 */

const API = "/api/v1";

function getElements() {
  return {
    commandList: document.getElementById("commands-list"),
    commandForm: document.getElementById("add-command-form"),
    commandInput: document.getElementById("command-text"),
    commandDesc: document.getElementById("command-desc"),
    searchInput: document.getElementById("search-input"),
    category: document.body?.dataset?.category?.trim()
  };
}

async function fetchCommands(category) {
  const q = encodeURIComponent(category);
  try {
    const response = await fetch(`${API}/commands?category=${q}`);
    if (!response.ok) throw new Error("Error al cargar comandos");
    return await response.json();
  } catch (err) {
    console.error(err);
    return [];
  }
}

async function postCommand(category, cmd, desc) {
  try {
    const response = await fetch(`${API}/commands/create`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ cmd, desc, category })
    });

    if (!response.ok) {
      const errData = await response.json();
      throw new Error(errData.error || "Error al agregar comando");
    }

    return await response.json();
  } catch (err) {
    alert(err.message);
    console.error(err);
  }
}

async function deleteCommandBackend(id) {
  try {
    const response = await fetch(`${API}/commands/delete/${id}`, {
      method: "DELETE"
    });
    if (!response.ok) throw new Error("No se pudo eliminar el comando");
  } catch (err) {
    console.error(err);
  }
}

async function updateCommandBackend(id, newCmd, newDesc) {
  const response = await fetch(`${API}/commands/update/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ cmd: newCmd, desc: newDesc })
  });

  if (!response.ok) throw new Error("No se pudo actualizar el comando");

  return await response.json();
}

function createCommandElement(command, actions) {
  const li = document.createElement("li");
  li.className =
    "bg-gray-800 text-white p-4 rounded-lg shadow-md my-3 flex flex-col gap-2";

  const descriptionDiv = document.createElement("div");
  descriptionDiv.className = "text-gray-300 text-sm";
  descriptionDiv.textContent = command.desc || "";

  const commandSpan = document.createElement("span");
  commandSpan.className =
    "font-mono bg-gray-900 p-2 rounded text-green-400 break-all";
  commandSpan.textContent = command.cmd;

  li.appendChild(descriptionDiv);
  li.appendChild(commandSpan);

  const actionsDiv = document.createElement("div");
  actionsDiv.className = "flex gap-2 mt-2";

  const copyButton = document.createElement("button");
  copyButton.textContent = "⧉";
  copyButton.className =
    "border border-blue-500 text-blue-400 px-2 py-1 rounded hover:bg-blue-500 hover:text-black transition text-xs";
  copyButton.addEventListener("click", () =>
    navigator.clipboard.writeText(command.cmd)
  );
  actionsDiv.appendChild(copyButton);

  if (command.type === "user") {
    const editButton = document.createElement("button");
    editButton.textContent = "✎";
    editButton.className =
      "border border-green-500 text-green-400 px-2 py-1 rounded hover:bg-green-500 hover:text-black transition text-xs";
    editButton.addEventListener("click", () => actions.startEdit(command));
    actionsDiv.appendChild(editButton);

    const deleteButton = document.createElement("button");
    deleteButton.textContent = "✖";
    deleteButton.className =
      "border border-red-500 text-red-400 px-2 py-1 rounded hover:bg-red-500 hover:text-black transition text-xs";
    deleteButton.addEventListener("click", async () => {
      await deleteCommandBackend(command.id);
      await actions.refresh();
    });
    actionsDiv.appendChild(deleteButton);
  }

  li.appendChild(actionsDiv);
  return li;
}

function init() {
  const el = getElements();
  const {
    commandList,
    commandForm,
    commandInput,
    commandDesc,
    searchInput,
    category
  } = el;

  if (!commandList || !commandForm || !commandInput || !commandDesc || !category) {
    return;
  }

  const handlers = {
    startEdit(command) {
      commandInput.value = command.cmd;
      commandDesc.value = command.desc;
      commandForm.dataset.editingId = String(command.id);
      const submit = commandForm.querySelector("button[type='submit']");
      if (submit) submit.textContent = "Guardar cambios";
    },
    async refresh() {
      await renderCommands();
    }
  };

  async function renderCommands(list = null) {
    const commands = list || (await fetchCommands(category));
    commandList.innerHTML = "";
    commands.forEach((cmd) =>
      commandList.appendChild(createCommandElement(cmd, handlers))
    );
  }

  commandForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const cmd = commandInput.value.trim();
    const desc = commandDesc.value.trim();
    if (!cmd || !desc) {
      alert("Comando y descripción son obligatorios");
      return;
    }

    if (commandForm.dataset.editingId) {
      await updateCommandBackend(
        commandForm.dataset.editingId,
        cmd,
        desc
      );
      delete commandForm.dataset.editingId;
      const submit = commandForm.querySelector("button[type='submit']");
      if (submit) submit.textContent = "Añadir comando";
    } else {
      await postCommand(category, cmd, desc);
    }

    commandInput.value = "";
    commandDesc.value = "";
    await renderCommands();
  });

  if (searchInput) {
    searchInput.addEventListener("input", async (e) => {
      const term = e.target.value.toLowerCase();
      const commands = await fetchCommands(category);
      const filtered = commands.filter(
        (c) =>
          c.cmd.toLowerCase().includes(term) ||
          (c.desc && c.desc.toLowerCase().includes(term))
      );
      commandList.innerHTML = "";
      filtered.forEach((cmd) =>
        commandList.appendChild(createCommandElement(cmd, handlers))
      );
    });
  }

  renderCommands();
}

init();
