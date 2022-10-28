import Telegram from '@assets/icons/telegram.svg';
import Twitch from '@assets/icons/twitch.svg';
import Twitter from '@assets/icons/twitter.svg';

export default function Footer() {
  return (
    <footer className="flex items-center gap-12 px-6 pb-10 md:px-10 lg:py-4">
      <hr className="bg-primary-900" />
      <div className="flex items-center gap-2">
        <h4>Socials</h4>
        <hr className="block h-8 w-px flex-grow-0 bg-black-400" />
        <a href="https://t.me/AegisGG_ETH" target="_blank" rel="noreferrer">
          <Telegram />
        </a>
        <a href="https://www.twitch.tv/aegisgg_eth" target="_blank" rel="noreferrer">
          <Twitch />
        </a>
        <a href="https://twitter.com/AegisGG_ETH" target="_blank" rel="noreferrer">
          <Twitter />
        </a>
      </div>
    </footer>
  );
}
