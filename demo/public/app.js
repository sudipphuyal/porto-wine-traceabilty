const actors = [
  ["QV", "Quinta do Vale", "Producer"],
  ["SW", "Sandeman", "Winery"],
  ["IV", "IVDP", "Regulator"],
  ["LT", "LogisTrans", "Logistics"],
  ["VS", "ViniShop Oslo", "Retailer"],
  ["CF", "Consumer", "Public verifier"],
];

const steps = [
  {
    title: "Batch registered",
    actor: "Quinta do Vale",
    owner: "Quinta do Vale",
    status: "Pending",
    detail: "PW-2026-0042 created with Douro origin and Touriga Nacional grape.",
  },
  {
    title: "Custody to winery",
    actor: "Quinta + Sandeman",
    owner: "Sandeman",
    status: "Pending",
    detail: "Initial custody transfer from producer to winery.",
  },
  {
    title: "Production recorded",
    actor: "Sandeman",
    owner: "Sandeman",
    status: "Pending",
    detail: "Fermentation and ageing notes are stored privately.",
  },
  {
    title: "Certification requested",
    actor: "Sandeman",
    owner: "Sandeman",
    status: "Pending",
    detail: "Winery requests IVDP DOP certification.",
  },
  {
    title: "Certification issued",
    actor: "IVDP",
    owner: "Sandeman",
    status: "Certified",
    detail: "IVDP issues certification and records the certificate hash.",
  },
  {
    title: "Logistics transfer",
    actor: "Sandeman + LogisTrans",
    owner: "LogisTrans",
    status: "Certified",
    detail: "Transport Lisboa to Oslo, temperature range 14-16C.",
  },
  {
    title: "Retail transfer",
    actor: "LogisTrans + ViniShop",
    owner: "ViniShop Oslo",
    status: "Certified",
    detail: "Retailer receives the certified batch.",
  },
  {
    title: "Public provenance",
    actor: "Consumer",
    owner: "ViniShop Oslo",
    status: "Certified",
    detail: "Consumer verifies QR without seeing private custody data.",
  },
];

const negativeTests = [
  ["Invalid batch ID", "BAD-2026-42 is rejected."],
  ["Blank grape variety", "Empty grape variety is rejected."],
  ["Future harvest", "2099 harvest date is rejected."],
  ["Unauthorized certification", "Winery cannot issue IVDP certificate."],
  ["Unauthorized recall", "Winery cannot recall a batch."],
  ["Wrong QR scan", "QR-ERRADO does not verify."],
];

let currentStep = 0;
let recalled = false;

const actorList = document.querySelector("#actorList");
const timeline = document.querySelector("#timeline");
const contractState = document.querySelector("#contractState");
const consumerCard = document.querySelector("#consumerCard");
const negativeTestsEl = document.querySelector("#negativeTests");
const batchStatus = document.querySelector("#batchStatus");
const hashShort = document.querySelector("#hashShort");
const consumerView = document.querySelector("#consumerView");
const stepCounter = document.querySelector("#stepCounter");
const contractOwner = document.querySelector("#contractOwner");
const qrStatus = document.querySelector("#qrStatus");
const terminalOutput = document.querySelector("#terminalOutput");
const runnerState = document.querySelector("#runnerState");

function renderActors() {
  actorList.innerHTML = actors.map(([icon, name, role]) => {
    const active = ownerMatches(name) ? " active" : "";
    return `
      <div class="actor-item${active}">
        <div class="actor-icon">${icon}</div>
        <div><strong>${name}</strong><span>${role}</span></div>
      </div>
    `;
  }).join("");
}

function ownerMatches(name) {
  const state = currentState();
  if (state.owner === "Sandeman" && name === "Sandeman") return true;
  if (state.owner === "ViniShop Oslo" && name === "ViniShop Oslo") return true;
  return state.owner === name;
}

function currentState() {
  if (recalled) {
    return {
      ...steps[Math.max(currentStep - 1, 0)],
      status: "Recalled",
      detail: "IVDP recall prevents further custody transfer.",
    };
  }

  return currentStep === 0 ? {
    title: "Not started",
    actor: "None",
    owner: "Producer",
    status: "Pending",
    detail: "Scenario ready.",
  } : steps[currentStep - 1];
}

