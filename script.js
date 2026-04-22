// Sidebar toggle
const menuToggle = document.getElementById("menu-toggle");
const sidebar = document.getElementById("sidebar");

menuToggle.addEventListener("click", () => {
  sidebar.classList.toggle("active");
});

// Active link highlight
document.querySelectorAll(".sidebar ul li").forEach((item) => {
  item.addEventListener("click", () => {
    document.querySelectorAll(".sidebar ul li").forEach(li => li.classList.remove("active"));
    item.classList.add("active");
  });
});

// Sortable products table
const table = document.getElementById("productTable");
const headers = table.querySelectorAll("th[data-sort]");

headers.forEach(header => {
  header.addEventListener("click", () => {
    const column = header.cellIndex;
    const rows = Array.from(table.querySelectorAll("tbody tr"));
    const sortedRows = rows.sort((a, b) => {
      const aText = a.cells[column].textContent.trim();
      const bText = b.cells[column].textContent.trim();
      return aText.localeCompare(bText, 'en', { numeric: true });
    });
    table.querySelector("tbody").append(...sortedRows);
  });
});

// Status color auto-update
document.querySelectorAll(".status").forEach(status => {
  if (status.textContent.includes("Delivered")) status.style.color = "green";
  if (status.textContent.includes("Shipped")) status.style.color = "#f0ad4e";
  if (status.textContent.includes("Cancelled")) status.style.color = "red";
});
// Counter animation
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

window.addEventListener("DOMContentLoaded", () => {
  animateCounter("totalOrders", 258, 1500);
  animateCounter("totalSales", 145720, 1800, "₹");
  animateCounter("totalUsers", 532, 1300);
});

// Chart.js setup
const ctx1 = document.getElementById('salesChart').getContext('2d');
new Chart(ctx1, {
  type: 'line',
  data: {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [{
      label: 'Monthly Sales (₹)',
      data: [12000, 18000, 24000, 20000, 30000, 35000],
      borderColor: '#6c63ff',
      backgroundColor: 'rgba(108,99,255,0.2)',
      borderWidth: 2,
      tension: 0.4,
      fill: true,
    }]
  },
  options: {
    responsive: true,
    scales: { y: { beginAtZero: true } }
  }
});

const ctx2 = document.getElementById('categoryChart').getContext('2d');
new Chart(ctx2, {
  type: 'doughnut',
  data: {
    labels: ['Women', 'Men', 'Kids', 'Accessories'],
    datasets: [{
      label: 'Category Sales',
      data: [45, 30, 15, 10],
      backgroundColor: ['#ff80ab', '#9575cd', '#64b5f6', '#81c784'],
      borderWidth: 1
    }]
  },
  options: { responsive: true }
});
