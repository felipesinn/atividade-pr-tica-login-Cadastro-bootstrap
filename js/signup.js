// Captura os elementos do form
const formSignup = document.getElementById("form-signup");
const nameInputSignup = document.getElementById("name");
const emailInputSignup = document.getElementById("email");
const passwordInputSignup = document.getElementById("password");
const rePasswordInputSignup = document.getElementById("re-password");

let newUser;  

formSignup.addEventListener("submit", async (e) => {
  e.preventDefault();

  const nameValue = nameInputSignup.value;
  const emailValue = emailInputSignup.value;
  const passwordValue = passwordInputSignup.value;
  const rePasswordValue = rePasswordInputSignup.value;

  if (passwordValue !== rePasswordValue) {
    const errorAlert = document.getElementById("error-alert");
    errorAlert.textContent = "As senhas não coincidem. Por favor, digite as senhas novamente.";

    errorAlert.classList.remove("d-none");

    passwordInputSignup.value = "";
    rePasswordInputSignup.value = "";
  } else {
    const errorAlert = document.getElementById("error-alert");
    errorAlert.classList.add("d-none");

    newUser = {
      name: nameValue,
      email: emailValue,
      password: passwordValue
    };

    try {
      const response = await api.post("/signup", newUser);

      if (response.status === 201) {
        const successAlert = document.getElementById("success-alert-signup");

        successAlert.classList.remove("d-none");

        setTimeout(() => {
          window.location.href = "/index.html";
        }, 3000);
      }
    } catch (error) {
      const errorAlert = document.getElementById("error-alert");

      if (error.response && error.response.data && error.response.data.message) {
        errorAlert.textContent = `Erro ao cadastrar usuário: ${error.response.data.message}`;
      } else {
        errorAlert.textContent = "Erro ao cadastrar usuário. Por favor, tente novamente.";
      }

      errorAlert.classList.remove("d-none");
      console.log("Erro ao cadastrar usuário", error);
    }
  }
});
