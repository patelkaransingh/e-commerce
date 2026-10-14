"use client";

import { useAppDispatch } from "@/store/hook";
import { clearUser, setUser } from "@/store/slice/authSlice";
import { useEffect } from "react";

function AuthInitializer() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    async function loadUser() {
      try {
        const response = await fetch("/api/auth/profile");
        if (response.ok) {
          const data = await response.json();
          dispatch(setUser(data.user));
        }
      } catch (error) {
        dispatch(clearUser());
        console.error(error);
      }
    }
    loadUser();
  }, [dispatch]);

  return null;
}

export default AuthInitializer;
