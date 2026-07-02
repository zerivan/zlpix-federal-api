const fs = require("fs");

const URL =
  "https://servicebus2.caixa.gov.br/portaldeloterias/api/federal";

async function atualizarFederal() {
  try {
    console.log("🔄 Buscando resultado da Federal...");

    const response = await fetch(URL, {
      headers: {
        "Accept": "application/json",
        "User-Agent": "Mozilla/5.0",
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }

    const json = await response.json();

    fs.writeFileSync(
      "./api/federal.json",
      JSON.stringify(json, null, 2),
      "utf8"
    );

    console.log("✅ federal.json atualizado com sucesso.");
  } catch (error) {
    console.error("❌ Erro ao atualizar:", error);
    process.exit(1);
  }
}

atualizarFederal();