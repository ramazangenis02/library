const registerBtn = document.querySelector(".reg-btn");
let regModal = document.querySelector(".register-modal-wrapper");
registerBtn.addEventListener("click", () => {
  regModal.style.display = "block";
});

let register = false;
const form = document.querySelector(".register-form");
form.addEventListener("submit", e => {
  let fName = document.querySelector(".fname");
  let lName = document.querySelector(".lname");
  e.preventDefault();
  regModal.style.display = "none";

  let name = document.querySelector(".name");

  name.innerText = fName.value + " " + lName.value;

  registerBtn.style.display = "none";

  register = true;
});

function selectAvatar() {
  let avatarState = false;

  let fAvatarState = false;
  let mAvatarState = false;
  let fAvatar = document.querySelector(".f-avatar");
  let mAvatar = document.querySelector(".m-avatar");

  let defaultAvatar = document.querySelector(".defaultavatar");

  fAvatar.addEventListener("click", () => {
    avatarState = true;

    mAvatarState = false;
    fAvatarState = true;
    if (avatarState == true) {
      fAvatar.classList.add("selected");
      mAvatar.classList.remove("selected");
    }

    if (fAvatarState == true) {
      defaultAvatar.src = "img/avatars/undraw_female_avatar_w3jk.svg";
    }
  });

  mAvatar.addEventListener("click", () => {
    fAvatarState = false;
    mAvatarState = true;
    avatarState = true;
    if (avatarState == true) {
      mAvatar.classList.add("selected");
      fAvatar.classList.remove("selected");
    }

    if ((mAvatarState = true)) {
      defaultAvatar.src = "img/avatars/undraw_male_avatar_323b.svg";
    }
  });
}

selectAvatar();

const addBtn = document.querySelector(".add-wrapper");
let addModal = document.querySelector(".add-modal");
let bookCardsContainer = document.querySelector(".books-cards-container");
addBtn.addEventListener("click", () => {
  if (register == true) {
    addModal.style.display = "block";
  } else {
    alert("You need to register first!");
  }

  bookCardsContainer.style.zIndex = "-1";
});

const closeBtn = document.querySelector(".close-btn");

closeBtn.addEventListener("click", () => {
  addModal.style.display = "none";
  bookCardsContainer.style.zIndex = "1";
});

const addForm = document.querySelector(".add-form");

let sendedAddForm = false;
addForm.addEventListener("submit", e => {
  e.preventDefault();
  addModal.style.display = "none";
  sendedAddForm = true;
  addBookToLibrary();
  resetForm();
  bookCardsContainer.style.zIndex = "1";
});

const titleInput = document.querySelector(".title-input");
const authorInput = document.querySelector(".author-input");
const numberInput = document.querySelector(".number-input");
const checkbox = document.querySelectorAll(".checkbox");

let myLibrary = [];

function Book(title, author, pages, status) {
  //Constructor
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.status = status;
}

let totalAddedBook = 0;
let totalReadedBooks = 0;
let totalUnReadBooks = 0;

