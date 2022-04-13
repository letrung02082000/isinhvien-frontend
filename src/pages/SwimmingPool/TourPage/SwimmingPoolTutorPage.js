import React from "react";
import TutorForm from "../components/TutorForm";
import SwimmingPoolLayout from "../../../layouts/SwimmingPoolLayout";

function SwimmingPoolTutorPage() {
  return (
    <SwimmingPoolLayout route="/tutor">
      <TutorForm />
    </SwimmingPoolLayout>
  );
}

export default SwimmingPoolTutorPage;
