import React from "react";

import { ReactComponent as Logo } from "asset/image/How_much_logo.svg";
import { Link } from "react-router-dom";

function Header() {
  return (
    <>
      <div className="relative flex flex-row justify-start w-full p-5 md:justify-between z-1">
        {/** logo-wrap */}
        <div className="w-2/5 min-w-[120px] max-w-[256px] md:w-64">
          <Link to="/">
            <Logo className="w-full" />
          </Link>
        </div>
        {/** TODO: md 사이즈에서는 로그인 버튼 추가 */}
      </div>
    </>
  );
}

export default Header;
