
import LogoComponent from '../components/logo/logo';
import { FormEvent, useRef, useState } from 'react';
import { useAppDispatch } from '../hooks';
import { loginAction } from '../store/api-actions';
import { getRandomCity } from '../utils/util';
import { changeCity } from '../store/slices/offers-slice/offers-slice';
import { Link } from 'react-router-dom';
import { AppRoute } from '../const';

export default function LoginPage(): JSX.Element {
  const dispatch = useAppDispatch();
  const userEmail = useRef<HTMLInputElement>(null);
  const userPassword = useRef<HTMLInputElement>(null);

  const [city] = useState(getRandomCity());

  function formSubmitHandler(evt: FormEvent<HTMLFormElement>) {
    evt.preventDefault();

    if (!userEmail.current || !userPassword.current) {
      return;
    }

    dispatch(loginAction({ login: userEmail.current.value, password: userPassword.current.value }));
  }

  function handleClick() {
    dispatch(changeCity(city));
  }

  return (
    <div className="page page--gray page--login">
      <header className="header">
        <div className="container">
          <div className="header__wrapper">
            <LogoComponent />
          </div>
        </div>
      </header>

      <main className="page__main page__main--login">
        <div className="page__login-container container">
          <section className="login">
            <h1 className="login__title">Sign in</h1>
            <form className="login__form form" action="#" method="post" onSubmit={formSubmitHandler}>
              <div className="login__input-wrapper form__input-wrapper">
                <label className="visually-hidden">E-mail</label>
                <input className="login__input form__input" type="email" name="email" placeholder="Email" required ref={userEmail} pattern="^[a-zA-Z0-9]+(?:\.[a-zA-Z0-9]+)*@[a-zA-Z0-9]+(?:\.[a-zA-Z0-9]+)*$" data-testid="emailElement" />
              </div>
              <div className="login__input-wrapper form__input-wrapper">
                <label className="visually-hidden">Password</label>
                <input className="login__input form__input" type="password" name="password" placeholder="Password" required ref={userPassword} pattern="^(?=.*[a-zA-Z])(?=.*\d).+$" data-testid="passwordElement" />
              </div>
              <button className="login__submit form__submit button" type="submit">Sign in</button>
            </form >
          </section >
          <section className="locations locations--login locations--current">
            <div className="locations__item">
              <Link className="locations__item-link" to={AppRoute.Root} onClick={handleClick}>
                <span>{city}</span>
              </Link>
            </div>
          </section>
        </div >
      </main >
    </div >
  );
}
