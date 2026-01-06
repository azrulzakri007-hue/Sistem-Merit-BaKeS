let pengawas = JSON.parse(localStorage.getItem("pengawas")) || [];

function simpan() {
  localStorage.setItem("pengawas", JSON.stringify(pengawas));
  render();
}

function daftarPengawas() {
  const nama = document.getElementById("nama").value;
  if (!nama) return;

  pengawas.push({ nama, merit: 100 });
  simpan();
}

function tolakMerit(index, nilai) {
  pengawas[index].merit -= nilai;
  simpan();
}

function render() {
  const tbody = document.getElementById("senarai");
  tbody.innerHTML = "";

  pengawas.forEach((p, i) => {
    const row = `
      <tr>
        <td>${p.nama}</td>
        <td>${p.merit}</td>
        <td>
          <button onclick="tolakMerit(${i}, 5)">-5</button>
          <button onclick="tolakMerit(${i}, 10)">-10</button>
          <button onclick="tolakMerit(${i}, 20)">-20</button>
        </td>
      </tr>
    `;
    tbody.innerHTML += row;
  });
}

render();
