import React, {useEffect, useState} from 'react';
import { createLink } from '../api/api';
import "./LinkShortener.css";
import {ShortLink,getLocalItems,saveLocalItems} from "../helpers/helpers";
import { MdCopyAll } from 'react-icons/md';

const LinkShortener: React.FC = () => {
    const [fullLink, setFullLink] = useState('');
    const [shortLink, setShortLink] = useState();
    const [localLinks, setLocalLinks] = useState<ShortLink[]>([]);

    const handleShorten = async () => {
        const result = await createLink(fullLink);
        setShortLink(result.short_link);
        if(result.success) {
            if(!localLinks.some((item) => item.short_link === result.short_link)) {
                const newLocal: ShortLink = {
                    short_link: result.short_link,
                    full_link: result.full_link,
                    datetime: new Date().toISOString(),
                };
                setLocalLinks((prevLinks) => [...prevLinks, newLocal]);
            }
        }
    };
    useEffect(() => {
        setLocalLinks(getLocalItems());
    }, []);

    useEffect(() => {
        if(localLinks.length>0) {
            saveLocalItems(localLinks);
        }
    }, [localLinks]);

    return (
        // <div className="home-container">
            <div className="Frame1">
                <div className="container">
                    <div className="Logo">
                        <div className="Vector"><span className="f1">cen</span> <span className="f2">t</span>
                            <span className="f1">er_a</span><span className="f3">i</span>
                        </div>
                    </div>
                    <div className="Content">
                        <div className="Title">Short link</div>
                        <div className="input-filled">
                        <label htmlFor="fullLink" className="fullLink">Link to shortcut:</label>
                        <input
                            type="text"
                            className="underline-input"
                            id="fullLink"
                            value={fullLink}
                            onChange={(e) => setFullLink(e.target.value)}
                        />
                        </div>
                        <div className="button_primary">

                        <button onClick={handleShorten}
                                // style={{backgroundColor: 'darkblue', borderRadius: '5px', color: 'white',"width":"100%", "minHeight":"40px"}}>
                                className="Rectangle_67">
                            Shorten It
                        </button>
                        </div>

                        {shortLink && (
                            <div className="result">
                                <p className="result-text"> <a href={shortLink}>{shortLink}</a></p>
                                <button onClick={() => navigator.clipboard.writeText(shortLink)}><MdCopyAll/></button>
                            </div>
                        )}
                    </div>
                </div>
                <div className="container">
                    {(localLinks && localLinks.length > 0 ) && (
                        <p> Last links</p>)}
                    {localLinks.map((link, index) => (
                        <div className="result_old" id={"local_" + index}>
                            <div className="result-text">{link.full_link}</div>
                            <div className="result2">
                            <div className="result-text"><a href={link.short_link}>{link.short_link}</a></div>
                            <button className="copy_old" onClick={() => navigator.clipboard.writeText(link.short_link)}>
                                <MdCopyAll className="copy-icon"/></button>
                            </div>
                        </div>
                    ))}

                </div>
            </div>
        // </div>
    );
};

export default LinkShortener;


                /*
                return (
                <div className=" home-container">
                    <div className=" Frame1">
            <div className=" container">
                <div className=" Logo">
                    <div className=" Vector"><span className=" f1">cen</span> <span className=" f2">t</span>
                        <span className=" f1">er_a</span><span className=" f3">i</span>
                    </div>
                </div>
                <div className=" Content">
                    <div className=" Title">Short link</div>
                    <label htmlFor=" fullLink">Link shortcut:</label>
                    <input
                        type=" text"
                        className=" underline-input"
                        id=" fullLink"
                        value={fullLink}
                        onChange={(e) => setFullLink(e.target.value)}
                    />
                    <button onClick={handleShorten}
                            style={{backgroundColor: 'darkblue', borderRadius: '5px', color: 'white'}}>
                        Shorten It
                    </button>

                    {shortLink && (
                        <div>
                            <p>Shortened Link: <a href={shortLink}>{shortLink}</a></p>
                            <button onClick={() => navigator.clipboard.writeText(shortLink)}>Copy</button>
                        </div>
                    )}
                </div>
                {localLinks.map((link, index) => (
                    <div>
                        {link.short_link}
                    </div>
                ))}

            </div>
        </div>
    </div>
);
*/
/*
// ShortLink.tsx
import React, { useState } from 'react';
import './ShortLink.css';

const ShortLink: React.FC = () => {
    const [inputLink, setInputLink] = useState('');
    const [shortenedLink, setShortenedLink] = useState('');

    const handleShorten = () => {
        // Example logic to generate a shortened link - in a real app, this would be an API call
        if (inputLink) {
            const shortened = 'https://center.ai/pl-sg/';
            setShortenedLink(shortened);
        }
    };

    const handleCopy = () => {
        if (shortenedLink) {
            navigator.clipboard.writeText(shortenedLink);
            alert('Shortened link copied to clipboard!');
        }
    };

    return (
        <div className=" short-link-container">
            <h1>center_ai</h1>
            <h2>Short link</h2>
            <div className=" input-container">
                <input
                    type=" text"
                    placeholder=" Link to shortcut"
                    value={inputLink}
                    onChange={(e) => setInputLink(e.target.value)}
                />
                <button onClick={handleShorten}>Shorten it</button>
            </div>
            {shortenedLink && (
                <div className=" shortened-link">
                    <input type=" text" value={shortenedLink} readOnly />
                    <button onClick={handleCopy}>Copy</button>
                </div>
            )}
        </div>
    );
};

export default ShortLink;
*/