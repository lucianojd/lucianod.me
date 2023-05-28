import Box from '@components/common/box';
import { TECH_LOGOS_PNGS, TECH_LOGOS_SVGS } from '@components/constants';
import styles from '@styles/components/technologies.module.scss';
import Image from 'next/image';

function Logos() {
  return (
    <>
      {TECH_LOGOS_SVGS.map((Logo, index) => (
        <div className={styles.logo} key={index}>
          <Logo />
        </div>
      ))}
      {TECH_LOGOS_PNGS.map((Logo, index) => (
        <div className={styles.logo} key={index}>
          <Image src={Logo} />
        </div>
      ))}
    </>
  );
}

function Technologies() {
  return (
    <Box style={{ overflowX: 'hidden' }}>
      <div className={styles.list}>
        <Logos />
        <Logos />
      </div>
    </Box>
  );
}

export default Technologies;
