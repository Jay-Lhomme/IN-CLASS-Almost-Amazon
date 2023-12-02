import { getAuthors } from '../api/authorData';
import { getBooks } from '../api/bookData';
import logoutButton from '../components/buttons/logoutButton';
import domBuilder from '../components/shared/domBuilder';
import navBar from '../components/shared/navBar';
import domEvents from '../events/domEvents';
import formEvents from '../events/formEvents';
import navigationEvents from '../events/navigationEvents';
import { showAuthors } from '../pages/authors';
import { showBooks } from '../pages/books';

const startApp = (user) => {
  domBuilder(); // BUILD THE DOM
  domEvents(user); // ADD THE EVENT LISTENTERS TO THE DOM
  formEvents(user); // ADD FORM EVENT LISTENTERS TO THE DOM
  navBar(); // DYNAMICALLY ADD THE NAV
  logoutButton(); // ADD THE LOGOUT BUTTON COMPONENT
  navigationEvents(user); // ATTACH THE EVENT LISTENERS TO THE NAVBAR

  // TODO: Put all books on the DOM on App load
  getBooks(user.uid).then((books) => showBooks(books));
  getAuthors(user.uid).then((authors) => showAuthors(authors));
};

export default startApp;
