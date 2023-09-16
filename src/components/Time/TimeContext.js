import React, { createContext, useContext, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const TimeContext = createContext();

const TimeProvider = ({ children }) => {
    const [countdown, setCountdown] = useState(1800);
    const [finished, setFinished] = useState(false);
    const [currentUser, setCurrentUser] = useState(null);

    useEffect(() => {
        const retrieveCountDown = async () => {
            try {
                const savedCountDown = await AsyncStorage.getItem("countdown");
                if (savedCountDown !== null) {
                    setCountdown(parseInt(savedCountDown));
                }
            } catch (error) {
                console.log(error);
            }
        };

        retrieveCountDown();

        let intervalWaktu;

        if (countdown > 0) {
            intervalWaktu = setInterval(() => {
                setCountdown(prevCountdown => {
                    AsyncStorage.setItem("countdown", (prevCountdown - 1).toString());
                    return prevCountdown - 1;
                });
            }, 1000);
        } else {
            setFinished(true);
            setCurrentUser(null); // Reset currentUser when countdown reaches 0
        }

        return () => clearInterval(intervalWaktu);
    }, [countdown]); // Empty dependency array to run the effect only once on mount

    useEffect(() => {
        if (currentUser !== null) {
            setCountdown(1800);
            setFinished(false);
        }
    }, [currentUser]);

    const formatTime = timeInSeconds => {
        const minutes = Math.floor(timeInSeconds / 60);
        const seconds = timeInSeconds % 60;
        return `${minutes < 10 ? '0' : ''}${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    };

    const setCurrentPerUser = user => {
        setCurrentUser(user);
    }

    return (
        <TimeContext.Provider value={{ countdown, finished, formatTime, setCurrentPerUser }}>
            {children}
        </TimeContext.Provider>
    );
};

const useTime = () => useContext(TimeContext);

export { TimeProvider, useTime };