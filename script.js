// Menunggu hingga DOM siap
document.addEventListener('DOMContentLoaded', function() {
    // === Menangani Form Contact Us ===
    const contactForm = document.querySelector('#contact form');

    if (contactForm) {
        contactForm.addEventListener('submit', function(event) {
            event.preventDefault(); // Mencegah form dikirimkan secara default

            // Mengambil nilai dari input
            const name = document.querySelector('#name').value;
            const email = document.querySelector('#email').value;
            const message = document.querySelector('#message').value;

            // Memberikan alert dengan detail pesan yang dimasukkan
            alert(`Terima kasih, ${name}! Pesan Anda telah terkirim.\nEmail: ${email}\nPesan: ${message}`);

            // Reset form setelah pengiriman
            contactForm.reset();
        });
    }

    // === Menangani klik pada tombol secara umum ===
    const buttons = document.querySelectorAll('button');

    buttons.forEach(button => {
        button.addEventListener('click', function(event) {
            console.log(`${button.textContent} telah diklik!`);
        });
    });

    // === Khusus untuk Monitoring Page ===
    if (window.location.pathname.includes('monitoring.html')) {
        // Fungsi untuk memperbarui data dari server
        function updateData() {
            fetch("/status")
                .then(response => response.json())
                .then(data => {
                    // Update elemen HTML dengan data sensor yang diterima
                    document.getElementById("moisture").innerText = data.moisture;
                    document.getElementById("temperature").innerText = data.temperature;
                    document.getElementById("humidity").innerText = data.humidity;
                    document.getElementById("status").innerText = data.systemStatus;
                })
                .catch(error => console.error('Error fetching data:', error));  // Menangani error jika ada
        }

        // Fungsi untuk toggle sistem dan memperbarui data setelahnya
        function toggleSystem() {
            fetch("/toggleSystem").then(updateData);
        }

        // Fungsi untuk toggle pompa dan memperbarui data setelahnya
        function togglePump() {
            fetch("/togglePump").then(updateData);
        }

        // Jalankan fungsi update data setiap 5 detik
        setInterval(updateData, 5000);

        // Menghubungkan tombol dengan fungsi toggle
        const systemButton = document.getElementById("systemButton");
        const pumpButton = document.getElementById("pumpButton");

        if (systemButton) {
            systemButton.addEventListener('click', toggleSystem);
        }

        if (pumpButton) {
            pumpButton.addEventListener('click', togglePump);
        }
    }
});
