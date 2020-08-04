import React, { useEffect, useState, useMemo } from 'react'
import { Link } from 'react-router-dom';
import api from '../../service/api';
import './styles.css';
import socketio from 'socket.io-client';

export default function Dashboard() {

    const [spots, setSpots] = useState([]);
    const [requests, setRequests] = useState([]);



    /* only executed if user_id changes, if you would not connect every time something was changed */
    /*só exectuado se user_id mude, se nao faria conexao toda vez q algo fosse mudado*/
    const user_id = localStorage.getItem('user');
    const socket = useMemo(() => socketio('put right url', {
        query: { user_id }
    }), [user_id]);


    useEffect(() => {
        socket.on('booking_request', data => {
            setRequests([...requests, data]);
        })
    }, [requests, socket]);



    useEffect(() => {
        async function laodSpots() {
            const user_id = localStorage.getItem('user');
            const response = await api.get('/dashboard', {
                headers: { user_id }
            });
            setSpots(response.data);
        }
        laodSpots();
    }, [])

    async function handleAccept(id) {
        await api.post(`/bookings/${id}/approvals`)
        setRequests(requests.filter(request => request._id !== id ));
    }

    async function handleReject(id) {
        await api.post(`/bookings/${id}/rejections`)
        setRequests(requests.filter(request => request._id !== id ));
    }


    return (
        <>

            <ul className="notifications">
                {requests.map(request => (
                    <li key={request._id}>
                        <p>
                            <strong> {request.user.email}</strong> you are requesting a reservation at <strong> {request.spot.company} </strong> for the date: <strong>  {request.date}</strong>
                        </p>
                        <button className="accept" onClick={() => handleAccept(request._id)}>Accept</button>
                        <button className="reject" onClick={() => handleReject(request._id)}>Reject</button>
                    </li>
                ))}
            </ul>


            <ul className="spot-list">
                {spots.map(spot => (
                    <li key={spot._id}>
                        <header style={{ backgroundImage: `url(${spot.thumbnail_url})` }} />
                        <strong>{spot.company}</strong>
                        <span>{spot.price ? `R$${spot.price}/dia` : 'GRATUITO'}</span>
                    </li>

                ))}
            </ul>

            <Link to='/new'>
                <button className="btn">Register New Spot</button>
            </Link>
        </>
    )
}