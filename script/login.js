// ==========================
// LOGIN.JS
// ==========================
// File ini bertugas untuk:
// 1. Inisialisasi Google Identity Services (GIS)
// 2. Menampilkan tombol "Sign in with Google"
// 3. Menangani hasil login (token JWT)
// 4. Menyimpan data user ke sessionStorage

// Jalankan setelah halaman selesai dimuat
window.onload = function () {
  // Inisialisasi login Google
  google.accounts.id.initialize({
    // Ganti dengan Client ID milikmu dari Google Cloud Console
    client_id: "YOUR_GOOGLE_CLIENT_ID",
    callback: handleCredentialResponse
  });

  // Render tombol login ke dalam elemen <div id="g_id_signin">
  google.accounts.id.renderButton(
    document.getElementById("g_id_signin"), 
    {
      theme: "outline", // Gaya tombol: 'outline' atau 'filled_blue'
      size: "large",    // Ukuran tombol: 'small', 'medium', 'large'
      text: "signin_with", // Tulisan di tombol
      shape: "rectangular" // Bentuk tombol: 'circle', 'pill', atau 'rectangular'
    }
  );

  // (Opsional) Menampilkan prompt otomatis
  google.accounts.id.prompt(); 
};

// ==========================
// FUNGSI CALLBACK LOGIN
// ==========================

function handleCredentialResponse(response) {
  // Token dari Google dikirim ke sini
  const data = parseJwt(response.credential);

  // Tampilkan di console untuk debugging
  console.log("User info:", data);

  // Simpan data ke session agar bisa digunakan di halaman lain
  sessionStorage.setItem("user", JSON.stringify(data));

  // Setelah login berhasil, arahkan ke dashboard
  window.location.href = "dashboard.html";
}

// ==========================
// Fungsi bantu untuk membaca JWT (data user)
// ==========================
function parseJwt(token) {
  const base64Url = token.split('.')[1];
  const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  const jsonPayload = decodeURIComponent(
    atob(base64)
      .split('')
      .map(c => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
      .join('')
  );

  return JSON.parse(jsonPayload);
}
