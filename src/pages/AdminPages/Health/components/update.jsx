import React, { useState, useEffect } from "react";
import { Loading } from "../../../_commons";
import guideApi from "../api";
import styles from "./update.module.css";
import { Editor } from "react-draft-wysiwyg";
import {
  EditorState,
  ContentState,
  convertToRaw,
  convertFromHTML,
} from "draft-js";
import draftToHtml from "draftjs-to-html";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { ToastWrapper } from "../../../../utils";

function Update(props) {
  const { id } = props;
  const [guide, setGuide] = useState(null);
  const [updating, setUpdating] = useState(false);
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const hashtagConfig = {
    trigger: "#",
    separator: " ",
  };

  useEffect(() => {
    if (id) {
      guideApi
        .getHealthPostById(id)
        .then((res) => {
          if (res.data.content) {
            const blocksFromHTML = convertFromHTML(res.data.content);
            console.log(blocksFromHTML);
            const state = ContentState.createFromBlockArray(
              blocksFromHTML.contentBlocks,
              blocksFromHTML.entityMap
            );
            setEditorState(EditorState.createWithContent(state));
          }
          setGuide(res.data);
        })
        .catch((err) => console.log(err));
    } else {
      alert("Không tìm thấy bài viết!");
    }
  }, []);

  const onEditorStateChange = (editorState) => {
    setEditorState(editorState);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    setUpdating(true);
    const rawContentState = convertToRaw(editorState.getCurrentContent());
    const content = draftToHtml(rawContentState, hashtagConfig, true);
    const title = document.getElementById("formTitle").value;
    const priority = parseInt(document.getElementById("formPriority").value);

    if (!title) {
      setUpdating(false);
      return alert("Vui lòng nhập đầy đủ tiêu đề và nội dung bài viết!");
    }

    if (!priority || priority < 0) {
      setUpdating(false);

      return alert("Độ ưu tiên phải là số lớn hơn 0!");
    }

    guideApi
      .updateHealthPosts(id, { priority, title, content, updatedAt: new Date() })
      .then((res) => {
        setUpdating(false);

        if (res.data) {
          return ToastWrapper("Cập nhật bài viết thành công!");
        }
      })
      .catch((err) => {
        setUpdating(false);
        console.log(err);
      });
  };

  if (!guide) {
    return <Loading />;
  }

  return (
    <div className={styles.container}>
      <p>
        Ngày tạo: {new Date(guide.createdAt).toLocaleDateString("en-GB")},{" "}
        {new Date(guide.createdAt).toLocaleTimeString("en-GB")}
      </p>
      <p>
        Ngày cập nhật: {new Date(guide.updatedAt).toLocaleDateString("en-GB")},{" "}
        {new Date(guide.updatedAt).toLocaleTimeString("en-GB")}
      </p>
      <form onSubmit={onSubmit} className={styles.formContainer}>
        <div className={styles.formGroup}>
          <label className={styles.formLabel}>Độ ưu tiên</label>
          <input
            className={styles.formInput}
            id="formPriority"
            placeholder="Nhập số lớn hơn 0"
            defaultValue={guide.priority}
          />
        </div>
        <div className={styles.formGroup}>
          <label className={styles.formLabel}>Tiêu đề</label>
          <input
            className={styles.formInput}
            id="formTitle"
            placeholder="Nhập tiêu đề bài viết"
            defaultValue={guide.title}
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
        {updating ? (
          <span className={styles.submitButton}>Đang cập nhật...</span>
        ) : (
          <input
            className={styles.submitButton}
            type="submit"
            value={"Cập nhật bài viết"}
          />
        )}
      </form>
    </div>
  );
}

export default Update;
