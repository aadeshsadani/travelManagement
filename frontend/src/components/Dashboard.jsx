import { useEffect } from "react";
import { useState } from "react";
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom";
import Navbar from './Navbar';
const Dashboard = () => {

    const styles = {
        h1 : {
            color : '#000'
        },
        cardContainer: {
            minHeight : "1000px",
            backgroundImage: `url(${"https://i1.wp.com/myengineeringprojects.in/wp-content/uploads/2020/02/travel.png?fit=774%2C541&ssl=1"})`,
            // backgroundImage: `url(${"https://images.pexels.com/photos/1431822/pexels-photo-1431822.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"})`,
            backgroundSize: "50%",
            backgroundRepeat  : 'no-repeat',
            backgroundPosition: 'center'
        
        }

    }
    const getDataFromStor = useSelector((data) => data.userReducer)
    const token = localStorage.getItem('token') || undefined;
    const navigate = useNavigate();
    // console.log(getDataFromStor);
    useEffect(() => {
        if(token === undefined && getDataFromStor.message === null){
            navigate('/');
        }
    },[])
    return(
        <>
            <Navbar />
            <div style={styles.cardContainer}>
                <h1 style={styles.h1}>
                    {
                        getDataFromStor.value !== null ? `Hello ${getDataFromStor.value.user.name}` : 'Dashboard' 
                    }
                </h1> 
            </div>
        </>
    )
}

export default Dashboard