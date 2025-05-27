import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { FaArrowUp } from "react-icons/fa";

const GoToTop: React.FC = () => {
  const [isVisible, setIsVisible] = useState<boolean>(false);

  // Function to scroll to the top of the page
  const goToBtn = () => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  };

  // Function to listen to scroll events
  const listenToScroll = () => {
    const heightToShow = 200; // Show button after scrolling 200px
    const winScroll =
      document.body.scrollTop || document.documentElement.scrollTop;

    if (winScroll > heightToShow) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  // Add scroll event listener on component mount
  useEffect(() => {
    window.addEventListener("scroll", listenToScroll);
    return () => window.removeEventListener("scroll", listenToScroll);
  }, []);

  return (
    <Wrapper>
      {isVisible && (
        <div className="top-btn" onClick={goToBtn}>
          <FaArrowUp className="top-btn--icon" />
        </div>
      )}
    </Wrapper>
  );
};

const Wrapper = styled.section`
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;

  .top-btn {
    font-size: 1.5rem;
    width: 50px;
    height: 50px;
    color: #fff;
    background-color: #007bff; // Primary blue color
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    border-radius: 50%;
    position: fixed;
    bottom: 2rem;
    right: 2rem;
    z-index: 999;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    transition: all 0.3s ease;
    border: 2px solid transparent;

    &:hover {
      background-color: #0056b3; // Darker blue on hover
      transform: scale(1.1); // Slightly enlarge on hover
      box-shadow: 0 6px 8px rgba(0, 0, 0, 0.2);
    }

    &:active {
      transform: scale(0.95); // Slightly shrink on click
    }

    &--icon {
      animation: float 1.5s ease-in-out infinite;
    }

    @keyframes float {
      0% {
        transform: translateY(0);
      }
      50% {
        transform: translateY(-5px);
      }
      100% {
        transform: translateY(0);
      }
    }
  }

  @media (max-width: 768px) {
    .top-btn {
      width: 40px;
      height: 40px;
      font-size: 1.2rem;
      bottom: 1.5rem;
      right: 1.5rem;
    }
  }
`;

export default GoToTop;