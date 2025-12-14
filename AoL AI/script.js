document.addEventListener("DOMContentLoaded", () => {
  const button = document.querySelector(".btn-primary");

  const wilayahData = {
    "Jakarta Utara": { elevasi: 200, hujanRata: 6.5 },
    "Jakarta Barat": { elevasi: 500, hujanRata: 6.0 },
    "Jakarta Timur": { elevasi: 300, hujanRata: 6.2 },
    "Jakarta Selatan": { elevasi: 800, hujanRata: 5.8 },
    "Jakarta Pusat": { elevasi: 400, hujanRata: 6.1 }
  };

  button.addEventListener("click", () => {
    const inputs = document.querySelectorAll(".overlay-input");
    const rainfall = parseFloat(inputs[0].value);
    const seaLevelNaik = parseFloat(inputs[1].value);
    const area = inputs[2].value;

    if (isNaN(rainfall) || isNaN(seaLevelNaik) || area === "") {
      alert("Silakan isi semua input dengan benar!");
      return;
    }

    const data = wilayahData[area];
    const elevasi = data.elevasi;
    const hujanRata = data.hujanRata;

    // ---- PERHITUNGAN ----
    let risikoHujan = (rainfall / hujanRata) * 50;
    let risikoLaut = (seaLevelNaik / elevasi) * 50;

    // Batasi masing-masing komponen 0%-50%
    risikoHujan = Math.max(0, Math.min(risikoHujan, 50));
    risikoLaut = Math.max(0, Math.min(risikoLaut, 50));

    // Total risiko 0%-100%
    let totalRisk = risikoHujan + risikoLaut;
    totalRisk = Math.max(0, Math.min(totalRisk, 100));

    // ---- KATEGORI ----
    let kategori = "Rendah";
    if (totalRisk > 66) kategori = "Tinggi";
    else if (totalRisk > 33) kategori = "Sedang";

    // ---- UPDATE UI ----
    const circle = document.querySelector(".result-circle");
    const value = document.querySelector(".result-value");
    const text = document.querySelector(".result-text");

    value.innerText = `${totalRisk.toFixed(1)}%`;
    text.innerText = `Risiko ${kategori}`;

    if (kategori === "Rendah") {
      circle.style.borderColor = "green";
      circle.style.background = "rgba(0,128,0,0.25)";
    } else if (kategori === "Sedang") {
      circle.style.borderColor = "orange";
      circle.style.background = "rgba(255,165,0,0.25)";
    } else {
      circle.style.borderColor = "red";
      circle.style.background = "rgba(255,0,0,0.25)";
    }
  });
});
