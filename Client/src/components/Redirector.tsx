// Redirector.tsx
import React, {useEffect, useRef} from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import {retrieve_link } from "../api/api";

const Redirector: React.FC = () => {
    const navigate = useNavigate();
    const effectRan = useRef(false);
    useEffect(() => {

        const fetchFullLink = async () => {
            if (effectRan.current) {
                return
            }
                var ok = await retrieve_link(window.location.href)
                if (!ok) {
                    navigate('/');
                }
            }
        fetchFullLink().then(r => {});
    }, [ navigate]);
    return null;
};

export default Redirector;
