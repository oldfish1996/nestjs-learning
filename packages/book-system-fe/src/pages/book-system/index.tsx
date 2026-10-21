import { useEffect, useRef, useState } from "react";
import {
  Alert,
  Button,
  ConfigProvider,
  Descriptions,
  Form,
  Image,
  Input,
  Modal,
  Popconfirm,
  Space,
  Table,
  Upload,
} from "antd";
import {
  createBook,
  updateBook,
  deleteBook,
  listBooks,
  getBook,
  uploadCover,
  coverUrl,
  errorText,
} from "../../interface/book";
import type { Book, BookValues } from "../../interface/book";
import "./book-system.css";

export default function BookSystem() {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);
  const [keyword, setKeyword] = useState("");
  const currentKeyword = useRef("");
  const listRequest = useRef(0);
  const [feedback, setFeedback] = useState<{
    type: "success" | "error";
    text: string;
  }>();
  const [editorOpen, setEditorOpen] = useState(false);
  const [editing, setEditing] = useState<Book>();
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [editorError, setEditorError] = useState("");
  const [detail, setDetail] = useState<Book>();
  const [detailLoading, setDetailLoading] = useState(false);
  const [detailOpen, setDetailOpen] = useState(false);
  const [detailError, setDetailError] = useState("");
  const detailRequest = useRef(0);
  const [form] = Form.useForm<BookValues>();
  const cover = Form.useWatch("cover", form);

  async function refresh(searchKeyword = currentKeyword.current) {
    const request = ++listRequest.current;
    setLoading(true);
    try {
      const data = await listBooks(searchKeyword);
      if (request === listRequest.current) setBooks(data);
    } catch (error) {
      if (request === listRequest.current) {
        setBooks([]);
        setFeedback({ type: "error", text: errorText(error) });
      }
    } finally {
      if (request === listRequest.current) setLoading(false);
    }
  }

  function search(value: string) {
    const nextKeyword = value.trim();
    currentKeyword.current = nextKeyword;
    setKeyword(nextKeyword);
    setFeedback(undefined);
    void refresh(nextKeyword);
  }

  useEffect(() => {
    let active = true;
    const request = ++listRequest.current;
    listBooks("")
      .then((data) => {
        if (active && request === listRequest.current) setBooks(data);
      })
      .catch((error) => {
        if (active && request === listRequest.current) setFeedback({ type: "error", text: errorText(error) });
      })
      .finally(() => {
        if (active && request === listRequest.current) setLoading(false);
      });
    return () => {
      active = false;
    };
  }, []);

  function openEditor(book?: Book) {
    setEditing(book);
    setEditorError("");
    form.resetFields();
    if (book) form.setFieldsValue(book);
    setEditorOpen(true);
  }

  async function save(values: BookValues) {
    setSaving(true);
    setEditorError("");
    try {
      const saved = editing
        ? await updateBook({ ...values, id: editing.id })
        : await createBook(values);
      if (!saved) throw new Error("图书不存在，请刷新列表后重试");
      setEditorOpen(false);
      setFeedback({
        type: "success",
        text: editing ? "图书已更新" : "图书已新增",
      });
      await refresh();
    } catch (error) {
      setEditorError(errorText(error));
    } finally {
      setSaving(false);
    }
  }

  async function showDetail(id: number) {
    const request = ++detailRequest.current;
    setDetail(undefined);
    setDetailError("");
    setDetailOpen(true);
    setDetailLoading(true);
    try {
      const book = await getBook(id);
      if (!book) throw new Error("图书不存在，请刷新列表");
      if (request === detailRequest.current) setDetail(book);
    } catch (error) {
      if (request === detailRequest.current) setDetailError(errorText(error));
    } finally {
      if (request === detailRequest.current) setDetailLoading(false);
    }
  }

  async function remove(id: number) {
    try {
      await deleteBook(id);
      setFeedback({ type: "success", text: "图书已删除" });
      await refresh();
    } catch (error) {
      setFeedback({ type: "error", text: errorText(error) });
    }
  }

  return (
    <ConfigProvider
      theme={{ token: { colorPrimary: "#1677ff", borderRadius: 8 } }}
    >
      <main className="book-page">
        <h1>图书管理系统</h1>
        <div className="book-toolbar">
          <Input.Search
            placeholder="搜索书名、作者或简介"
            aria-label="搜索书名、作者或简介"
            enterButton="搜索"
            allowClear
            onSearch={search}
          />
          <Space>
            <Button
              onClick={() => {
                setFeedback(undefined);
                void refresh();
              }}
              loading={loading}
            >
              刷新
            </Button>
            <Button type="primary" onClick={() => openEditor()}>
              新增图书
            </Button>
          </Space>
        </div>
        {feedback && (
          <Alert
            className="book-feedback"
            type={feedback.type}
            title={feedback.text}
            showIcon
            closable
            onClose={() => setFeedback(undefined)}
          />
        )}
        <Table<Book>
          rowKey="id"
          loading={loading}
          dataSource={books}
          scroll={{ x: 760 }}
          pagination={{ pageSize: 8, hideOnSinglePage: true }}
          locale={{
            emptyText: keyword
              ? "未找到匹配的图书"
              : "暂无图书，点击「新增图书」添加",
          }}
          columns={[
            {
              title: "封面",
              dataIndex: "cover",
              width: 100,
              render: (value: string) => (
                <Image
                  width={56}
                  height={76}
                  style={{ objectFit: "cover" }}
                  src={coverUrl(value)}
                  alt="图书封面"
                />
              ),
            },
            { title: "书名", dataIndex: "title", width: 180 },
            { title: "作者", dataIndex: "author", width: 140 },
            { title: "简介", dataIndex: "description", ellipsis: true },
            {
              title: "操作",
              width: 210,
              render: (_, book) => (
                <Space>
                  <Button type="link" onClick={() => void showDetail(book.id)}>
                    详情
                  </Button>
                  <Button type="link" onClick={() => openEditor(book)}>
                    编辑
                  </Button>
                  <Popconfirm
                    title={`确定删除《${book.title}》？`}
                    description="删除后无法恢复"
                    okText="删除"
                    cancelText="取消"
                    onConfirm={() => remove(book.id)}
                  >
                    <Button type="link" danger>
                      删除
                    </Button>
                  </Popconfirm>
                </Space>
              ),
            },
          ]}
        />
        <Modal
          title={editing ? "编辑图书" : "新增图书"}
          open={editorOpen}
          onCancel={() => setEditorOpen(false)}
          closable={!saving && !uploading}
          maskClosable={!saving && !uploading}
          keyboard={!saving && !uploading}
          cancelButtonProps={{ disabled: saving || uploading }}
          okText="保存"
          cancelText="取消"
          confirmLoading={saving}
          okButtonProps={{ disabled: uploading }}
          onOk={() => form.submit()}
        >
          <Form
            form={form}
            layout="vertical"
            onFinish={save}
            onFinishFailed={() =>
              setEditorError("请填写完整的图书信息并上传封面")
            }
            disabled={saving}
          >
            <Form.Item
              name="title"
              label="书名"
              rules={[
                { required: true, whitespace: true, message: "请输入书名" },
              ]}
            >
              <Input placeholder="请输入书名" />
            </Form.Item>
            <Form.Item
              name="author"
              label="作者"
              rules={[
                { required: true, whitespace: true, message: "请输入作者" },
              ]}
            >
              <Input placeholder="请输入作者" />
            </Form.Item>
            <Form.Item
              name="description"
              label="简介"
              rules={[
                { required: true, whitespace: true, message: "请输入简介" },
              ]}
            >
              <Input.TextArea rows={4} placeholder="请输入图书简介" />
            </Form.Item>
            <Form.Item
              name="cover"
              hidden
              rules={[{ required: true, message: "请上传封面" }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="封面"
              required
              extra="支持 JPG、JPEG、PNG，最大 5 MB"
              validateStatus={
                form.getFieldError("cover").length ? "error" : undefined
              }
              help={form.getFieldError("cover")[0]}
            >
              <Space direction="vertical">
                {cover && (
                  <Image
                    width={100}
                    height={140}
                    style={{ objectFit: "cover" }}
                    src={coverUrl(cover)}
                    alt="封面预览"
                  />
                )}
                <Upload
                  accept=".jpg,.jpeg,.png"
                  showUploadList={false}
                  disabled={uploading || saving}
                  beforeUpload={async (file) => {
                    if (
                      !/\.(jpe?g|png)$/i.test(file.name) ||
                      file.size > 5 * 1024 * 1024
                    ) {
                      setEditorError(
                        "请选择不超过 5 MB 的 JPG、JPEG 或 PNG 图片",
                      );
                      return Upload.LIST_IGNORE;
                    }
                    setUploading(true);
                    setEditorError("");
                    try {
                      const path = await uploadCover(file);
                      form.setFieldValue("cover", path);
                      await form.validateFields(["cover"]);
                    } catch (error) {
                      setEditorError(errorText(error));
                    } finally {
                      setUploading(false);
                    }
                    return false;
                  }}
                >
                  <Button loading={uploading}>
                    {cover ? "更换封面" : "上传封面"}
                  </Button>
                </Upload>
              </Space>
            </Form.Item>
            {editorError && <Alert type="error" title={editorError} showIcon />}
          </Form>
        </Modal>
        <Modal
          title="图书详情"
          open={detailOpen}
          loading={detailLoading}
          footer={<Button onClick={() => setDetailOpen(false)}>关闭</Button>}
          onCancel={() => setDetailOpen(false)}
        >
          {detailError && <Alert type="error" title={detailError} showIcon />}
          {detail && (
            <Space direction="vertical" size="large" style={{ width: "100%" }}>
              <Image
                width={140}
                src={coverUrl(detail.cover)}
                alt={`${detail.title}封面`}
              />
              <Descriptions
                column={1}
                items={[
                  { key: "title", label: "书名", children: detail.title },
                  { key: "author", label: "作者", children: detail.author },
                  {
                    key: "description",
                    label: "简介",
                    children: (
                      <span
                        style={{
                          whiteSpace: "pre-wrap",
                          overflowWrap: "anywhere",
                        }}
                      >
                        {detail.description}
                      </span>
                    ),
                  },
                ]}
              />
            </Space>
          )}
        </Modal>
      </main>
    </ConfigProvider>
  );
}
