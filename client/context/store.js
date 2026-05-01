import { useEffect, useRef, useState } from "react";
import { createContext } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { jwtDecode } from "jwt-decode";
import { app_url } from "@/url";

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [user, setUser] = useState([]);
  const [wallet, setWallet] = useState([]);
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
    if (!user_Id) return;
    const fetchUserDetail = async () => {
      try {
        const response = await fetch(`${app_url}/getUser/${user_Id}`, {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        });
        const result = await response.json();
        if (result.data) {
          setUser(result.data);
        }
      } catch (error) {
        console.log("Error fetching user data:", error);
      }
    };
    fetchUserDetail();
  }, [user_Id]);

  useEffect(() => {
    if (!user_Id) return;
    const fetchTransactions = async () => {
      try {
        const response = await fetch(`${app_url}/getTransactions/${user_Id}`, {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        });
        const result = await response.json();
        if (result.success) {
          setTransactions(result.transaction);
        }
      } catch (error) {
        console.error("Error fetching transactions:", error);
      }
    };
    fetchTransactions();
  }, [user_Id]);

  useEffect(() => {
    if (!user_Id) return;
    const fetchBalance = async () => {
      try {
        const response = await fetch(`${app_url}/balance/${user_Id}`, {
          // ✅ fixed hardcoded IP
          method: "GET",
          headers: { "Content-Type": "application/json" },
        });
        const result = await response.json();
        if (result.success) {
          setTotalBalance(Number(result.total_balance));
          setTotalIncome(Number(result.total_income));
          setTotalExpense(Number(result.total_expense));
        }
      } catch (error) {
        console.log("Error fetching balance:", error);
      }
    };
    fetchBalance();
  }, [user_Id]);

  useEffect(() => {
    if (!user_Id) return;
    const fetchWallets = async () => {
      try {
        const response = await fetch(`${app_url}/fetchWallets/${user_Id}`, {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        });
        if (!response.ok)
          throw new Error(`HTTP error! status: ${response.status}`);
        const result = await response.json();
        setWallet(result.wallets);
      } catch (error) {
        console.log("Error fetching wallets:", error);
      }
    };
    fetchWallets();
  }, [user_Id]); // ✅ removed wallet.amount — was causing infinite re-renders

  return (
    <AppContext.Provider
      value={{
        setAuthToken,
        setUser,
        setUserId,
        user_Id,
        userRef,
        user,
        transactions,
        setTransactions,
        totalBalance,
        totalIncome,
        totalExpense,
        setTotalBalance,
        setTotalIncome,
        setTotalExpense,
        setWallet,
        wallet,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
