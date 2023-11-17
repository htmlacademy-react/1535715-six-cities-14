import { useAppSelector } from '../hooks';

export default function ErrorComponent(): JSX.Element | null {
  const error = useAppSelector((state) => state.error.error);

  return error ?
    <div
      style={{
        position: 'absolute',
        left: '0',
        right: '0',
        top: '0',
        bottom: '0',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'start',
        zIndex: '999'
      }}
    >
      <p style={{
        background: '#ff513d',
        padding: '10px',
        borderRadius: '5px',
        color: '#fff'
      }}
      >
        {error}
      </p>
    </div >
    : null;
}
