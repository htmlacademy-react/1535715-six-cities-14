import { useAppSelector } from '../../hooks';

export default function ErrorComponent(): JSX.Element | null {
  const error = useAppSelector((state) => state.error.error);

  return error ?
    <div
      style={{
        position: 'fixed',
        left: '50%',
        transform: 'translateX(-50%)',
        top: '10px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: '999',
        background: '#ff513d',
        padding: '10px',
        borderRadius: '5px',
        color: '#fff',
      }}
    >
      <p style={{ margin: '0' }}>{error}</p>
    </div >
    : null;
}
