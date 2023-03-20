import { SITE_NAME } from '@components/constants';

function Footer(): JSX.Element {
  const backToTop = () => {
    window.scrollTo(0, 0);
  };

  return (
    <footer>
      <h3>{SITE_NAME}</h3>
      <button onClick={backToTop}>Back To Top</button>
    </footer>
  );
}

export default Footer;
