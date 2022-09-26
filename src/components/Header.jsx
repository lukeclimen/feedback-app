import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

function Header({ text, bgColor, textColor }) {
    const headerStyles = {
        backgroundColor: bgColor,
        color: textColor,
    };

  return (
    <Link to='/'>
        <header style={headerStyles}>
            <div className="container">
                <h2>{text}</h2>
            </div>
        </header>
    </Link>
  )
}

Header.defaultProps = {
    text: "Feedback App",
    bgColor: 'rgba(0,0,0,0.4)',
    textColor: '#ff6a95',
}

Header.propTypes = {
    text: PropTypes.string
}

export default Header