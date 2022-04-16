import React from "react";
import Maintained from "../../components/Maintained";
import TitleBar from "../../components/TitleBar";
import SupportDetail from "./component/SupportDetail";

function SupportPage() {
  return (
    <div>
      <TitleBar title="Hỗ trợ" />
      <SupportDetail />
    </div>
  );
}

export default SupportPage;
