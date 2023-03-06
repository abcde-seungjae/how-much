import React from "react";

import { ReactComponent as Logo } from "asset/image/How_much_logo.svg";
import { Link } from "react-router-dom";

function MainHeader() {
  return (
    <>
      <div className="relative flex flex-row justify-center w-full px-5 pt-5 md:justify-between z-1">
        {/** logo-wrap */}
        <div className="w-1/2 min-w-[180px] max-w-[256px] md:w-64">
          <Link to="/">
            <Logo className="w-full" />
          </Link>
        </div>
        {/** TODO: md 사이즈에서는 로그인 버튼 추가 */}
      </div>
    </>
  );
}

export default MainHeader;
