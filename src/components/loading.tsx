export default function LoadingComponent(): JSX.Element {
  return (
    <div
      style={{
        position: 'absolute',
        left: '0',
        right: '0',
        top: '0',
        bottom: '0',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
      }}
    >
      <p style={{ fontSize: '40px' }}>Loading...</p>
    </div>
  );
}
