import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Button, Modal } from 'flowbite-react';
import { FaThumbsUp, FaThumbsDown, FaShareAlt, FaWhatsapp, FaTelegramPlane, FaFacebook, FaEnvelope, FaCopy } from 'react-icons/fa';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import '../css/PostActions.css';

const shareOptions = [
  { name: 'WhatsApp', url: 'https://api.whatsapp.com/send?text=', icon: FaWhatsapp },
  { name: 'Telegram', url: 'https://t.me/share/url?url=', icon: FaTelegramPlane },
  { name: 'Facebook', url: 'https://www.facebook.com/sharer/sharer.php?u=', icon: FaFacebook },
  { name: 'Email', url: 'mailto:?subject=&body=', icon: FaEnvelope }
];

export default function PostActions({ post, onActionUpdate }) {
  const user = useSelector((state) => state.user.currentUser);
  const [likes, setLikes] = useState(post.likes.length);
  const [dislikes, setDislikes] = useState(post.dislikes.length);
  const [shares, setShares] = useState(post.shares);
  const [isLiked, setIsLiked] = useState(false);
  const [isDisliked, setIsDisliked] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [notification, setNotification] = useState('');

  useEffect(() => {
    if (user) {
      setIsLiked(post.likes.includes(user.id));
      setIsDisliked(post.dislikes.includes(user.id));
    }
  }, [user, post.likes, post.dislikes]);

  const handleAction = async (action) => {
    if (!user) {
      setNotification(
        <div>
          You need to <Link to="/sign-in" className="notification-link">sign in</Link> 
        </div>
      );
      return;
    }

    try {
      const res = await fetch(`/api/post/${action}/${post._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        }
      });
      const data = await res.json();
      if (res.status === 200) {
        onActionUpdate(data);
        setLikes(data.likes.length);
        setDislikes(data.dislikes.length);
        setShares(data.shares);
        setIsLiked(data.likes.includes(user.id));
        setIsDisliked(data.dislikes.includes(user.id));
        setNotification('');
      } else {
        console.log(data.message);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleShare = async (url) => {
    if (!user) {
      setNotification(
        <div>
          You need to <Link to="/sign-in" className="notification-link">sign in</Link> 
        </div>
      );
      return;
    }

    try {
      const res = await fetch(`/api/post/share/${post._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        }
      });
      const data = await res.json();
      if (res.status === 200) {
        setShares(data.shares);
      } else {
        console.log(data.message);
      }
    } catch (error) {
      console.log(error.message);
    }

    // Open the share link in a new tab
    window.open(url, '_blank');
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    alert('Link copied to clipboard!');
  };

  return (
    <div className='my-5'>
      <div className='flex justify-around mt-5'>
        <button
          className={`button ${isLiked ? 'active' : ''}`}
          onClick={() => handleAction('like')}
        >
          <FaThumbsUp className='icon' /> <span className='count'>{likes}</span>
        </button>
        <button
          className={`button ${isDisliked ? 'active' : ''}`}
          onClick={() => handleAction('dislike')}
        >
          <FaThumbsDown className='icon' /> <span className='count'>{dislikes}</span>
        </button>
        <button
          className='button'
          onClick={() => setModalOpen(true)}
        >
          <FaShareAlt className='icon' /> <span className='count'>{shares}</span>
        </button>
      </div>

      {notification && <div className='notification'>{notification}</div>}

      <Modal show={modalOpen} onClose={() => setModalOpen(false)}>
  <Modal.Header className="modal-header">Share this Post</Modal.Header>
  <Modal.Body className="modal-body">
    <div className="button-container">
      {shareOptions.map(option => (
        <Button
          key={option.name}
          className='modal-button'
          onClick={() => handleShare(`${option.url}${window.location.href}`)}
        >
          <option.icon /> {option.name}
        </Button>
      ))}
      <Button className='modal-button' onClick={handleCopyLink}>
        <FaCopy /> Copy Link
      </Button>
    </div>
  </Modal.Body>
  <Modal.Footer className="modal-footer">
    <Button onClick={() => setModalOpen(false)}>Close</Button>
  </Modal.Footer>
</Modal>

    </div>
  );
}
