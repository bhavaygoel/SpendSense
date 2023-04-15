import { useEffect, useState } from "react";

function Home() {
  const [user, setUser] = useState();

  const fetchUser = async () => {
    try {
      const usr = await fetch("http://localhost:5000/profile", {
        credentials: "include",
      });
      const usrJson = await usr.json();
      setUser(usrJson);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <div>
      <h1>Welcome Home!</h1>
      <p>Hello {user && user.firstName}</p>
      <button>Get Profile</button>
    </div>
  );
}

export default Home;
