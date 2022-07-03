import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Logo from '../../images/logo.png';
import { useGetGenresQuery } from '../../services/TMDB';
import genreIcons from '../../assets/genres';
import { useDispatch, useSelector } from 'react-redux';
import { selectGenreOrCategory } from '../../features/currentGenreOrCategory';

const Navbar = () => {
  const { genreIdOrCategoryName } = useSelector(
    (state) => state.currentGenreOrCategory
  );
  const { data, isFetching } = useGetGenresQuery();
  const dispatch = useDispatch();
  const [searchBar, setsearchBar] = useState(false);

  console.log(genreIdOrCategoryName);

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
                  <span className="material-icons">menu</span>
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
              <button className="btn btn-ghost items-center flex">
                <img src={Logo} className="max-h-12" />
              </button>
            </Link>
          )}
        </div>
        {searchBar && (
          <div>
            <input
              type="text"
              placeholder="Search"
              className="input input-bordered w-full transition-all"
            />
          </div>
        )}

        {!searchBar && (
          <div className="navbar-end  gap-2">
            <div className="form-control">
              <input
                type="text"
                placeholder="Search"
                className="input input-bordered hidden sm:flex"
              />
              <button
                className="btn btn-ghost btn-circle sm:hidden"
                onClick={() => setsearchBar(!searchBar)}
              >
                <span className=" material-icons">search</span>
              </button>
            </div>
            <div className="dropdown dropdown-end">
              <label tabIndex="0" className="btn btn-ghost btn-circle avatar">
                <div className="w-10 rounded-full">
                  <img src="https://placeimg.com/80/80/people" />
                </div>
              </label>
              <ul
                tabIndex="0"
                className="mt-3 p-2 shadow menu menu-compact dropdown-content bg-base-100 rounded-box w-52"
              >
                <li>
                  <Link to={`/profile/:id`}>
                    <button className="justify-between flex">Profile</button>
                  </Link>
                </li>
                <li>
                  <a>Settings</a>
                </li>
                <li>
                  <a>Logout</a>
                </li>
              </ul>
            </div>
          </div>
        )}
      </div>

      <div>
        <nav>
          <div className="drawer max-w-max fixed top-[65px] md:flex drawer-mobile">
            <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />

            <div className="drawer-side relative">
              <label htmlFor="my-drawer-2" className="drawer-overlay"></label>

              <ul className="menu p-4 overflow-y-auto w-72 bg-base-300 text-base-content  scrollbar-thumb-scroll scrollbar-thin scrollbar-track-transparent">
                <div class="divider">Categories</div>

                {categories.map(({ label, value }) => (
                  <li
                    key={value}
                    onClick={() => dispatch(selectGenreOrCategory(value))}
                  >
                    <Link to="/">
                      <img
                        className="w-[18px] h-[18px] filter invert"
                        src={genreIcons[label.toLowerCase()]}
                        alt=""
                      />
                      <a>{label}</a>
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
                      onClick={() => dispatch(selectGenreOrCategory(id))}
                    >
                      <Link to="/">
                        <img
                          className="w-[18px] h-[18px] filter invert"
                          src={genreIcons[name.toLowerCase()]}
                          alt=""
                        />
                        <a>{name}</a>
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
