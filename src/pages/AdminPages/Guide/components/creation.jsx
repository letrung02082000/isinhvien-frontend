import React, { useState, useEffect } from "react";
import styles from "./creation.module.css";
import { Editor } from "react-draft-wysiwyg";
import { EditorState, convertToRaw } from "draft-js";
import draftToHtml from "draftjs-to-html";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import guideApi from "../api";
import { ToastWrapper } from "../../../../utils";

function Creation() {
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const hashtagConfig = {
    trigger: "#",
    separator: " ",
  };

  const onEditorStateChange = (editorState) => {
    setEditorState(editorState);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const rawContentState = convertToRaw(editorState.getCurrentContent());
    const content = draftToHtml(rawContentState, hashtagConfig, true);
    const title = document.getElementById("formTitle").value;
    const priority = parseInt(document.getElementById("formPriority").value);

    if (!title) {
      return alert("Vui lòng nhập đầy đủ tiêu đề và nội dung bài viết!");
    }

    if (!priority || priority < 0) {
      return alert("Độ ưu tiên phải là số lớn hơn 0!");
    }

    guideApi
      .createGuide({ priority, title, content })
      .then((res) => ToastWrapper("Tạo bài viết thành công!"))
      .catch((err) => console.log(err));
  };

  return (
    <div className={styles.container}>
      <form onSubmit={onSubmit}>
        <div className={styles.formGroup}>
          <label className={styles.formLabel}>Độ ưu tiên</label>
          <input
            className={styles.formInput}
            id="formPriority"
            placeholder="Nhập số lớn hơn 0"
          />
        </div>
        <div className={styles.formGroup}>
          <label className={styles.formLabel}>Tiêu đề</label>
          <input
            className={styles.formInput}
            id="formTitle"
            placeholder="Nhập tiêu đề bài viết"
          />
        </div>
        <label className={styles.formLabel}>Nội dung</label>
        <div className={styles.editorContainer}>
          <Editor
            editorState={editorState}
            toolbarClassName="toolbarClassName"
            wrapperClassName="wrapperClassName"
            editorClassName="editorClassName"
            onEditorStateChange={onEditorStateChange}
          />
        </div>
        <input
          className={styles.submitButton}
          type="submit"
          value={"Tạo bài viết"}
        />
      </form>
    </div>
  );
}

export default Creation;
