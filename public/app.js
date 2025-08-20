function renderCounter(number) {
    const counterContainer = document.getElementById("counter_amount");
    const digits = number.toString().padStart(10, "0").split("");
    counterContainer.innerHTML = "";
    digits.forEach(digit => {
        const span = document.createElement("span");
        span.classList.add("digit");
        span.textContent = digit;
        counterContainer.appendChild(span);
    });
}

// Fetch counter from the backend
fetch("/api/get-counter")
.then(res => res.json())
.then(data => {
    renderCounter(data.amount);
})
.catch(err => {
    console.error("Error fetching counter:", err);
});

 // Fetch current amount on page load
 function loadCounter() {
    fetch("/api/get-counter")
        .then(res => res.json())
        .then(data => renderCounter(data.amount))
        .catch(err => console.error("Error fetching counter:", err));
}

// Increment handler
function incrementCounter() {
    const password = document.getElementById("passwordInput").value;

    fetch("/api/get-counter")
        .then(res => res.json())
        .then(data => {
            const newValue = data.amount + 1;

            return fetch("/api/set-counter", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    password: password,
                    value: newValue
                })
            });
        })
        .then(res => res.json())
        .then(data => {
            if (data.amount !== undefined) {
                window.location.href = "index.html";
            } else {
                window.location.href = "ohno.html";
            }
        })
        .catch(err => console.error("Error incrementing counter:", err));
}

// Decrement handler
function decrementCounter() {
    const password = document.getElementById("passwordInput").value;

    fetch("/api/get-counter")
        .then(res => res.json())
        .then(data => {
            const newValue = data.amount - 1;

            return fetch("/api/set-counter", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    password: password,
                    value: newValue
                })
            });
        })
        .then(res => res.json())
        .then(data => {
            if (data.amount !== undefined) {
                window.location.href = "index.html";
            } else {
                window.location.href = "ohno.html";
            }
        })
        .catch(err => console.error("Error decrementing counter:", err));
}

// Load counter on startup
loadCounter();