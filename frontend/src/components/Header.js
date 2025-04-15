import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Image from "next/image";

const Header = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, []);

  const handleProfileClick = () => {
    router.push("/dashboard");
  };

  return (
    <header className="header">
      <h1 className="logo">AI Resume Scanner</h1>
      <nav>
        <ul className="nav-links">
          <li><Link href="/">Home</Link></li>
          <li><Link href="/Uploads">Upload</Link></li>
          <li><Link href="/about">About</Link></li>
          <li><Link href="/contact">Contact</Link></li>
          {isLoggedIn ? (
            <li className="profile-icon" onClick={handleProfileClick} title="Profile">
              <Image
                src="/profile-icon.png" // ✅ path from /public folder
                alt="Profile"
                width={32}
                height={32}
                className="profile-img"
              />
            </li>
          ) : (
            <li><Link href="/signin">Sign In</Link></li>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default Header;
