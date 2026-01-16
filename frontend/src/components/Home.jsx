/** @format */

import "../Style/App.css";

function Home() {
  const user = JSON.parse(localStorage.getItem("user"));
  return <h1 className="home">I am HOME!, {user.name}</h1>;
}

export default Home;
