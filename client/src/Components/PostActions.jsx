import { Button } from 'flowbite-react';
import { FaThumbsUp, FaThumbsDown, FaHeart, FaShareAlt, FaWhatsapp, FaTelegramPlane, FaEnvelope, FaCopy } from 'react-icons/fa';

const shareOptions = [
  { name: 'WhatsApp', url: 'https://api.whatsapp.com/send?text=', icon: FaWhatsapp },
  { name: 'Email', url: 'mailto:?subject=&body=', icon: FaEnvelope },
  { name: 'Telegram', url: 'https://t.me/share/url?url=', icon: FaTelegramPlane }
];

export default function PostActions({ post, onActionUpdate }) {
  const handleAction = async (action) => {
    try {
      const res = await fetch(`/api/post/${action}/${post._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        }
      });
      const data = await res.json();
      onActionUpdate(data);
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    alert('Link copied to clipboard!');
  };

  return (
    <div className='my-5'>
      <div className='flex justify-around mt-5'>
        <Button className='flex items-center gap-2' onClick={() => handleAction('like')}>
          <FaThumbsUp /> Like ({post.likes.length})
        </Button>
        <Button className='flex items-center gap-2' onClick={() => handleAction('dislike')}>
          <FaThumbsDown /> Dislike ({post.dislikes.length})
        </Button>
        {/* <Button className='flex items-center gap-2' onClick={() => handleAction('favorite')}>
          <FaHeart /> Favorite ({post.favorites.length})
        </Button> */}
        <Button className='flex items-center gap-2' onClick={() => handleAction('share')}>
          <FaShareAlt /> Share ({post.shares})
        </Button>
      </div>
      <div className='flex justify-around mt-5'>
        {shareOptions.map(option => (
          <Button
            key={option.name}
            className='flex items-center gap-2'
            as='a'
            href={`${option.url}${window.location.href}`}
            target='_blank'
            rel='noopener noreferrer'
          >
            <option.icon /> {option.name}
          </Button>
        ))}
        <Button className='flex items-center gap-2' onClick={handleCopyLink}>
          <FaCopy /> Copy Link
        </Button>
      </div>
    </div>
  );
}
