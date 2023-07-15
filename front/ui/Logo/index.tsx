import Image from 'next/image';

const Logo = (): JSX.Element => (
  <Image
    width={200}
    height={200}
    alt="trello logo"
    src="https://links.papareact.com/c2cdd5"
    className="w-40 pb-10 md:pb-0 object-contain"
  />
);

export default Logo;