function addBookToLibrary() {
  const titleValue = document.querySelector(".title-input").value;
  const authorValue = document.querySelector(".author-input").value;
  const pagesValue = document.querySelector(".number-input").value;
  let checkValue = "";

  const checkYes = document.querySelector(".check-yes");
  const checkNo = document.querySelector(".check-no");

  if (checkYes.checked) {
    checkValue = "Readed";
    totalReadedBooks++;
  } else if (checkNo.checked) {
    checkValue = "Not yet read";
    totalUnReadBooks++;
  }

  // const book1 = new Book(titleValue, authorValue, pagesValue, checkValue);
  for (let i = 0; i < 1; i++) {
    let newBook = new Book(titleValue, authorValue, pagesValue, checkValue);
    myLibrary.push(newBook);
    totalAddedBook++;
  }

  var last = myLibrary[myLibrary.length - 1];

  const booksContainer = document.querySelector(".books-cards-container");
  const div = document.createElement("div");
  const div2 = document.createElement("div");
  const editDeleteWrapper = document.createElement("div");
  const bookTitleDom = document.createElement("h3");
  const bookAuthorDom = document.createElement("h4");
  const bookPagesDom = document.createElement("p");
  const bookStatusDom = document.createElement("p");
  const bookPagesWrapper = document.createElement("span");
  const bookStatusWrapper = document.createElement("span");
  const editBtn = document.createElement("i");
  const deleteBtn = document.createElement("i");

  div.classList.add("book-cards");
  div2.classList.add("book-cards-content");
  bookTitleDom.classList.add("book-title");
  bookAuthorDom.classList.add("book-author");
  bookPagesDom.classList.add("book-pages");
  bookStatusDom.classList.add("book-status");
  bookPagesWrapper.classList.add("pages-wrapper");
  bookStatusWrapper.classList.add("status-wrapper");
  editDeleteWrapper.classList.add("edit-delete-wrapper");
  editBtn.classList.add("edit-btn");
  editBtn.classList.add("fa-edit");
  editBtn.classList.add("fas");
  deleteBtn.classList.add("delete-btn");
  deleteBtn.classList.add("fa-trash-alt");
  deleteBtn.classList.add("fas");

  editDeleteWrapper.appendChild(deleteBtn);
  editDeleteWrapper.appendChild(editBtn);

  booksContainer.appendChild(div);
  div.appendChild(div2);
  div2.appendChild(bookTitleDom);
  div2.appendChild(bookAuthorDom);
  div2.appendChild(editDeleteWrapper);

  const bookPagesContainer = document.createElement("div");
  const bookStatusContainer = document.createElement("div");

  bookPagesContainer.classList.add("book-pages-wrapper");
  bookStatusContainer.classList.add("book-status-wrapper");

  bookPagesContainer.appendChild(bookPagesDom);
  bookPagesContainer.appendChild(bookPagesWrapper);

  bookStatusContainer.appendChild(bookStatusDom);
  bookStatusContainer.appendChild(bookStatusWrapper);

  div2.appendChild(bookPagesContainer);
  div2.appendChild(bookStatusContainer);

  bookTitleDom.innerText = last.title;
  bookAuthorDom.innerText = "By " + last.author;
  bookPagesDom.innerText = "Pages: ";
  bookPagesWrapper.innerText = last.pages;
  bookStatusDom.innerText = "Status:";
  bookStatusWrapper.innerText = last.status;

  deleteBtn.addEventListener("click", e => {
    const parent = e.target.parentNode.parentNode.parentNode;
    parent.remove();
    totalAddedBook--;
    totalAddedBookWrapper.innerText = totalAddedBook;

    if (bookStatusWrapper.innerText == "Not yet read") {
      totalUnReadBooks--;
      totalUnReadBooksWrapper.innerText = totalUnReadBooks;
    } else if (bookStatusWrapper.innerText == "Readed") {
      totalReadedBooks--;
      totalReadedBooksWrapper.innerText = totalReadedBooks;
    }
  });

  editBtn.addEventListener("click", () => {
    if (checkValue == "Readed") {
      checkValue = "Not yet read";
      bookStatusWrapper.innerText = "Not yet read";
      totalUnReadBooks++;
      totalReadedBooks--;
      totalReadedBooksWrapper.innerText = totalReadedBooks;
      totalUnReadBooksWrapper.innerText = totalUnReadBooks;
    } else if (checkValue == "Not yet read") {
      checkValue = "Readed";
      bookStatusWrapper.innerText = "Readed";
      totalReadedBooks++;
      totalUnReadBooks--;
      totalReadedBooksWrapper.innerText = totalReadedBooks;
      totalUnReadBooksWrapper.innerText = totalUnReadBooks;
    }
  });

  const totalAddedBookWrapper = document.querySelector(".added-book");
  const totalReadedBooksWrapper = document.querySelector(".readed-book");
  const totalUnReadBooksWrapper = document.querySelector(".unread-book");

  totalAddedBookWrapper.innerText = totalAddedBook;
  totalReadedBooksWrapper.innerText = totalReadedBooks;
  totalUnReadBooksWrapper.innerText = totalUnReadBooks;
}

function resetForm() {
  if (sendedAddForm == true) {
    titleInput.value = "";
    authorInput.value = "";
    numberInput.value = "";
    checkbox.forEach(e => {
      e.checked = false;
    });
  }
}
