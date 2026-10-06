import Icon from '@src/components/icon';
import { ICON_LIST } from '@src/constants';

type IconContainerProps = {
  name: string;
};

function IconContainer({ name }: IconContainerProps) {
  return (
    <Icon
      name={name}
      label
      containerClassName="container-technologies"
      imageContainerClassName="icon-technologies"
      loading="lazy"
    />
  );
}

export function Technologies() {
  const sortedIcons = ICON_LIST.sort((a, b) => a.localeCompare(b)).filter(
    (icon) => icon != 'github' && icon != 'linkedin' && icon != 'earth',
  );
  return (
    <section className="icon-list">
      {sortedIcons.map((icon) => (
        <IconContainer key={icon} name={icon} />
      ))}
    </section>
  );
}
