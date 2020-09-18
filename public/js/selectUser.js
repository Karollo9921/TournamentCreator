const selected = document.querySelector(".selected");
const optionsContainer = document.querySelector(".options-container");
const selectedUsers = document.querySelector(".selected-users-list");
const selectedUsersList = [];
const alert = document.querySelector(".alert-user-selected");
const findUser = document.querySelector(".find-user");
const userLogin = document.querySelector(".user-login");

const optionsList = document.querySelectorAll(".option");

selected.addEventListener("click", () => {
  optionsContainer.classList.toggle("active");
});


optionsList.forEach(o => {
  o.addEventListener("click", () => {
    if (selectedUsersList.includes(o.querySelector("label"))) {
      alert.style.display = 'block';
      alert.innerHTML = `User ${o.querySelector("label").innerHTML} has been already selected you can't add him twice`;
      setTimeout(() => {
        alert.style.display = 'none';
      }, 3000);
      optionsContainer.classList.remove("active");
    } else {
      selectedUsersList.push(o.querySelector("label"));
      selectedUsers.innerHTML = '';
      selectedUsersList.forEach(user => {
        selectedUsers.innerHTML += `<li>
                                      <a href="/users/${user.id}">${user.innerHTML}</a>
                                      <input type="hidden" class="radio" name="usersLogins" value="${user.innerHTML}">
                                    </li>`
      });
      optionsContainer.classList.remove("active");
    }
  });
});


(() => {
  findUser.addEventListener('keyup', (event) => {
      optionsList.forEach(o => {
        let item = o.querySelector('label');
        let itemParent = item.parentElement;
        itemParent.style.display = 'none';
        if (item.innerHTML.toLowerCase().includes(findUser.value.toLowerCase().trim())) {
          itemParent.style.display = 'block'
        }
      })
  })
})();
