import { useEffect, useId, useRef } from "react";
import { useState } from "react";
import { createContext } from "react";
import Toast from 'react-native-toast-message';
import AsyncStorage from "@react-native-async-storage/async-storage";
import jwt from 'jwt-decode'

export const AppContext = createContext()

export const AppProvider = ({children}) => {

    // const [userId, setUserId] = useState("")
    const [user, setUser] = useState("")
    const [authtoken, setAuthToken] = useState("")
    const [user_Id, setUserId] = useState("")
    const userRef = useRef(null)

   useEffect(() => {
       const Authentication = async () => {
           try {
               const storedToken = await AsyncStorage.getItem("TOKEN")
               if (storedToken) {
                   setAuthToken(storedToken)
               }

               const decoded = jwt.decoded(storedToken)
               const UserIdFromToken = decoded?.id

               if (UserIdFromToken) {
                   setUserId(id)
                   userRef.current = UserIdFromToken
               } else {
                   console.log('No User found');
               }

           } catch (error) {
               console.log("retrieving or decoding resToken:", error);
           }
       }

       Authentication()
   }, [])

    const fetchData = async (req, res) => {

        try {

            const token = await AsyncStorage.getItem("TOKEN");
            const userId = await AsyncStorage.getItem("userId")

            if(!token || !userId){
                Toast.show({
                    type: "error",
                    text1: 'invalid',
                    text2: "Failed to fetch token and userid from database",
                    visibilityTime: 1000
                })
                
            }
            const response = await fetch(`http://192.168.100.7:4000/getUser/${userId}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                },
            })

            const result = await response.json()
            console.log("result",result);
            setUser(result.data);
            console.log("result.data",result.data);
            
        } catch (error) {
            Toast.show({
                type: "error",
                text1: "Failed",
                text2: "Internal Server Error"
            })
        }
    }

    useEffect(() => {
        fetchData()
    }, [])

    return (
        <AppContext.Provider value={{
            setAuthToken,
            setUserId,
            userRef,

        }}>
            {children}
        </AppContext.Provider>
    )
} 

