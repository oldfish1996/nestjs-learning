import OSS from "ali-oss";
import "dotenv/config";

const client = new OSS({
  // yourregion填写Bucket所在地域。以华东1（杭州）为例，Region填写为oss-cn-hangzhou。
  region: "oss-cn-beijing",
  // 从环境变量中获取访问凭证。运行本代码示例之前，请确保已设置环境变量OSS_ACCESS_KEY_ID和OSS_ACCESS_KEY_SECRET。
  accessKeyId: process.env.OSS_ACCESS_KEY_ID!,
  accessKeySecret: process.env.OSS_ACCESS_KEY_SECRET!,
  authorizationV4: true,
  // 填写Bucket名称。
  bucket: "chen1996-test",
});

// 自定义请求头
const headers = {
  "x-oss-storage-class": "Standard",
  "x-oss-object-acl": "public-read",
  "Content-Type": "image/svg+xml",
  "Content-Disposition": "inline",
  "x-oss-forbid-overwrite": "false",
};

async function put() {
  try {
    const result = await client.put("brand-icon.svg", "src/brand-icon.svg", {
      headers,
    });
    console.log(result);
  } catch (error) {
    console.log(error);
  }
}

put();
