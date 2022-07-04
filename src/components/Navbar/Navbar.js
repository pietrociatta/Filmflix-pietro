import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Logo from '../../images/logo.png';
import { useGetGenresQuery } from '../../services/TMDB';
import genreIcons from '../../assets/genres';
import { useDispatch, useSelector } from 'react-redux';
import { selectGenreOrCategory } from '../../features/currentGenreOrCategory';
import Search from '../Search/Search';
import { fetchToken, getSessionId, moviesApi } from '../utils';
import { setUser, userSelector } from '../../features/auth';
const Navbar = () => {
  const { isAuthenticated, user } = useSelector(userSelector);
  const [isDrawerOpened, setisDrawerOpened] = useState(false);
  const { genreIdOrCategoryName } = useSelector(
    (state) => state.currentGenreOrCategory
  );
  const { data, isFetching } = useGetGenresQuery();
  const dispatch = useDispatch();
  const [searchBar, setsearchBar] = useState(false);

  const token = localStorage.getItem('request_token');
  const sessionIdFromLocalStorage = localStorage.getItem('session_id');

  const logout = () => {
    localStorage.removeItem('request_token');
    localStorage.removeItem('session_id');
    window.location.href = '/';
  };

  useEffect(() => {
    const logInUser = async () => {
      if (token) {
        if (sessionIdFromLocalStorage) {
          const { data: userData } = await moviesApi.get(
            `/account?session_id=${sessionIdFromLocalStorage}`
          );
          dispatch(setUser(userData));
        } else {
          const sessionId = await getSessionId();
          const { data: userData } = await moviesApi.get(
            `/account?session_id=${sessionId}`
          );
          dispatch(setUser(userData));
        }
      }
    };
    logInUser();
  }, [token]);

  const categories = [
    { label: 'Popolari', value: 'popular' },
    { label: 'I piu votati', value: 'top_rated' },
    { label: 'In arrivo', value: 'upcoming' },
  ];

  return (
    <div className="">
      <div className="navbar z-50 fixed bg-base-300">
        <div className="navbar-start">
          {!searchBar ? (
            <div className="">
              <div className="drawer-content flex flex-col items-center justify-center">
                <label
                  htmlFor="my-drawer-2"
                  className="btn btn-ghost  lg:hidden"
                >
                  {!isDrawerOpened ? (
                    <span
                      className="material-icons"
                      onClick={() => setisDrawerOpened(true)}
                    >
                      menu
                    </span>
                  ) : (
                    <span
                      className="material-icons"
                      onClick={() => setisDrawerOpened(false)}
                    >
                      close
                    </span>
                  )}
                </label>
              </div>
            </div>
          ) : (
            <button
              className="btn btn-ghost "
              onClick={() => {
                setsearchBar(false);
              }}
            >
              <span className="material-icons">close</span>
            </button>
          )}
          {!searchBar && (
            <Link to={`/`}>
              <img src={Logo} className="max-h-12 min-h-max hidden sm:flex " />
            </Link>
          )}
        </div>

        <div className="navbar-center">
          {!searchBar && (
            <Link to={`/`}>
              <img src={Logo} className="max-h-12 min-h-max sm:hidden " />
            </Link>
          )}
          {searchBar && (
            <div>
              <Search />
            </div>
          )}
        </div>
        {!searchBar && (
          <div className="w-full">
            <div className="navbar-center">
              <div className="form-control">
                <div className="hidden sm:flex ">
                  <Search />
                </div>
              </div>
            </div>
            <div className="flex navbar-end w-full ">
              <button
                className="btn btn-ghost btn-circle sm:hidden"
                onClick={() => setsearchBar(!searchBar)}
              >
                <span className=" material-icons">search</span>
              </button>
              {!isAuthenticated ? (
                <div>
                  <button onClick={fetchToken}>LOGIN</button>
                </div>
              ) : (
                <div className="dropdown dropdown-end">
                  <div tabIndex="0" className="flex gap-2 items-center">
                    <div className="hidden md:flex">{user.username}</div>
                    <label className="btn btn-ghost btn-circle avatar">
                      <div className="w-10 rounded-full">
                        <img src="https://placeimg.com/80/80/people" />
                      </div>
                    </label>
                  </div>
                  <ul
                    tabIndex="0"
                    className="mt-3 p-2 shadow menu menu-compact dropdown-content bg-base-300 rounded-box w-52"
                  >
                    <li>
                      <Link to={`/profile/${user.id}`}>
                        <button className="justify-between flex">
                          Profile
                        </button>
                      </Link>
                    </li>
                    <li>
                      <a>My Movies</a>
                    </li>
                    <li>
                      <a onClick={logout}>Logout</a>
                    </li>
                  </ul>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      <div>
        <nav>
          <div
            className={`drawer ${
              isDrawerOpened ? 'z-50 lg:z-0' : 'z-0'
            } fixed top-[65px] lg:flex drawer-mobile`}
          >
            <input
              id="my-drawer-2"
              type="checkbox"
              className="drawer-toggle"
              checked={isDrawerOpened}
            />

            <div className="drawer-side   relative">
              <label
                htmlFor="my-drawer-2"
                className="drawer-overlay -z-10"
              ></label>

              <ul className="menu p-4 overflow-y-auto w-72 bg-base-300 text-base-content  scrollbar-thumb-scroll scrollbar-thin scrollbar-track-transparent">
                <div class="divider">Categories</div>

                {categories.map(({ label, value }) => (
                  <li
                    key={value}
                    onClick={() => {
                      dispatch(selectGenreOrCategory(value));
                      setisDrawerOpened(false);
                    }}
                  >
                    <Link to="/">
                      <img
                        className="w-[18px] h-[18px] filter invert"
                        src={genreIcons[label.toLowerCase()]}
                        alt=""
                      />
                      <a className="text-slate-50">{label}</a>
                    </Link>
                  </li>
                ))}
                <div class="divider">Genre</div>
                {isFetching ? (
                  <div>Loading...</div>
                ) : (
                  data.genres.map(({ name, id }) => (
                    <li
                      key={id}
                      onClick={() => {
                        dispatch(selectGenreOrCategory(id));
                        setisDrawerOpened(false);
                      }}
                    >
                      <Link to="/">
                        <img
                          className="w-[18px] h-[18px] filter invert"
                          src={genreIcons[name.toLowerCase()]}
                          alt=""
                        />
                        <a className="text-slate-50">{name}</a>
                      </Link>
                    </li>
                  ))
                )}
              </ul>
            </div>
          </div>
        </nav>
      </div>
    </div>
  );
};

export default Navbar;
