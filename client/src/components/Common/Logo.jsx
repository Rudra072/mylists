import React from "react";

const Logo = () => {
  return (
    <div className="flex items-center">
      <svg
        width="50"
        height="50"
        viewBox="0 0 412 396"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M174.159 119.686C174.171 119.44 174.163 119.187 174.143 118.941C172.748 102.173 190.132 97.5144 197.308 112.733C197.413 112.956 197.534 113.181 197.668 113.388L227.517 159.638L276.482 157.426C293.682 155.725 298.669 174.339 282.924 181.467L239.815 205.536L237.09 260.514C237.078 260.761 237.086 261.015 237.106 261.261C238.5 278.029 221.116 282.687 213.94 267.467C213.835 267.245 213.715 267.021 213.582 266.814L183.757 220.557L135.116 221.072C117.916 222.772 112.928 204.158 128.674 197.031L171.458 174.659L174.159 119.686Z"
          fill="#49A0FD"
          className="scale-110"
        />
      </svg>
      <h1 className=" text-headingH1 leading-heading text-1000 font-medium tracking-H1">
        <span className="text-Blue">my</span>lists
      </h1>
    </div>
  );
};

export default Logo;
