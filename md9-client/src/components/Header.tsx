// // /src/components/Header.tsx
// import React from 'react';
// import { useNavigate } from 'react-router-dom';
// import '../Header.css';

// const Header: React.FC = () => {
//   const navigate = useNavigate();
//   return (
//     <header className="header">
//       <h1>Welcome to MD9</h1>
//       <button onClick={() => navigate('/login')} className="admin-btn">Admin Zone</button>
//     </header>
//   );
// };

// export default Header;
import React from 'react';
import { useNavigate } from 'react-router-dom';

const Header: React.FC = () => {
  const navigate = useNavigate();

  const handleAdminLogin = () => {
    navigate('/admin');
  };

  return (
    <header className="header">
      <h1>Welcome to MD9</h1>
      <button onClick={handleAdminLogin}>Admin Zone</button>
    </header>
  );
};

export default Header;
