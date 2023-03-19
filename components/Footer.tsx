import { SITE_NAME } from '@components/constants';
import { CSSProperties } from 'react';

function Footer(): JSX.Element {
  const containerStyle: CSSProperties = {
    display: 'flex',
    height: '100%',
    alignItems: 'center',
  };
  const textStyle: CSSProperties = { margin: '10px', padding: '0px' };

  return (
    <footer>
      <div style={containerStyle}>
        <h3 style={textStyle}>{SITE_NAME}</h3>
      </div>
    </footer>
  );
}

export default Footer;
