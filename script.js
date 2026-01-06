let pengawas = JSON.parse(localStorage.getItem("pengawas")) || [];
let logData = JSON.parse(localStorage.getItem("logData")) || [];

function simpan() {
  localStorage.setItem("pengawas", JSON.stringify(pengawas));
  localStorage.setItem("logData", JSON.stringify(logData));
  render();
  renderLog();
}

function daftarPengawas() {
  const nama = document.getElementById("nama").value;
  const tingkatan = document.getElementById("tingkatan").value;

  if (!nama) return;

  pengawas.push({
    nama,
    tingkatan,
    merit: 100
  });

  simpan();
}

function kemaskiniMerit(index) {
  const nilai = Number(document.getElementById("nilai").value);
  const sebab = document.getElementById("sebab").value || "Tiada sebab dinyatakan";

  pengawas[index].merit += nilai;

  logData.push({
    nama: pengawas[index].nama,
    tingkatan: pengawas[index].tingkatan,
    perubahan: nilai,
    sebab,
    masa: new Date().toLocaleString()
  });

  simpan();
}

function importCSV() {
  const file = document.getElementById("csvFile").files[0];
  if (!file) return;

  const reader = new FileReader();

  reader.onload = function(e) {
    const rows = e.target.result.split("\n");

    rows.forEach((row, idx) => {
      if (idx === 0) return; // skip header

      const cols = row.split(",");

      if (cols.length >= 2) {
        const tingkatan = cols[0].trim();
        const nama = cols[1].trim();

        if (nama && tingkatan && !pengawas.some(p => p.nama === nama)) {
          pengawas.push({
            nama,
            tingkatan,
            merit: 100
          });
        }
      }
    });

    simpan();
  };

  reader.readAsText(file);
}

function render() {
  const tbody = document.getElementById("senarai");
  const filter = document.getElementById("filter").value;

  tbody.innerHTML = "";

  pengawas
    .filter(p => filter === "ALL" || p.tingkatan === filter)
    .forEach((p, i) => {

      const row = `
        <tr>
          <td>${p.tingkatan}</td>
          <td>${p.nama}</td>
          <td>${p.merit}</td>
          <td>
            <button onclick="kemaskiniMerit(${i})">Kemaskini</button>
          </td>
        </tr>
      `;

      tbody.innerHTML += row;
    });
}

function renderLog() {
  const ul = document.getElementById("log");
  ul.innerHTML = "";

  logData.slice().reverse().forEach(l => {
    ul.innerHTML += `
      <li>
        ${l.masa} — <b>${l.nama}</b> (${l.tingkatan}) 
        <br/> Perubahan: ${l.perubahan}
        <br/> Sebab: ${l.sebab}
      </li>
    `;
  });
}

render();
renderLog();
