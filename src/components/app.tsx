import MainPage from '../pages/main';

interface IAppProps {
  cardsCount: number;
}

export default function App({cardsCount}: IAppProps): JSX.Element {
  return(
    <MainPage cardsCount = {cardsCount}/>
  );
}
