import { useEffect, useState } from "react";

export default function useClient() {
  const [user, setUser] = useState({});
  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      setUser(JSON.parse(user));
      return user.user;
    } else {
      setUser(null);
    }
  }, []);
  if (user == undefined) {
    return null;
  } else {
    return user?.user;
  }
}
