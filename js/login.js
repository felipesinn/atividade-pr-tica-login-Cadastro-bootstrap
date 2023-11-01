// Captura os elementos do form
const formLogin = document.getElementById("form-login");
const emailInput = document.getElementById("email-login");
const passwordInput = document.getElementById("password-login");

formLogin.addEventListener("submit", async (e) => {
  e.preventDefault();

  const emailValue = emailInput.value;
  const passwordValue = passwordInput.value;

  const data = {
    email: emailValue,
    password: passwordValue
  };

  try {
    const response = await api.post("/login", data);

    if (response.status === 200) {
      const userData = response.data;
      localStorage.setItem("userId", userData.userId);

      const successAlert = document.getElementById("success-alert-login");

      successAlert.classList.remove("d-none");

      setTimeout(() => {
        window.location.href = "./html/recado.html";
      }, 2000);
    }
  } catch (error) {
    console.log("Erro:", error);
  }
});
