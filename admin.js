// Dark mode toggle
const darkToggle = document.getElementById("darkToggle");
const body = document.body;

// Load saved theme
if (localStorage.getItem("theme") === "dark") {
  body.classList.add("dark-mode");
  darkToggle.textContent = "☀️";
}

// Toggle theme
darkToggle.addEventListener("click", () => {
  body.classList.toggle("dark-mode");
  const isDark = body.classList.contains("dark-mode");
  darkToggle.textContent = isDark ? "☀️" : "🌙";
  localStorage.setItem("theme", isDark ? "dark" : "light");
});
// 📊 Chart.js Analytics

// Sales Growth Chart (Line)
const ctxSales = document.getElementById("salesChart");
new Chart(ctxSales, {
  type: "line",
  data: {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    datasets: [{
      label: "Monthly Sales (₹)",
      data: [12000, 19000, 15000, 22000, 28000, 35000],
      borderColor: "#e36bae",
      backgroundColor: "rgba(227, 107, 174, 0.2)",
      fill: true,
      tension: 0.4,
      borderWidth: 2,
      pointRadius: 5,
      pointBackgroundColor: "#e36bae",
    }]
  },
  options: {
    responsive: true,
    scales: {
      y: {
        beginAtZero: true,
        ticks: { color: "#555" },
        grid: { color: "#eee" }
      },
      x: {
        ticks: { color: "#555" },
        grid: { color: "#eee" }
      }
    },
    plugins: {
      legend: {
        labels: { color: "#555" }
      }
    }
  }
});

// Orders by Category Chart (Doughnut)
const ctxCategory = document.getElementById("categoryChart");
new Chart(ctxCategory, {
  type: "doughnut",
  data: {
    labels: ["Fashion", "Footwear", "Electronics", "Accessories"],
    datasets: [{
      label: "Orders",
      data: [40, 25, 20, 15],
      backgroundColor: ["#e36bae", "#ff91c1", "#f7c5d9", "#ffe3ec"],
      borderWidth: 1
    }]
  },
  options: {
    responsive: true,
    plugins: {
      legend: {
        position: "bottom",
        labels: { color: "#555" }
      }
    }
  }
});

// 🌙 Dark Mode Chart Update
function updateChartColors(isDark) {
  Chart.defaults.color = isDark ? "#eee" : "#555";
  Chart.defaults.borderColor = isDark ? "#555" : "#eee";
}

const observer = new MutationObserver(() => {
  const isDark = document.body.classList.contains("dark-mode");
  updateChartColors(isDark);
});
observer.observe(document.body, { attributes: true, attributeFilter: ["class"] });
// 🎯 Animated Counter Function
function animateCounter(id, endValue, duration, prefix = "", suffix = "") {
  const element = document.getElementById(id);
  let startValue = 0;
  const increment = endValue / (duration / 16);

  function updateCounter() {
    startValue += increment;
    if (startValue < endValue) {
      element.textContent = prefix + Math.floor(startValue).toLocaleString() + suffix;
      requestAnimationFrame(updateCounter);
    } else {
      element.textContent = prefix + endValue.toLocaleString() + suffix;
    }
  }
  requestAnimationFrame(updateCounter);
}

// 🧮 Start the counters when page loads
window.addEventListener("DOMContentLoaded", () => {
  animateCounter("totalOrders", 258, 1500);
  animateCounter("totalSales", 145720, 1800, "₹");
  animateCounter("totalUsers", 532, 1300);
});
// 💼 Admin Panel Navigation
const navLinks = document.querySelectorAll(".admin-nav a");
navLinks.forEach(link => {
  link.addEventListener("click", (e) => {
    e.preventDefault();
    const targetId = link.getAttribute("href").substring(1);
    document.querySelectorAll(".admin-section").forEach(section => {
      section.style.display = section.id === targetId ? "block" : "none";
    });
    navLinks.forEach(nav => nav.classList.remove("active"));
    link.classList.add("active");
  });
});

// Show default section
document.querySelector(".admin-nav a").click();
// 🛒 Product Card Click Navigation
const productCards = document.querySelectorAll(".product-card");
productCards.forEach(card => {
  card.addEventListener("click", () => {
    window.location.href = "product.html";
  });
});
