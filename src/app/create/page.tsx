import React from "react";
import Create from "../components/rich-text-editor";
import Header from "../components/Header";

export default function CreatePost() {
  return (
    <div>
      <Header />
      <div className="max-w-3xl mx-auto py-12 ">
        <Create />
      </div>
      {/* Space */}
    </div>
  );
}
