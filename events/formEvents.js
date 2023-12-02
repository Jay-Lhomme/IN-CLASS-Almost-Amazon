import { getAuthors, updateAuthor, createAuthor } from '../api/authorData';
import { getBooks, createBook, updateBook } from '../api/bookData';
import { showAuthors } from '../pages/authors';
import { showBooks } from '../pages/books';

const formEvents = (user) => {
  document.querySelector('#main-container').addEventListener('submit', (e) => {
    e.preventDefault();
    // TODO: CLICK EVENT FOR SUBMITTING FORM FOR ADDING A BOOK
    if (e.target.id.includes('submit-book')) {
      const payload = {
        title: document.querySelector('#title').value,
        description: document.querySelector('#description').value,
        image: document.querySelector('#image').value,
        price: document.querySelector('#price').value,
        author_id: document.querySelector('#author_id').value,
        sale: document.querySelector('#sale').checked,
        uid: user.uid
      };
      createBook(payload).then(({ name }) => {
        const patchPayload = { firebaseKey: name };

        updateBook(patchPayload).then(() => {
          getBooks(user.uid).then(showBooks);
        });
      });
    }

    // TODO: CLICK EVENT FOR EDITING A BOOK
    if (e.target.id.includes('update-book')) {
      const [, firebaseKey] = e.target.id.split('--');
      const payload = {
        title: document.querySelector('#title').value,
        description: document.querySelector('#description').value,
        image: document.querySelector('#image').value,
        price: document.querySelector('#price').value,
        author_id: document.querySelector('#author_id').value,
        sale: document.querySelector('#sale').checked,
        user: user.uid,
        firebaseKey,
      };

      updateBook(payload).then(() => {
        getBooks(user.uid).then(showBooks);
      });
    }

    // FIXME: ADD CLICK EVENT FOR SUBMITTING FORM FOR ADDING AN AUTHOR
    if (e.target.id.includes('submit-author')) {
      const payload = {
        first_name: document.querySelector('#first_name').value,
        last_name: document.querySelector('#last_name').value,
        email: document.querySelector('#email').value,
        favorite: document.querySelector('#favorite').checked,
        user: user.uid
      };
      createAuthor(payload).then(({ name }) => {
        const patchPayload = { firebaseKey: name };

        updateAuthor(patchPayload).then(() => {
          getAuthors(user.uid).then(showAuthors);
        });
      });
    }

    // FIXME:ADD CLICK EVENT FOR EDITING AN AUTHOR
    if (e.target.id.includes('update-author')) {
      const [, firebaseKey] = e.target.id.split('--');
      const payload = {
        first_name: document.querySelector('#first_name').value,
        last_name: document.querySelector('#last_name').value,
        email: document.querySelector('#email').value,
        favorite: document.querySelector('#favorite').checked,
        user: user.uid,
        firebaseKey,
      };

      updateAuthor(payload).then(() => {
        getAuthors(user.uid).then(showAuthors);
      });
    }
  });
};

export default formEvents;
