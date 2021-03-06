import React, { useContext, useState, useEffect } from 'react';
import {
  BrowserRouter,
  Route,
  Link,
  Redirect,
  useLocation,
} from 'react-router-dom';
import Search from './pages/Search';
import Login from './components/Login';
import MovieDetail from './pages/MovieDetail';
import ShowDetail from './pages/ShowDetail';
import ProtectedRoute from './components/ProtectedRoute';
import AuthContext from './utils/AuthContext';
import Emoji from './components/Emoji';
import { ModalProvider } from './utils/ModalContext';
import Person from './pages/Person';
import Movies from './pages/movies/Movies';
import Shows from './pages/shows/Shows';
import Profile from './pages/Profile';
import { ProgressBar } from './components/ProgressBar';
import { QueryParamProvider } from 'use-query-params';
import { ThemeProvider } from './utils/ThemeContext';
import { useGlobalState } from './state/store';
import { Alert } from 'components/Alert/Alert';
import { AlertProvider } from 'utils/AlertContext';
const redirect_url = process.env.REACT_APP_REDIRECT_URL;
const client_id = process.env.REACT_APP_TRAKT_API_KEY;

const ParamsComponent: React.FC = () => {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const { session } = useContext(AuthContext);

  return session ? (
    <Redirect to="/movies" />
  ) : (
    <div className="text-center pt-20">
      {params.get('code') ? (
        <Login code={params.get('code') || ''} />
      ) : (
        <a
          className="bg-purple-700 py-3 px-12 rounded-full text-white"
          href={`https://trakt.tv/oauth/authorize?response_type=code&client_id=${client_id}&redirect_uri=${redirect_url}`}
        >
          Login
        </a>
      )}
    </div>
  );
};

const App: React.FC = () => {
  const [ref, setRef] = useState();

  const {
    actions: { firstLoad },
    state: { userInfo },
  } = useGlobalState();

  const { session } = useContext(AuthContext);

  useEffect(() => {
    firstLoad(session);
    // eslint-disable-next-line
  }, [session]);

  return (
    <div ref={setRef}>
      <BrowserRouter>
        <QueryParamProvider ReactRouterRoute={Route}>
          <ThemeProvider>
            <AlertProvider>
              <Alert />
              <ModalProvider modalRef={ref}>
                <ul className="navbar flex w-full text-2xl hidden opacity-0 lg:top-0 lg:bottom-auto lg:block">
                  <li className="py-1">
                    <Emoji emoji="📺" /> P
                  </li>
                </ul>
                <nav className="w-full flex flex-col fixed bottom-0 z-50 justify-around text-2xl lg:top-0 lg:bottom-auto">
                  <ProgressBar />
                  <ul
                    className="flex justify-around px-2 text-center bg-gray-200"
                    style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}
                  >
                    <li className="py-1">
                      <Link
                        to="/movies?mode=watchlist&page=1"
                        className="flex items-center"
                      >
                        <Emoji emoji="🎬" />
                        <span className="ml-2 text-base hidden lg:inline">
                          Movies
                        </span>
                      </Link>
                    </li>
                    <li className="py-1">
                      <Link
                        to="/shows?mode=watched&page=1"
                        className="flex items-center"
                      >
                        <Emoji emoji="📺" />
                        <span className="ml-2 text-base hidden lg:inline">
                          Series
                        </span>
                      </Link>
                    </li>
                    <li className="py-1">
                      <Link to="/search" className="flex items-center">
                        <Emoji emoji="🔍" />
                        <span className="ml-2 text-base hidden lg:inline">
                          Search
                        </span>
                      </Link>
                    </li>
                    <li className="py-1">
                      <Link to="/profile" className="flex items-center">
                        <Emoji emoji="👤" />
                        <span className="ml-2 text-base hidden lg:inline">
                          Profile
                        </span>
                      </Link>
                    </li>
                  </ul>
                </nav>
                <>
                  <Route exact path="/">
                    <ParamsComponent />
                  </Route>
                  <ProtectedRoute path="/movies">
                    {userInfo.movies.ready ? (
                      <Movies />
                    ) : (
                      <h1>Loading Movies!</h1>
                    )}
                  </ProtectedRoute>
                  <ProtectedRoute path="/shows">
                    {userInfo.shows.ready ? (
                      <Shows />
                    ) : (
                      <h1>Loading Series!</h1>
                    )}
                  </ProtectedRoute>
                  <Route path="/search">
                    <Search />
                  </Route>
                  <Route path="/movie/:id">
                    <MovieDetail />
                  </Route>
                  <Route path="/show/:id">
                    <ShowDetail />
                  </Route>
                  <Route path="/person/:id">
                    <Person />
                  </Route>
                  <Route path="/profile">
                    <Profile />
                  </Route>
                  <ul
                    className="navbar flex w-full text-2xl opacity-0 lg:top-0 lg:bottom-auto lg:hidden"
                    style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}
                  >
                    <li className="py-1">
                      <Emoji emoji="📺" />P
                    </li>
                  </ul>
                </>
              </ModalProvider>
            </AlertProvider>
          </ThemeProvider>
        </QueryParamProvider>
      </BrowserRouter>
    </div>
  );
};

export default App;
