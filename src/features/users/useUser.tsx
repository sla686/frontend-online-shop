import { useEffect, useState } from "react";

import { User } from "../../types/user";

const useUser = (userId: string | undefined) => {
  const [user, setUser] = useState<User | undefined>(undefined);
  useEffect(() => {
    if (userId) {
      fetch(`https://api.escuelajs.co/api/v1/users/${userId}`)
        .then((data) => data.json())
        .then((data) => {
          // This is a trick because actually the promise isn't rejected even after getting an error!!
          // So, I have to check if my data doesn't have any error!
          if (Object.hasOwn(data, "error")) setUser(undefined);
          else setUser(data);
        })
        .catch((err) => {
          console.log(err);
          setUser(undefined);
        });
    }
  }, [userId]);
  return user;
};

export default useUser;
