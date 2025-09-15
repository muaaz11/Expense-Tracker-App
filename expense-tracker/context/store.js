import { useEffect, useId, useRef } from "react";
import { useState } from "react";
import { createContext } from "react";
import Toast from "react-native-toast-message";
import AsyncStorage from "@react-native-async-storage/async-storage";
import jwt, { jwtDecode } from "jwt-decode";

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  // const [userId, setUserId] = useState("")
  const [user, setUser] = useState("");
  const [authtoken, setAuthToken] = useState("");
  const [user_Id, setUserId] = useState("");
  const [transactions, setTransactions] = useState(null);
  const userRef = useRef(null);

  useEffect(() => {
    const Authentication = async () => {
      try {
        const storedToken = await AsyncStorage.getItem("TOKEN");

        if (storedToken) {
          setAuthToken(storedToken);

          try {
            const decoded = jwtDecode(storedToken); // decode only if token exists
            const UserIdFromToken = decoded?.id;

            if (UserIdFromToken) {
              setUserId(UserIdFromToken);
              userRef.current = UserIdFromToken;
            } else {
              console.log("No user found in token");
            }
          } catch (decodeError) {
            console.log("Token decoding failed:", decodeError);
          }
        } else {
          console.log("No token found in storage");
        }
      } catch (error) {
        console.log("Error retrieving token:", error);
      }
    };

    Authentication();
  }, []);

  useEffect(() => {
    if (!user_Id) {
      // setLoading(false);
      return;
    }

    const fetchData = async () => {
      try {
        const response = await fetch(
          `http://192.168.100.102:4000/getTransactions/${user_Id}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        const result = await response.json();

        if (result.success === true) {
          setTransactions(result.transaction);
          console.log(result.transaction);
          
          await AsyncStorage.setItem(
            "transactions",
            JSON.stringify(result.transaction)
          );
          // setIsFetcher(true);
        } else {
          console.log("Error fetching transactions:", result.message);
        }
      } catch (error) {
        console.error("Error fetching transactions:", err);
      }
    };

    fetchData();
  }, [user_Id]);

  return (
    <AppContext.Provider
      value={{
        setAuthToken,
        setUserId,
        user_Id,
        userRef,
        user,
        transactions,
        setTransactions,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
