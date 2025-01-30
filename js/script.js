document.addEventListener("DOMContentLoaded", function () {
    const bmiButton = document.getElementById("hitung-bmi");
    const notification = document.getElementById("notification");
    const resultDiv = document.getElementById("result");
    const genderInputs = document.querySelectorAll('input[name="gender"]');
    const weightInput = document.getElementById("input-berat-badan");
    const heightInput = document.getElementById("input-tinggi-badan");
    const ageInput = document.getElementById("input-usia");

    // Fungsi untuk menampilkan bagian saran berdasarkan kategori BMI
    function showAdviceSection(category) {
        // Menyembunyikan semua kategori dulu
        document.getElementById("underweight").style.display = "none";
        document.getElementById("normal").style.display = "none";
        document.getElementById("overweight").style.display = "none";

        // Menampilkan kategori yang sesuai
        document.getElementById(category).style.display = "block";
    }

    // Fungsi untuk menghitung BMI
    function calculateBMI() {
        const weight = parseFloat(weightInput.value);
        const height = parseFloat(heightInput.value) / 100; // konversi cm ke meter

        // Pengecekan validitas input
        if (isNaN(weight) || isNaN(height) || weight <= 0 || height <= 0) {
            alert("Harap masukkan data berat dan tinggi yang valid!");
            return;
        }

        const bmi = (weight / (height * height)).toFixed(1);
        
        let status = "";
        if (bmi < 18.5) {
            status = "Kekurangan Berat Badan";
            showAdviceSection("underweight");
        } else if (bmi >= 18.5 && bmi < 24.9) {
            status = "Berat Badan Normal";
            showAdviceSection("normal");
        } else if (bmi >= 25 && bmi < 29.9) {
            status = "Kelebihan Berat Badan";
            showAdviceSection("overweight");
        } else {
            status = "Obesitas";
            showAdviceSection("overweight");
        }

        // Menampilkan hasil
        document.getElementById("Gender").textContent = `Jenis Kelamin: ${document.querySelector('input[name="gender"]:checked').value}`;
        document.getElementById("Status").textContent = status;
        document.getElementById("Value").textContent = bmi;
        
        // Menampilkan bagian hasil
        resultDiv.style.display = "block";

        // Menyembunyikan notifikasi jika input lengkap
        notification.style.display = "none";
    }

    // Fungsi untuk memeriksa input form
    function checkInputs() {
        const weight = weightInput.value.trim();
        const height = heightInput.value.trim();
        const age = ageInput.value.trim();
        const genderChecked = Array.from(genderInputs).some(input => input.checked);

        // Jika ada input yang belum lengkap, tombol Hitung BMI akan nonaktif
        const isComplete = weight && height && age && genderChecked;
        bmiButton.disabled = !isComplete;

        if (isComplete) {
            notification.style.display = "none"; // Menyembunyikan notifikasi jika semua input terisi
        } else {
            notification.style.display = "block"; // Menampilkan notifikasi jika ada input kosong
        }
    }

    bmiButton.addEventListener("click", function (event) {
        event.preventDefault();
        if (bmiButton.disabled) {
            notification.style.display = "block"; // Menampilkan notifikasi jika tombol di klik dan ada data yang kosong
            return;
        }
        calculateBMI();
    });

    // Menambahkan event listener untuk cek input setiap kali ada perubahan
    weightInput.addEventListener("input", checkInputs);
    heightInput.addEventListener("input", checkInputs);
    ageInput.addEventListener("input", checkInputs);
    genderInputs.forEach(input => input.addEventListener("change", checkInputs));

    // Menjalankan pengecekan input pertama kali saat halaman dimuat
    checkInputs();
});
