<script setup>
import { ref, defineEmits } from "vue";
import { UploadOutlined } from "@ant-design/icons-vue";
import { Upload, Button, message } from "ant-design-vue";

const fileList = ref([]);
const emit = defineEmits(["update:fileList", "fileSelected"]);

const handleChange = (info) => {
  const newFile = info.file;
  if (!fileList.value.some((f) => f.name === newFile.name)) {
    fileList.value.push({
      name: newFile.name,
      url: URL.createObjectURL(newFile),
      originFileObj: newFile,
    });
  }

  emit("update:fileList", fileList.value);
  emit(
    "fileSelected",
    fileList.value.map((f) => f.originFileObj)
  );
};

const handleRemove = (file) => {
  fileList.value = fileList.value.filter((f) => f.name !== file.name);
  URL.revokeObjectURL(file.url); // Giải phóng bộ nhớ
  message.success("Ảnh đã được xóa!");

  // Cập nhật lại danh sách sau khi xóa
  emit("update:fileList", fileList.value);
  emit(
    "fileSelected",
    fileList.value.map((f) => f.originFileObj)
  );
};

const beforeUpload = () => {
  return false;
};
</script>

<template>
  <Upload
    v-model:file-list="fileList"
    list-type="picture"
    :multiple="true"
    :before-upload="beforeUpload"
    @change="handleChange"
    @remove="handleRemove"
  >
    <Button type="primary"> <UploadOutlined /> Chọn ảnh </Button>
  </Upload>
</template>
