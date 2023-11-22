import { Link } from 'react-router-dom';
import HeaderComponent from '../components/header';

export default function Error(): JSX.Element {
  return (
    <div className="page page--gray page--main">
      <HeaderComponent />
      <main className="page__main page__main--favorites">
        <div style={{ textAlign: 'center' }}>
          <h1>404 Not Found</h1>
          <Link
            to="/"
            style={
              {
                border: '1px solid black',
                padding: '5px',
                borderRadius: '5px'
              }
            }
          >
            Return to Main Page
          </Link>
        </div>
      </main>
    </div>
  );
}
