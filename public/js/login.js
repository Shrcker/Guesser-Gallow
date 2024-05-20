const loginFormHandler = async (event) => {
	event.preventDefault();
	// Collect values from the login form
	const name = document.getElementById("username-login").value.trim();
	const password = document.getElementById("password-login").value.trim();

	if (name && password) {
		// Send a POST request to the API endpoint
		const response = await fetch("/api/users/login", {
			method: "POST",
			body: JSON.stringify({ name, password }),
			headers: { "Content-Type": "application/json" },
		});

		if (response.ok) {
			// If successful, redirect the browser to the profile page
			document.location.replace("/profile");
		} else {
			alert(response.statusText);
		}
	}
};

const signupFormHandler = async (event) => {
	event.preventDefault();

	const name = document.getElementById("name-signup").value.trim();
	const password = document.getElementById("password-signup").value.trim();

	if (name && password) {
		const response = await fetch("/api/users", {
			method: "POST",
			body: JSON.stringify({ name, password }),
			headers: { "Content-Type": "application/json" },
		});

		if (response.ok) {
			document.location.replace("/");
		} else {
			alert(response.statusText);
		}
	}
};

document
	.getElementById("login-form")
	.addEventListener("submit", loginFormHandler);

document
	.getElementById("signup-form")
	.addEventListener("submit", signupFormHandler);
