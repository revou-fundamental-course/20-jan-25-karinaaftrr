document.addEventListener("DOMContentLoaded", function () {
    const bmiButton = document.querySelector(".bg-cadet-blue");
    const resetButton = document.querySelector(".bg-black");

    bmiButton.addEventListener("click", function (event) {
        event.preventDefault();
        calculateBMI();
    });

    resetButton.addEventListener("click", function (event) {
        event.preventDefault();
        resetForm();
    });
});

function calculateBMI() {
    const gender = document.querySelector('input[name="gender"]:checked')?.value || "";
    const weight = parseFloat(document.getElementById("input-berat-badan").value);
    const height = parseFloat(document.getElementById("input-tinggi-badan").value) / 100;

    if (isNaN(weight) || isNaN(height) || weight <= 0 || height <= 0) {
        alert("Harap masukkan data berat dan tinggi yang valid!");
        return;
    }

    // Logika penyesuaian BMI berdasarkan jenis kelamin
    let bmi;
    if (gender === "Wanita") {
        // Untuk wanita, kita bisa mengurangi nilai BMI berdasarkan faktor-faktor tubuh wanita
        bmi = (weight / (height * height)).toFixed(1);
    } else {
        // Untuk pria, hitung BMI seperti biasa
        bmi = (weight / (height * height)).toFixed(1);
    }

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

    document.getElementById("Value").textContent = bmi;
    document.getElementById("Status").textContent = status;
    document.getElementById("Gender").textContent = `Jenis Kelamin: ${gender ? gender : "Tidak Dipilih"}`;
    document.getElementById("result").style.display = "block";
}

function showAdviceSection(sectionId) {
    const sections = ["underweight", "normal", "overweight"];
    sections.forEach(section => {
        document.getElementById(section).style.display = "none";
    });
    document.getElementById(sectionId).style.display = "block";
}

function resetForm() {
    document.getElementById("input-berat-badan").value = "";
    document.getElementById("input-usia").value = "";
    document.getElementById("input-tinggi-badan").value = "";
    document.querySelectorAll('input[name="gender"]').forEach(el => el.checked = false);
    document.getElementById("result").style.display = "none";
}
