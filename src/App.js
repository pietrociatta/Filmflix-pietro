import { Route, Routes } from 'react-router-dom';
import Actors from './components/Actors/Actors';
import MovieInformation from './components/MovieInformation/MovieInformation';
import Movies from './components/Movies/Movies';
import Profile from './components/Profile/Profile';
import Navbar from './components/Navbar/Navbar';

function App() {
  return (
    <div className=" ">
      <Navbar />
      <main className="flex-grow p-8  ">
        <div className=" lg:w-[calc(100%-18rem)] ml-auto top-[65px] relative">
          <Routes>
            <Route exact path="/" element={<Movies />} />
            <Route exact path="/movie/:id" element={<MovieInformation />} />
            <Route exact path="/actors/:id" element={<Actors />} />
            <Route exact path="/profile/:id" element={<Profile />} />
          </Routes>
        </div>
      </main>
    </div>
  );
}

export default App;
