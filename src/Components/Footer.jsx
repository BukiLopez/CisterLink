import React from 'react';
import './Footer.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebookF, faTwitter, faInstagram, faLinkedinIn } from '@fortawesome/free-brands-svg-icons';

function Footer(){
    return (
        <footer className="footer">
            <div className="social-icons">
                <a href="#facebook" aria-label="Facebook">
                    <FontAwesomeIcon icon={faFacebookF} />
                </a>
                <a href="#twitter" aria-label="Twitter">
                    <FontAwesomeIcon icon={faTwitter} />
                </a>
                <a href="#instagram" aria-label="Instagram">
                    <FontAwesomeIcon icon={faInstagram} />
                </a>
                <a href="#linkedin" aria-label="LinkedIn">
                    <FontAwesomeIcon icon={faLinkedinIn} />
                </a>
            </div>
            <p>&copy; 2024 CisterLink. Todos los derechos reservados.</p>
        </footer>
    );
};

export default Footer;