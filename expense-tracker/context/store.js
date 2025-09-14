import { useEffect, useId, useRef, useState } from "react";
import { createContext } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import jwt, { jwtDecode } from "jwt-decode";

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [user, setUser] = useState([]);
  const [authtoken, setAuthToken] = useState("");
  const [user_Id, setUserId] = useState("");
  const [transactions, setTransactions] = useState([]);
  const [totalBalance, setTotalBalance] = useState(0);
  const [totalIncome, setTotalIncome] = useState(0);
  const [totalExpense, setTotalExpense] = useState(0);
  const userRef = useRef(null);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const storedToken = await AsyncStorage.getItem("TOKEN");
        if (!storedToken) return;

        setAuthToken(storedToken);

        try {
          const decoded = jwtDecode(storedToken);
          const userIdFromToken = decoded?.id;

          if (userIdFromToken) {
            setUserId(userIdFromToken);
            userRef.current = userIdFromToken;
          } else {
            await AsyncStorage.removeItem("TOKEN");
          }
        } catch (err) {
          console.log("Invalid token:", err);
          await AsyncStorage.removeItem("TOKEN");
        }
      } catch (error) {
        console.log("Error retrieving token:", error);
      }
    };

    checkAuth();
  }, []);

  useEffect(() => {
    const fetchUserDetail = async () => {
      try {
        const response = await fetch(
          `http://192.168.100.7:4000/getUser/${user_Id}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        const result = await response.json();
        console.log(result);

        if (result.success) {
          setUser(result.data);
        } else {
          console.log("Failed to fetch userData");
        }
      } catch (error) {
        console.log("Error in fetcing data from Database");
      }
    };

    fetchUserDetail();
  }, []);

  useEffect(() => {
    if (!user_Id) {
      // setLoading(false);
      return;
    }

    const fetchData = async () => {
      try {
        const response = await fetch(
          `http://192.168.100.7:4000/getTransactions/${user_Id}`,
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
          await AsyncStorage.setItem(
            "transactions",
            JSON.stringify(result.transaction)
          );
        } else {
          console.log("Error fetching transactions:", result.message);
        }
      } catch (error) {
        console.error("Error fetching transactions:", err);
      }
    };

    fetchData();
  }, [user_Id]);

  useEffect(() => {
    const fetchBalance = async () => {
      const response = await fetch(
        `http://192.168.100.7:4000/balance/${user_Id}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const result = await response.json();

      if (result.success) {
        setTotalBalance(Number(result.total_balance));
        setTotalIncome(Number(result.total_income));
        setTotalExpense(Number(result.total_expense));
      }
    };

    fetchBalance();
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
        totalBalance,
        totalIncome,
        totalExpense,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