function renderTimeline() {
  timeline.innerHTML = steps.map((step, index) => {
    const done = index < currentStep || recalled && index === 4;
    const number = done ? "OK" : String(index + 1);
    return `
      <div class="timeline-item${done ? " done" : ""}">
        <div class="timeline-dot">${number}</div>
        <div class="timeline-title">
          <strong>${step.title}</strong>
          <span>${step.detail}</span>
        </div>
        <div class="timeline-tag">${step.actor}</div>
      </div>
    `;
  }).join("");
}

function renderState() {
  const state = currentState();
  const hash = currentStep >= 5 || recalled ? "sha256:a3f8bc9d..." : "None";
  const publicState = currentStep >= 8 ? "Published" : "Private";
  batchStatus.textContent = recalled ? "Recalled" : state.status;
  hashShort.textContent = hash;
  consumerView.textContent = currentStep >= 8 ? "QR verified" : "Not published";
  stepCounter.textContent = `${currentStep} / ${steps.length}`;
  contractOwner.textContent = state.owner;
  qrStatus.textContent = currentStep >= 8 ? "Verified" : "Locked";

  contractState.innerHTML = [
    ["Batch ID", "PW-2026-0042"],
    ["Owner", state.owner],
    ["Status", recalled ? "Recalled" : state.status],
    ["Origin", "Quinta do Vale, Douro"],
    ["Harvest", "2026-01-15 10:00 UTC"],
    ["Hash", hash],
    ["Visibility", publicState],
  ].map(([label, value]) => `<div><dt>${label}</dt><dd>${value}</dd></div>`).join("");

  const rows = currentStep >= 8
    ? [
      ["QR", "QR-NFC-88421"],
      ["Origin", "Quinta do Vale, Douro"],
      ["Certification", recalled ? "Recalled" : "Certified"],
      ["Certificate hash", hash],
    ]
    : [
      ["QR", "Not available"],
      ["Origin", "Not available"],
      ["Certification", "Not available"],
    ];

  consumerCard.innerHTML = rows.map(([label, value]) => `
    <div class="public-row"><strong>${label}</strong><span>${value}</span></div>
  `).join("") + `
    <div class="private-row"><strong>Private data</strong><span>Production notes and private custody contracts are hidden from the consumer.</span></div>
  `;
}

function renderNegativeTests() {
  negativeTestsEl.innerHTML = negativeTests.map(([title, detail]) => `
    <div class="test-card rejected">
      <strong>${title}</strong>
      <span>${detail}</span>
    </div>
  `).join("");
}

function render() {
  renderActors();
  renderTimeline();
  renderState();
  renderNegativeTests();
}

function setTerminal(text) {
  terminalOutput.textContent = text.trim() || "No output.";
  terminalOutput.scrollTop = terminalOutput.scrollHeight;
}

async function callApi(path) {
  runnerState.textContent = "Running";
  document.querySelectorAll(".runner-actions .command").forEach((button) => {
    button.disabled = true;
  });
  setTerminal(`Running ${path} ...`);

  try {
    const response = await fetch(path, { method: "POST" });
    const payload = await response.json();
    runnerState.textContent = payload.ok ? "Passed" : "Failed";
    setTerminal(payload.output);
  } catch (error) {
    runnerState.textContent = "Failed";
    setTerminal(String(error));
  } finally {
    document.querySelectorAll(".runner-actions .command").forEach((button) => {
      button.disabled = false;
    });
  }
}

async function loadLatestEvidence() {
  runnerState.textContent = "Loading";
  try {
    const response = await fetch("/api/latest-evidence");
    const payload = await response.json();
    runnerState.textContent = payload.ok ? payload.file : "Missing";
    setTerminal(payload.output);
  } catch (error) {
    runnerState.textContent = "Failed";
    setTerminal(String(error));
  }
}

document.querySelector("#nextStepBtn").addEventListener("click", () => {
  recalled = false;
  currentStep = Math.min(currentStep + 1, steps.length);
  render();
});

document.querySelector("#resetBtn").addEventListener("click", () => {
  currentStep = 0;
  recalled = false;
  render();
});

document.querySelector("#recallBtn").addEventListener("click", () => {
  currentStep = Math.max(currentStep, 5);
  recalled = true;
  render();
});

document.querySelectorAll("[data-run]").forEach((button) => {
  button.addEventListener("click", () => callApi(button.dataset.run));
});

document.querySelector("#latestEvidenceBtn").addEventListener("click", loadLatestEvidence);

render();
