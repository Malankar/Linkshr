import { useEffect, useState } from "react";

export default function useClient() {
  const [user, setUser] = useState({});
  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      setUser(JSON.parse(user));
    } else {
      setUser(null);
    }
  }, []);
  return user?.user;
}
