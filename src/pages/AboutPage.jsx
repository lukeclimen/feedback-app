import Card from "../components/shared/Card"
import {Link} from 'react-router-dom';

function AboutPage() {
  return (
    <Card>
        <div className="about">
            <h1>About this project</h1>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Est alias illo dolorum corrupti nulla quos ea cupiditate quia iusto veniam.</p>
            <p>Version: 1.0.0</p>
            <p><Link to="/">Back to Home</Link></p>
        </div>
    </Card>
  )
}

export default AboutPage