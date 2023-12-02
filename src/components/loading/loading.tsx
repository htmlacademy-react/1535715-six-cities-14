export default function LoadingComponent(): JSX.Element {
  return (
    <div
      style={{
        width: '100%',
        height: '100vh',
        maxHeight: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
      }}
    >
      <p style={{ fontSize: '40px' }}>Loading...</p>
    </div>
  );
}
