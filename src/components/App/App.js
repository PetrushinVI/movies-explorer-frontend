import React, { useState, useEffect } from 'react';
import { Route, Switch, Redirect, useHistory, useLocation } from 'react-router-dom';
import './App.css';
import CurrentUserContext from '../../contexts/CurrentUserContext';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import Header from '../Header/Header';
import Main from '../Main/Main';
import Footer from '../Footer/Footer';
import Register from '../Register/Register';
import Login from '../Login/Login';
import NotFound from '../NotFound/NotFound';
import Profile from '../Profile/Profile';
import SavedMovies from '../SavedMovies/SavedMovies';
import Movies from '../Movies/Movies';
import InfoPopup from '../InfoPopup/InfoPopup';
import * as api from '../../utils/MainApi';


function App() {

  const history = useHistory();
  const location = useLocation();
  const path = location.pathname;
  const [currentUser, setCurrentUser] = useState({});
  const [loggedIn, setLoggedIn] = useState(false);
  const [savedMovies, setSavedMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(true);
  const [update, setUpdate] = useState(false);

  useEffect(() => {
    const jwt = localStorage.getItem('jwt');

    if (jwt) {
      api
        .getContent(jwt)
        .then((res) => {
          if (res) {
            localStorage.removeItem('allMovies');
            setLoggedIn(true);
          }
          history.push(path);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, []);

  useEffect(() => {
    if (loggedIn) {
      api
        .getUserInfo()
        .then((userInfo) => {
          setCurrentUser(userInfo);
        })
        .catch((err) => {
          console.log(err);
        });

      api
        .getCards()
        .then((cards) => {
          setSavedMovies(cards.reverse());
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [loggedIn, history]);

  function handleRegister({ name, email, password }) {
    api
      .register(name, email, password)
      .then(() => {
        handleAuthorize({ email, password });
      })
      .catch((err) => {
        setSuccess(false);
        console.log(err);
      });
  }

  function handleAuthorize({ email, password }) {
    setLoading(true);
    api
      .authorize(email, password)
      .then((res) => {
        if (res) {
          setLoggedIn(true);
          localStorage.setItem('jwt', res.token);
          history.push('./movies');
        }
      })
      .catch((err) => {
        setSuccess(false);
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }

  function handleSelectionMovie(card) {
    api
      .postCard(card)
      .then((newMovie) => {
        setSavedMovies([newMovie, ...savedMovies]);
      })
      .catch((err) => {
        setSuccess(false);
        handleUnauthorized(err);
        console.log(err);
      });
  }

  function handleCardDelete(card) {
    api
      .deleteCard(card._id)
      .then(() => {
        setSavedMovies((state) => state.filter((item) => item._id !== card._id));
      })
      .catch((err) => {
        setSuccess(false);
        handleUnauthorized(err);
        console.log(err);
      });
  }

  function handleUpdateUser(userInfo) {
    setLoading(true);
    api
      .setUserInfo(userInfo)
      .then((data) => {
        setUpdate(true);
        setCurrentUser(data);
      })
      .catch((err) => {
        setSuccess(false);
        handleUnauthorized(err);
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }

  function handleUnauthorized(err) {
    if (err === 'Error: 401') {
      handleSignOut();
    }
  }

  const handleSignOut = () => {
    setLoggedIn(false);
    localStorage.removeItem('jwt');
    localStorage.removeItem('movies');
    localStorage.removeItem('allMovies');
    localStorage.removeItem('movieSearch');
    localStorage.removeItem('shortMovies');
    history.push('/');
  };

  function closePopup() {
    setSuccess(true);
    setUpdate(false);
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <div className="page__content">
          <Switch>
            <Route exact path="/">
              <Header loggedIn={loggedIn} />
              <Main />
              <Footer />
            </Route>
            <Route path="/signin">
              {!loggedIn ? (
                <Login onAuthorize={handleAuthorize} loading={loading} />
              ) : (
                <Redirect to="/" />
              )}
            </Route>
            <Route path="/signup">
              {!loggedIn ? (
                <Register onRegister={handleRegister} loading={loading} />
              ) : (
                <Redirect to="/" />
              )}
            </Route>
            <ProtectedRoute
              path="/movies"
              loggedIn={loggedIn}
              component={Movies}
              savedMovies={savedMovies}
              handleSelectionMovie={handleSelectionMovie}
              onCardDelete={handleCardDelete}>
            </ProtectedRoute>
            <ProtectedRoute
              path="/saved-movies"
              loggedIn={loggedIn}
              component={SavedMovies}
              savedMovies={savedMovies}
              onCardDelete={handleCardDelete}>
            </ProtectedRoute>
            <ProtectedRoute
              path="/profile"
              loggedIn={loggedIn}
              component={Profile}
              onUpdateUser={handleUpdateUser}
              loading={loading}
              signOut={handleSignOut}>
            </ProtectedRoute>
            <Route path="/*">
              <NotFound />
            </Route>
          </Switch>
          <InfoPopup success={success} onClose={closePopup} />
          <InfoPopup success={!update} update={update} onClose={closePopup} />
        </div>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
