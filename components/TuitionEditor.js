"use client";


// Dynamically import CKEditor only on the client-side
import dynamic from "next/dynamic";

// Dynamically import CKEditor with ssr: false to avoid SSR issues
const CKEditor = dynamic(
  () => import("@ckeditor/ckeditor5-react").then((mod) => mod.CKEditor),
  {
    ssr: false, // Disable SSR for CKEditor
  }
);

import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
const TuitionEditor = ({ data, onChange }) => {
  return (
    <CKEditor
      editor={ClassicEditor}
      data={data} // Pass tuition data to CKEditor
      onChange={onChange} // Update data when CKEditor changes
    />
  );
};

export default TuitionEditor;
